import styled from 'styled-components';
import { fetchAvailableBike, fetchNearbyScenicSpot, fetchNearByStation, fetchRoutesData } from './Service';
import Cards from './Cards';
import { useEffect, useState } from 'react';
import { routeGetData, spotGetData, stationGetData, stationBikeGetData } from './redux/bikeRoute';
import { useDispatch } from 'react-redux';

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
    font-size: 18px;
    line-height: 56px;
    display: flex;
    align-items: flex-end;
    color: #2d2d2d;
    position: absolute;
    left: 30%;
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

const Sidebar = ({ setBikeRoute }) => {
    const [routes, setRoutes] = useState([]);
    const [selectedCity, setSelectedCity] = useState('??????');
    const dispatch = useDispatch();
    const cityList = [
        {
            label: '?????????',
            value: 'Taipei',
        },
        {
            label: '?????????',
            value: 'NewTaipei',
        },
        {
            label: '?????????',
            value: 'Taoyuan',
        },
        {
            label: '?????????',
            value: 'Tainan',
        },
        {
            label: '?????????',
            value: 'Taichung',
        },
        {
            label: '?????????',
            value: 'Kaohsiung',
        },
        {
            label: '?????????',
            value: 'Keelung',
        },

        {
            label: '?????????',
            value: 'HsinchuCounty',
        },
        {
            label: '?????????',
            value: 'ChanghuaCounty',
        },
        {
            label: '?????????',
            value: 'MiaoliCounty',
        },
        {
            label: '?????????',
            value: 'NantouCounty',
        },

        {
            label: '?????????',
            value: 'YunlinCounty',
        },
        {
            label: '?????????',
            value: 'ChiayiCounty',
        },
        {
            label: '?????????',
            value: 'Chiayi',
        },

        {
            label: '?????????',
            value: 'PingtungCounty',
        },
        {
            label: '?????????',
            value: 'YilanCounty',
        },
        {
            label: '?????????',
            value: 'HualienCounty',
        },
        {
            label: '?????????',
            value: 'TaitungCounty',
        },
        {
            label: '?????????',
            value: 'KinmenCounty',
        },
        {
            label: '?????????',
            value: 'PenghuCounty',
        },
    ];

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
        dispatch(routeGetData(selectedRoute.item));
        const locationArray = selectedRoute.item.Geometry.match(/[^MULTILINESTRING+^\(+^\+^ ),]+/g);
        const routeLongitude = locationArray.slice(0, 1);
        const routeLatitude = locationArray.slice(1, 2);
        const nearByStation = await fetchNearByStation(routeLongitude, routeLatitude);
        const availableStation = await fetchAvailableBike(routeLongitude, routeLatitude);
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

        await fetchNearbyScenicSpot(routeLongitude, routeLatitude).then((result) => {
            result = result.map((item) => {
                return { item };
            });
            dispatch(spotGetData(result));
        });

        let newBikeRoute = [];
        for (let i = 0; i < locationArray.length; i += 2) {
            newBikeRoute.push([locationArray[i], locationArray[i + 1]]);
        }
        setBikeRoute(newBikeRoute);
    };

    return (
        <SideWrapper>
            <SideBarWrapper>
                <SideTitleLogo src={require(`../src/image/lululogo.png`)} alt="LuluLogo" />
                <SideTitle>??????????????????????????????</SideTitle>
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
                    <option>???????????????</option>
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
