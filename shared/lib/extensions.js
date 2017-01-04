"use strict";

export default (function () {
    Date.prototype.addDays = function (days) {
        const date = new Date(this.valueOf());
        return date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    };

    Date.prototype.subtractDays = function(days) {
        const date = new Date(this.valueOf());
        return date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));
    };
})();