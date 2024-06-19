"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const videosRouter = (db) => {
    const router = (0, express_1.Router)({});
    router.get('/', (req, res) => {
        const videos = db.videos;
        res.status(200).json(videos);
    });
    return router;
};
exports.videosRouter = videosRouter;
