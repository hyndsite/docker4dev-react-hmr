"use strict";

import React, { Component, PropTypes }      from "react";
import vis                                  from "vis";
import $                                    from "jquery";

class TimelineComponent extends Component {
    constructor(props) {
        super(props);
        this.timeline = null;
        this.itemSelected = this.itemSelected.bind(this);
        this.getTimelineOptions = this.getTimelineOptions.bind(this);
        this.activateTimelineItem = this.activateTimelineItem.bind(this);
    }

    componentDidMount() {
        const {timelineItems, timelineOptions, activeItemId = 0} = this.props;
        this.timeline = this.createTimeline();
        this.updateTimeline(timelineItems, timelineOptions);
        this.activateTimelineItem(activeItemId);
    }

    componentWillReceiveProps(nextProps) {
        const {timelineItems, timelineOptions, activeItemId} = nextProps;
        this.updateTimeline(timelineItems, timelineOptions);
        this.activateTimelineItem(activeItemId);
    }

    activateTimelineItem(id){
        const selector = `div[data-_id='${id}']`;
        $("#timeline").find(selector).addClass("active-item");
    }

    render() {
        return (
            <div id="timeline"></div>
        );
    }

    itemSelected(properties) {
        properties.event.preventDefault();
        $("#timeline").find("div[data-_id='2']").addClass("active");
    }

    updateTimeline(timelineItems, timelineOptions) {
        const data = new vis.DataSet(timelineItems);
        const options = this.getTimelineOptions(timelineOptions);

        this.timeline.setOptions(options);
        this.timeline.setItems(data);
    }



    getTimelineOptions(options) {

        var timelineOptions = {
            width: "100%",
            editable: false,
            type: "box",
            align: "center",
            stack: false,
            maxHeight: 300,
            margin: {
                item: 25
            },
            dataAttributes: ["_id"]
        };

        return Object.assign({}, timelineOptions, options);
    }

    createTimeline() {
        const container = document.getElementById("timeline");

        const timelineOptions = this.getTimelineOptions();

        var groupOptions = [
            {
                id: "breach",
                content: "Breaches",
                className: "timeline-group"
            },
            {
                id: "hacker",
                content: "Hackers",
                className: "timeline-group"
            }
        ];

        const timeline = new vis.Timeline(container, null, groupOptions, timelineOptions);
        timeline.on("select", this.itemSelected);
        return timeline;
    }
}

TimelineComponent.propTypes = {
    timelineItems: PropTypes.array,
    timelineEvent: PropTypes.object,
    router: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default TimelineComponent;
