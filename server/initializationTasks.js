"use strict";
import {getTimelineItemModel}  from "./data_access/modelFactory";
import timelineItems           from "../data/timelineItems-seed";

export const initialize = async() => {
    try {
        await seedTimelineEvents();
    } catch (err) {
        throw err;
    }
};

const seedTimelineEvents = async() => {
    const TimelineItem = await getTimelineItemModel();
    const timelineItemsExists = await TimelineItem.count({});

    try {
        if (!timelineItemsExists) {
            let timelineItemModels = timelineItems.map(function (i) {
                i.details = i.details.split("\n\n");
                return new TimelineItem(i);
            });

            await TimelineItem.insertMany(timelineItemModels);
        }
    } catch (err) {
        throw err;
    }
};