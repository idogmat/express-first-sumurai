import express, { Request, Response } from 'express'
import cors from 'cors'
import { SETTINGS } from './settings'
import { videosRouter } from './videos/router'
import { db } from './db'
const DB = db; 
export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк
app.use(SETTINGS.PATH.VIDEOS, videosRouter(DB)) 
app.get('/', (req, res) => {
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({version: '1.0'})
})
app.delete(SETTINGS.PATH.TEST, (req: Request, res: Response) => {
  DB.videos = [];
  res.send(204);
})
