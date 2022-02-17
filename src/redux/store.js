import { configureStore } from '@reduxjs/toolkit';
import bikeRouteReducer from './bikeRoute';

export default configureStore({
    reducer: {
        bikeRoute: bikeRouteReducer,
    },
});
