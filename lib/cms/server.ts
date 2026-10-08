import 'server-only'

import { fallbackCompetitions, fallbackNews } from './fallback'
import { CmsPostType, PublicCmsPost } from './types'

const SELECT_FIELDS = 'id,type,title,slug,category,excerpt,content,cover_image,cover_image_alt,featured,seo_title,seo_description,published_at,event_date,end_date,location,competition_status,class_name,class_slug,class_content_kind,class_start_date,class_schedule,class_teacher,class_tuition,class_location,registration_url,video_url,show_on_homepage'

function config() {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return baseUrl && anonKey ? { baseUrl, anonKey } : null
}

function fallbackFor(type: CmsPostType) {
  if (type === 'news') return fallbackNews
  if (type === 'competition') return fallbackCompetitions
  return []
}

function cutoverEnabled() {
  return process.env.TV_DANCE_CMS_CUTOVER === 'true'
}

async function queryPosts(type: CmsPostType, options: {
  slug?: string
  classSlug?: string
  limit?: number
  featuredFirst?: boolean
  showOnHomepage?: boolean
} = {}) {
  const env = config()
  if (!env) return null

  const params = new URLSearchParams({
    select: SELECT_FIELDS,
    type: `eq.${type}`,
    status: 'eq.published',
    deleted_at: 'is.null',
    published_at: `lte.${new Date().toISOString()}`,
    order: options.featuredFirst ? 'featured.desc,published_at.desc' : 'published_at.desc',
  })
  if (options.slug) params.set('slug', `eq.${options.slug}`)
  if (options.classSlug) params.set('class_slug', `eq.${options.classSlug}`)
  if (options.showOnHomepage) params.set('show_on_homepage', 'eq.true')
  if (options.limit) params.set('limit', String(options.limit))

  try {
    const response = await fetch(`${env.baseUrl}/rest/v1/website_posts?${params}`, {
      headers: { apikey: env.anonKey, Authorization: `Bearer ${env.anonKey}` },
      next: { revalidate: 60, tags: [`website-${type}`] },
    })
    if (!response.ok) return null
    return await response.json() as PublicCmsPost[]
  } catch (error) {
    console.error('Website CMS fetch failed:', error)
    return null
  }
}

export async function getPublishedPosts(type: CmsPostType, limit?: number): Promise<PublicCmsPost[]> {
  const rows = await queryPosts(type, { limit, featuredFirst: type !== 'news' })
  const fallback = fallbackFor(type)
  const fallbackRows = limit ? fallback.slice(0, limit) : fallback
  if (rows === null) return cutoverEnabled() ? [] : fallbackRows
  if (rows.length === 0 && !cutoverEnabled()) return fallbackRows
  return rows
}

export async function getPublishedPost(type: CmsPostType, slug: string): Promise<PublicCmsPost | null> {
  const rows = await queryPosts(type, { slug, limit: 1 })
  if (rows?.[0]) return rows[0]
  if (cutoverEnabled()) return null
  return fallbackFor(type).find((post) => post.slug === slug) || null
}

export async function getPublishedClassPosts(classSlug?: string): Promise<PublicCmsPost[]> {
  return await queryPosts('class', { classSlug, featuredFirst: true }) || []
}

export async function getPublishedClassPost(classSlug: string, slug: string): Promise<PublicCmsPost | null> {
  const rows = await queryPosts('class', { classSlug, slug, limit: 1 })
  return rows?.[0] || null
}

export async function getHomepagePosts(limit = 3): Promise<PublicCmsPost[]> {
  const [newsRows, classRows] = await Promise.all([
    queryPosts('news', { limit, featuredFirst: true }),
    queryPosts('class', { limit, featuredFirst: true, showOnHomepage: true }),
  ])

  const news = newsRows === null || (newsRows.length === 0 && !cutoverEnabled())
    ? (cutoverEnabled() ? [] : fallbackNews.slice(0, limit))
    : newsRows
  const classes = classRows || []

  return [...news, ...classes]
    .sort((a, b) => Number(b.featured) - Number(a.featured) || Date.parse(b.published_at) - Date.parse(a.published_at))
    .slice(0, limit)
}

export function cmsImageUrl(path: string | null): string {
  if (!path) return '/images/site/Lop hoc.jpg'
  if (path.startsWith('/') || path.startsWith('http://') || path.startsWith('https://')) return path
  return `/cms-media/${path.split('/').map(encodeURIComponent).join('/')}`
}
