const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY

interface JsonResponseInit {
  readonly status: number
}

function jsonResponse(body: unknown, init: JsonResponseInit): Response {
  return new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json' },
    status: init.status,
  })
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, { status: 405 })
  }

  const authorization = request.headers.get('authorization')
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !authorization?.startsWith('Bearer ')) {
    return jsonResponse({ error: 'Unauthorized' }, { status: 401 })
  }

  const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      authorization,
    },
  })

  if (!userResponse.ok) {
    return jsonResponse({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await userResponse.json() as { readonly app_metadata?: { readonly role?: string; readonly roles?: readonly string[] } }
  const roles = Array.isArray(user.app_metadata?.roles) ? user.app_metadata.roles : user.app_metadata?.role ? [user.app_metadata.role] : []
  if (!roles.includes('admin')) {
    return jsonResponse({ error: 'Forbidden' }, { status: 403 })
  }

  return jsonResponse({ message: 'Authorized admin refresh placeholder. Wire data refresh job in deployment environment.' }, { status: 202 })
}
