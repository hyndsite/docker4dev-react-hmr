"use static";

import favicon                      from "serve-favicon";

import express                      from "express";

const staticResourcesConfig = (app) => {

    app.use(favicon("./shared/assets/images/favicon.ico"));
    express.static.mime.define({"text/css": ["css"]});
    express.static.mime.define({"application/x-font-woff": ["woff"]});
    express.static.mime.define({"application/x-font-ttf": ["ttf"]});
    express.static.mime.define({"application/vnd.ms-fontobject": ["eot"]});
    express.static.mime.define({"font/opentype": ["otf"]});
    express.static.mime.define({"application/javascript": ["js"]});
};

export default staticResourcesConfig;