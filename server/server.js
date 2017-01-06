"use strict";
/* eslint-disable no-console */

import express, {Router}        from "express";
import bodyParser               from "body-parser";
import webpack                  from "webpack";
import apiRouteConfig           from "./configurations/apiRoutesConfig";
import staticResourcesConfig    from "./configurations/staticResourcesConfig";
import webpackConfig            from "../webpack.config.dev.js";
import open                     from "open";
import React                    from "react";
import chalk                    from "chalk";
import path                     from "path";
import {initialize}             from "./initializationTasks";

const host = "localhost";
const port = 7000;
const app = express();
const compiler = webpack(webpackConfig);

staticResourcesConfig(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== "production") {
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
    }));
    app.use(require("webpack-hot-middleware")(compiler));
} else {
    app.use("/", express.static(path.join(__dirname, "../public")));
}

apiRouteConfig(app);

initialize()
    .then(function () {
        app.listen(port, function (err) {
            if (err) {
                console.log(chalk.red(err));
            } else {
                console.log(chalk.blue(`Express server listening at http://${host}:${port}`));
                open(`http://${host}:${port}`);
            }
        });
    })
    .catch(function (err) {
        console.log(err);
    });
