import { getVehicles } from 'services/vehicle.service'
import styles from './page.module.scss'
import Vehicles from '@Modules/vehicles'

const page = async () => {
  const vehicles = await getVehicles().catch((e) => console.error(e))

  return (
    <section className={styles.page}>
      <div className="p-20">
        <h2 className="heading-xxl ">Welcome Nick,</h2>
      </div>

      <Vehicles vehicles={vehicles} />
    </section>
  )
}

export default page
