'use client'

import { useEffect, useRef, useState } from 'react'

type FallbackPlatform = 'Zalo' | 'Threads' | 'Instagram'

type SocialShareProps = {
  title: string
  excerpt: string | null
  url: string
}

function safeCanonicalUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && url.hostname === 'tvdance.online' ? url.toString() : null
  } catch {
    return null
  }
}

function platformIcon(platform: 'Facebook' | 'Zalo' | 'Threads' | 'Instagram' | 'X') {
  if (platform === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" className="cms-share-icon-fill" />
      </svg>
    )
  }

  const label = platform === 'Facebook' ? 'f' : platform === 'Threads' ? '@' : platform === 'Zalo' ? 'Z' : 'X'
  return <span className="cms-share-letter" aria-hidden="true">{label}</span>
}

async function copyToClipboard(value: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
      return true
    }
  } catch {
    // Fall through to the browser-compatible copy path.
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  document.body.removeChild(textarea)
  return copied
}

export function SocialShare({ title, excerpt, url }: SocialShareProps) {
  const canonicalUrl = safeCanonicalUrl(url)
  const [feedback, setFeedback] = useState('')
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current)
  }, [])

  if (!canonicalUrl) return null

  const showFeedback = (message: string) => {
    setFeedback(message)
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current)
    feedbackTimer.current = setTimeout(() => setFeedback(''), 3500)
  }

  const shareWithFallback = async (platform: FallbackPlatform) => {
    const text = excerpt ? `${title}\n\n${excerpt}` : title
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: canonicalUrl })
        return
      } catch (error) {
        if (error && typeof error === 'object' && 'name' in error && error.name === 'AbortError') return
      }
    }

    const copied = await copyToClipboard(canonicalUrl)
    showFeedback(copied
      ? `Đã sao chép liên kết để chia sẻ lên ${platform}`
      : 'Không thể sao chép liên kết. Hãy sao chép URL trên thanh địa chỉ.')
  }

  const facebookParams = new URLSearchParams({ u: canonicalUrl })
  const xParams = new URLSearchParams({ text: title, url: canonicalUrl })

  return (
    <section className="cms-social-share" aria-labelledby="cms-share-heading">
      <h2 id="cms-share-heading">Chia sẻ bài viết</h2>
      <div className="cms-share-list">
        <a className="cms-share-button" href={`https://www.facebook.com/sharer/sharer.php?${facebookParams}`} target="_blank" rel="noopener noreferrer">
          {platformIcon('Facebook')}<span>Facebook</span>
        </a>
        <button className="cms-share-button" type="button" onClick={() => void shareWithFallback('Zalo')}>
          {platformIcon('Zalo')}<span>Zalo</span>
        </button>
        <button className="cms-share-button" type="button" onClick={() => void shareWithFallback('Threads')}>
          {platformIcon('Threads')}<span>Threads</span>
        </button>
        <button className="cms-share-button" type="button" onClick={() => void shareWithFallback('Instagram')}>
          {platformIcon('Instagram')}<span>Instagram</span>
        </button>
        <a className="cms-share-button" href={`https://x.com/intent/post?${xParams}`} target="_blank" rel="noopener noreferrer">
          {platformIcon('X')}<span>X</span>
        </a>
      </div>
      <p className="cms-share-feedback" role="status" aria-live="polite">{feedback}</p>
    </section>
  )
}
