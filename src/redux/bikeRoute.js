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
        StationData: {
            StationID: '',
            StationName: { Zh_tw: '', En: '' },
            StationPosition: { PositionLon: '', PositionLat: '' },
            StationAddress: { Zh_tw: '', En: '' },
        },
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
    },
});

export const { routeGetData, spotGetData, stationGetData } = bikeRouteSlice.actions;

export default bikeRouteSlice.reducer;
