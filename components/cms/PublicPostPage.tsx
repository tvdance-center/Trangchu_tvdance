import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CmsContentView } from './CmsContent'
import { PublicCmsPost } from '@/lib/cms/types'
import { CmsImage } from './CmsImage'

const classKindLabels = {
  recruitment: 'Tuyển sinh',
  opening: 'Khai giảng',
  activity: 'Hoạt động lớp',
  gallery: 'Hình ảnh',
  video: 'Video',
} as const

function formatDate(value: string) {
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(new Date(value))
}

function safeHttpsUrl(value: string | null) {
  if (!value) return null
  try {
    return new URL(value).protocol === 'https:' ? value : null
  } catch {
    return null
  }
}

function safeVideoUrl(value: string | null) {
  const safe = safeHttpsUrl(value)
  if (!safe) return null
  const hostname = new URL(safe).hostname.toLowerCase()
  const host = hostname.replace(/^www\./, '')
  return ['youtube.com', 'youtu.be', 'facebook.com', 'fb.watch', 'vimeo.com'].includes(host) || hostname === 'm.facebook.com'
    ? safe
    : null
}

export function PublicPostPage({ post }: { post: PublicCmsPost }) {
  const isClass = post.type === 'class'
  const backHref = post.type === 'news' ? '/tin-tuc' : isClass && post.class_slug ? `/lop-hoc/${post.class_slug}` : '/giai-dau'
  const backLabel = post.type === 'news' ? 'Tin tức' : isClass ? post.class_name || 'Lớp học' : 'Giải đấu'
  const registrationUrl = safeHttpsUrl(post.registration_url)
  const videoUrl = safeVideoUrl(post.video_url)
  const classDetails = [
    ['Tên lớp', post.class_name],
    ['Ngày khai giảng', post.class_start_date ? formatDate(post.class_start_date) : null],
    ['Lịch học', post.class_schedule],
    ['Giáo viên', post.class_teacher],
    ['Học phí', post.class_tuition],
    ['Địa điểm', post.class_location],
  ].filter((item): item is [string, string] => Boolean(item[1]))
  return (
    <>
      <Header />
      <main className="cms-detail-page">
        <article className="shell cms-detail">
          <Link className="cms-back" href={backHref}>← {backLabel}</Link>
          <div className="cms-detail-heading">
            <span>{isClass && post.class_content_kind ? classKindLabels[post.class_content_kind] : post.category || (post.type === 'news' ? 'Tin tức' : 'Giải đấu')}</span>
            <h1>{post.title}</h1>
            {post.excerpt && <p>{post.excerpt}</p>}
            <time dateTime={post.class_start_date || post.event_date || post.published_at}>{formatDate(post.class_start_date || post.event_date || post.published_at)}</time>
            {(post.class_location || post.location) && <small>{post.class_location || post.location}</small>}
          </div>
          <div className="cms-detail-cover"><CmsImage sourceType={post.cover_source_type} storagePath={post.cover_image} externalUrl={post.cover_external_url} alt={post.cover_image_alt || post.title} priority mode="natural" /></div>
          {isClass && (classDetails.length > 0 || registrationUrl || videoUrl) && (
            <section className="cms-class-details" aria-label="Thông tin lớp học">
              {classDetails.length > 0 && <dl className="cms-class-meta">{classDetails.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
              {(registrationUrl || videoUrl) && <div className="cms-class-actions">
                {registrationUrl && <a className="button button-primary" href={registrationUrl} target="_blank" rel="noopener noreferrer">Đăng ký lớp</a>}
                {videoUrl && <a className="button button-ghost" href={videoUrl} target="_blank" rel="noopener noreferrer">Xem video</a>}
              </div>}
            </section>
          )}
          <CmsContentView content={post.content} />
        </article>
      </main>
      <Footer />
    </>
  )
}
