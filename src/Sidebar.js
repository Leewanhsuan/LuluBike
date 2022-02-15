import styled from 'styled-components';

const Sidebar = () => {
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

    return (
        <SideWrapper>
            <SideTitleWrapper>
                <SideTitleLogo src={require(`../src/image/lululogo.png`)} alt="LuluLogo" />
                <SideTitle>自行車與周邊美食平台</SideTitle>
                <CitySelection></CitySelection>
                <RouteSelection></RouteSelection>
            </SideTitleWrapper>
        </SideWrapper>
    );
};

export default Sidebar;
