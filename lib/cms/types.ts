export type CmsPostType = 'news' | 'competition'
export type CmsCompetitionStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'

export type CmsContentBlock =
  | { id: string; type: 'paragraph'; text: string }
  | { id: string; type: 'heading'; level: 2 | 3; text: string }
  | { id: string; type: 'list'; style: 'bullet' | 'numbered'; items: string[] }
  | { id: string; type: 'quote'; text: string; attribution?: string }
  | { id: string; type: 'link'; text: string; url: string }
  | { id: string; type: 'image'; storagePath: string; alt: string; caption?: string }
  | { id: string; type: 'gallery'; items: Array<{ storagePath: string; alt: string; caption?: string }> }

export type CmsContent = { version: 1; blocks: CmsContentBlock[] }

export interface PublicCmsPost {
  id: string
  type: CmsPostType
  title: string
  slug: string
  category: string | null
  excerpt: string | null
  content: CmsContent
  cover_image: string | null
  cover_image_alt: string | null
  featured: boolean
  seo_title: string | null
  seo_description: string | null
  published_at: string
  event_date: string | null
  end_date: string | null
  location: string | null
  competition_status: CmsCompetitionStatus | null
  source?: string
  sourceUrl?: string
  isFallback?: boolean
}
