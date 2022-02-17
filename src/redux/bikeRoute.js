import { createSlice } from '@reduxjs/toolkit';

export const bikeRouteSlice = createSlice({
    name: 'bikeRoute',
    initialState: {
        RouteData: {
            AuthorityName: '',
            City: '',
            CityCode: '',
            CyclingLength: '',
            FinishedTime: '',
            Geometry: '',
            RoadSectionEnd: '',
            RoadSectionStart: '',
            RouteName: '',
            Town: '',
            UpdateTime: '',
        },
        FoodData: {
            title: '',
            image: '',
            tag1: '',
            tag2: '',
            dateStart: '',
            dateEnd: '',
            description: '',
            ctaText: '',
            ctaLink: '',
        },
        StationData: {
            title: '',
            image: '',
            tag1: '',
            tag2: '',
            dateStart: '',
            dateEnd: '',
            description: '',
            ctaText: '',
            ctaLink: '',
        },
    },
    reducers: {
        routeGetData: (state, action) => {
            return {
                ...state,
                RouteData: action.payload,
            };
        },
        foodGetData: (state, action) => {
            return {
                ...state,
                FoodData: action.payload,
            };
        },
        StationGetData: (state, action) => {
            return {
                ...state,
                StationData: action.payload,
            };
        },
    },
});

export const { routeGetData, foodGetData, StationGetData } = bikeRouteSlice.actions;

export default bikeRouteSlice.reducer;
