import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PublicPostList } from '@/components/cms/PublicPostList'
import { getPublishedPosts } from '@/lib/cms/server'

export const metadata = { title: 'Tin tức' }

export default async function NewsPage() {
  const posts = await getPublishedPosts('news')
  return <><Header /><main className="cms-index-page"><div className="shell"><header className="cms-index-heading"><span>TV Dance Center</span><h1>Tin tức</h1><p>Câu chuyện từ phòng tập, phong cách và cộng đồng yêu nhảy.</p></header><PublicPostList posts={posts} type="news" /></div></main><Footer /></>
}
