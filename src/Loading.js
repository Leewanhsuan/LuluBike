import React from 'react';
import { BounceLoader } from 'react-spinners';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

const Loading = () => {
    return (
        <LoadingWrapper>
            <BounceLoader size={60} color={'#876d5a'} />
        </LoadingWrapper>
    );
};

export default Loading;
