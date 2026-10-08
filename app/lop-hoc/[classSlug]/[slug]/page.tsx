import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PublicPostPage } from '@/components/cms/PublicPostPage'
import { getPublishedClassPost } from '@/lib/cms/server'

export async function generateMetadata({ params }: { params: Promise<{ classSlug: string; slug: string }> }): Promise<Metadata> {
  const { classSlug, slug } = await params
  const post = await getPublishedClassPost(classSlug, slug)
  return post ? { title: post.seo_title || post.title, description: post.seo_description || post.excerpt } : {}
}

export default async function ClassPostDetailPage({ params }: { params: Promise<{ classSlug: string; slug: string }> }) {
  const { classSlug, slug } = await params
  const post = await getPublishedClassPost(classSlug, slug)
  if (!post) notFound()
  return <PublicPostPage post={post} />
}
