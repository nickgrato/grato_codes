import axios, { AxiosResponse } from 'axios'
const URL = `https://e1f1-204-152-216-122.ngrok-free.app/v1/chat/completions`
import { MessageT } from 'types'

const PROTOCOLS = {
  headers: {
    'content-type': 'application/json',
    Authorization: 'Bearer no-key',
  },
}

export const getLlamaResponse = async (
  messages: MessageT[],
): Promise<MessageT> => {
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
