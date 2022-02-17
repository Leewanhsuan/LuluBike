import styled from 'styled-components';
import { fetchNearbyScenicSpot, fetchRoutesData } from './Service';
import Cards from './Cards';
import { useEffect, useState } from 'react';
import { routeGetData, spotGetData } from './redux/bikeRoute';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
    const [routes, setRoutes] = useState([]);
    const [selectedCity, setSelectedCity] = useState('城市');
    const dispatch = useDispatch();
    const cityList = [
        {
            label: '臺北市',
            value: 'Taipei',
        },
        {
            label: '新北市',
            value: 'NewTaipei',
        },
        {
            label: '桃園市',
            value: 'Taoyuan',
        },
        {
            label: '臺中市',
            value: 'Tainan',
        },
        {
            label: '臺南市',
            value: 'Taichung',
        },
        {
            label: '高雄市',
            value: 'Kaohsiung',
        },
        {
            label: '基隆市',
            value: 'Keelung',
        },

        {
            label: '新竹縣',
            value: 'HsinchuCounty',
        },
        {
            label: '苗栗縣',
            value: 'ChanghuaCounty',
        },
        {
            label: '彰化縣',
            value: 'MiaoliCounty',
        },
        {
            label: '南投縣',
            value: 'NantouCounty',
        },

        {
            label: '雲林縣',
            value: 'YunlinCounty',
        },
        {
            label: '嘉義縣',
            value: 'ChiayiCounty',
        },
        {
            label: '嘉義市',
            value: 'Chiayi',
        },

        {
            label: '屏東縣',
            value: 'PingtungCounty',
        },
        {
            label: '宜蘭縣',
            value: 'YilanCounty',
        },
        {
            label: '花蓮縣',
            value: 'HualienCounty',
        },
        {
            label: '臺東縣',
            value: 'TaitungCounty',
        },
        {
            label: '金門縣',
            value: 'KinmenCounty',
        },
        {
            label: '澎湖縣',
            value: 'PenghuCounty',
        },
    ];

    const SideWrapper = styled.div`
        height: 1200px;
        width: 35%;
        position: relative;
        top: 0px;
        left: 0px;
        display: flex;
        justify-content: center;
        z-index: 5;

        @media screen and (max-width: 768px) {
            top: 400px;
            width: 100%;
        }
    `;
    const SideBarWrapper = styled.div`
        width: 30%;
        height: 56px;
        position: fixed;
        top: 0px;
        z-index: 30;
        background: #ffffff;
        box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.15);
        border-radius: 0px 0px 9px 9px;
        margin: auto 0;
        @media screen and (max-width: 768px) {
            width: 80%;
        }
    `;
    const SideTitle = styled.div`
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 56px;
        display: flex;
        align-items: flex-end;
        color: #2d2d2d;
        position: absolute;
        left: 35%;
        z-index: 15;
    `;

    const SideTitleLogo = styled.img`
        width: 48px;
        height: 48px;
        position: absolute;
        left: 15%;
        top: 5px;
    `;

    const SelectionSection = styled.div`
        display: flex;
        flex-direction: row;
        position: absolute;
        top: 80px;
        width: 80%;
        margin: auto 0;
        option {
            color: black;
            background: white;
            display: flex;
            white-space: pre;
            min-height: 20px;
            padding: 0px 2px 1px;
        }

        @media screen and (max-width: 768px) {
            position: fixed;
            top: 80px;
            width: 80%;
        }
    `;

    const CitySelection = styled.select`
        align-items: center;
        padding: 12px 16px;
        width: 35%;
        height: 48px;
        background: #ffffff;
        box-shadow: 0px 3px 8px rgba(75, 75, 75, 0.3);
        border-radius: 27px;
        border: 0px;
    `;
    const RouteSelection = styled.select`
        align-items: center;
        padding: 12px 16px;
        width: 55%;
        height: 48px;
        background: #ffffff;
        box-shadow: 0px 3px 8px rgba(75, 75, 75, 0.3);
        border-radius: 27px;
        border: 0px;
        margin-left: 20px;
        option {
            color: black;
            background: white;
            display: flex;
            white-space: pre;
            min-height: 20px;
            padding: 0px 2px 1px;
        }
    `;

    const setCityState = (event) => {
        let cityName = cityList.filter(function (value) {
            return value.value === event.target.value;
        });
        setSelectedCity(cityName[0].label);

        fetchRoutesData(event.target.value).then((result) => {
            result = result.map((item) => {
                return { item };
            });
            setRoutes(result);
        });
    };

    const setFilteredRoute = async (event) => {
        const selectedRoute = routes[event.target.value];
        console.log(routes[event.target.value], 'test');
        dispatch(routeGetData(selectedRoute.item));
        const locationArray = selectedRoute.item.Geometry.match(/[^MULTILINESTRING+^\(+^\+^ ),]+/g);
        const routeLongitude = locationArray.slice(0, 1);
        const routeLatitude = locationArray.slice(1, 2);

        fetchNearbyScenicSpot(routeLongitude, routeLatitude).then((result) => {
            result = result.map((item) => {
                return { item };
            });
            console.log(result, 'result');
            dispatch(spotGetData(result));
        });
    };

    const geojson = {
        type: 'FeatureCollection',
        features: [{ type: 'Feature', geometry: { type: 'Point', coordinates: [-122.4, 37.8] } }],
    };

    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': '#007cbf',
        },
    };

    return (
        <SideWrapper>
            <SideBarWrapper>
                <SideTitleLogo src={require(`../src/image/lululogo.png`)} alt="LuluLogo" />
                <SideTitle>自行車與周邊景點平台</SideTitle>
            </SideBarWrapper>
            <SelectionSection>
                <CitySelection onChange={(event) => setCityState(event)}>
                    <option value={selectedCity}>{selectedCity}</option>
                    {cityList.map((option, index) => (
                        <option value={option.value} key={index}>
                            {option.label}
                        </option>
                    ))}
                </CitySelection>
                <RouteSelection onChange={(event) => setFilteredRoute(event)}>
                    <option>請選擇城市</option>
                    {routes.map((route, index) => (
                        <option value={index} key={index}>
                            {route.item.RouteName}
                        </option>
                    ))}
                </RouteSelection>
            </SelectionSection>
            <Cards />
        </SideWrapper>
    );
};

export default Sidebar;
