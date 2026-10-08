import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from '@/components/Icons'
import { cmsImageUrl } from '@/lib/cms/server'
import { CmsPostType, PublicCmsPost } from '@/lib/cms/types'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(value))
}

export function PublicPostList({ posts, type }: { posts: PublicCmsPost[]; type: CmsPostType }) {
  const base = type === 'news' ? '/tin-tuc' : '/giai-dau'
  if (posts.length === 0) return <p className="cms-empty">Chưa có nội dung được xuất bản.</p>
  return (
    <div className="cms-list-grid">
      {posts.map((post) => (
        <article className="cms-list-card" key={post.id}>
          <Link className="cms-list-image" href={`${base}/${post.slug}`}>
            <Image src={cmsImageUrl(post.cover_image)} alt={post.cover_image_alt || post.title} fill sizes="(max-width: 767px) 100vw, 50vw" />
            {post.category && <span>{post.category}</span>}
          </Link>
          <time dateTime={post.event_date || post.published_at}>{formatDate(post.event_date || post.published_at)}</time>
          <h2><Link href={`${base}/${post.slug}`}>{post.title}</Link></h2>
          {post.excerpt && <p>{post.excerpt}</p>}
          <Link className="news-link" href={`${base}/${post.slug}`}>Xem chi tiết <ArrowUpRight /></Link>
        </article>
      ))}
    </div>
  )
}
