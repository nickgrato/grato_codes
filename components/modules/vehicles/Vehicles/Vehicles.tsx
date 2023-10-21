'use client'
import { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { VehiclesT, ServiceT } from 'services/vehicle.service'
import Card from '@Shared/Card/Card'
import { Select, OptionT } from '@mozilla/lilypad-ui'
import { getVehicle } from 'services/vehicle.service'

type VehiclesPropsT = {
  vehicles: VehiclesT | void
}

const Error = () => <div>There was an error loaing the vehicles.</div>

const Vehicles = ({ vehicles }: VehiclesPropsT) => {
  const [selectedVehicle, setSelectedVehicle] = useState(
    vehicles ? vehicles[0].id : '',
  )
  const [services, setServices] = useState<ServiceT[] | null>(null)

  const getData = useCallback(async (id: string) => {
    const data = await getVehicle(id)
    setServices(data.services)
  }, [])

  useEffect(() => {
    getData(selectedVehicle)
  }, [getData])

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedVehicle(e.target.value)
    getData(e.target.value)
  }

  const vehicleOptions = (vehicles: VehiclesT): OptionT[] => {
    return vehicles.map(({ make, model, id }) => {
      return {
        value: id,
        title: `${make.toUpperCase()} / ${model.toUpperCase()}`,
      }
    })
  }

  return (
    <Card classProp="mx-20">
      <>
        <h2 className="mb-12">Vehicle Logs</h2>
        {vehicles ? (
          <Select
            id="country"
            name="country"
            onChange={handleChange}
            value={selectedVehicle}
            label="Select Vehicle"
            classProp="mb-16"
            options={vehicleOptions(vehicles)}
          />
        ) : (
          <Error />
        )}

        {services && (
          <>
            <hr />
            <h3 className="mb-12">Service</h3>
            <div>
              {services.map(({ service, created_at, id }) => (
                <div className="mb-12 body-md" key={id}>
                  <p>
                    <b>Description: </b>
                    {service}
                  </p>
                  <p>
                    <b>Time: </b>
                    {created_at}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    </Card>
  )
}

export default Vehicles
