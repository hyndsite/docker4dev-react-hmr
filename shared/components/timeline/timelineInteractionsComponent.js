"use strict";

import React            from "react";

const TimelineInteractionsComponent = ({filterCriteria, onStackOrientationChange}) => {

    return (
        <div className="timeline-info-bar_filter-criteria">
            <div className="filter-criteria">
                <label htmlFor="stackedOrientation">Stack Events?</label>
                <input
                    type="checkbox"
                    name="stackedOrientation"
                    checked={filterCriteria.stackOrientation}
                    onChange={onStackOrientationChange}
                />
            </div>
        </div>
    )
};

export default TimelineInteractionsComponent;