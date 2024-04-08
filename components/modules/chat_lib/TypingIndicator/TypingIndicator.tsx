'use client'
import styles from './TypingIndicator.module.scss'
import { FadeIn } from '@mozilla/lilypad-ui'

type TypingIndicatorPropsT = {
  isVisible: boolean
}
const TypingIndicator = ({ isVisible = true }: TypingIndicatorPropsT) => {
  return (
    <FadeIn visible={isVisible}>
      <div className={styles.typing_indicator}>
        {[1, 2, 3].map((i) => (
          <span key={i} className={styles.dot}></span>
        ))}
      </div>
    </FadeIn>
  )
}

export default TypingIndicator
