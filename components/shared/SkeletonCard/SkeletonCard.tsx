import styles from './SkeletonCard.module.scss'

type SkeletonCardPropsT = {
  category: 'square' | 'row'
  qty: number
  className?: string
}

/**
 * Skeleton Card: This card is used to create faux loading ui of widgets and rows. Stack
 * the skeleton cards to build a custom grid of widgets to mimic the actual UI.
 */

const SkeletonCard = ({
  category,
  qty = 1,
  className = '',
}: SkeletonCardPropsT) => {
  return (
    <div
      className={`${className} ${styles.card_wrapper} ${
        category === 'square' ? styles.square_wrapper : styles.row_wrapper
      }`}
    >
      {[...Array(qty)].map((arr, i) => {
        return (
          <div
            key={i}
            className={`${styles.card} pulse ${
              category === 'square' ? styles.square : styles.row
            }`}
          ></div>
        )
      })}
    </div>
  )
}

export default SkeletonCard
