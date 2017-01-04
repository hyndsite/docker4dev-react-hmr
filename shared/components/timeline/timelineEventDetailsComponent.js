"use strict";

import React, {Component, PropTypes}            from "react";
import AssociatedEventDetails                   from "./timelineAssociatedEventsDetailsComponent";

class TimelineEventDetails extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {event, associatedEvents} = this.props.timelineEvent;
        return (
            <div className="timeline-event-container">
                <div className="timeline-event_details primary-bkgd">
                    <div className="timeline-event_banner">
                        <div className="timeline-event_details-title">
                            <h2>{event.name}</h2>
                        </div>
                    </div>
                    <div className="timeline-event_details-text">
                        {
                            event.details.map((d,i) =>
                                <p key={i}>{d}</p>
                            )
                        }
                    </div>
                    {event.sources && event.sources.length > 0 &&
                        <div className="timeline-event_sources">
                            <ul>
                                <div>
                                    <span>sources:&nbsp;</span>
                                </div>

                                {event.sources.map((source, i) => {
                                    return (
                                        <div key={i}>
                                            <li>
                                                <a href={source.link}>{source.name}</a>
                                            </li>
                                        </div>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                </div>
                {associatedEvents && associatedEvents.length > 0 &&
                <AssociatedEventDetails associatedEvents={associatedEvents}/>
                }
            </div>

        )
    }
}

TimelineEventDetails.propTypes = {
    timelineEvent: PropTypes.object.isRequired
};

export default TimelineEventDetails;
