import styled from 'styled-components';
import './index.css';
import * as React from 'react';
import InteractiveMap, { Popup, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faLocationPin, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { fetchNearByStation, fetchAvailableBike } from './Service';
import { useSelector } from 'react-redux';

const MapBox = () => {
    const [nearByStation, setNearByStation] = useState([]);
    const [stationData, setStationData] = useState([]);
    const [availableStationData, setAvailableStationData] = useState([]);
    const { StationData } = useSelector((state) => state.bikeRoute);
    const [view, setView] = useState({
        longitude: 121.5034981,
        latitude: 25.0107806,
        zoom: 13,
    });
    const [myLocation, setMyLocation] = useState({
        longitude: '',
        latitude: '',
        zoom: 13,
    });
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        setNearByStation({
            // StationID: StationData.StationID,
            // StationName: StationData.StationName,
            // StationPosition: StationData.StationPosition,
            // StationAddress: StationData.StationAddress,
        });
    }, [StationData]);

    // console.log(nearByStation);

    const MarkerImage = styled.image`
        width: 20px;
    `;

    const MapWrapper = styled.div`
        height: 1280px;
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
    const BikeStationBikeStatus = styled.p``;

    const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2FuZHlsZWUiLCJhIjoiY2t3MGR4d2RsMHh4ZzJvbm9wb3dzNG9pbCJ9.kpIV-p6GnIpY0QIVGl0Svg';

    const handleSetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // 取得目前定位經緯度，並重新設定 view 的位置
                    const longitude = position.coords.longitude;
                    const latitude = position.coords.latitude;
                    console.log(longitude, latitude);
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
        }
    };

    // 串接附近的自行車租借站位資料
    const getNearByStationData = async (longitude, latitude) => {
        const nearByStation = await fetchNearByStation(longitude, latitude);
        setStationData(nearByStation);
        const availableStation = await fetchAvailableBike(longitude, latitude);
        console.log(availableStation, 'availableStation');
        setAvailableStationData(availableStation);
    };

    return (
        <MapWrapper>
            <InteractiveMap
                onClick={() => {
                    setShowPopup(true);
                }}
                className="Map"
                {...view}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={MAPBOX_TOKEN}>
                {stationData.map((station) => (
                    <Marker
                        key={station.StationID}
                        longitude={station.StationPosition.PositionLon}
                        latitude={station.StationPosition.PositionLat}>
                        <FontAwesomeIcon icon={faLocationPin} size="3x" style={{ color: '#686ffc' }} />
                        {showPopup && (
                            <Popup
                                key={station.StationID}
                                longitude={station.StationPosition.PositionLon}
                                latitude={station.StationPosition.PositionLat}
                                anchor="bottom"
                                onClose={() => setShowPopup(false)}>
                                <BikeStationName>{station.StationName.Zh_tw}</BikeStationName>
                                <BikeStationAddress>{station.StationAddress.Zh_tw}</BikeStationAddress>
                                <BikeStationBikeStatus></BikeStationBikeStatus>
                            </Popup>
                        )}
                    </Marker>
                ))}
                {
                    <Marker key="myLocation" longitude={myLocation.longitude} latitude={myLocation.latitude}>
                        <FontAwesomeIcon icon={faMapPin} size="3x" style={{ color: '#686ffc' }} />
                        <MyLocationPopupTitle>當前位置</MyLocationPopupTitle>
                    </Marker>
                }
            </InteractiveMap>
            <Location onClick={() => handleSetLocation()}>
                <FontAwesomeIcon icon={faLocationArrow} style={{ color: 'white' }} />
            </Location>
        </MapWrapper>
    );
};

export default MapBox;
