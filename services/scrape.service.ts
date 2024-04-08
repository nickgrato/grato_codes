import axios, { AxiosResponse } from 'axios'

const URL = `http://localhost:3210`

const PROTOCOLS = {
  headers: {
    'content-type': 'application/json',
  },
}

type BaseMessageChunkT = {
  id: string[]
  kwargs: { content: string; additional_kwargs: {} }
}

export type PromptInputT = {
  name: string
  value: string
}

export type PromptT = {
  title: string
  inputs: PromptInputT[]
  prompt: string
  url: string
}

export const getScrapeByUrl = async (body: PromptT) => {
  const data: BaseMessageChunkT = await axios
    .post(`${URL}/scrape`, body, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data)

  console.log('data', data)

  return data.kwargs.content
}
