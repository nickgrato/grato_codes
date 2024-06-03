import axios, { AxiosResponse } from 'axios'
import { MessageT } from 'types'
import { LocalStorage } from 'const/LocalStorage'
import { localStorageUtil } from 'utils/locaStorageUtil'

const PROTOCOLS = {
  headers: {
    'content-type': 'application/json',
    Authorization: 'Bearer no-key',
  },
}

export const getUrl = () => {
  const defaultUrl = 'https://brightly-intimate-cow.ngrok-free.app'
  return localStorageUtil.getItem(LocalStorage.BROADCAST_URL) || defaultUrl
}

export const getLocalLLMResponse = async (
  messages: MessageT[],
): Promise<MessageT> => {
  const URL = getUrl()
  const data = await axios
    .post(
      URL,
      { model: 'llama3', messages: messages, stream: false },
      { ...PROTOCOLS },
    )
    .then(({ data }: AxiosResponse) => data)

  return data.message
}
