export type CmsPostType = 'news' | 'competition' | 'class'
export type CmsCompetitionStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
export type CmsClassContentKind = 'recruitment' | 'opening' | 'activity' | 'gallery' | 'video'
export type CmsImageSourceType = 'storage' | 'external'

export type CmsImageReference = {
  sourceType?: CmsImageSourceType
  storagePath?: string
  url?: string
  alt: string
  caption?: string
}

export type CmsContentBlock =
  | { id: string; type: 'paragraph'; text: string }
  | { id: string; type: 'heading'; level: 2 | 3; text: string }
  | { id: string; type: 'list'; style: 'bullet' | 'numbered'; items: string[] }
  | { id: string; type: 'quote'; text: string; attribution?: string }
  | { id: string; type: 'link'; text: string; url: string }
  | ({ id: string; type: 'image' } & CmsImageReference)
  | { id: string; type: 'gallery'; items: CmsImageReference[] }

export type CmsContent = { version: 1; blocks: CmsContentBlock[] }

export interface PublicCmsPost {
  id: string
  type: CmsPostType
  title: string
  slug: string
  category: string | null
  excerpt: string | null
  content: CmsContent
  cover_source_type: CmsImageSourceType
  cover_image: string | null
  cover_external_url: string | null
  cover_image_alt: string | null
  featured: boolean
  seo_title: string | null
  seo_description: string | null
  published_at: string
  event_date: string | null
  end_date: string | null
  location: string | null
  competition_status: CmsCompetitionStatus | null
  class_name: string | null
  class_slug: string | null
  class_content_kind: CmsClassContentKind | null
  class_start_date: string | null
  class_schedule: string | null
  class_teacher: string | null
  class_tuition: string | null
  class_location: string | null
  registration_url: string | null
  video_url: string | null
  show_on_homepage: boolean
  source?: string
  sourceUrl?: string
  isFallback?: boolean
}
