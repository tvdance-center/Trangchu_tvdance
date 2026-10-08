import 'server-only'

import { fallbackCompetitions, fallbackNews } from './fallback'
import { CmsPostType, PublicCmsPost } from './types'

const SELECT_FIELDS = 'id,type,title,slug,category,excerpt,content,cover_image,cover_image_alt,featured,seo_title,seo_description,published_at,event_date,end_date,location,competition_status'

function config() {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return baseUrl && anonKey ? { baseUrl, anonKey } : null
}

function fallbackFor(type: CmsPostType) {
  return type === 'news' ? fallbackNews : fallbackCompetitions
}

function cutoverEnabled() {
  return process.env.TV_DANCE_CMS_CUTOVER === 'true'
}

async function queryPosts(type: CmsPostType, options: { slug?: string; limit?: number; featuredFirst?: boolean } = {}) {
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
  const rows = await queryPosts(type, { limit, featuredFirst: type === 'competition' })
  if (rows === null) return cutoverEnabled() ? [] : fallbackFor(type).slice(0, limit)
  if (rows.length === 0 && !cutoverEnabled()) return fallbackFor(type).slice(0, limit)
  return rows
}

export async function getPublishedPost(type: CmsPostType, slug: string): Promise<PublicCmsPost | null> {
  const rows = await queryPosts(type, { slug, limit: 1 })
  if (rows?.[0]) return rows[0]
  if (cutoverEnabled()) return null
  return fallbackFor(type).find((post) => post.slug === slug) || null
}

export function cmsImageUrl(path: string | null): string {
  if (!path) return '/images/site/Lop hoc.jpg'
  if (path.startsWith('/') || path.startsWith('http://') || path.startsWith('https://')) return path
  return `/cms-media/${path.split('/').map(encodeURIComponent).join('/')}`
}
