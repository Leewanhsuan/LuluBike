import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faPhone, faClock, faMapPin } from '@fortawesome/free-solid-svg-icons';

const Cards = () => {
    const [selectedRouteData, setSelectedRouteData] = useState([]);
    const [nearbySpotData, setNearbySpotData] = useState([]);

    const { RouteData } = useSelector((state) => state.bikeRoute);
    const { SpotData } = useSelector((state) => state.bikeRoute);

    useEffect(() => {
        setSelectedRouteData({
            RouteName: RouteData.RouteName,
            CyclingLength: RouteData.CyclingLength,
            RoadSectionEnd: RouteData.RoadSectionEnd,
            RoadSectionStart: RouteData.RoadSectionStart,
        });
    }, [RouteData]);
    console.log(RouteData, 'RouteData');

    /*此區為樣式設計*/
    const CardsWrapper = styled.div`
        position: absolute;
        width: 80%;
        top: 150px;
        z-index: 20;

        @media screen and (max-width: 768px) {
            width: 100%;
        }
    `;
    const RouteCard = styled.div`
        position: relative;
        width: 100%;
        height: 200px;
        background: #E0E2FE;
        box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.15);
        border-radius: 9px;
        top: 20px
        padding-top: 20px;
        z-index: 15;
        
        @media screen and (max-width: 768px) {
            width: 350px;
            margin-left: 3%;
        }
    `;
    const RouteTitle = styled.span`
        position: absolute;
        top: 40px;
        padding-left: 20px;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 140%;
        color: #131678;
    `;
    const RouteSubtitle = styled.div`
        position: absolute;
        top: 75px;
        left: 10px;
        width: 100px;
        border-radius: 17px;
        font-size: 12px;
        background: #131678;
        color: white;
        border-radius: 10px;
        text-align: center;
        margin-left: 10px;
        padding: 2px;
    `;
    const RouteLength = styled.div`
        position: absolute;
        left: 5%;
        top: 120px;
        text-algin: center;
        line-height: 100%;
        color: #131678;
        font-size: 14px;
        background: white;
        width: 90%;
        height: 30%;
        border-radius: 5px;
        display: flex;
    `;

    const RouteLengthText = styled.p`
        margin: auto;
    `;

    const DefaultRouteCard = styled.div`
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #686ffc;
        color: white;
        border-radius: 17px;
        @media screen and (max-width: 768px) {
            margin-left: 3%;
            width: 350px;
        }
    `;

    const SpotCard = styled.div`
        position: relative;
        width: 100%;
        height: 330px;
        background: #fff9cc;
        box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.15);
        border-radius: 9px;
        top: 20px;
        margin-bottom: 20px;
        z-index: 15;

        @media screen and (max-width: 768px) {
            width: 350px;
            margin-left: 3%;
        }
    `;
    const SpotImage = styled.img`
        width: 96%;
        aspect-ratio: 370 / 162;
        position: relative;
        left: 2%;
        top: 0px;
        border-radius: 5px;
        flex: none;
        order: 0;
        align-self: stretch;
        flex-grow: 1;
        margin: 8px 0px;
        object-fit: cover;
    `;
    const SpotTitle = styled.div`
        position: relative;
        left: 15px;
        top: 0px;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        color: #854b05;
        padding-bottom: 5px;
    `;

    const SpotDescription = styled.div`
        position: relative;
        left: 15px;
        top: 10px;
        color: #854b05;
        font-size: 14px;
        padding-bottom: 10px;
        display: wrap;
    `;

    const SpotClasses = styled.div`
        display: flex;
    `;

    const SpotClass = styled.div`
        font-size: 12px;
        width: 60px;
        background: #854b05;
        color: white;
        border-radius: 10px;
        text-align: center;
        margin-left: 10px;
        padding: 2px;
    `;

    // useEffect(() => {
    //     SpotData.map((data) => {
    //         setNearbySpotData({
    //             Class1: data.Class1,
    //             Class2: data.Class2,
    //             OpenTime: data.Class1.OpenTime,
    //             Phone: data.Phone,
    //             Picture: data.Picture,
    //             Position: data.Position,
    //             ScenicSpotID: data.ScenicSpotID,
    //             ScenicSpotName: data.ScenicSpotName,
    //             WebsiteUrl: data.WebsiteUrl,
    //         });
    //     });
    // }, [SpotData]);

    return (
        <CardsWrapper>
            {selectedRouteData.RouteName === '' ? (
                <DefaultRouteCard>哎呀空空的 🤭 快來選擇自行車道吧</DefaultRouteCard>
            ) : (
                <RouteCard>
                    <RouteSubtitle>全長 {selectedRouteData.CyclingLength} 公里</RouteSubtitle>
                    <RouteTitle>{selectedRouteData.RouteName}</RouteTitle>
                    <RouteLength>
                        <RouteLengthText>
                            <FontAwesomeIcon icon={faMapPin} style={{ color: '#131678', paddingRight: '10px' }} />
                            起點 {selectedRouteData.RoadSectionEnd}
                        </RouteLengthText>
                        <RouteLengthText>
                            <FontAwesomeIcon icon={faMapPin} style={{ color: '#131678', paddingRight: '10px' }} />
                            終點 {selectedRouteData.RoadSectionStart}
                        </RouteLengthText>
                    </RouteLength>
                </RouteCard>
            )}
            <SpotCard>
                <SpotImage src="https://www.travel.taipei/image/221908" alt="臺北植物園"></SpotImage>
                <SpotTitle>臺北植物園</SpotTitle>
                <SpotClasses>
                    <SpotClass>自然風景</SpotClass>
                    <SpotClass>都會公園</SpotClass>
                </SpotClasses>
                <SpotDescription>
                    <p>
                        <FontAwesomeIcon icon={faPhone} style={{ color: '#854b05', paddingRight: '5px' }} />
                        電話：886-2-23039978
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faClock} style={{ color: '#854b05', paddingRight: '5px' }} />
                        開放時間：週一至週日 5:30-22:00
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faUpRightFromSquare} style={{ color: '#854b05', paddingRight: '5px' }} />
                        <a href="https://tpbg.tfri.gov.tw/" target="_blank" rel="">
                            前往官網
                        </a>
                    </p>
                </SpotDescription>
            </SpotCard>
        </CardsWrapper>
    );
};

export default Cards;
