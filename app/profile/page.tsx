"use client"

import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { buttonVariants } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) router.push('/')
      setUser(session?.user ?? null)
      setLoading(false)
    }
    getSession()
  }, [router])

  if (loading) return <div>Loading...</div>
  if (!user) return <div>No user session found</div>

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Profile Overview</h1>
        <div className="rounded-lg border p-6">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Email</label>
            <p className="font-medium">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Recommended Resources</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h3 className="font-medium">HTML/CSS Fundamentals</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Master the basics of web development
            </p>
            <div className="mt-4 flex justify-end">
              <Link
                href="/docs/html-fundamentals"
                className={buttonVariants({ variant: "outline" })}
              >
                Start Learning
              </Link>
            </div>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="font-medium">JavaScript Deep Dive</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Advanced concepts and patterns
            </p>
            <div className="mt-4 flex justify-end">
              <Link
                href="/docs/javascript"
                className={buttonVariants({ variant: "outline" })}
              >
                Continue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
