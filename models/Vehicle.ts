import { ServiceT } from './Service'
import { addVehicle } from 'services/vehicle.service'

export type VehicleT = {
  id: string
  make: string
  model: string
  services: ServiceT[]
}

export type VehiclesT = Omit<VehicleT, 'service'>[]
export type NewVehicleT = Omit<VehicleT, 'id' | 'services'>

export class Vehicle {
  id: string
  make: string
  model: string
  services: ServiceT[]

  constructor({ id, make, model, services }: VehicleT) {
    this.id = id
    this.make = make
    this.model = model
    this.services = services
  }

  async add(body: { make: string; model: string }) {
    return await addVehicle(body).catch((e) => console.log(e))
  }

  async edit() {}

  async delete() {}

  getMake() {
    return this.make ? this.make : ''
  }

  getModel() {
    return this.model ? this.model : ''
  }
}
