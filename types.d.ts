import { StaticImageData } from 'next/image'
import { Document } from '@contentful/rich-text-types'
// import { ButtonCategoriesT } from '@mozilla/lilypad-ui';
/**
 * CONTENFUL MEDIA TYPES
 */
export type CustomSectionsT = {
  //Expoand the item type as we add more custom sections
  items: TitleDescriptionT[] | FiftyfiftyT[] | HeroT[] | TileSpotlightT[]
}

export type FiftyfiftyT = {
  adornment: 'swoosh' | 'none'
  desktopImage: ImageT
  mobileImage: ImageT
  imageAlt: string
  accentImage?: ImageT | null
  accentImageAlt?: string
  textColor?: 'color-text-reverse' | 'color-text-main'
  background?: 'background-neutral' | 'background-rainbow'
  title?: string
  subtitle?: string
  ctaStyle?: ButtonCategoriesT
  ctaTitle?: string
  ctaHref?: string
  richText?: {
    json: Document
  }
  layout?: 'left' | 'right'
  __typename?: string
}

export type SpotlightTile = {
  image: ImageT
  imageAlt: string
  title: string
  description: string
  ctaTitle?: string
  ctaHref?: string
}

export type UserChatMetaT = {
  name: string
  avatar: string
  avatarAlt: string
}

// This needs to follow openAI convention
export type RoleT = 'user' | 'assistant' | 'system'

export type MessageT = {
  role: Role
  content: string
}

export type TileSpotlightT = {
  title: string
  body: string
  background: 'gradient-rainbow' | 'gradient-warm' | 'gradient-cool' | 'none'
  adornment: 'snow' | 'swoosh' | 'none'
  textColor: 'color-text-main' | 'color-text-reverse'
  tilesCollection: {
    items: SpotlightTile[]
  }
  __typename?: string
}

export type HeroT = {
  title?: string
  body?: string
  ctaTitle?: string
  ctaHref?: string
  __typename?: string
}

export type NavigationT = {
  bannerText: string
  bannerIcon: IconT
  links: LinkT
}

export type LinkT = {
  href: string
  label: string
  text: string
}

export type TitleDescriptionT = {
  title: string
  description: string
  __typename: string
}

export type PathCollectionT = {
  slug: string
}

export type ImageT = {
  url: string
  description: string
}

export type NewContactT = {
  name: string
  email: string
  organization: string
  country: string
  subject: string
  activity: string
  message: string
}

type PlansT = 'starter' | 'personal' | 'professional' | 'business' | null

export type BlogPostPreviewT = Omit<BlogPostT, 'post'>
export type BlogPostT = {
  sys: {
    id: string
  }
  slug: string
  title: string
  date: string
  image: ImageT
  preview: string
  body: {
    json: Document
  }
}

export type BlogT = {
  name: string
  posts: BlogPostPreviewT[]
}

export type BlogPageT = {
  post: BlogPostT
}

export type ChatRoleT = 'assistant' | 'user'
export type ChatMessageT = { role: ChatRoleT; content: string }

export type UserT = {
  id: string
  username: string
  email: string
  obsidianKey: string
}

export type ObsidianT = {
  id: string
  userId: string
  apiKey: string
}
