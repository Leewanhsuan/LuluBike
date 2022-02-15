import { createSlice } from '@reduxjs/toolkit';

export const routeStatus = createSlice({
    name: 'routeStatus',
    initialState: {
        RouteStatusData: {
            Geometry: '',
            RouteName: '',
            AuthorityName: '',
            City: '',
            RoadSectionStart: '',
            RoadSectionEnd: '',
            CyclingLength: '',
        },
    },

    reducers: {
        RouteStatusData: (state, action) => {
            return {
                ...state,
                RouteStatusData: action.payload,
            };
        },
    },
});

export const { RouteStatusData } = routeStatus.actions;

export default routeStatus.reducer;
