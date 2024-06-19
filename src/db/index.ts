// import {VideoDBType} from './video-db-type'
 
export type RestrictionsType = "P144" | "P240" | "P360" | "P480" | "P720" | "P1080" | "P1440" | "P2160"

export type VideoDBType = {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: null | number;
  createdAt: string;
  publicationDate: string;
  availableResolutions: RestrictionsType[]
}


export type DBType = { // типизация базы данных (что мы будем в ней хранить)
  videos: VideoDBType[]
  // some: any[]
}

export const db: DBType = { // создаём базу данных (пока это просто переменная)
  videos: [],
  // some: []
}

// функция для быстрой очистки/заполнения базы данных для тестов
