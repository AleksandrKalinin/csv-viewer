import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';

import { ref } from 'vue';

import { gradesService } from '@/services/grades.service';
import { catchError } from '@/utils/catchError';

export const useGradesStore = defineStore('Grades store', () => {

  const avgSubjectsGrades = ref([]);
  const medianSubjectsGrades = ref([]);

  const getAverageGrades = async () => {
    try {
      const response = await gradesService.getAverageGrades();
      if (response) {
        console.log(response);
      }
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  const getMedianGrades = async () => {
    try {
      const response = await gradesService.getAverageGrades();
      if (response) {
        console.log(response);
      }
    } catch (err) {
      catchError(err as AxiosError);
    }
  };

  return {
    avgSubjectsGrades,
    medianSubjectsGrades,
    getAverageGrades
});
