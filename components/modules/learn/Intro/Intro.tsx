'use client'

import styles from './Intro.module.scss'
import { Button, Input } from '@mozilla/lilypad-ui'
import { ChangeEvent, useState, FormEvent } from 'react'
import LearnIntro from 'public/learn_intro.png'
import PdfIcon from '@Shared/icons/Pdf'
import DriveIcon from '@Shared/icons/Drive'
import YouTubeIcon from '@Shared/icons/YouTube'
import NotionIcon from '@Shared/icons/Notion'
import Image from 'next/image'

type IntroPropsT = {
  handleSubmit: (topic: string) => void
}

const Intro = ({ handleSubmit }: IntroPropsT) => {
  const [topic, setTopic] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(topic)
  }

  return (
    <form onSubmit={onSubmit} className={styles.wrapper}>
      <div className="p-12 justify-center mb-60 mt-20">
        <Image src={LearnIntro} alt="Learn Intro" />
      </div>
      <h1 className=" heading-xxl color-primary mb-12">
        What would you like to learn?
      </h1>
      <p className="body-md ">
        Enter a topic and try your hand at the unique quiz generated
      </p>
      <Input
        name="search"
        label="Search for a topic"
        showLabel={false}
        placeholder="Search for a topic"
        className="mb-12"
        value={topic}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTopic(e.target.value)
        }
      />

      <div className="flex justify-center">
        <Button
          type="submit"
          text="Submit"
          category="primary_solid"
          icon="chevron-right"
          iconPlacedRight={true}
          className={styles.submit}
        />
      </div>

      <div className="my-12">
        <p className="text-center body-sm">Or learn from your specific data</p>
      </div>

      <div className="flex items-center justify-center gap-30">
        <Button
          customIcon={<PdfIcon size={30} />}
          href="/learn/sources"
          category="primary_clear"
        />
        <Button
          customIcon={<DriveIcon size={30} />}
          href="/learn/sources"
          category="primary_clear"
        />
        <Button
          customIcon={<NotionIcon size={30} />}
          href="/learn/sources"
          category="primary_clear"
        />
        <Button
          customIcon={<YouTubeIcon size={30} />}
          href="/learn/sources"
          category="primary_clear"
        />
      </div>
      <div>
        <hr />
      </div>
      <Button
        type="submit"
        text="Browse Courses"
        category="secondary_outline"
        icon="chevron-right"
        iconPlacedRight={true}
        className={styles.submit}
      />
    </form>
  )
}

export default Intro
