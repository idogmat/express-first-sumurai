import { isNull } from "util"
import { InputVideoType } from "./models/VideoModel"
import { validateMethodFromDady } from "./models/modelValidate"

export type OutputErrorsType = {
  errorsMessages: { message: string, field: string }[]
}

// don't write like that again)))
export const inputValidation = (
  video: any
) => {
  const errors: OutputErrorsType = {
    errorsMessages: []
  }
  const result = validateMethodFromDady(video)
  Object.keys(result).forEach(e => {
    if (result[e]) {
      errors.errorsMessages.push({
        message: 'error!!!', field: e
      })
    }
  })

  return errors
}
