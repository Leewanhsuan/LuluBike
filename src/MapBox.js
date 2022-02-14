import styled from 'styled-components';
import * as React from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import useGeolocation from 'react-navigator-geolocation';

const MapBox = () => {
    const [view, setView] = useState({
        longitude: 121.5034981,
        latitude: 25.0107806,
        zoom: 13,
    });
    // const { isEnabled, coords } = useGeolocation();
    const MapWrapper = styled.div`
        height: 1200px;
        width: 100vw;
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
    `;
    const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2FuZHlsZWUiLCJhIjoiY2t3MGR4d2RsMHh4ZzJvbm9wb3dzNG9pbCJ9.kpIV-p6GnIpY0QIVGl0Svg';

    const handleSetLocation = () => {
        console.log('click');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // 取得目前定位經緯度，並重新設定 view 的位置
                    const longitude = position.coords.longitude;
                    const latitude = position.coords.latitude;
                    console.log(longitude, latitude);
                    setView({ longitude: longitude, latitude: latitude, zoom: 13 });
                    // 將經緯度當作參數傳給 getData 執行
                    // getStationData(longitude, latitude);
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

    return (
        <MapWrapper>
            <Map
                className="Map"
                initialViewState={{
                    longitude: view.longitude,
                    latitude: view.latitude,
                    zoom: view.zoom,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
            />
            <Location onClick={() => handleSetLocation()}>
                <FontAwesomeIcon icon={faLocationArrow} style={{ color: 'white' }} />
            </Location>
        </MapWrapper>
    );
};

export default MapBox;
