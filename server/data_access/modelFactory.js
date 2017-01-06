"use strict";

import {TimelineItemSchema}         from "./schemas";
import connectionProvider           from "./connectionProvider";
import {serverSettings}             from "../settings";

export const getTimelineItemModel = async function () {
    try {
        const conn = await connectionProvider(serverSettings.serverUrl, serverSettings.database);
        return conn.model("TimelineItem", TimelineItemSchema);
    } catch (err) {
        throw err;
    }
};