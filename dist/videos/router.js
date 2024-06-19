"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const utils_1 = require("./utils");
const videosRouter = (db) => {
    const router = (0, express_1.Router)({});
    router.get('/', (req, res) => {
        const videos = db.videos;
        res.status(200).json(videos);
    });
    router.get('/:id', (req, res) => {
        const errors = (0, utils_1.inputValidation)({ id: req.params.id });
        if (errors.errorsMessages.length) {
            res.sendStatus(404);
            return;
        }
        const video = db.videos.find(v => v.id === +req.params.id);
        if (!video) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(video);
    });
    // delete -----
    router.delete('/:id', (req, res) => {
        const errors = (0, utils_1.inputValidation)({ id: req.params.id });
        if (errors.errorsMessages.length) {
            res.sendStatus(404);
            return;
        }
        const index = db.videos.findIndex(v => v.id === +req.params.id);
        if (index < 0) {
            res.sendStatus(404);
            return;
        }
        db.videos.splice(index, 1);
        res.sendStatus(204);
    });
    router.post('/', (req, res) => {
        const errors = (0, utils_1.inputValidation)(req.body);
        if (errors.errorsMessages.length) {
            res.status(400).json(errors);
            return;
        }
        let createdAt = new Date().toISOString();
        const publicationDate = (new Date(new Date().setDate(new Date().getDate() + 1))).toISOString();
        const newVideo = Object.assign(Object.assign({}, req.body), { createdAt,
            publicationDate, id: Date.now() + Math.floor(Math.random() * 1000), canBeDownloaded: false, minAgeRestriction: null });
        db.videos = [...db.videos, newVideo];
        res.status(201).json(newVideo);
    });
    // put --------------
    router.put('/:id', (req, res) => {
        const errors = (0, utils_1.inputValidation)(Object.assign(Object.assign({}, req.body), { id: req.params.id }));
        if (errors.errorsMessages.length) {
            res.status(400).json(errors);
            return;
        }
        const index = db.videos.findIndex((v) => {
            return v.id === +req.params.id;
        });
        if (index < 0) {
            res.sendStatus(404);
            return;
        }
        db.videos[index] = {
            id: db.videos[index].id,
            title: req.body.title || db.videos[index].title,
            author: req.body.author || db.videos[index].author,
            canBeDownloaded: req.body.canBeDownloaded || db.videos[index].canBeDownloaded,
            minAgeRestriction: req.body.minAgeRestriction || db.videos[index].minAgeRestriction,
            createdAt: db.videos[index].createdAt,
            publicationDate: req.body.publicationDate || db.videos[index].publicationDate,
            availableResolutions: req.body.availableResolutions || db.videos[index].availableResolutions,
        };
        res.sendStatus(204);
    });
    return router;
};
exports.videosRouter = videosRouter;
