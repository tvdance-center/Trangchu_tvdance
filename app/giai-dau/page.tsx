import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PublicPostList } from '@/components/cms/PublicPostList'
import { getPublishedPosts } from '@/lib/cms/server'

export const metadata = { title: 'Giải đấu' }

export default async function CompetitionsPage() {
  const posts = await getPublishedPosts('competition')
  return <><Header /><main className="cms-index-page"><div className="shell"><header className="cms-index-heading"><span>TV Dance Center</span><h1>Giải đấu</h1><p>Lịch thi đấu, hoạt động sân khấu và dấu ấn của các đội nhóm TV Dance.</p></header><PublicPostList posts={posts} type="competition" /></div></main><Footer /></>
}
