"use strict";
import * as types               from "../constants/actionTypes";
import timelineApi              from "../api-services/timelineApi";

function timelineItemsRequested() {
    return {
        type: types.TIMELINEITEMS_REQUEST,
        isRequested: true
    }
}

function timelineItemsReceived(timelineItems) {
    return {
        type: types.TIMELINEITEMS_RECEIVED,
        isRequested: false,
        timelineItems
    }
}

function timelineItemsRequestFailure(errorMessage) {
    return {
        type: types.TIMELINEITEMS_FAILURE,
        isRequested: false,
        errorMessage
    }
}

function filterCriteriaUpdate(filterCriteria){
    return {
        type: types.FILTERCRITERIA_UPDATE,
        filterCriteria
    }
}

export function getTimelineItems() {
    return async function (dispatch) {
        dispatch(timelineItemsRequested());
        try {
            const items = await timelineApi.getAllTimeLineItems();
            dispatch(timelineItemsReceived(items));

        } catch (error) {
            dispatch(timelineItemsRequestFailure(error));
        }
    }
}

export function filterTimelineItemsByDates(startDate, endDate) {
    return async function(dispatch) {
        dispatch(timelineItemsRequested());
        try {
            const items = await timelineApi.filterTimelineItemsByDates(startDate, endDate);
            dispatch(timelineItemsReceived(items));
        } catch (error) {
            dispatch(timelineItemsRequestFailure(error));
        }
    }
}

export function updateFilterCriteria(filterCriteria) {
    return dispatch => {
        dispatch(filterCriteriaUpdate(filterCriteria));
    }
}