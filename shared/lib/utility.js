"use strict";

export function getMinimumDate(dates) {
    if (!dates.length) return;
    return dates.reduce(function (a, b) {
        return a < b ? a : b;
    });
}

export function getMaximumDate(dates) {
    if (!dates.length) return;
    return dates.reduce(function (a, b) {
        return a > b ? a : b;
    });
}

export function getPercentageOfTextRoundedToNextFullWord(text, perc) {
    const textToManipulate = text || "";
    const percentage = perc > 0 < 100 ? perc : 100;
    const subText = textToManipulate.substr(0, ((percentage / 100) * textToManipulate.length));

    return subText.substr(0, Math.min(subText.length, subText.lastIndexOf(" ")));
}

