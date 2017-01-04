"use strict";

import React, {PropTypes, Component}            from "react";
import {Link}                                 from "react-router";

class AssociatedEvents extends Component {
    constructor(props) {
        super(props);

        this.getAssociatedEventType = this.getAssociatedEventType.bind(this);
    }

    getAssociatedEventType(associatedEvents) {
        if (associatedEvents && associatedEvents.length) {
            const hackers = associatedEvents.every((elem) => {
                return elem.group == "hacker";
            });

            const breaches = associatedEvents.every((elem) => {
                return elem.group == "breach";
            });

            return hackers ? "Hackers" : breaches ? "Breaches" : "Hackers and Breaches";
        }
    }

    render() {
        const {associatedEvents} = this.props;
        return (
            <div className="timeline-event_associated-events">
                <div className="timeline-event_associated-title">
                    <h2>Associated {this.getAssociatedEventType(associatedEvents)}</h2>
                </div>
                <div className="timeline-event_associated-event-details">
                {associatedEvents.map((event) => {
                    return (
                        <div key={event._id}>
                            <Link to={`timeline/${event._id}`}>
                                <div className="associated-events_details">
                                    <h3> {event.name} </h3>
                                    <div>
                                        {
                                            event.details && event.details.map((detail,i) => <p key={i}>{detail}</p>)
                                        }
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
                </div>
            </div>
        );
    }
}

AssociatedEvents.propTypes = {
    associatedEvents: PropTypes.array.isRequired
};

export default AssociatedEvents;