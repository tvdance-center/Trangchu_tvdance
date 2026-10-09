import Link from 'next/link'
import { ArrowUpRight } from '@/components/Icons'
import { CmsPostType, PublicCmsPost } from '@/lib/cms/types'
import { CmsImage } from './CmsImage'

const classKindLabels = {
  recruitment: 'Tuyển sinh',
  opening: 'Khai giảng',
  activity: 'Hoạt động lớp',
  gallery: 'Hình ảnh',
  video: 'Video',
} as const

function formatDate(value: string) {
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(value))
}

export function PublicPostList({ posts, type }: { posts: PublicCmsPost[]; type: CmsPostType }) {
  const postHref = (post: PublicCmsPost) => {
    if (type === 'class' && post.class_slug) return `/lop-hoc/${post.class_slug}/${post.slug}`
    return `${type === 'news' ? '/tin-tuc' : '/giai-dau'}/${post.slug}`
  }
  const badge = (post: PublicCmsPost) => {
    if (post.type === 'class') return post.class_content_kind ? classKindLabels[post.class_content_kind] : 'Lớp học'
    return post.category || (post.type === 'news' ? 'Tin tức' : 'Giải đấu')
  }
  if (posts.length === 0) return <p className="cms-empty">Chưa có nội dung được xuất bản.</p>
  return (
    <div className="cms-list-grid">
      {posts.map((post) => (
        <article className="cms-list-card" key={post.id}>
          <Link className="cms-list-image" href={postHref(post)}>
            <CmsImage sourceType={post.cover_source_type} storagePath={post.cover_image} externalUrl={post.cover_external_url} alt={post.cover_image_alt || post.title} sizes="(max-width: 767px) 100vw, 50vw" />
            <span>{badge(post)}</span>
          </Link>
          <time dateTime={post.class_start_date || post.event_date || post.published_at}>{formatDate(post.class_start_date || post.event_date || post.published_at)}</time>
          <h2><Link href={postHref(post)}>{post.title}</Link></h2>
          {post.excerpt && <p>{post.excerpt}</p>}
          <Link className="news-link" href={postHref(post)}>Xem chi tiết <ArrowUpRight /></Link>
        </article>
      ))}
    </div>
  )
}
