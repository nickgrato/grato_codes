import { Button, Input } from '@mozilla/lilypad-ui'
import styles from './ServiceUpsert.module.scss'
type ServiceUpsertPropsT = {
  action: 'add' | 'edit'
  serviceId?: string
  onClose: () => void
}

const ServiceUpsert = ({ action, serviceId, onClose }: ServiceUpsertPropsT) => {
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
      {action === 'edit' && <div>now editing {serviceId}</div>}

      <Input
        id="title"
        name="title"
        onChange={() => {}}
        value={8}
        label="Title"
        placeholder="title"
        required={true}
        className="mb-16"
      />

      <Input
        id="service"
        name="service"
        onChange={() => {}}
        value={8}
        label="Service"
        placeholder="service"
        required={true}
        className="mb-16"
      />

      <Input
        id="vehicleMileage"
        name="vehicleMileage"
        onChange={() => {}}
        value={8}
        label="Vehicle Mileage"
        placeholder="Vehicle Mileage"
        required={true}
        className="mb-16"
      />

      <div className={styles.actions}>
        <Button
          className="mr-12"
          text="Cancel"
          category="primary_clear"
          onClick={() => onClose()}
        />
        <Button text="Save" />
      </div>
    </section>
  )
}

export default ServiceUpsert
