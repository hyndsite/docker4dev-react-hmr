"use strict";

import { combineReducers }      from "redux";
import { routerReducer }        from 'react-router-redux'
import timelineReducer          from "./timeLineReducer";

export default combineReducers({
    timelineState: timelineReducer,
    routing: routerReducer
});
