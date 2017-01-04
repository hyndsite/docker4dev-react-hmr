"use strict";

import React, {PropTypes}               from "react";
import {bindActionCreators}             from "redux";
import * as timelineActions             from "../../actions/timelineActions";
import Timeline                         from "./timelineComponent";
import {connect}                        from "react-redux";
import {browserHistory}                 from "react-router";
import TimelineEventDetails             from "./timelineEventDetailsComponent";
import $                                from "jquery";
import TimelineInteractionsComponent    from "./timelineInteractionsComponent";
import TimelineEventWelcome             from "./timelineEventWelcomeComponent";
import {getMinimumDate, getMaximumDate} from "../../lib/utility";


class TimelineContainer extends React.Component {
    constructor(props) {
        super(props);

        this.routeClickHandler = this.routeClickHandler.bind(this);
        this.setStartDateState = this.setStartDateState.bind(this);
        this.setEndDateState = this.setEndDateState.bind(this);
        this.onStackOrientationChange = this.onStackOrientationChange.bind(this);
        this.transformTimelineEvents = this.transformTimelineEvents.bind(this);
        this.getTimelineDateRange = this.getTimelineDateRange.bind(this);
    }

    // ====================
    //   react hooks
    // ====================

    componentDidMount() {
        const {timelineItems, timelineActions} = this.props;
        if (!timelineItems || !timelineItems.length) {
            timelineActions.getTimelineItems();
        }
        this.routeClickHandler();
    }

    static fetchData = [
        timelineActions.getTimelineItems
    ];

    render() {
        const {filterCriteria, timelineItems = []} = this.props;
        const {event = undefined} = this.props.params;
        const historyPoint = this.getTimelineEvent(event, timelineItems);
        const augmentedTimelineItems = this.transformTimelineEvents(timelineItems);
        const timelineDates = this.getTimelineDateRange(historyPoint, filterCriteria);

        const options = Object.assign({}, timelineDates, {
            stack: filterCriteria.stackOrientation,
        });

        return (
            <div className="timeline-container">
                <div className="timeline-events">
                    {
                        !event &&
                        <TimelineEventWelcome/>
                    }
                    {
                        event &&
                        <TimelineEventDetails timelineEvent={ historyPoint } />
                    }
                </div>
                <div className="timeline">
                    <div className="timeline-info-bar">
                        <TimelineInteractionsComponent
                            filterCriteria={filterCriteria}
                            onStartDateChange={this.setStartDateState}
                            onEndDateChange={this.setEndDateState}
                            onStackOrientationChange={this.onStackOrientationChange}
                        />
                    </div>
                    <Timeline timelineItems={augmentedTimelineItems} timelineEvent={ historyPoint }
                              timelineOptions={options}
                              activeItemId={historyPoint.event._id}
                    />
                </div>
            </div>
        );
    }


    // ========================
    //   react state handling
    // ========================

    setStartDateState(date) {
        let {filterCriteria, timelineActions} = this.props;
        filterCriteria.startDate = date.toString();
        timelineActions.filterTimelineItemsByDates(filterCriteria.startDate, filterCriteria.endDate);
        return this.setState({filterCriteria});
    }

    setEndDateState(date) {
        let {filterCriteria, timelineActions} = this.props;
        filterCriteria.endDate = date.toString();
        timelineActions.filterTimelineItemsByDates(filterCriteria.startDate, filterCriteria.endDate);
        return this.setState({filterCriteria});
    }

    onStackOrientationChange() {
        const {filterCriteria, timelineActions} = this.props;
        filterCriteria.stackOrientation = !filterCriteria.stackOrientation;
        timelineActions.updateFilterCriteria(filterCriteria);
        return this.setState({filterCriteria});
    }

    routeClickHandler() {
        $("#timeline").on("click", "a", function (event) {
            event.preventDefault();
            browserHistory.push(this.pathname);
        });
    }

    // ========================
    //   timeline functions
    // ========================

    getTimelineEvent(id, events) {
        let eventDetails = {event: {}, associatedEvents: []};
        const event = events.find(item => item._id == id);

        if (!event) {
            return eventDetails;
        }

        const associatedEvents = event.timelineEvents.map(ae => {
            return events.find(event => event._id == ae);
        });

        return Object.assign({}, eventDetails, {
            event,
            associatedEvents: associatedEvents || []
        });
    }

    transformTimelineEvents(items) {

        return items.map(item => {
            const primaryDetails = item.group == "breach"
                ? `# Records: ${item.records.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                : `AF: ${item.affiliations ? item.affiliations : "unknown"}`;

            const secondaryDetails = item.group == "breach"
                ? `Type: ${item.breachType}`
                : `Targets: ${item.targets}`;

            item.className = "timeline-event";
            item.title = `${item.details[0].substring(0, 35)}...`;
            item.content = `
                        <a class="timeline-event_link" href="timeline/${item._id}">
                                <div class="timeline-event_link-heading">
                                    <h5>${item.name}</h5>
                                </div>
                                <div class="timeline-event_link-info">
                                    <div class="timeline-event_link-info-detail">

                                        <span>${primaryDetails}</span>
                                    </div>
                                    <div class="timeline-event_link-info-detail"><span>${secondaryDetails}</span></div>
                                </div>
                        </a>
                        `;

            return item;
        });
    }

    getTimelineDateRange(timelineEvent = {}, filterCriteria) {
        const initStartDate = filterCriteria.startDate ? new Date(filterCriteria.startDate) : new Date();
        const initEndDate = filterCriteria.endDate ? new Date(filterCriteria.endDate) : new Date();
        const minDate = new Date(initStartDate);
        const maxDate = new Date(initEndDate);

        const startDate = (timelineEvent.event && timelineEvent.event.start)
            ? new Date(timelineEvent.event.start).subtractDays(180)
            : new Date(initStartDate);

        const endDate = (timelineEvent.event && timelineEvent.event.end)
            ? new Date(timelineEvent.event.end).addDays(180)
            : new Date(initEndDate);

        return {
            min: minDate,
            max: maxDate,
            start: startDate,
            end: endDate,
        }
    }
}

Timeline.propTypes = {
    timelineItems: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    const {timelineState: {timelineItems, filterCriteria}} = state;

    if ((!filterCriteria.startDate && !filterCriteria.endDate) && timelineItems.length) {
        const startDates = timelineItems.map(i => new Date(i.start));
        const endDates = timelineItems.map(i => new Date(i.end));
        filterCriteria.startDate = getMinimumDate(startDates);
        filterCriteria.endDate = getMaximumDate(endDates);
    }

    return {
        timelineItems:timelineItems,
        filterCriteria,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        timelineActions: bindActionCreators(timelineActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer);
