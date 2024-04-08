'use client'
import { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { VehiclesT } from 'models/Vehicle'
import { ServiceT } from 'models/Service'
import Card from '@Shared/Card/Card'
import { Select, OptionT, Button, Modal } from '@mozilla/lilypad-ui'
import { getVehicle } from 'services/vehicle.service'
import ServiceDetails from '../ServiceDetials/ServiceDetials'
import ServiceUpsert from '../ServiceUpsert/ServiceUpsert'
import VehicleUpsert from '../VehicleUpsert/VehicleUpsert'
import styles from './Vehicles.module.scss'

type VehiclesPropsT = {
  vehicles: VehiclesT
}

const Error = () => <div>There was an error loaing the vehicles.</div>

const Vehicles = ({ vehicles }: VehiclesPropsT) => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0])
  const [services, setServices] = useState<ServiceT[] | null>(null)
  const [isAddServiceModalVisibile, setIsAddServiceModalVisibile] =
    useState(false)
  const [isEditServiceModalVisibile, setIsEditServiceModalVisibile] =
    useState(false)
  const [currentService, setCurrentService] = useState<string>('')
  const [isAddVehicleModalVisibile, setIsAddVehicleModalVisibile] =
    useState(false)
  const [isEditVehicleModalVisibile, setIsEditVehicleModalVisibile] =
    useState(false)

  const getData = useCallback(async (id: string) => {
    const data = await getVehicle(id)
    setSelectedVehicle(data)
    setServices(data.services)
  }, [])

  useEffect(() => {
    getData(selectedVehicle.id)
  }, [getData])

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
      <section className="px-20 py-20">
        <Card>
          <>
            <h2 className="mb-12">Vehicle Logs</h2>
            {vehicles ? (
              <Select
                id="country"
                name="country"
                onChange={handleChange}
                value={selectedVehicle.id}
                label="Select Vehicle"
                classProp={`mb-16 ${styles.select}`}
                options={vehicleOptions(vehicles)}
              />
            ) : (
              <Error />
            )}

            <div className="flex-justify-end">
              <Button
                text="Edit Vehicle"
                category="primary_clear"
                onClick={() => {
                  setIsEditVehicleModalVisibile(true)
                }}
              />
              <Button
                text="Add Vehicle"
                onClick={() => {
                  setIsAddVehicleModalVisibile(true)
                }}
              />
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
      </section>

      <Modal
        isVisible={isAddVehicleModalVisibile}
        onClose={() => setIsAddVehicleModalVisibile(false)}
      >
        <VehicleUpsert
          action="add"
          onClose={() => setIsAddVehicleModalVisibile(false)}
        />
      </Modal>

      <Modal
        isVisible={isEditVehicleModalVisibile}
        onClose={() => setIsEditVehicleModalVisibile(false)}
      >
        <VehicleUpsert
          action="edit"
          vehicle={selectedVehicle}
          onClose={() => setIsEditVehicleModalVisibile(false)}
        />
      </Modal>

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
