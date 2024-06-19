import request from 'supertest'
import { app } from '../src/app'
import dotenv from 'dotenv'
import { VideoDBType } from '../src/db'
dotenv.config()


const dbName = 'back'
// const mongoURI = process.env.mongoURI || `mongodb://0.0.0.0:27017/${dbName}`

describe('/videos', () => {
    let newVideo: Partial<VideoDBType> = {
      title: "dfdfs",
      author: "string",
      availableResolutions: [
          "P144"
      ],
  }    
    // const client = new MongoClient(mongoURI)

    beforeAll(async () => {
        // await client.connect()
        await request(app).delete('/testing/all-data').expect(204)
    })

    afterAll(async () => {
      //  await client.close()
    })

    it('GET products = []', async () => {
        await request(app).get('/videos/').expect([])
    })

    it('- POST does not create the video with incorrect data (no title, no author)', async function () {
        await request(app)
            .post('/videos/')
            .send({ title: '', author: '', availableResolutions: ["Pz0"] })
            .expect(400, {
                errorsMessages: [
                  { message: 'error!!!', field: 'title' },
                  { message: 'error!!!', field: 'author' },
                  { message: 'error!!!', field: 'availableResolutions' },
                ],
            })

        const res = await request(app).get('/videos/')
        expect(res.body).toEqual([])
    })

    it('- POST does create the video with correct data', async function () {
      const resultNewVideo = await request(app)
          .post('/videos/')
          .send(newVideo)
          .expect(201)
      newVideo = resultNewVideo.body
      const res = await request(app).get('/videos/'+ resultNewVideo.body.id)
      expect(res.body).toEqual(resultNewVideo.body)
  })
   
    it('- GET product by ID with incorrect id', async () => {
        await request(app).get('/videos/helloWorld').expect(404)
    })
    it('+ GET product by ID with correct id', async () => {
        await request(app)
            .get('/videos/' + newVideo.id)
            .expect(200, newVideo)
    })

    it('- PUT product by ID with incorrect data', async () => {
        await request(app)
            .put('/videos/' + 1223)
            .send({ title: 'title', author: 'title', availableResolutions: ["Pz0"] })
            .expect(400)

        const res = await request(app).get('/videos/')
        expect(res.body[0]).toEqual(newVideo)
    })
  
    it('+ PUT product by ID with correct data', async () => {
        await request(app)
            .put('/videos/' + newVideo.id)
            .send({
                title: 'hello title',
                author: 'hello author',
                publicationDate: '2023-01-12T08:12:39.261Z',
                canBeDownloaded: false,
                availableResolutions: [
                  "P144"
                ]
            })
            .expect(204)

        const res = await request(app).get('/videos/')
        expect(res.body[0]).toEqual({
            ...newVideo,
            title: 'hello title',
            author: 'hello author',
            publicationDate: '2023-01-12T08:12:39.261Z',
            canBeDownloaded: false,
            availableResolutions: [
              "P144"
            ]
        })
        newVideo = res.body[0]
    })

    it('- DELETE product by incorrect ID', async () => {
        await request(app)
            .delete('/videos/876328')
            .expect(404)

        const res = await request(app).get('/videos/')
        expect(res.body[0]).toEqual(newVideo)
    })
    it('+ DELETE product by correct ID, auth', async () => {
        await request(app)
            .delete('/videos/' + newVideo!.id)
            .set('authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(204)

        const res = await request(app).get('/videos/')
        expect(res.body.length).toBe(0)
    })
})