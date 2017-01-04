"use strict";

import * as axios               from "axios";
import appSettings              from "../constants/applicationSettings";

export default {
    getAllTimeLineItems: function () {
        const client = axios.create({baseURL: appSettings.serverPath});

        return client.get("/api/timeline")
            .then(function (res) {
                return res.data["timelineItems"] || [];
            })
            .catch(function (err) {
                return [];
            });
    },
    filterTimelineItemsByDates: function (startDate, endDate) {
        const client = axios.create({baseURL: appSettings.serverPath});

        return client.get("/api/timeline", {
            params: {
                startDate: startDate,
                endDate: endDate
            }
        })
            .then(function (res) {
                return res.data["timelineItems"] || [];
            })
            .catch(function (err) {
                return [];
            });
    }


};
