export interface IGrade {
  id: string
  studentId: string
  subjectId: string
  isLastSubmitted: string
}

export interface IStudent {
  id: string
  name: string
  grades: IGrade[]
}

export interface ISubject {
  id: string
  name: string
  grades: IGrade[]
  medianGrade: IGrade
  averageGrade: IGrade
}

export interface IStudentGrades {
  [key: string]: number
}

export interface IStudentsData {
  [key: string]: {
    [key: string]: number | string
  }
}
