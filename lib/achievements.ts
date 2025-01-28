import { supabase } from './supabaseClient'

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

export async function initializeUserAchievements(user: any) {
  const providers = user.app_metadata.provider || []
  const isGitHubUser = providers.includes('github')

  const baseAchievements = [
    {
      user_id: user.id,
      type: ACHIEVEMENT_TYPES.LESSONS,
      progress: 0,
      target: 5
    },
    {
      user_id: user.id,
      type: ACHIEVEMENT_TYPES.CHALLENGES,
      progress: 0,
      target: 10
    }
  ]

  if (isGitHubUser) {
    baseAchievements.push({
      user_id: user.id,
      type: ACHIEVEMENT_TYPES.CONTRIBUTIONS,
      progress: 0,
      target: 1
    })
  }

  const { error } = await supabase.from('achievements').upsert(baseAchievements)
  return { error }
}

export const checkAchievementProgress = async (userId: string, type: AchievementType, data?: Record<string, unknown>) => {
  // Implementation of the function
} 