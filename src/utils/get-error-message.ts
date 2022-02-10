import axios, { AxiosError } from "axios";

export default (err: Error | AxiosError): string => {
  if (axios.isAxiosError(err)) {
    return err.response?.data
  }

  return err.message
}