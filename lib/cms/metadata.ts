import type { Metadata } from 'next'
import type { PublicCmsPost } from './types'

export const SITE_ORIGIN = 'https://tvdance.online'

const FALLBACK_DESCRIPTION = 'Nội dung mới từ TV Dance Center.'
const FALLBACK_SOCIAL_IMAGE = `${SITE_ORIGIN}/images/site/hero-tv-dance.jpg`

function absoluteStorageImage(path: string | null) {
  if (!path) return null
  if (path.startsWith('/')) return new URL(path, SITE_ORIGIN).toString()

  try {
    const url = new URL(path)
    return url.protocol === 'https:' ? url.toString() : null
  } catch {
    const encodedPath = path.split('/').map(encodeURIComponent).join('/')
    return `${SITE_ORIGIN}/cms-media/${encodedPath}`
  }
}

function socialImage(post: PublicCmsPost) {
  if (post.cover_source_type === 'external') {
    try {
      const url = new URL(post.cover_external_url || '')
      if (url.protocol === 'https:') return url.toString()
    } catch {
      return FALLBACK_SOCIAL_IMAGE
    }
  }

  return absoluteStorageImage(post.cover_image) || FALLBACK_SOCIAL_IMAGE
}

export function postCanonicalUrl(post: PublicCmsPost) {
  const slug = encodeURIComponent(post.slug)
  if (post.type === 'competition') return `${SITE_ORIGIN}/giai-dau/${slug}`
  if (post.type === 'class' && post.class_slug) {
    return `${SITE_ORIGIN}/lop-hoc/${encodeURIComponent(post.class_slug)}/${slug}`
  }
  return `${SITE_ORIGIN}/tin-tuc/${slug}`
}

export function buildPostMetadata(post: PublicCmsPost): Metadata {
  const title = post.seo_title?.trim() || post.title
  const description = post.seo_description?.trim() || post.excerpt?.trim() || FALLBACK_DESCRIPTION
  const canonical = postCanonicalUrl(post)
  const image = socialImage(post)
  const imageAlt = post.cover_image_alt?.trim() || post.title

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      locale: 'vi_VN',
      siteName: 'TV Dance Center',
      title,
      description,
      url: canonical,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
