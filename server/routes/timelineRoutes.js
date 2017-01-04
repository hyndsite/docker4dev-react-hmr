"use strict";

// ====================
//   /api/timeline
// ====================

/* eslint-disable no-console */

import {Router}                     from "express";
import timelineSeedItems                from "../data/timelineItems-seed.js";
import chalk                        from "chalk";

const timelineRouter = Router();
const items = timelineSeedItems.map(function (item) {
    item.details = item.details.split("\n\n");
    return item;
});

timelineRouter.route("/api/timeline(/:id/)?")
    .get(function (req, res) {
        try {
            res.json({timelineItems: items});
        } catch (error) {
            console.log(chalk.red(error));
            res.status(500).send("There was an error retrieving timeline items.  Please try again later");
        }
    });

export default timelineRouter;

