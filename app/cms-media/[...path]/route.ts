import { NextResponse } from 'next/server'

const PATH_PATTERN = /^(news|competitions)\/[0-9a-f-]{36}\/[0-9a-f-]{36}\.(jpg|jpeg|png|webp|avif)$/i

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const storagePath = path.join('/')
  if (!PATH_PATTERN.test(storagePath)) return new NextResponse('Not found', { status: 404 })

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!baseUrl || !anonKey) return new NextResponse('Not configured', { status: 503 })

  const upstream = await fetch(`${baseUrl}/storage/v1/object/authenticated/website-media/${storagePath}`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    next: { revalidate: 60 },
  })
  if (!upstream.ok || !upstream.body) return new NextResponse('Not found', { status: upstream.status === 404 ? 404 : 502 })

  return new NextResponse(upstream.body, {
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'application/octet-stream',
      'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=60',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
