'use client'

import { useState, useRef } from 'react'
import styles from './page.module.scss'
import Intro from '@Modules/learn/Intro/Intro'
import { getResponse } from 'services/openAi.service'
import { FadeIn } from '@mozilla/lilypad-ui'
import SidePanel from '@Shared/SidePanel/SidePanel'
import Menu from '@Modules/learn/Menu/Menu'
import Question from '@Modules/learn/Question/Question'
import Summary, { SummaryT } from '@Modules/learn/Summary/Summary'
import LoadingCourse from '@Modules/learn/LoadingCourse/LoadingCourse'

type QuestionT = {
  title: string
  description: string
  question: string
  answer: string
  options: string[]
}

const Page = () => {
  const [questions, setQuestions] = useState<QuestionT[]>()
  const [step, setStep] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFailure, setIsFailure] = useState(false)
  const [loadingCourse, setLoadingCourse] = useState(false)
  const [topic, setTopic] = useState('')
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const attempts = useRef<Record<number, number>>({})
  const summary = useRef<SummaryT[]>([])
  const failure = useRef(null)
  const questionQty = 4

  const handleSubmit = async (topic: string) => {
    try {
      const prompt = `Create an ${questionQty}-question test on the topic of ${topic}. Each question should be directly related to the learning content provided in the description. The description has to be over 500 words but under 700 teaching the user about ${topic}.I want the description to be very informative. each description should have a short title in the "title" json value. dont make the question too easey. Each description gets its own question. The answer value must be the exact value of the option value selected. The format for each question should be a JSON object with the following structure:
    
    json
    {"test": [
      {
        "title":"",
        "description": "",
        "question": "",
        "answer": "",
        "options": ["", "", "", ""]
      },
      {
        "title":"",
        "description": "",
        "question": "",
        "answer": "",
        "options": ["", "", "", ""]
      }
    ]}

    Each question should have 4 possible answers, but only one correct answer. Ensure the content in the description is educational and directly related to the question that follows. Return the test as an array of ${questionQty} such JSON objects.`
      setTopic(topic)
      setLoadingCourse(true)
      const resp = await getResponse([{ role: 'user', content: prompt }])
      const data = JSON.parse(resp.content)
      console.log('resp', JSON.parse(resp.content))
      setQuestions(data.test)
      setStep(0)
      setLoadingCourse(false)
    } catch (error) {
      console.log('error', error)
    }
  }

  const Success = () => {
    return (
      <div className=" background-success   p-12">
        <h1 className="heading-md text-center">Success!</h1>
        <p className="body-md text-center">Thats correct!</p>
      </div>
    )
  }

  const Failure = () => {
    return (
      <div
        className="background-critical  p-12 error-notification"
        ref={failure}
      >
        <h1 className="heading-md text-center">Try Again</h1>
        <p className="body-md text-center">It's ok try again, you got this!</p>
      </div>
    )
  }

  const shakeMessage = () => {
    console.log('shake')
    failure.current.classList.add('shake')
    setTimeout(() => {
      failure.current.classList.remove('shake')
    }, 500)
  }

  const incrementStep = () => {
    if (step === questionQty - 1) {
      // get summary data togeather here.
      console.log('summary', summary.current)

      setShowSummary(true)
      return
    }
    setIsSuccess(false)
    setStep(step + 1)
  }

  const handleSelect = (option: string) => {
    const currentQuestion = questions[step]
    const currentAttempts = attempts.current[step] || 0
    const isFirstAttempt = currentAttempts === 0
    const isCorrect = currentQuestion.answer === option

    if (isFirstAttempt) {
      summary.current[step] = {
        isCorrect: true,
        firstWrongAnswer: '',
        step,
        question: currentQuestion.question,
        answer: currentQuestion.answer,
      }
    }

    if (isCorrect) {
      setIsFailure(false)
      setIsSuccess(true)
      setTimeout(incrementStep, 2000)

      attempts.current = {
        ...attempts.current,
        [step]: currentAttempts + 1,
      }
      return
    }

    // User selected the wrong answer
    if (isFirstAttempt) {
      summary.current[step].isCorrect = false
      summary.current[step].firstWrongAnswer = option
      setIsFailure(true)
    }

    attempts.current = {
      ...attempts.current,
      [step]: currentAttempts + 1,
    }
    if (isFailure) shakeMessage()
  }

  const handleFinish = () => {
    setTopic('')
    setStep(null)
    setShowSummary(false)
    setIsSuccess(false)
    setIsFailure(false)
  }

  return (
    <>
      <section className={styles.page}>
        {loadingCourse ? (
          <LoadingCourse topic={topic} />
        ) : showSummary ? (
          <Summary
            summary={summary.current}
            handleFinish={() => {
              handleFinish()
            }}
          />
        ) : (
          <>
            {step === null ? (
              <Intro handleSubmit={handleSubmit} />
            ) : (
              <div className="pt-40">
                <div className={styles.notifcations}>
                  <FadeIn visible={isSuccess}>
                    <Success />
                  </FadeIn>

                  <FadeIn visible={isFailure}>
                    <Failure />
                  </FadeIn>
                </div>

                {/* Indicator  */}
                <div className="flex space-between px-24 gap-8">
                  {questions &&
                    questions.map((_question, index) => (
                      <div
                        key={index}
                        className={`${styles.indicator} ${
                          index === step ? styles.active : ''
                        }`}
                      ></div>
                    ))}
                </div>

                {questions &&
                  questions
                    .filter((_question, index) => index === step)
                    .map((question) => (
                      <Question
                        key={question.question}
                        question={question}
                        step={step}
                        handleSelect={handleSelect}
                      />
                    ))}
              </div>
            )}
          </>
        )}
      </section>
      <SidePanel
        isOpen={isSidePanelOpen}
        onClose={() => {
          setIsSidePanelOpen(false)
        }}
      >
        <Menu />
      </SidePanel>
    </>
  )
}

export default Page
