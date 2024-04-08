import axios, { AxiosResponse } from 'axios'
import { VehicleT, NewVehicleT } from 'models/Vehicle'

// const URL = `https://grato-api.fly.dev/vehicles`
const URL = `http://127.0.0.1:5000`
const PROTOCOLS = {
  headers: {
    'content-type': 'application/json',
  },
}

export const getVehicles = async (): Promise<VehicleT[]> => {
  const data = await axios
    .get(`${URL}/vehicles`, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data)
  console.log('data', data)
  return data.vehicles as VehicleT[]
}

export const getVehicle = async (id: string): Promise<VehicleT> => {
  const data = await axios
    .get(`${URL}/vehicle/${id}`, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data)

  return data.vehicle
}

export const addVehicle = async (
  body: NewVehicleT,
): Promise<{ message: string }> => {
  const data = await axios
    .post(`${URL}/add_vehicle`, body, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data)

  return data
}
