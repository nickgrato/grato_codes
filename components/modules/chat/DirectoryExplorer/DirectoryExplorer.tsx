'use client'
import { useEffect, useMemo, useState } from 'react'
import ObsidianApiService, { VaultT } from 'services/obsidian.service'
import styles from './DirectoryExplorer.module.scss'
import { Icon } from '@mozilla/lilypad-ui'
import { NewArtifactT } from 'models/Artifacts'
import Notification from '@Shared/Notification/Notification'

type DirectoryExplorerPropsT = {
  apiKey: string
  onFileImport: (artifact: NewArtifactT) => void
}

type FileTreeNodePropsT = {
  node: TreeNodeT
}

type NodeTypeT = 'folder' | 'file'
type TreeNodeT = {
  name: string
  type: NodeTypeT
  children?: TreeNodeT[] | null
  parent?: string
}

const DirectoryExplorer = ({
  apiKey,
  onFileImport,
}: DirectoryExplorerPropsT) => {
  const obsidianApiService = useMemo(
    () => new ObsidianApiService(apiKey),
    [apiKey],
  )

  const [tree, setTree] = useState<TreeNodeT[] | null>()
  const [error, setError] = useState<string>('')

  const buildTree = (data: string[], parent?: string) => {
    const tree: TreeNodeT[] = data.map((file) => {
      return {
        name: file,
        type: file.includes('/')
          ? ('folder' as NodeTypeT)
          : ('file' as NodeTypeT),
        parent: parent,
      }
    })
    return tree
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await obsidianApiService.getVault()
        console.log('data', data)
        setTree(buildTree(data.files))
        setError('')
      } catch (error) {
        setError('Error: API key is incorrect or missing.')
      }
    }
    getData()
  }, [obsidianApiService])

  const FileTreeNode = ({ node }: FileTreeNodePropsT) => {
    const [children, setChildren] = useState<TreeNodeT[] | null>(
      node.children ? node.children : null,
    )

    const handleNodeClick = async (parent: string) => {
      if (!children) {
        try {
          const childrenData = await obsidianApiService.getFolderData<VaultT>(
            parent,
          )
          const tree = buildTree(childrenData.files, parent)
          setChildren(tree)
        } catch (error) {
          console.error('Error: fetching children:', error)
        }
      }
    }

    const handleFileclick = async (node: TreeNodeT) => {
      try {
        const filePath = `${node.parent ? node.parent : ''}${node.name}`
        const category = '/' + (node.parent ? node.parent : '')
        const fileName = node.name.replace('.md', '')
        const markdown = await obsidianApiService.getFolderData<string>(
          filePath,
        )

        const artifact: NewArtifactT = {
          title: fileName,
          category: category,
          content: markdown,
        }

        onFileImport(artifact)
      } catch (error) {
        console.error('Error fetching children:', error)
      }
    }

    return (
      <div>
        {node.type === 'folder' ? (
          <button
            onClick={() => {
              handleNodeClick(`${node.parent ? node.parent : ''}${node.name}`)
            }}
            className="mb-12 items-center body-md"
          >
            <Icon name="chevron-down" classProp="mr-12" />

            {node.name.replace('/', '')}
          </button>
        ) : (
          <button
            onClick={() => {
              handleFileclick(node)
            }}
            className="primary-link"
          >
            {node.name}
          </button>
        )}

        {children &&
          children.map((childNode, i) => (
            <div className={`ml-12 mb-12`} key={i}>
              <FileTreeNode node={childNode} key={i} />
            </div>
          ))}
      </div>
    )
  }

  return (
    <section>
      {error && <Notification message={error} title="Error" type="critical" />}
      {tree && tree.map((node, i) => <FileTreeNode node={node} key={i} />)}
    </section>
  )
}

export default DirectoryExplorer
