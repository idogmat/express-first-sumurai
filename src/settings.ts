import {config} from 'dotenv'
config()
 
export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 3003,
    PATH: {
        VIDEOS: '/videos',
        TEST: '/testing/all-data'
    },
}