import { supabase } from '@/lib/supabaseClient'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: { Component: React.ComponentType<any>; pageProps: any }) {
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      // Handle global auth changes
      if (!session && router.pathname.startsWith('/profile')) {
        router.push('/')
      }
    })

    return () => authListener?.subscription.unsubscribe()
  }, [])

  return <Component {...pageProps} />
}

export default MyApp 