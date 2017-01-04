"use strict";

import React, {Component, PropTypes}            from "react";
import {Link}                                   from "react-router";

export default () => {
    return (
        <div className="timeline-event-container">
            <div className="timeline-event_details primary-bkgd">
                <div className="timeline-event_banner">
                    <div className="timeline-event_details-title">
                        <h2>//Demo</h2>
                    </div>
                </div>
                <div className="timeline-event_details-text">
                    <section>
                        <h3>Welcome</h3>
                        <p>
                            Welcome to Hacker's Hall. A site dedicated to capturing company data breaches and infamous
                            hacker's and their nefarious actions.
                        </p>
                    </section>
                    <section>
                        <h3>Timeline</h3>
                        <p>
                            The timeline is grouped into "Breaches" and "Hackers". Interact with the timeline to
                            navigate forward and back or zoom and out for a dynamic view of historical events. Options
                            exists
                            to filter the timeline's date range or orientation of the timeline events.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
};