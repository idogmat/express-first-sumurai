"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
eeport;
const videosRouter = (db) => {
    const router = (0, express_1.Router)({});
    router.get('/', (req, res) => {
        const videos = db.videos;
        res.status(200).json(videos);
    });
    return router;
};
// не забудьте добавить эндпоинт в апп
