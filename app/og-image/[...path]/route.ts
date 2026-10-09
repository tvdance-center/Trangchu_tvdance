import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const PATH_PATTERN = /^(news|competitions|classes)\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|jpeg|png|webp|avif)$/i
const ALLOWED_IMAGE_TYPES = new Set([
  'image/avif',
  'image/jpeg',
  'image/png',
  'image/webp',
])

function safeResponse(message: string, status: number) {
  return new NextResponse(message, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const storagePath = path.join('/')
  if (!PATH_PATTERN.test(storagePath)) return safeResponse('Not found', 404)

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!baseUrl || !anonKey) return safeResponse('Not configured', 503)

  const encodedPath = storagePath.split('/').map(encodeURIComponent).join('/')
  let upstream: Response

  try {
    upstream = await fetch(`${baseUrl}/storage/v1/object/authenticated/website-media/${encodedPath}`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
      cache: 'no-store',
    })
  } catch {
    return safeResponse('Upstream unavailable', 502)
  }

  if (!upstream.ok || !upstream.body) {
    const status = [400, 401, 403, 404].includes(upstream.status) ? 404 : 502
    return safeResponse(status === 404 ? 'Not found' : 'Upstream unavailable', status)
  }

  const contentType = upstream.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase()
  if (!contentType || !ALLOWED_IMAGE_TYPES.has(contentType)) {
    return safeResponse('Invalid image response', 502)
  }

  const headers = new Headers({
    'Cache-Control': 'public, max-age=300, s-maxage=300',
    'Content-Type': contentType,
    'X-Content-Type-Options': 'nosniff',
  })
  const contentLength = upstream.headers.get('content-length')
  if (contentLength) headers.set('Content-Length', contentLength)

  return new NextResponse(upstream.body, { headers })
}
