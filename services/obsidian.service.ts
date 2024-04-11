import axios, { AxiosResponse } from 'axios'
import { ArtifactT } from 'models/Artifacts'

// Define interfaces for types based on the schema
interface NoteJson {
  tags: string[]
  frontmatter: Record<string, unknown>
  stat: {
    ctime: number
    mtime: number
    size: number
  }
  path: string
  content: string
}

// c785fb8f197aa489c49ec11286dc375946df77126ba4c36fe23b76127f197653

export default class ObsidianApiService {
  private httpClient = axios.create()

  constructor(apiKey: string) {
    this.httpClient.defaults.baseURL = `https://127.0.0.1:27124`
    this.httpClient.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${apiKey}`
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    if (response.status >= 400) {
      throw new Error(response.data as any)
    }
    return response.data
  }

  public async getActiveFile(): Promise<NoteJson> {
    return this.httpClient.get<NoteJson>('/active/').then(this.handleResponse)
  }

  public async updateActiveFile(content: string): Promise<void> {
    return this.httpClient
      .put('/active/', content, {
        headers: { 'Content-Type': 'text/markdown' },
      })
      .then(this.handleResponse)
  }

  public async addFileToFolder(artifact: ArtifactT): Promise<void> {
    return this.httpClient
      .post(
        `vault/${artifact.category}/${artifact.title}.md`,
        artifact.content,
        {
          headers: { 'Content-Type': 'text/markdown' },
        },
      )
      .then(this.handleResponse)
  }

  public async appendActiveFile(content: string): Promise<void> {
    return this.httpClient
      .post('/active/', content, {
        headers: { 'Content-Type': 'text/markdown' },
      })
      .then(this.handleResponse)
  }

  public async insertIntoActiveFile(
    heading: string,
    content: string,
    position: 'end' | 'beginning' = 'end',
    ignoreNewline: boolean = false,
    headingBoundary: string = '::',
  ): Promise<NoteJson> {
    return this.httpClient
      .patch('/active/', content, {
        headers: {
          'Content-Type': 'text/markdown',
          Heading: heading,
          'Content-Insertion-Position': position,
          'Content-Insertion-Ignore-Newline': ignoreNewline.toString(),
          'Heading-Boundary': headingBoundary,
        },
      })
      .then(this.handleResponse)
  }

  public async deleteActiveFile(): Promise<void> {
    return this.httpClient.delete('/active/').then(this.handleResponse)
  }
}
