import { supabaseServer } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { ACHIEVEMENT_TYPES } from '@/lib/achievements'

export async function POST(req: Request) {
  const supabase = supabaseServer()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (!user || error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { type } = await req.json()
  
  // Check if user is GitHub-authenticated for contributions
  if (type === ACHIEVEMENT_TYPES.CONTRIBUTIONS) {
    const isGitHubUser = user?.app_metadata?.provider?.includes('github')
    
    if (!isGitHubUser) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }
  }

  const { data, error: dbError } = await supabase.rpc('increment_achievement', {
    user_id: user.id,
    achievement_type: type,
    increment_by: 1
  })

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
} 