import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CmsContentView } from './CmsContent'
import { cmsImageUrl } from '@/lib/cms/server'
import { PublicCmsPost } from '@/lib/cms/types'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(new Date(value))
}

export function PublicPostPage({ post }: { post: PublicCmsPost }) {
  const backHref = post.type === 'news' ? '/tin-tuc' : '/giai-dau'
  return (
    <>
      <Header />
      <main className="cms-detail-page">
        <article className="shell cms-detail">
          <Link className="cms-back" href={backHref}>← {post.type === 'news' ? 'Tin tức' : 'Giải đấu'}</Link>
          <div className="cms-detail-heading">
            <span>{post.category || (post.type === 'news' ? 'Tin tức' : 'Giải đấu')}</span>
            <h1>{post.title}</h1>
            {post.excerpt && <p>{post.excerpt}</p>}
            <time dateTime={post.event_date || post.published_at}>{formatDate(post.event_date || post.published_at)}</time>
            {post.location && <small>{post.location}</small>}
          </div>
          <div className="cms-detail-cover"><Image src={cmsImageUrl(post.cover_image)} alt={post.cover_image_alt || post.title} fill priority sizes="(max-width: 900px) 100vw, 1200px" /></div>
          <CmsContentView content={post.content} />
        </article>
      </main>
      <Footer />
    </>
  )
}
