import axios, { AxiosResponse } from 'axios'
import { UserT } from 'types'
import { getCookie } from 'cookies-next'
export enum cookiesE {
  GRATO_TOKEN = '_grato_token',
}
// const URL = `https://grato-api.fly.dev/vehicles`
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
