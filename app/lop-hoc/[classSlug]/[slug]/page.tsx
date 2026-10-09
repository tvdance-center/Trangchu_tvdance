import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PublicPostPage } from '@/components/cms/PublicPostPage'
import { buildPostMetadata } from '@/lib/cms/metadata'
import { getPublishedClassPost } from '@/lib/cms/server'

export async function generateMetadata({ params }: { params: Promise<{ classSlug: string; slug: string }> }): Promise<Metadata> {
  const { classSlug, slug } = await params
  const post = await getPublishedClassPost(classSlug, slug)
  return post ? buildPostMetadata(post) : {}
}

export default async function ClassPostDetailPage({ params }: { params: Promise<{ classSlug: string; slug: string }> }) {
  const { classSlug, slug } = await params
  const post = await getPublishedClassPost(classSlug, slug)
  if (!post) notFound()
  return <PublicPostPage post={post} />
}
