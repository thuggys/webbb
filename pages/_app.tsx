import type { AppProps } from 'next/app'
import { supabase } from '@/lib/supabaseClient'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      // Handle global auth changes
      if (!session && router.pathname.startsWith('/profile')) {
        router.push('/')
      }
    })

    return () => authListener?.subscription.unsubscribe()
  }, [router])

  return <Component {...pageProps} />
}

export default MyApp 