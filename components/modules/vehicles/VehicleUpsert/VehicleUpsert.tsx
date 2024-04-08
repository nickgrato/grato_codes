import { Button, Input } from '@mozilla/lilypad-ui'
import styles from './VehicleUpsert.module.scss'
import { VehicleT, Vehicle } from 'models/Vehicle'
import { useState, ChangeEvent, useMemo } from 'react'

type VehicleUpsertPropsT = {
  action: 'add' | 'edit'
  vehicle?: VehicleT
  onClose: () => void
}

const VehicleUpsert = ({
  action,
  vehicle: _vehicle = {
    id: '',
    make: '',
    model: '',
    services: [],
  },
  onClose,
}: VehicleUpsertPropsT) => {
  const vehicle = useMemo(() => new Vehicle(_vehicle), [_vehicle])
  const [make, setMake] = useState(vehicle.getMake())
  const [model, setModel] = useState(vehicle.getModel())

  const onSave = async () => {
    if (action === 'add') {
      vehicle.add({ make: make, model: model })
    }

    // Todo create edit?
    onClose()
  }

  return (
    <section className={styles.wrapper}>
      <div className="flex-justify-end">
        <Button
          category="primary_clear"
          icon="x-circle"
          onClick={() => onClose()}
        />
      </div>
      <h2 className="mb-12">{action} Service</h2>

      <Input
        id="make"
        name="make"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setMake(e.target.value)
        }}
        value={make}
        label="Make"
        placeholder="make"
        required={true}
        classProp="mb-16"
      />

      <Input
        id="model"
        name="model"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setModel(e.target.value)
        }}
        value={model}
        label="Model"
        placeholder="model"
        required={true}
        classProp="mb-16"
      />

      <div className={styles.actions}>
        <Button
          classProp="mr-12"
          text="Cancel"
          category="primary_clear"
          onClick={() => onClose()}
        />
        <Button text="Save" onClick={() => onSave()} />
      </div>
    </section>
  )
}

export default VehicleUpsert
