import styles from './LoadingCourse.module.scss'
import Image from 'next/image'
import { FACTS } from '@Modules/learn/const'
import LearnIntro from 'public/learn_intro.png'

type LoadingCoursePropsT = {
  topic: string
}

const LoadingCourse = ({ topic }: LoadingCoursePropsT) => {
  return (
    <div className={styles.wrapper}>
      <div className="justify-center mb-20">
        <Image src={LearnIntro} alt="loading course" />
      </div>
      <div className="body-sm-bold text-center mb-40 ">
        Get ready to lean about {topic}!
      </div>
      <div className="flex justify-center p-12px mt-12">
        <div className={styles.progress_container}>
          <div className={styles.progress}></div>
        </div>
      </div>

      <div className="body-md text-center mt-40">
        <h3 className="heading-md mb-12">Fun Fact...</h3>
        {FACTS[Math.floor(Math.random() * FACTS.length)]}
      </div>
    </div>
  )
}

export default LoadingCourse
