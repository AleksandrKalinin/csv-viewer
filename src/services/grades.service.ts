import { httpRequest } from '@/api'

const MEDIAN_SUBJECTS_GRADES_PATH = '/median'
const AVERAGE_SUBJECTS_GRADES_PATH = '/average'
const AVERAGE_STUDENTS_GRADES_PATH = '/students'

interface ISubjectGrade {
  [key: string]: number | string
}

export const gradesService = {
  getAverageSubjectsGrades: () => httpRequest().get<ISubjectGrade>(AVERAGE_SUBJECTS_GRADES_PATH),
  getMedianSubjectsGrades: () => httpRequest().get<ISubjectGrade>(MEDIAN_SUBJECTS_GRADES_PATH),
  getAverageStudentsGrades: () => httpRequest().get<ISubjectGrade>(AVERAGE_STUDENTS_GRADES_PATH)
}
