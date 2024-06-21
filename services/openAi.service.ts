import axios, { AxiosResponse } from 'axios'
// const URL = `https://grato-backend.fly.dev`
const URL = `http://127.0.0.1:5000`
import { MessageT } from 'types'

const PROTOCOLS = {
  headers: {
    'content-type': 'application/json',
  },
}

export const getResponse = async (messages: MessageT[]): Promise<MessageT> => {
  const data = await axios
    .post(`${URL}/chat`, { messages: messages }, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data.response)

  return data
}
