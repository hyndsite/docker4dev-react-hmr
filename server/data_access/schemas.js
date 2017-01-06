"use strict";

import mongoose         from "mongoose";

const Schema = mongoose.Schema;

export const TimelineItemSchema = new Schema({
    _id: Number,
    name: String,
    short: String,
    group: String,
    content: String,
    start: Date,
    end: Date,
    timelineEvents: Array,
    details: [],
    records: {
        type: Number,
        default: 0
    },
    breachType: String,
    sources: Array,
    targets: String,
    affiliations: String
});
