import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PublicPostList } from '@/components/cms/PublicPostList'
import { getPublishedClassPosts } from '@/lib/cms/server'
import { classes } from '@/lib/site-data'

export async function generateMetadata({ params }: { params: Promise<{ classSlug: string }> }): Promise<Metadata> {
  const { classSlug } = await params
  const posts = await getPublishedClassPosts(classSlug)
  const className = posts[0]?.class_name || classes.find((item) => item.slug === classSlug)?.name
  return className ? { title: className, description: `Thông tin tuyển sinh và hoạt động lớp ${className} tại TV Dance Center.` } : {}
}

export default async function ClassPage({ params }: { params: Promise<{ classSlug: string }> }) {
  const { classSlug } = await params
  const posts = await getPublishedClassPosts(classSlug)
  const staticClass = classes.find((item) => item.slug === classSlug)
  const className = posts[0]?.class_name || staticClass?.name
  if (!className) notFound()

  return <><Header /><main className="cms-index-page"><div className="shell"><header className="cms-index-heading"><span>Lớp học TV Dance</span><h1>{className}</h1><p>{staticClass?.description || `Nội dung tuyển sinh, khai giảng và hoạt động mới nhất của lớp ${className}.`}</p></header><PublicPostList posts={posts} type="class" />{posts.length === 0 && <Link className="button button-primary" href="/#lien-he">Liên hệ tư vấn</Link>}</div></main><Footer /></>
}
