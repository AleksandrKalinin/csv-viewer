import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'

import { filesService } from '@/services/files/files.service'
import { catchError } from '@/utils/catchError'

import { useToast } from 'vue-toastification'

const toast = useToast()

export const useFilesStore = defineStore('Files store', () => {
  const uploadFile = async (data: FormData) => {
    try {
      const response = await filesService.uploadFile(data)
      if (response) {
        console.log(response)
        toast('File uploaded!')
      }
    } catch (err) {
      catchError(err as AxiosError)
    }
  }

  return {
    uploadFile
  }
})
