export type ArtifactT = {
  id: string
  title: string
  content: string
  category: string
}

export type NewArtifactT = Omit<ArtifactT, 'id'>

export class Artifact {
  id: string
  title: string
  content: string
  category: string

  constructor({ id, title, content, category }: ArtifactT) {
    this.id = id
    this.title = title
    this.content = content
    this.category = category
  }
}
