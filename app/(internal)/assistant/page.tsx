import { getVehicles } from 'services/vehicle.service'
import styles from './page.module.scss'
import Vehicles from '@Modules/vehicles'
import Chat from '@Modules/chat_lib'
import { redirect } from 'next/navigation'
import { validateUser } from 'services/validate.service'

const page = async () => {
  try {
    const isValid = await validateUser()
    console.log('isValid', isValid)
    if (!isValid) {
      redirect('/login')
    }
  } catch (error) {
    console.log('error', error)
    redirect('/login')
  }

  const vehicles = await getVehicles().catch((e) => console.error(e))
  console.log('what?', vehicles)

  return (
    <section className={styles.page}>
      <div className="px-20 pt-20 flex-space-between">
        <h2 className="heading-xxl ">Welcome Nick,</h2>
        <Chat />
      </div>

      {vehicles ? (
        <Vehicles vehicles={vehicles} />
      ) : (
        <div>Vehicles failed to load</div>
      )}
    </section>
  )
}

export default page
