'use client'

import { Button } from '@mozilla/lilypad-ui'
import { useState } from 'react'
import RadioButton from 'components/shared/RadioButton/RadioButton'

type QuestionPropsT = {
  question: {
    title: string
    description: string
    question: string
    options: string[]
  }
  step: number
  handleSelect: (option: string) => void
}

const Question = ({ question, step, handleSelect }: QuestionPropsT) => {
  const [showQuestion, setShowQuestion] = useState(false)
  const [value, setValue] = useState()

  const onChange = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <div className="p-12">
      {showQuestion ? (
        <div>
          <h3 className="heading-sm  color-primary p-12">Question</h3>
          <hr className="m-12" />
          <Button
            text="Back"
            icon="chevron-left"
            iconPlacedRight={false}
            category="secondary_clear"
            onClick={() => setShowQuestion(false)}
          />
          <p className="body-md px-12 my-40">{question.question}</p>

          <form className="mb-40 p-12">
            <fieldset
              id="sb_radio"
              onChange={onChange}
              className="gap-12 flex-col"
            >
              {question.options.map((option, i) => {
                return (
                  <RadioButton
                    groupValue={value}
                    key={i}
                    label={option}
                    value={option}
                    id={String(i)}
                    groupName="sb_radio"
                  />
                )
              })}
            </fieldset>
          </form>
          <hr className="m-12" />

          <div className="flex p-12 flex-col">
            <Button
              category="secondary_outline"
              text="Confirm"
              className="mt-12"
              onClick={() => {
                handleSelect(value)
              }}
            />
          </div>
        </div>
      ) : (
        <div className="p-12">
          <h3 className="heading-sm  color-primary ">{question.title}</h3>
          <hr />
          <p className="body-md   mb-24">{question.description}</p>
          <div className="justify-end    flex-col">
            <Button
              text="Next"
              category="secondary_outline"
              icon="chevron-right"
              iconPlacedRight={true}
              onClick={() => setShowQuestion(true)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Question
