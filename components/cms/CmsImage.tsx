'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CmsImageSourceType } from '@/lib/cms/types'

type CmsImageProps = {
  sourceType?: CmsImageSourceType | null
  storagePath?: string | null
  externalUrl?: string | null
  alt: string
  sizes?: string
  priority?: boolean
  fit?: 'cover' | 'contain'
  mode?: 'fill' | 'natural'
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

export function CmsImage({
  sourceType,
  storagePath,
  externalUrl,
  alt,
  sizes = '100vw',
  priority = false,
  fit = 'contain',
  mode = 'fill',
}: CmsImageProps) {
  const externalSrc = sourceType === 'external' ? safeExternalImageUrl(externalUrl) : null
  const src = externalSrc || (sourceType === 'external' ? null : storageImageUrl(storagePath))
  const [failed, setFailed] = useState(!src)
  const imageClassName = `${mode === 'natural' ? 'cms-image-natural' : 'cms-image-fill'} cms-image--${fit}`

  useEffect(() => {
    setFailed(!src)
  }, [src])

  if (failed || !src) {
    return <div className={`cms-image-fallback${mode === 'natural' ? ' cms-image-fallback--natural' : ''}`} role="img" aria-label={alt || 'Ảnh không khả dụng'}>Ảnh không khả dụng</div>
  }

  if (externalSrc || mode === 'natural') {
    return (
      // External CMS URLs are intentionally rendered without Next image optimization.
      // Natural-ratio CMS images also use the browser's intrinsic dimensions.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy={externalSrc ? 'no-referrer' : undefined}
        className={imageClassName}
        onError={() => setFailed(true)}
      />
    )
  }

  return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={imageClassName} onError={() => setFailed(true)} />
}
