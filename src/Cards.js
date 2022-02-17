import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Cards = () => {
    const [selectedRouteData, setSelectedRouteData] = useState([]);
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
        height: 250px;
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
        left: 12px;
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
        left: 25px;
        top: 80px;
        width: 80px;
        text-algin: center;
        line-height: 100%;
        color: #131678;
        font-size: 14px;
        background: #ffffff;
        border-radius: 17px;
    `;
    const RouteLength = styled.div`
        position: absolute;
        left: 25px;
        top: 80px;
        width: 120px;
        text-algin: center;
        line-height: 100%;
        color: #131678;
        font-size: 14px;
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

    const FoodCard = styled.div`
        position: relative;
        width: 100%;
        height: 280px;
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
    const FoodImage = styled.img`
        width: 96%;
        aspect-ratio: 370 / 162;
        position: relative;
        left: 2%;
        top: 0px;
        border-radius: 9px;
        flex: none;
        order: 0;
        align-self: stretch;
        flex-grow: 1;
        margin: 8px 0px;
        object-fit: cover;
    `;
    const FoodTitle = styled.div`
        position: relative;
        left: 10px;
        top: 0px;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        color: #854b05;
    `;
    const FoodSubtitle = styled.div``;
    const FoodDescription = styled.div`
        position: relative;
        left: 10px;
        color: #854b05;
        font-size: 14px;
        padding-bottom: 10px;
        display: wrap;
    `;

    const { RouteData } = useSelector((state) => state.bikeRoute);

    useEffect(() => {
        setSelectedRouteData({
            RouteName: RouteData.RouteName,
            CyclingLength: RouteData.CyclingLength,
            RoadSectionEnd: RouteData.RoadSectionEnd,
            RoadSectionStart: RouteData.RoadSectionStart,
        });
    }, [RouteData]);

    return (
        <CardsWrapper>
            {selectedRouteData.RouteName === '' ? (
                <DefaultRouteCard>哎呀空空的 🤭 快來選擇自行車道吧</DefaultRouteCard>
            ) : (
                <RouteCard>
                    <RouteSubtitle>自行車道</RouteSubtitle>
                    <RouteTitle>{selectedRouteData.RouteName}</RouteTitle>
                    <RouteLength>
                        <span>全長 {selectedRouteData.CyclingLength} 公里</span>
                        <span>起點 {selectedRouteData.RoadSectionEnd}</span>
                        <span>終點 {selectedRouteData.RoadSectionStart}</span>
                    </RouteLength>
                </RouteCard>
            )}

            <FoodCard>
                <FoodImage src={require(`../src/image/notfound.png`)} alt="photoNotFound"></FoodImage>
                <FoodTitle>我是餐廳</FoodTitle>
                <FoodDescription>
                    <p>地址：</p>
                    <p>電話：</p>
                    <p>開放時間：</p>
                </FoodDescription>
            </FoodCard>
            <FoodCard>
                <FoodImage src={require(`../src/image/notfound.png`)} alt="photoNotFound"></FoodImage>
                <FoodTitle>我是餐廳</FoodTitle>
                <FoodDescription>
                    <p>地址：</p>
                    <p>電話：</p>
                    <p>開放時間：</p>
                </FoodDescription>
            </FoodCard>
            <FoodCard>
                <FoodImage src={require(`../src/image/notfound.png`)} alt="photoNotFound"></FoodImage>
                <FoodTitle>我是餐廳</FoodTitle>
                <FoodDescription>
                    <p>地址：</p>
                    <p>電話：</p>
                    <p>開放時間：</p>
                </FoodDescription>
            </FoodCard>
        </CardsWrapper>
    );
};

export default Cards;
