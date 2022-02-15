import styled from 'styled-components';
import { fetchRoutesData } from './Service';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { routeStatus } from './redux/routeStatus';
import { routeStatusData } from './redux/routeStatus';

const Sidebar = () => {
    const [routes, setRoutes] = useState([]);
    const [selectedCity, setSelectedCity] = useState('城市');
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
        width: ;
        background-color: gray;
    `;
    const SideTitleWrapper = styled.div`
        width: 80%;
        height: 56px;
        position: absolute;
        top: 0px;
        z-index: 10;
        background: #ffffff;
        box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.15);
        border-radius: 0px 0px 9px 9px;
        margin: auto 0;
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

    const CitySelection = styled.select`
        align-items: center;
        padding: 12px 16px;
        position: relative;
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
        position: relative;
        width: 45%;
        height: 48px;
        left: 5%;
        background: #ffffff;
        box-shadow: 0px 3px 8px rgba(75, 75, 75, 0.3);
        border-radius: 27px;
        border: 0px;
        option {
            color: black;
            background: white;
            display: flex;
            white-space: pre;
            min-height: 20px;
            padding: 0px 2px 1px;
        }
    `;

    const SelectionSection = styled.div`
        display: flex;
        flex-direction: row;
        position: relative;
        top: 80px;
        left: 7%;
        margin: auto 0;
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

    const setFilteredRoute = (event) => {
        console.log(event.target.value);
        let list = routes[event.target.value];
    };

    console.log(selectedCity, 'selectedCity');

    return (
        <SideWrapper>
            <SideTitleWrapper>
                <SideTitleLogo src={require(`../src/image/lululogo.png`)} alt="LuluLogo" />
                <SideTitle>自行車與周邊美食平台</SideTitle>
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
                        <option value="" hidden>
                            自行車道
                        </option>
                        {routes.map((route, index) => (
                            <option value={index} key={index}>
                                {route.item.RouteName}
                            </option>
                        ))}
                    </RouteSelection>
                </SelectionSection>
            </SideTitleWrapper>
        </SideWrapper>
    );
};

export default Sidebar;
