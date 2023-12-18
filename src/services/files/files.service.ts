import { httpRequest } from '@/api'
import { filesRoutes } from './files.routes'

interface ISubjectGrade {
  [key: string]: number | string
}

export const filesService = {
  uploadFile: (file: File) => httpRequest().post<ISubjectGrade>(filesRoutes.uploadFile(), file)
}
