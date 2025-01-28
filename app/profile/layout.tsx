"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import ProfileSidebar from "./sidebar"
import { getAchievements, initializeUserAchievements } from "@/lib/achievements"
import { User } from '@supabase/supabase-js'

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push('/')
      } else {
        setUser(session.user)
      }
    })

    // Immediately check session instead of async
    const session = supabase.auth.getSession()
    if (!session) router.push('/')

    return () => subscription?.unsubscribe()
  }, [router])

  useEffect(() => {
    const initializeAchievements = async () => {
      if (user) {
        const { data } = await getAchievements(user.id)
        if (!data?.length) {
          await initializeUserAchievements(user)
        }
      }
    }
    initializeAchievements()
  }, [user])

  // Show loading state while checking auth
  if (!user) return <div className="flex-1 p-6 md:p-10">Loading...</div>

  return (
    <div className="flex min-h-screen w-full">
      <ProfileSidebar />
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  )
} 