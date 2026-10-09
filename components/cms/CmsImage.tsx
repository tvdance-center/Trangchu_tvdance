'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CmsImageSourceType } from '@/lib/cms/types'

type CmsImageProps = {
  sourceType?: CmsImageSourceType | null
  storagePath?: string | null
  externalUrl?: string | null
  alt: string
  sizes: string
  priority?: boolean
}

function storageImageUrl(path: string | null | undefined) {
  if (!path) return '/images/site/Lop hoc.jpg'
  if (path.startsWith('/') || path.startsWith('http://') || path.startsWith('https://')) return path
  return `/cms-media/${path.split('/').map(encodeURIComponent).join('/')}`
}

function safeExternalImageUrl(value: string | null | undefined) {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

export function CmsImage({ sourceType, storagePath, externalUrl, alt, sizes, priority = false }: CmsImageProps) {
  const externalSrc = sourceType === 'external' ? safeExternalImageUrl(externalUrl) : null
  const src = externalSrc || (sourceType === 'external' ? null : storageImageUrl(storagePath))
  const [failed, setFailed] = useState(!src)

  useEffect(() => {
    setFailed(!src)
  }, [src])

  if (failed || !src) {
    return <span className="cms-image-fallback" role="img" aria-label={alt || 'Ảnh không khả dụng'}>Ảnh không khả dụng</span>
  }

  if (externalSrc) {
    return (
      // External CMS URLs are intentionally rendered without Next image optimization.
      // This avoids a remote-host allowlist while keeping the browser as the only fetcher.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={externalSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        className="cms-image-fill"
        onError={() => setFailed(true)}
      />
    )
  }

  return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} onError={() => setFailed(true)} />
}
