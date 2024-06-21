import axios, { AxiosResponse } from 'axios'
// const URL = `https://grato-backend.fly.dev`
const URL = `http://127.0.0.1:5000`
import { setCookie, getCookie, deleteCookie } from 'cookies-next'

export enum cookiesE {
  GRATO_TOKEN = '_grato_token',
}

export const login = async (username: string, password: string) => {
  const body = {
    username: username,
    password: password,
  }

  try {
    const data = await axios
      .post(`${URL}/login`, body)
      .then(({ data }: AxiosResponse) => data)

    const expiration = new Date(new Date().setDate(new Date().getDate() + 30))
    setCookie(cookiesE.GRATO_TOKEN, data.access_token, { expires: expiration })

    return { msg: 'success' }
  } catch (error) {
    return { msg: 'fail' }
  }
}

export const logout = async () => {
  deleteCookie(cookiesE.GRATO_TOKEN)
}

export const validateUser = async () => {
  const token = getCookie(cookiesE.GRATO_TOKEN)

  if (!token) {
    return false
  }

  const data = await axios
    .get(`${URL}/validate`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }: AxiosResponse) => data)

  return data.msg === 'valid token'
}
