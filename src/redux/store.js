import { configureStore } from '@reduxjs/toolkit';
import routeStatusReducer from './routeStatus';

export const store = configureStore({
    reducer: {
        routeStatus: routeStatusReducer,
    },
});
