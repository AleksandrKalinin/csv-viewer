import { httpRequest } from '@/api'
import { filesRoutes } from './files.routes'

interface ISubjectGrade {
  [key: string]: number | string
}

export const filesService = {
  uploadFile: (data: FormData) =>
    httpRequest('multipart/form-data').post<ISubjectGrade>(filesRoutes.uploadFile(), data)
}
