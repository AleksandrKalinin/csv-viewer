const MEDIAN_SUBJECTS_GRADES_PATH = '/median'
const AVERAGE_SUBJECTS_GRADES_PATH = '/average'
const AVERAGE_STUDENTS_GRADES_PATH = '/students'

export const gradesRoutes = {
  getAverageSubjectsGrades: () => `${AVERAGE_SUBJECTS_GRADES_PATH}`,
  getMedianSubjectsGrades: () => `${MEDIAN_SUBJECTS_GRADES_PATH}`,
  getAverageStudentsGrades: () => `${AVERAGE_STUDENTS_GRADES_PATH}`
}
