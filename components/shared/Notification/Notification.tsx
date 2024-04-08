import { Icon, Button } from '@mozilla/lilypad-ui'
import styles from './Notification.module.scss'

type NotificationPropsT = {
  onClick?: () => void
  title: string
  message: string
  type?: 'critical' | 'warning' | 'info'
  classProp?: string
}

const Notification = ({
  onClick,
  title,
  message,
  type = 'info',
  classProp = '',
}: NotificationPropsT) => (
  <div className={`${styles.wrapper} ${styles[type]} ${classProp}`}>
    <div className="flex-align-center mb-12">
      <Icon
        name="alert-triangle"
        classProp="flex-shrink-0 mr-12"
        color="currentColor"
      />
      <h3>{title}</h3>
    </div>
    <p>{message}</p>

    {onClick && (
      <div className="flex-justify-end mt-24 ">
        <Button onClick={onClick} text="Contact" />
      </div>
    )}
  </div>
)

export default Notification
