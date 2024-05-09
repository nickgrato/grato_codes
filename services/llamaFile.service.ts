import axios, { AxiosResponse } from 'axios'
import { MessageT } from 'types'

const PROTOCOLS = {
  headers: {
    'content-type': 'application/json',
    Authorization: 'Bearer no-key',
  },
}

export const getUrl = () => {
  const defaultUrl = 'http://localhost:8080/v1/chat/completions'
  return typeof window !== 'undefined'
    ? localStorage.getItem('broadcastUrl') || defaultUrl
    : defaultUrl
}

export const getLlamaResponse = async (
  messages: MessageT[],
): Promise<MessageT> => {
  const URL = getUrl()
  const data = await axios
    .post(
      URL,
      {
        model: 'LLaMA_CPP',
        messages: messages,
      },
      { ...PROTOCOLS },
    )
    .then(({ data }: AxiosResponse) => data.choices[0])

  return data.message
}
