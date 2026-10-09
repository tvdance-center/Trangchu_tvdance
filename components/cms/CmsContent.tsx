import Link from 'next/link'
import { CmsContent } from '@/lib/cms/types'
import { CmsImage } from './CmsImage'

function safeUrl(value: string) {
  if (value.startsWith('/') || value.startsWith('#')) return value
  try {
    const url = new URL(value)
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? value : '#'
  } catch {
    return '#'
  }
}

export function CmsContentView({ content }: { content: CmsContent }) {
  const blocks = Array.isArray(content?.blocks) ? content.blocks : []
  return (
    <div className="cms-content">
      {blocks.map((block) => {
        if (!block || typeof block !== 'object' || !('type' in block)) return null
        switch (block.type) {
          case 'paragraph': return <p key={block.id}>{block.text}</p>
          case 'heading': return block.level === 3 ? <h3 key={block.id}>{block.text}</h3> : <h2 key={block.id}>{block.text}</h2>
          case 'list': {
            const items = Array.isArray(block.items) ? block.items : []
            return block.style === 'numbered'
              ? <ol key={block.id}>{items.map((item, index) => <li key={`${block.id}-${index}`}>{item}</li>)}</ol>
              : <ul key={block.id}>{items.map((item, index) => <li key={`${block.id}-${index}`}>{item}</li>)}</ul>
          }
          case 'quote': return <blockquote key={block.id}><p>{block.text}</p>{block.attribution && <cite>{block.attribution}</cite>}</blockquote>
          case 'link': return <p key={block.id}><Link className="cms-inline-link" href={safeUrl(block.url)}>{block.text}</Link></p>
          case 'image': return <figure key={block.id}><div className="cms-content-image"><CmsImage sourceType={block.sourceType} storagePath={block.storagePath} externalUrl={block.url} alt={block.alt || ''} mode="natural" /></div>{block.caption && <figcaption>{block.caption}</figcaption>}</figure>
          case 'gallery': return <div key={block.id} className="cms-gallery">{(Array.isArray(block.items) ? block.items : []).map((item, index) => <figure key={`${item.sourceType || 'storage'}-${item.url || item.storagePath || index}`}><div className="cms-gallery-image"><CmsImage sourceType={item.sourceType} storagePath={item.storagePath} externalUrl={item.url} alt={item.alt || ''} sizes="(max-width: 600px) 100vw, 380px" /></div>{item.caption && <figcaption>{item.caption}</figcaption>}</figure>)}</div>
          default: return null
        }
      })}
    </div>
  )
}
