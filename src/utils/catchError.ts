import type { AxiosError } from 'axios'

import { useToast } from 'vue-toastification'

const toast = useToast()

export const catchError = (error: AxiosError | Error) => {
  const axiosError = error as AxiosError
  // const status = axiosError.response?.status;
  toast.error(axiosError.message)
  // if (status) {
  //   toast.error(i18Instance.global.t(`errorCodes.${status}`));
  // } else {
  //   toast.error(axiosError.message);
  // }
}