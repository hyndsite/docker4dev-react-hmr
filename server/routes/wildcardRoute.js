"use strict";

import React                                from "react";
import {Router}                             from "express";
import createLocation                       from "history/lib/createLocation";
import ReactDOMServer                       from "react-dom/server";
import {RouterContext, match}               from "react-router";
import {Provider}                           from "react-redux";
import thunk                                from "redux-thunk";
import reducers                             from "../../shared/reducers";
import routes                               from "../../shared/routes";
import fetchComponentState                  from "../../shared/lib/fetchComponentState";
import {
    createStore,
    applyMiddleware
}                                           from "redux";
import chalk                                from "chalk";

const wildcardRouter = Router();

wildcardRouter.route("*")
    .get(function (req, res) {
        const store = createStore(reducers, {}, applyMiddleware(thunk));
        const location = createLocation(req.url);

        match({
            routes, location
        }, (err, redirectLocation, renderProps) => {
            if (err) {
                return res.status(500).end("Internal Server Error Occurred");
            }

            if (!renderProps) return res.status(404).end("Not Found");

            function renderView() {
                const InitialView = (
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );

                const componentHTML = ReactDOMServer.renderToString(InitialView);
                const initialState = store.getState();

                const HTML = `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="utf-8">
                    <base href="/">   
                    <script>
                        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                    </script>
                    <meta charset="UTF-8">
                    <title>Hacker's Hall</title>
                    <link rel="shortcut icon" href="favicon.ico?ver=1" />
                    <link rel="stylesheet" href="/styles.css" type="text/css">             
                  </head>
                  <body>
                    <div id="app">${componentHTML}</div>
                    <script src="/bundle.js"></script>
                  </body>
                </html>
            `;
                return HTML;
            }
            
            fetchComponentState(store.dispatch, renderProps.components, renderProps.params)
                .then(renderView)
                .then(html => {
                    res.set({"Content-type": "text/html"}).send(html);
                })
                .catch(err => res.end(err.message));
        });
    });

export default wildcardRouter;