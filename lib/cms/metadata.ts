import type { Metadata } from 'next'
import type { PublicCmsPost } from './types'

export const SITE_ORIGIN = 'https://tvdance.online'

const FALLBACK_DESCRIPTION = 'Nội dung mới từ TV Dance Center.'
const FALLBACK_SOCIAL_IMAGE = `${SITE_ORIGIN}/images/site/hero-tv-dance.jpg`
const CMS_MEDIA_PATH_PATTERN = /^(news|competitions|classes)\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|jpeg|png|webp|avif)$/i

function decodedCmsMediaPath(value: string) {
  const withoutProxyPrefix = value.replace(/^\/?cms-media\//, '')

  try {
    const decodedPath = withoutProxyPrefix.split('/').map(decodeURIComponent).join('/')
    return CMS_MEDIA_PATH_PATTERN.test(decodedPath) ? decodedPath : null
  } catch {
    return null
  }
}

function socialProxyUrl(storagePath: string) {
  const encodedPath = storagePath.split('/').map(encodeURIComponent).join('/')
  return `${SITE_ORIGIN}/og-image/${encodedPath}`
}

function absoluteStorageImage(path: string | null) {
  if (!path) return null

  const cmsMediaPath = decodedCmsMediaPath(path)
  if (cmsMediaPath) return socialProxyUrl(cmsMediaPath)

  if (path.startsWith('/')) return new URL(path, SITE_ORIGIN).toString()

  try {
    const url = new URL(path)
    if (url.origin === SITE_ORIGIN && url.pathname.startsWith('/cms-media/')) {
      const proxiedPath = decodedCmsMediaPath(url.pathname)
      return proxiedPath ? socialProxyUrl(proxiedPath) : null
    }
    return url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
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
