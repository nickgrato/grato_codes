import styles from './ServiceDetials.module.scss'
import { Button } from '@mozilla/lilypad-ui'
type ServiceDetailsPropsT = {
  service: any
  onEdit: (id: string) => void
}

const ServiceDetails = ({ service, onEdit }: ServiceDetailsPropsT) => {
  const {
    title,
    service: serviceDescription,
    created_at,
    vehicle_mileage,
    id,
  } = service

  return (
    <section className={styles.wrapper}>
      <h3>{title}</h3>
      <p>
        <b>Description: </b>
        {serviceDescription}
      </p>
      <p>
        <b>Time: </b>
        {created_at}
      </p>
      <p>
        <b>Vehicle Milage: </b>
        {vehicle_mileage}
      </p>
      <div className={styles.actions}>
        <Button className="mr-12" text="Delete" category="primary_clear" />
        <Button text="Edit" onClick={() => onEdit(id)} />
      </div>
    </section>
  )
}

export default ServiceDetails
