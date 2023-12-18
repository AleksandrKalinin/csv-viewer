import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'

import { ref } from 'vue'

import { gradesService } from '@/services/grades/grades.service'
import { catchError } from '@/utils/catchError'

export const useGradesStore = defineStore('Grades store', () => {
  const avgSubjectsGrades = ref([])
  const medianSubjectsGrades = ref([])

  const getAverageSubjectsGrades = async () => {
    try {
      const response = await gradesService.getAverageSubjectsGrades()
      if (response) {
        console.log(response)
      }
    } catch (err) {
      catchError(err as AxiosError)
    }
  }

  const getMedianSubjectsGrades = async () => {
    try {
      const response = await gradesService.getMedianSubjectsGrades()
      if (response) {
        console.log(response)
      }
    } catch (err) {
      catchError(err as AxiosError)
    }
  }

  return {
    avgSubjectsGrades,
    medianSubjectsGrades,
    getAverageSubjectsGrades,
    getMedianSubjectsGrades
  }
})
