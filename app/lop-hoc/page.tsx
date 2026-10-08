import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PublicPostList } from '@/components/cms/PublicPostList'
import { getPublishedPosts } from '@/lib/cms/server'

export const metadata = { title: 'Lớp học' }

export default async function ClassesPage() {
  const posts = await getPublishedPosts('class')
  return <><Header /><main className="cms-index-page"><div className="shell"><header className="cms-index-heading"><span>TV Dance Center</span><h1>Lớp học</h1><p>Tuyển sinh, lịch khai giảng, hoạt động và hình ảnh mới nhất từ các lớp tại TV Dance.</p></header><PublicPostList posts={posts} type="class" /></div></main><Footer /></>
}
