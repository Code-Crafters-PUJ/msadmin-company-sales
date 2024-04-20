import { TransformFnParams } from 'class-transformer'

export const transformToDate = ({ value }: TransformFnParams) => {
  try {
    return new Date(value).toISOString()
  } catch (error) {
    return value
  }
}
