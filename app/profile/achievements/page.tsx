"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { getAchievements } from '@/lib/achievements'
import { Progress } from '@/components/ui/progress'
import { ACHIEVEMENT_TYPES } from '@/lib/achievements'
import { User } from '@supabase/supabase-js'

interface Achievement {
  id: string
  user_id: string
  type: string
  progress: number
  target: number
  created_at: string
}

export default function AchievementsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const router = useRouter()

  useEffect(() => {
    const loadAchievements = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/')
      
      setUser(user)
      const { data } = await getAchievements(user.id)
      setAchievements(data || [])
    }

    loadAchievements()

    const channel = supabase.channel('achievements')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'achievements'
      }, () => loadAchievements())
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [router])

  const filteredAchievements = achievements.filter(achievement => {
    if (achievement.type === ACHIEVEMENT_TYPES.CONTRIBUTIONS) {
      return user?.app_metadata?.provider?.includes('github')
    }
    return true
  })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Achievements</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAchievements.map((achievement) => (
          <div key={achievement.id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium capitalize">{achievement.type}</h3>
              <span className="text-sm text-muted-foreground">
                {achievement.progress}/{achievement.target}
              </span>
            </div>
            <Progress value={(achievement.progress / achievement.target) * 100} />
            {achievement.progress >= achievement.target && (
              <div className="mt-2 text-sm text-green-500 flex items-center">
                <span className="mr-1">🎉</span>
                Achievement Unlocked!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}