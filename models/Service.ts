export type ServiceT = {
  created_at: string
  id: string
  service: string
  title: string
  vehicle_mileage: number
}

export class Service {
  id: string
  created_at: string
  service: string
  title: string
  vehicle_mileage: number

  constructor({ id, created_at, service, title, vehicle_mileage }: ServiceT) {
    this.id = id
    this.created_at = created_at
    this.service = service
    this.title = title
    this.vehicle_mileage = vehicle_mileage
  }

  async add() {}

  async edit() {}

  async delete() {}
}
