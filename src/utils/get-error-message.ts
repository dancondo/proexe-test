import axios, { AxiosError } from "axios";

const getErrorMessage = (err: Error | AxiosError): string => {
  if (axios.isAxiosError(err)) {
    return err.response?.data
  }

  return err.message
}

export default getErrorMessage
