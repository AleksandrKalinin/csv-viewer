import { httpRequest } from '@/api';
import { gradesRoutes } from './grades.routes';

interface ISubjectGrade {
  [key: string]: number | string
}

export const gradesService = {
  getAverageSubjectsGrades: () => httpRequest().get<ISubjectGrade>(gradesRoutes.getAverageSubjectsGrades()),
  getMedianSubjectsGrades: () => httpRequest().get<ISubjectGrade>(gradesRoutes.getMedianSubjectsGrades()),
  getAverageStudentsGrades: () => httpRequest().get<ISubjectGrade>(gradesRoutes.getAverageStudentsGrades())
};