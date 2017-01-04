"use strict";

require("../shared/lib/extensions");
import React                                        from "react";
import { render }                                   from "react-dom";
import { Provider }                                 from "react-redux";
import { Router,
         browserHistory }                           from "react-router";
import routes                                       from "../shared/routes";
import reducers                                     from "../shared/reducers";
import thunk                                        from "redux-thunk";
import { createStore,
         applyMiddleware }                          from "redux";
import { routerMiddleware, syncHistoryWithStore }   from "react-router-redux";

import "../shared/assets/styles/styles.scss";
import "../shared/assets/styles/toastr.min.css";

const initialState = window.__INITIAL_STATE__;
const store = createStore(reducers, initialState, applyMiddleware(thunk, routerMiddleware(browserHistory)));
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router children={routes} history={history}/>
    </Provider>,
    document.getElementById("app"));
