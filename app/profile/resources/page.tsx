"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function ResourcesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) router.push('/profile')
      setLoading(false)
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user data:', error.message)
        return
      }
      if (!user) {
        router.push('/profile')
      }
    }
    fetchUserData()
  }, [router])

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Learning Resources</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h3 className="font-medium">FreeCodeCamp</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Learn to code for free.
          </p>
          <div className="mt-4 flex justify-end">
            <a
              href="https://www.freecodecamp.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Visit
            </a>
          </div>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="font-medium">MDN Web Docs</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Comprehensive documentation for web technologies.
          </p>
          <div className="mt-4 flex justify-end">
            <a
              href="https://developer.mozilla.org/en-US/"
              target="_blank"
              rel="noopener noreferrer"
               className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Visit
            </a>
          </div>
        </div>
         <div className="rounded-lg border p-6">
          <h3 className="font-medium">Khan Academy</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Free courses on a variety of subjects, including computer science.
          </p>
          <div className="mt-4 flex justify-end">
            <a
              href="https://www.khanacademy.org/"
              target="_blank"
              rel="noopener noreferrer"
               className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Visit
            </a>
          </div>
        </div>
         <div className="rounded-lg border p-6">
          <h3 className="font-medium">Codecademy</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Interactive coding lessons.
          </p>
          <div className="mt-4 flex justify-end">
            <a
              href="https://www.codecademy.com/"
              target="_blank"
              rel="noopener noreferrer"
               className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Visit
            </a>
          </div>
        </div>
         <div className="rounded-lg border p-6">
          <h3 className="font-medium">The Odin Project</h3>
          <p className="text-sm text-muted-foreground mt-2">
            A free open source coding curriculum.
          </p>
          <div className="mt-4 flex justify-end">
            <a
              href="https://www.theodinproject.com/"
              target="_blank"
              rel="noopener noreferrer"
               className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Visit
            </a>
          </div>
        </div>
         <div className="rounded-lg border p-6">
          <h3 className="font-medium">Frontend Mentor</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Practice your HTML, CSS, and JavaScript skills with real design challenges.
          </p>
          <div className="mt-4 flex justify-end">
            <a
              href="https://www.frontendmentor.io/"
              target="_blank"
              rel="noopener noreferrer"
               className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Visit
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
