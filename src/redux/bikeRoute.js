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
        SpotsData: {
            City: '',
            Class1: '',
            Class2: '',
            OpenTime: '',
            Phone: '',
            Picture: { PictureUrl1: '', PictureDescription1: '' },
            Position: { PositionLon: '', PositionLat: '' },
            ScenicSpotID: '',
            ScenicSpotName: '',
            WebsiteUrl: '',
        },
        StationData: [],
    },
    reducers: {
        routeGetData: (state, action) => {
            return {
                ...state,
                RouteData: action.payload,
            };
        },
        spotGetData: (state, action) => {
            return {
                ...state,
                SpotsData: action.payload,
            };
        },
        stationGetData: (state, action) => {
            return {
                ...state,
                StationData: action.payload,
            };
        },
        stationBikeGetData: (state, action) => {
            return {
                ...state,
                StationAvailable: action.payload,
            };
        },
    },
});

export const { routeGetData, spotGetData, stationGetData, stationBikeGetData } = bikeRouteSlice.actions;

export default bikeRouteSlice.reducer;
