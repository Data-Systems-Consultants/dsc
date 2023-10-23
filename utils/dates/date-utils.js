"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = exports.getLocalDate = void 0;
var fns = require("date-fns");
var toLocalDate = function (date) {
    var tz = date.getTimezoneOffset();
    date.setHours(date.getHours() - tz / 60);
    return date;
};
var stringToDate = function (dateString) {
    if (dateString.trim().length < 11) {
        dateString += " 00:00:00";
    }
    if (dateString.indexOf("Z") !== -1) {
        return new Date(dateString);
    }
    var commonFormats = [
        "MM/dd/yyyy hh:mm:ss a",
        "yyyy-MM-dd hh:mm:ss a",
        "yyyy-MM-dd HH:mm:ss.SSS",
        "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
        "yyyy-MM-dd HH:mm:ss",
        "MM/dd/yyyy HH:mm:ss",
        "dd.MM.yyyy HH:mm:ss",
        "yyyy-MM-dd",
        "MM/dd/yyyy", // 01/01/2023
    ];
    for (var _i = 0, commonFormats_1 = commonFormats; _i < commonFormats_1.length; _i++) {
        var format_1 = commonFormats_1[_i];
        var parsedDate = fns.parse(dateString, format_1, new Date());
        if (parsedDate.toString() !== "Invalid Date") {
            return parsedDate;
        }
    }
    return null;
};
var getLocalDate = function (obj) {
    if (obj === void 0) { obj = new Date(); }
    if (fns.isDate(obj)) {
        return toLocalDate(obj);
    }
    else {
        if (obj) {
            obj = stringToDate(obj.toString());
            return toLocalDate(obj);
        }
    }
    return null;
};
exports.getLocalDate = getLocalDate;
var format = function (date, format) {
    if (!fns.isDate(date)) {
        date = stringToDate(date);
    }
    return fns.format(date, format);
};
exports.format = format;
