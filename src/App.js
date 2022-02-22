import { useState } from 'react';
import './App.css';
import MapBox from './MapBox';
import Sidebar from './Sidebar';

const App = () => {
    const [bikeRoute, setBikeRoute] = useState([]);

    return (
        <>
            <MapBox bikeRoute={bikeRoute} />
            <Sidebar setBikeRoute={setBikeRoute} />
        </>
    );
};

export default App;
