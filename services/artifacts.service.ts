import axios, { AxiosResponse } from 'axios'
import { ArtifactT, NewArtifactT } from 'models/Artifacts'
import { setCookie, getCookie, deleteCookie } from 'cookies-next'
export enum cookiesE {
  GRATO_TOKEN = '_grato_token',
}
// const URL = `https://grato-api.fly.dev/vehicles`
const URL = `https://grato-backend.fly.dev`

// const URL = `http://127.0.0.1:5000`
const token = getCookie(cookiesE.GRATO_TOKEN)
const PROTOCOLS = {
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${token}`,
  },
}

export const getArtifacts = async () => {
  const data = await axios
    .get(`${URL}/artifacts`, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data)
  console.log('data', data)
  return data.artifacts as ArtifactT[]
}

export const addArtifact = async (body: NewArtifactT) => {
  const data = await axios
    .post(`${URL}/artifact`, body, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data)
  console.log('data', data)
  return data.artifact as ArtifactT
}

export const updateArtifact = async (body: ArtifactT) => {
  console.log('body', body)
  const data = await axios
    .patch(`${URL}/artifact/${body.id}`, body, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data)
  console.log('data', data)
  return data.artifact as ArtifactT
}

export const deleteArtifactById = async (id: string) => {
  const data = await axios
    .delete(`${URL}/artifact/${id}`, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data)
  console.log('data', data)
  return data
}

export const saveArtifactToObsidian = async (body: NewArtifactT) => {
  const data = await axios
    .post(`${URL}/artifact/obsidian`, body, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data)
  console.log('data', data)
  return data.artifact as ArtifactT
}
