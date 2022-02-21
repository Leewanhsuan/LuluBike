import styled from 'styled-components';
import './index.css';
import * as React from 'react';
import {
    Map,
    Popup,
    Marker,
    NavigationControl,
    FullscreenControl,
    GeolocateControl,
    ScaleControl,
    Source,
    Layer,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faLocationPin, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { fetchNearByStation, fetchAvailableBike } from './Service';
import { useDispatch, useSelector } from 'react-redux';
import MarkerItem from './MarkerItem';
import { stationGetData } from './redux/bikeRoute';

/*此區為樣式設計*/
const MapWrapper = styled.div`
    height: 900px;
    width: 65%;
    left: 35%;
    top: 0;
    position: fixed;

    @media screen and (max-width: 768px) {
        width: 100%;
        height: 1200px;
        left: 0;
        top: 0;
    }
`;
const Location = styled.button`
    cursor: pointer;
    position: absolute;
    right: 5%;
    bottom: 5%;
    width: 64px;
    height: 64px;
    background: #686ffc;
    box-shadow: 0px 2px 10px rgba(52, 57, 181, 0.36);
    border-radius: 50px;
    border: 0px;
    z-index: 10;
    position: fixed;

    @media screen and (max-width: 768px) {
        position: absolute;
        right: 5%;
        top: 15%;
    }
`;

const MyLocationPopupTitle = styled.div`
    font-size: 16px;
    color: #686ffc;
    padding: 5px;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0px 2px 10px rgba(52, 57, 181, 0.36);
    position: relative;
    left: -25px;
`;

const BikeStationName = styled.p`
    font-size: 16px;
    color: #131678;
`;
const BikeStationAddress = styled.p`
    font-size: 12px;
    color: #686ffc;
`;
const BikeStationBikeStatus = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-between;
    font-size: 12px;
    color: white;
    margin-top: 5px;
`;

const BikeStationBikeStatusNumber = styled.span`
    background-color: #686ffc;
    padding: 3px;
    border-radius: 5px;
`;

const MapBox = ({ bikeRoute }) => {
    const token = 'pk.eyJ1Ijoic2FuZHlsZWUiLCJhIjoiY2t3MGR4d2RsMHh4ZzJvbm9wb3dzNG9pbCJ9.kpIV-p6GnIpY0QIVGl0Svg';
    const dispatch = useDispatch();
    const { StationData } = useSelector((state) => state.bikeRoute);
    const { StationAvailable } = useSelector((state) => state.bikeRoute);
    const [view, setView] = useState({
        longitude: 121.5034981,
        latitude: 25.0107806,
        zoom: 13,
        bearing: 0,
        pitch: 0,
    });
    const [myLocation, setMyLocation] = useState({
        longitude: '',
        latitude: '',
        zoom: 13,
    });
    const [popInfo, setPopInfo] = useState(null);

    useEffect(() => {
        StationData.length === 0
            ? console.log('empty')
            : setView({
                  longitude: StationData[0].PositionLon,
                  latitude: StationData[0].PositionLat,
                  zoom: 15,
              });
    }, [StationData]);

    const handleSetLocation = () => {
        navigator.geolocation?.getCurrentPosition(
            (position) => {
                const longitude = position.coords.longitude;
                const latitude = position.coords.latitude;

                setView({ longitude: longitude, latitude: latitude, zoom: 16 });
                setMyLocation({ longitude: longitude, latitude: latitude, zoom: 16 });
                // 將經緯度當作參數傳給 getData 執行
                getNearByStationData(longitude, latitude);
            },
            (e) => {
                const errorCode = e.code;
                const errorMessage = e.message;
                console.error(errorCode);
                console.error(errorMessage);
            }
        );
    };

    const geojson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: bikeRoute,
                },
            },
        ],
    };

    const layerStyle = {
        id: 'lineLayer',
        type: 'line',
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
        },
        paint: {
            'line-color': '#131678',
            'line-width': 5,
        },
    };

    // 串接附近的自行車站資料
    const getNearByStationData = async (longitude, latitude) => {
        const nearByStation = await fetchNearByStation(longitude, latitude);
        const availableStation = await fetchAvailableBike(longitude, latitude);
        const stationRenderData = [];
        for (let i = 0; i < nearByStation.length; i++) {
            let item = {};
            item['StationID'] = nearByStation[i].StationID;
            item['StationName'] = nearByStation[i].StationName.Zh_tw;
            item['StationAddress'] = nearByStation[i].StationAddress.Zh_tw;
            item['PositionLon'] = nearByStation[i].StationPosition.PositionLon;
            item['PositionLat'] = nearByStation[i].StationPosition.PositionLat;
            for (let j = 0; j < availableStation.length; j++) {
                if (nearByStation[i].StationID === availableStation[j].StationID)
                    item['AvailableRentBikes'] = availableStation[j].AvailableRentBikes;
                item['AvailableReturnBikes'] = availableStation[j].AvailableReturnBikes;
            }
            stationRenderData.push(item);
        }
        dispatch(stationGetData(stationRenderData));
    };

    const pins = React.useMemo(
        () =>
            StationData.map((station, index) => (
                <Marker
                    key={`station.StationID-${index}`}
                    anchor="bottom"
                    longitude={station.PositionLon}
                    latitude={station.PositionLat}>
                    <MarkerItem
                        onClick={() =>
                            setPopInfo({
                                StationID: station.StationID,
                                StationName: station.StationName,
                                StationAddress: station.StationAddress,
                                PositionLon: station.PositionLon,
                                PositionLat: station.PositionLat,
                                AvailableRentBikes: station.AvailableRentBikes,
                                AvailableReturnBikes: station.AvailableReturnBikes,
                            })
                        }
                    />
                </Marker>
            )),
        [StationData]
    );

    useEffect(() => {
        console.log(`hi`);
    }, [view]);

    return (
        <MapWrapper>
            <Map
                id="baseMap"
                mapboxAccessToken={token}
                {...view}
                onMove={(evt) => setView(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/streets-v9">
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />

                {pins}
                {popInfo && (
                    <Popup
                        longitude={popInfo.PositionLon}
                        latitude={popInfo.PositionLat}
                        anchor="bottom"
                        closeOnClick={false}
                        onClose={() => setPopInfo(null)}>
                        <BikeStationName>{popInfo.StationName}</BikeStationName>
                        <BikeStationAddress>{popInfo.StationAddress}</BikeStationAddress>
                        <BikeStationBikeStatus>
                            <BikeStationBikeStatusNumber>
                                可租借 {popInfo.AvailableRentBikes}
                            </BikeStationBikeStatusNumber>
                            <BikeStationBikeStatusNumber>
                                可歸還 {popInfo.AvailableReturnBikes}
                            </BikeStationBikeStatusNumber>
                        </BikeStationBikeStatus>
                    </Popup>
                )}

                <Source id="my-data" type="geojson" data={geojson}>
                    <Layer {...layerStyle} />
                </Source>
            </Map>
            <Location onClick={() => handleSetLocation()}>
                <FontAwesomeIcon icon={faLocationArrow} style={{ color: 'white' }} />
            </Location>
        </MapWrapper>
    );
};

export default MapBox;
