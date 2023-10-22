'use client'
import { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { VehiclesT, ServiceT } from 'services/vehicle.service'
import Card from '@Shared/Card/Card'
import { Select, OptionT, Button, Modal } from '@mozilla/lilypad-ui'
import { getVehicle } from 'services/vehicle.service'
import ServiceDetails from '../ServiceDetials/ServiceDetials'
import ServiceUpsert from '../ServiceUpsert/ServiceUpsert'

type VehiclesPropsT = {
  vehicles: VehiclesT | void
}

const Error = () => <div>There was an error loaing the vehicles.</div>

const Vehicles = ({ vehicles }: VehiclesPropsT) => {
  const [selectedVehicle, setSelectedVehicle] = useState(
    vehicles ? vehicles[0].id : '',
  )
  const [services, setServices] = useState<ServiceT[] | null>(null)
  const [isAddServiceModalVisibile, setIsAddServiceModalVisibile] =
    useState(false)
  const [isEditServiceModalVisibile, setIsEditServiceModalVisibile] =
    useState(false)
  const [currentService, setCurrentService] = useState<string>('')

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
    <>
      <Card classProp="mx-20 mb-20">
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

          <div className="flex-justify-end">
            <Button text="Add Vehicle" />
          </div>

          <hr />
          <div className="flex-justify-between flex-align-center mb-12">
            <h3>Service</h3>
            <Button
              text="Add Service"
              icon="plus-circle"
              category="primary_clear"
              onClick={() => setIsAddServiceModalVisibile(true)}
            />
          </div>
          {services && (
            <div>
              {services.map((service) => (
                <ServiceDetails
                  service={service}
                  key={service.id}
                  onEdit={(id) => {
                    setCurrentService(id)
                    setIsEditServiceModalVisibile(true)
                  }}
                />
              ))}
            </div>
          )}
        </>
      </Card>

      <Modal
        isVisible={isAddServiceModalVisibile}
        onClose={() => setIsAddServiceModalVisibile(false)}
      >
        <ServiceUpsert
          action="add"
          onClose={() => setIsAddServiceModalVisibile(false)}
        />
      </Modal>

      <Modal
        isVisible={isEditServiceModalVisibile}
        onClose={() => setIsEditServiceModalVisibile(false)}
      >
        <ServiceUpsert
          action="edit"
          serviceId={currentService}
          onClose={() => setIsEditServiceModalVisibile(false)}
        />
      </Modal>
    </>
  )
}

export default Vehicles
