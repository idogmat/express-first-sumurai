import { RestrictionsType } from "../../db"
import { InputVideoType } from "./VideoModel";
type ValidatType = Partial<typeof videoValidateRules>;
export const videoValidateRules = {
  id: (v: any) => !v,
  title: (v: string) => (!v || v.length > 40),
  author: (v: string) => (!v || v.length > 20),
  canBeDownloaded: (v: boolean) => typeof v !== 'boolean',
  minAgeRestriction: (v: any) => !v || typeof v !== 'number',
  createdAt: (v: any) => !v || typeof v !== 'string',
  publicationDate: (v: any) => !v || typeof v !== 'string',
  availableResolutions: (v: any) => !v || !Array.isArray(v) || !!v.find(r => !Resolutions.includes(r)),
}

const Resolutions: RestrictionsType[] = ["P144" , "P240" , "P360" , "P480" , "P720" , "P1080" , "P1440" , "P2160"]

export const validateMethodFromDady = (video: InputVideoType) => {
   return Object.keys(video).reduce<any>((acc, v) => {
    // @ts-ignore
    acc[v] = videoValidateRules[v as keyof InputVideoType](video[v])
    return acc;
  }, {} as any)

}