import {Request, Response, Router} from 'express'
import {DBType, VideoDBType} from '../db'
import { OutputErrorsType, inputValidation } from './utils';
import { InputVideoType } from './models/VideoModel';

export const videosRouter = (db: DBType) => {
  const router = Router({});

  router.get('/', (req: Request, res: Response<VideoDBType[]>) => {
    const videos = db.videos 
    res.status(200).json(videos)
  })

  router.get('/:id', (req: Request, res: Response<VideoDBType | OutputErrorsType>) => {
    const errors = inputValidation({id: req.params.id})
    if (errors.errorsMessages.length) {
      res.sendStatus(404);
      return;
    }
    const video = db.videos.find(v=> v.id === +req.params.id)
    if (!video) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(video)
  })

  // delete -----

  router.delete('/:id', (req: Request, res: Response<VideoDBType | OutputErrorsType>) => {
    const errors = inputValidation({id: req.params.id})
    if (errors.errorsMessages.length) {
      res.sendStatus(404);
      return;
    }
    const index = db.videos.findIndex(v=> v.id === +req.params.id);
    if (index < 0) {
      res.sendStatus(404)
      return;
    }
    db.videos.splice(index, 1)
    res.sendStatus(204)
  })

  router.post('/', (req: Request<any, any, InputVideoType>, res: Response<VideoDBType | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res.status(400).json(errors);
        return;
    }
    let createdAt = new Date().toISOString()
    const publicationDate = (new Date(new Date().setDate(new Date().getDate() + 1))).toISOString()
    const newVideo: VideoDBType = {
        ...req.body,
        createdAt,
        publicationDate,
        id: Date.now() + Math.floor(Math.random()*1000),
        canBeDownloaded: false,
        minAgeRestriction: null,

    }
    db.videos = [...db.videos, newVideo]
    res.status(201).json(newVideo)
  })

  // put --------------

  router.put('/:id', (req: Request<any, any, InputVideoType>, res: Response<VideoDBType | OutputErrorsType>) => {
    const errors = inputValidation({...req.body, id: req.params.id})
    if (errors.errorsMessages.length) {
        res.status(400).json(errors);
        return;
    }
    const index = db.videos.findIndex((v: VideoDBType)=> {
      return v.id === + req.params.id;
    })
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
  })

  return router
}