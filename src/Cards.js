import { useEffect } from 'react';
import styled from 'styled-components';

const Cards = (props) => {
    // const routeData = props.data.item;
    const CardsWrapper = styled.div`
        position: absolute;
        width: 80%;
        top: 150px;
        z-index: 20;
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
        background: #ffffff;
        border-radius: 17px;
    `;

    const FoodCard = styled.div`
        position: relative;
        width: 100%;
        height: 250px;
        background: #fff9cc;
        box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.15);
        border-radius: 9px;
        top: 20px;
        margin-bottom: 20px;
        z-index: 15;
    `;

    const FoodTitle = styled.span`
        position: absolute;
        left: 12px;
        top: 40px;
        padding-left: 20px;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 140%;
        color: #854b05;
    `;

    const FoodSubtitle = styled.div`
        position: absolute;
        left: 25px;
        top: 80px;
        width: 80px;
        text-algin: center;
        line-height: 100%;
        color: #854b05;
        font-size: 14px;
        background: #ffffff;
        border-radius: 17px;
    `;

    return (
        <CardsWrapper>
            <RouteCard>
                {/* <RouteTitle>{routeData.RouteName}</RouteTitle>
                <RouteSubtitle>自行車道</RouteSubtitle>
                <RouteLength>全長 {routeData.CyclingLength} 公里</RouteLength>
                <span>
                    <span>起點 {routeData.RoadSectionEnd}</span>
                    <span>終點 {routeData.RoadSectionStart}</span>
                </span> */}
            </RouteCard>
            <FoodCard>
                <FoodTitle></FoodTitle>
                <FoodSubtitle></FoodSubtitle>
            </FoodCard>
        </CardsWrapper>
    );
};

export default Cards;
