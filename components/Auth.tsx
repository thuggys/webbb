import { supabase } from '../lib/supabaseClient'

export default function Auth() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
    if (error) console.log('Error logging in:', error.message)
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error logging out:', error.message)
  }

  return (
    <div>
      <button onClick={handleLogin}>Sign in with GitHub</button>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  )
} 