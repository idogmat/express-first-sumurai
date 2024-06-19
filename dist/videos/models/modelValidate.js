"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMethodFromDady = exports.videoValidateRules = void 0;
exports.videoValidateRules = {
    id: (v) => !v,
    title: (v) => (!v || v.length > 40),
    author: (v) => (!v || v.length > 20),
    canBeDownloaded: (v) => typeof v !== 'boolean',
    minAgeRestriction: (v) => !v || typeof v !== 'number',
    createdAt: (v) => !v || typeof v !== 'string',
    publicationDate: (v) => !v || typeof v !== 'string',
    availableResolutions: (v) => !v || !Array.isArray(v) || !!v.find(r => !Resolutions.includes(r)),
};
const Resolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
const validateMethodFromDady = (video) => {
    return Object.keys(video).reduce((acc, v) => {
        // @ts-ignore
        acc[v] = exports.videoValidateRules[v](video[v]);
        return acc;
    }, {});
};
exports.validateMethodFromDady = validateMethodFromDady;
