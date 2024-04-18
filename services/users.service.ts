import axios, { AxiosResponse } from 'axios'
import { UserT, ObsidianT } from 'types'
import { getCookie } from 'cookies-next'
export enum cookiesE {
  GRATO_TOKEN = '_grato_token',
}
// const URL = `https://grato-backend.fly.dev`
const URL = `http://127.0.0.1:5000`
const token = getCookie(cookiesE.GRATO_TOKEN)
const PROTOCOLS = {
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${token}`,
  },
}

export const getUser = async () => {
  const data = await axios
    .get(`${URL}/user`, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data)
  console.log('data', data)
  return data.user as UserT
}

export const getObsidianData = async () => {
  const data = await axios
    .get(`${URL}/obsidian`, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data)
  console.log('dataeee', data)
  return data.obsidian as ObsidianT
}

export const updateObsidianData = async (body: ObsidianT) => {
  const data = await axios
    .put(`${URL}/obsidian`, body, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data)
  console.log('dataeee', data)
  return data.obsidian as ObsidianT
}
