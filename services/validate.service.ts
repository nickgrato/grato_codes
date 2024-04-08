import axios, { AxiosResponse } from 'axios'
// const URL = `https://grato-api.fly.dev/vehicles`
const URL = `https://grato-backend.fly.dev`

// const URL = `http://127.0.0.1:5000`
import { cookies } from 'next/headers'

export enum cookiesE {
  GRATO_TOKEN = '_grato_token',
}

export const validateUser = async () => {
  const cookieStore = cookies()

  const token = cookieStore.get(cookiesE.GRATO_TOKEN)
  if (!token) {
    return false
  }

  const data = await axios
    .get(`${URL}/validate`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token.value}`,
      },
    })
    .then(({ data }: AxiosResponse) => data)

  return data.msg === 'valid token'
}
