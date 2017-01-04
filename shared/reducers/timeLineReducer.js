"use strict";

import * as types               from "../constants/actionTypes";
import {timelineState}          from "../constants/initialState";

export default function timelineReducer(state = timelineState, action) {
    switch (action.type) {
        case types.TIMELINEITEMS_REQUEST:
            return Object.assign({}, state, {
                isRequested: true
            });
        case types.TIMELINEITEMS_RECEIVED:
            return Object.assign({}, state, {
                timelineItems: action.timelineItems,
                isRequested: false
            });

        case types.TIMELINEITEMS_FAILURE:
            return Object.assign({}, state, {
                isRequested: false,
                errorMessage: action.errorMessage
            });

        case types.FILTERCRITERIA_UPDATE:
            return Object.assign({}, state, {
                filterCriteria: action.filterCriteria
            });

        default:
            return state;
    }
}
