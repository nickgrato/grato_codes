'use client'
import { ArtifactT } from 'models/Artifacts'
import { useState, ChangeEvent, useEffect, useMemo } from 'react'
import styles from './SavedContent.module.scss'
import { truncateString } from 'utils/utils'
import {
  Button,
  Input,
  Modal,
  Badge,
  Select,
  OptionT,
  CopyButton,
} from '@mozilla/lilypad-ui'
import Markdown from 'react-markdown'
import { MessageT } from 'types'
import ObsidianApiService from 'services/obsidian.service'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { LocalStorage } from 'const/LocalStorage'
import { localStorageUtil } from 'utils/locaStorageUtil'

type ArtifactPropsT = {
  artifact: ArtifactT
  onView: Function
  onInject: Function
  onDelete: Function
  onEdit: Function
}

const Artifact = ({
  artifact,
  onView,
  onInject,
  onDelete,
  onEdit,
}: ArtifactPropsT) => {
  const { title, content, category, id } = artifact

  return (
    <div className={styles.artifact}>
      <div className="justify-between">
        <h4 className={styles.label}>{title}</h4>
        <Badge name={category} category="primary" />
      </div>
      <div className={styles.preview}>{truncateString(content, 200)}</div>
      <div className="justify-end gap-12">
        <Button
          text="set context"
          category="primary_clear"
          onClick={() => onInject()}
        />
        <Button text="view" category="primary_clear" onClick={() => onView()} />
        <Button
          icon="trash"
          category="primary_clear"
          onClick={() => {
            onDelete()
          }}
        />
        <Button
          icon="edit"
          category="primary_clear"
          onClick={() => {
            onEdit()
          }}
        />
      </div>
    </div>
  )
}

type SavedContentPropsT = {
  apiKey: string
  artifacts: ArtifactT[]
  onInject?: (message: MessageT) => void
  onDelete: (id: string) => void
  onEdit: (artifact: ArtifactT) => void
  className?: string
}

const SavedContent = ({
  apiKey,
  artifacts,
  onInject,
  onDelete,
  onEdit,
  className = '',
}: SavedContentPropsT) => {
  const CLEAR_FILTER = 'clear_filter'
  const [searchBy, setSearchBy] = useState(
    localStorageUtil.getItem(LocalStorage.SEARCH_BY) || '',
  )
  const [currentArtifact, setCurrentArtifact] = useState<ArtifactT>()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [filterBy, setFilterBy] = useState(
    localStorageUtil.getItem('filterBy') || CLEAR_FILTER,
  )
  const obsidianApiService = useMemo(
    () => new ObsidianApiService(apiKey),
    [apiKey],
  )

  /**
   * Maintain State in local storage
   */
  useEffect(() => {
    localStorageUtil.setItem(LocalStorage.FILTER_BY, filterBy)
  }, [filterBy])

  useEffect(() => {
    localStorageUtil.setItem(LocalStorage.SEARCH_BY, searchBy)
  }, [searchBy])

  const options: OptionT[] = artifacts.reduce(
    (acc: OptionT[], { category }) => {
      const seen = new Set(acc.map((item) => item.value))
      if (!seen.has(category)) {
        acc.push({
          value: category,
          title: category,
        })
      }
      return acc
    },
    [],
  )

  const saveToObsidian = () => {
    if (!currentArtifact) return

    try {
      const resp = obsidianApiService.addFileToFolder(currentArtifact)
      console.log('resp', resp)
      onCloseModal()
    } catch (error) {
      console.log('error', error)
    }
  }

  const onCloseModal = () => {
    setIsModalVisible(false)
    setCurrentArtifact(undefined)
  }

  /**
   * Main Nav JSX
   */
  return (
    <>
      <section className={`${styles.wrapper} ${className}`}>
        <div className={styles.container}>
          <div className="mb-12 flex gap-20">
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearchBy(e.target.value.toLocaleLowerCase())
              }}
              value={searchBy}
              name="Message"
              placeholder="Search"
              label="Saved Content"
              icon="search"
            />
            {options && (
              <Select
                label="Filter"
                name="filter"
                value={filterBy}
                options={[
                  { value: CLEAR_FILTER, title: CLEAR_FILTER },
                  ...options,
                ]}
                onChange={(e: any) => {
                  setFilterBy(e.target.value)
                }}
              />
            )}
          </div>
          <div className={styles.artifacts}>
            {artifacts
              .filter(({ category }) => {
                if (filterBy === CLEAR_FILTER) {
                  return true
                }
                return filterBy === category
              })
              .filter(({ title }) =>
                title.toLocaleLowerCase().includes(searchBy),
              )
              .map((artifact) => (
                <Artifact
                  key={artifact.id}
                  artifact={artifact}
                  onDelete={() => {
                    onDelete(artifact.id)
                  }}
                  onEdit={() => {
                    onEdit(artifact)
                  }}
                  onInject={() => {
                    onInject &&
                      onInject({
                        role: 'user',
                        content: `Please set our context to this message, i'd like to talk about this more: ${artifact.content}`,
                      })
                  }}
                  onView={() => {
                    setCurrentArtifact(artifact)
                    setIsModalVisible(true)
                  }}
                />
              ))}
          </div>
        </div>
      </section>
      <Modal isVisible={isModalVisible} onClose={onCloseModal}>
        <div className="justify-between">
          <h4 className="heading-md mb-24">{currentArtifact?.title}</h4>
          <div>
            <Button
              icon="x"
              onClick={onCloseModal}
              category="primary_outline"
            />
          </div>
        </div>
        <p className="body-sm">
          <Markdown
            children={currentArtifact?.content}
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <>
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      language={match[1]}
                      PreTag="div"
                      style={darcula}
                    />
                    <div className="justify-end">
                      <CopyButton value={children as string} />
                    </div>
                  </>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          />
          <div className="justify-end mt-24">
            <Button
              text="Save to Obsidian"
              category="primary_outline"
              onClick={saveToObsidian}
            />
          </div>
        </p>
      </Modal>
    </>
  )
}

export default SavedContent
