import { RestrictionsType } from "../../db"

export type InputVideoType = {
  id: string;
  title: string;
  author: string;
  availableResolutions: RestrictionsType[];
  canBeDownloaded: boolean;
  minAgeRestriction: number;
  publicationDate: string;
}
