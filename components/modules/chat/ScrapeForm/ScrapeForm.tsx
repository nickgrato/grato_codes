'use client'

import { ChangeEvent, useState, FormEvent } from 'react'
import styles from './ScrapeForm.module.scss'
import Card from '@Shared/Card/Card'
import Notification from '@Shared/Notification/Notification'
import { Button, Input, FadeIn, TextArea } from '@mozilla/lilypad-ui'
import { getScrapeByUrl, PromptInputT, PromptT } from 'services/scrape.service'
import PromptInput from '../PromptInput/PromptInput'
import { useSearchParams } from 'next/navigation'
import SkeletonCard from '@Shared/SkeletonCard/SkeletonCard'
import Markdown from 'react-markdown'

const ScrapeForm = () => {
  const [url, setUrl] = useState('')
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [promptInputs, setPromptInputs] = useState<PromptInputT[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const data: PromptT = {
      title: '',
      inputs: promptInputs,
      prompt: prompt,
      url: url,
    }

    const resp = await getScrapeByUrl(data)
    setResponse(resp)
    setIsLoading(false)
  }

  const onAddInput = () => {
    setPromptInputs((state) => {
      return [
        ...state,
        {
          name: '',
          value: '',
        },
      ]
    })
  }

  return (
    <section className={styles.container}>
      <Card size="large">
        <form className="flex-col" onSubmit={handleSubmit}>
          <div className="flex-justify-between flex-align-center mb-24">
            <h2 className="heading-xxs ">Scrape URL</h2>

            <Button
              icon="save"
              text="save prompt template"
              type="button"
              category="primary_clear"
              onClick={() => {}}
              className={styles.cta}
            />
          </div>

          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUrl(e.target.value)
            }}
            value={url}
            type="url"
            name="url"
            placeholder="Wiki URL"
            label="Wiki URL"
            required={true}
            showLabel={false}
            className="mb-12"
          />
          <hr />

          <div className="body-md-bold mb-12">Inputs</div>

          {promptInputs &&
            promptInputs.map(({ name, value }, i) => {
              return (
                <PromptInput
                  key={i}
                  value={value}
                  name={name}
                  onDelete={() => {
                    setPromptInputs((state) => {
                      const inputs = state.filter((input, j) => {
                        if (i !== j) {
                          return input
                        }
                      })

                      return inputs
                    })
                  }}
                  onNameChange={(update) => {
                    setPromptInputs((state) => {
                      const inputs = state.map((input, j) => {
                        if (i === j) {
                          return {
                            name: update,
                            value: input.value,
                          }
                        }
                        return input
                      })

                      return inputs
                    })
                  }}
                  onValueChange={(update) => {
                    setPromptInputs((state) => {
                      const inputs = state.map((input, j) => {
                        if (i === j) {
                          return {
                            name: input.name,
                            value: update,
                          }
                        }
                        return input
                      })

                      return inputs
                    })
                  }}
                />
              )
            })}
          <div className="flex-justify-end">
            <Button
              icon="plus"
              text="Add Input"
              category="primary_outline"
              onClick={() => {
                onAddInput()
              }}
            />
          </div>

          <hr />

          <TextArea
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPrompt(e.target.value)
            }}
            value={prompt}
            name="prompt"
            placeholder="Prompt"
            label="Prompt"
            required={true}
            className="mb-12"
          />

          <div className="flex-justify-end">
            <Button
              text="submit"
              type="submit"
              onClick={() => {}}
              className={styles.cta}
            />
          </div>
        </form>
      </Card>
      <Card size="large">
        <h2 className="heading-xxs">Output</h2>

        {isLoading ? (
          <div className={styles.loader}>
            <SkeletonCard category="row" qty={4} />
          </div>
        ) : (
          <section>
            <div className={styles.response}>
              <div className="markdown">
                <Markdown>{response}</Markdown>
              </div>
            </div>

            {Boolean(response.length) && (
              <div className="flex-justify-end">
                <Button
                  className="mr-12"
                  icon="message-circle"
                  text="Continue the chat"
                  category="primary_clear"
                />
                <Button
                  icon="send"
                  text="save as PDF"
                  category="primary_outline"
                />
              </div>
            )}
          </section>
        )}
      </Card>
    </section>
  )
}

export default ScrapeForm
