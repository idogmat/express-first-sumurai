"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideosController = void 0;
const db_1 = require("../db");
const getVideosController = (req, res /*OutputVideoType[]*/, /*OutputVideoType[]*/ ) => ;
exports.getVideosController = getVideosController;
 > ;
{
    const videos = db_1.db.videos; // получаем видео из базы данных
    res
        .status(200)
        .json(videos); // отдаём видео в качестве ответа
}
// не забудьте добавить эндпоинт в апп
