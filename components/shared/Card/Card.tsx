import { ReactNode } from 'react'
import styles from './Card.module.scss'

type CardPropsT = {
  children: ReactNode
  size?: 'small' | 'large'
  className?: string
}

const Card = ({ children, size = 'small', className = '' }: CardPropsT) => {
  return (
    <div className={`${styles.wrapper} ${styles[size]} ${className}`}>
      {children}
    </div>
  )
}

export default Card
