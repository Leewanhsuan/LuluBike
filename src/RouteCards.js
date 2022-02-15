import { useEffect } from 'react';
import styled from 'styled-components';

const RouteCard = () => {
    const RouteCardWrapper = styled.div`
        width: 25%;
        position: absolute;
        top: 130px;
        display: flex;
        flex-direction: column;
        z-index: 10;
    `;

    const RouteCard = styled.div`
        position: relative;
        width: 100%;
        height: 250px;
        background: #eafbd3;
        box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.15);
        border-radius: 9px;
        top: 20px;
        left: 10%;
        padding-top: 20px;
        z-index: 15;
    `;

    const RouteTitle = styled.span`
        position: absolute;
        padding-left: 20px;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 140%;
        color: #0d5706;
    `;

    const RouteLength = styled.span`
        position: absolute;
        left: 25px;
        top: 80px;
        color: #0d5706;
        font-size: 16px;
        padding-top: 10px;
    `;

    return (
        <RouteCardWrapper>
            <RouteCard>
                <RouteTitle>臺中市大安濱海自行車道</RouteTitle>
                <RouteLength>
                    全長<span>26</span>公里
                </RouteLength>
                <span>
                    <span>
                        起點
                        <span>頂安海堤安心橋</span>
                    </span>
                    <span>
                        終點<span>台61縣西部濱海公路南下144公里</span>
                    </span>
                </span>
            </RouteCard>
        </RouteCardWrapper>
    );
};

export default RouteCard;
