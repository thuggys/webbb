import { supabase } from './supabaseClient'
import { User } from '@supabase/supabase-js'

export const ACHIEVEMENT_TYPES = {
  LESSONS: 'lessons',
  CHALLENGES: 'challenges',
  CONTRIBUTIONS: 'contributions'
} as const

export async function getAchievements(userId: string) {
  return supabase
    .from('achievements')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })
}

export async function initializeUserAchievements(user: User) {
  // Safely handle provider type conversion
  const providers = ((user.app_metadata.provider || []) as unknown) as string[];
  const isGitHubUser = providers.includes('github');

  // Define base achievements with explicit type
  const baseAchievements: Array<{
    user_id: string
    type: keyof typeof ACHIEVEMENT_TYPES
    progress: number
    target: number
  }> = [
    {
      user_id: user.id,
      type: 'LESSONS',
      progress: 0,
      target: 5
    },
    {
      user_id: user.id,
      type: 'CHALLENGES',
      progress: 0,
      target: 10
    }
  ]

  if (isGitHubUser) {
    baseAchievements.push({
      user_id: user.id,
      type: 'CONTRIBUTIONS',
      progress: 0,
      target: 1
    })
  }

  const { error } = await supabase.from('achievements').upsert(baseAchievements)
  return { error }
}

export const checkAchievementProgress = async () => {
  return { success: true }
} 