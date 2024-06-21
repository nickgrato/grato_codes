import { Button } from '@mozilla/lilypad-ui'
import styles from './SidePanel.module.scss'

type SidePanelPropsT = {
  isOpen: boolean
  onClose: () => void
  showClose?: boolean
  children?: React.ReactNode
}

const SidePanel = ({
  isOpen = false,
  onClose,
  showClose = true,
  children,
}: SidePanelPropsT) => {
  /**
   * Handle Menu Click
   */
  const handleClose = () => {
    onClose()
  }

  return (
    <>
      <div
        className={`${styles.overlay} ${
          isOpen ? styles.overlay_open : styles.overlay_closed
        }`}
      />

      <div
        className={`${styles.nav_wrapper} ${
          isOpen ? styles.nav_open : styles.nav_closed
        }`}
      >
        <div className={styles.banner_gradient} />
        <div className={styles.nav_container}>
          {showClose && (
            <div className="flex-justify-end p-12">
              <Button
                label="close mobile navigation"
                category="primary_clear"
                size="medium"
                icon="x"
                onClick={handleClose}
                className={styles.menu_button}
              />
            </div>
          )}

          <div>{children}</div>
        </div>
      </div>
    </>
  )
}

export default SidePanel
