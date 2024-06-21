'use client'

import { Button, Icon } from '@mozilla/lilypad-ui'
import { get } from 'node_modules/axios/index.cjs'

export type SummaryT = {
  step: number
  question: string
  answer: string
  isCorrect: boolean
  firstWrongAnswer: string
}

type SummaryPropsT = {
  summary: SummaryT[]
  handleFinish: () => void
}

const Summary = ({ summary, handleFinish }: SummaryPropsT) => {
  const getSctore = () => {
    let score = 0
    summary.forEach(({ isCorrect }) => {
      if (isCorrect) score++
    })
    return score
  }

  return (
    <div className="p-12">
      <h1 className="color-primary">Results</h1>
      <div>
        <hr />
      </div>
      <div className="text-center heading-xl mt-40">{getSctore()} / 4</div>
      <div className="text-center heading-xl mb-40">Well done!</div>
      {summary &&
        summary.map(({ question, answer, isCorrect, firstWrongAnswer }, i) => (
          <div key={i} className="mb-20">
            <div
              className={`body-md-bold mb-12 ${
                !isCorrect && 'color-semantic-critical'
              }`}
            >
              #{i + 1}. {question}
            </div>
            {!isCorrect && (
              <div className="items-center">
                <Icon name="x" color="red" />
                <div className="body-sm ml-12">{firstWrongAnswer}</div>
              </div>
            )}
            <div className="items-center">
              <Icon name="check" color="green" />
              <div className="body-sm ml-12">{answer}</div>
            </div>
          </div>
        ))}
      <div className="flex-col mt-12">
        <Button
          text="Continue"
          icon="chevron-right"
          category="secondary_outline"
          iconPlacedRight={true}
          onClick={() => {
            handleFinish()
          }}
        />
      </div>
    </div>
  )
}

export default Summary
