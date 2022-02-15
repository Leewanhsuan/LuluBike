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
        routeStatusData: (state, action) => {
            return {
                ...state,
                RouteStatusData: action.payload,
            };
        },
    },
});

export const { routeStatusData } = routeStatus.actions;

export default routeStatus.reducer;
