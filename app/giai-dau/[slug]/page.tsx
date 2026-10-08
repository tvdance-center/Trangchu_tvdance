import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PublicPostPage } from '@/components/cms/PublicPostPage'
import { getPublishedPost } from '@/lib/cms/server'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPost('competition', slug)
  return post ? { title: post.seo_title || post.title, description: post.seo_description || post.excerpt } : {}
}

export default async function CompetitionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPublishedPost('competition', slug)
  if (!post) notFound()
  return <PublicPostPage post={post} />
}
