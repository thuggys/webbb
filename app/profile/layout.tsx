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
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/')
      } else {
        setUser(session.user)
      }
    }
    checkAuth()
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

  return (
    <div className="flex min-h-screen w-full">
      <ProfileSidebar />
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  )
} 