"use strict";

import wildcardRouter               from "../routes/wildcardRoute";
import timelineRouter               from "../routes/timelineRoutes";

export default function ConfigApiRoutes(app) {
    app.use(timelineRouter);
    app.use(wildcardRouter);
}