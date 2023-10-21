import axios, { AxiosResponse } from 'axios'
// const URL = `https://grato-api.fly.dev/vehicles`
const URL = `http://127.0.0.1:5000`
const PROTOCOLS = {
  headers: {
    'content-type': 'application/json',
  },
}

export type VehicleT = {
  id: string
  make: string
  model: string
  services: ServiceT[]
}

export type VehiclesT = Omit<VehicleT, 'service'>[]

export type ServiceT = {
  created_at: string
  id: string
  service: string
  title: string
}

export const getVehicles = async (): Promise<VehicleT[]> => {
  const data = await axios
    .get(`${URL}/vehicles`, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data)

  return data.vehicles as VehicleT[]
}

export const getVehicle = async (id: string): Promise<VehicleT> => {
  const data = await axios
    .get(`${URL}/vehicles/${id}`, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data)

  return data.vehicle
}
