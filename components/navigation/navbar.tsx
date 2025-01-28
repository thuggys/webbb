"use client";

import Link from "next/link"
import { GitHubLink, Navigations } from "@/settings/navigation"
import { LuArrowUpRight, LuGithub, LuUser, LuMail } from "react-icons/lu"
import { FiZap } from "react-icons/fi"

import { buttonVariants } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"
import Anchor from "@/components/navigation/anchor"
import { Logo } from "@/components/navigation/logo"
import Search from "@/components/navigation/search"
import { SheetLeft } from "@/components/navigation/sidebar"
import { ModeToggle } from "@/components/navigation/theme-toggle"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DialogTrigger } from "@/components/ui/dialog"
import { DialogTrigger as RadixDialogTrigger } from "@radix-ui/react-dialog"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"
import { toast } from 'sonner'
import { User } from '@supabase/supabase-js'

type NavMenuProps = {
  isSheet?: boolean
  user?: User | null
}

export function Navbar() {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [currentView, setCurrentView] = useState<"options" | "email">("options")
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authView, setAuthView] = useState<'login' | 'signup'>('login')
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      // Always show welcome modal on login
      setShowWelcome(true)
      
      // For testing: Reset storage when needed
      // localStorage.removeItem(`welcomeShown_${user.id}`)
    }
  }, [user])

  const handleOAuthLogin = async (provider: "github" | "google") => {
    const { error } = await supabase.auth.signInWithOAuth({ provider })
    if (error) {
      toast.error('Login failed', {
        description: error.message
      })
    }
  }

  const handleEmailAuth = async () => {
    if (authView === 'signup' && password !== confirmPassword) {
      toast.error("Passwords don't match!")
      return
    }

    try {
      if (authView === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        toast.success('Check your email for confirmation!')
        setAuthView('login')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        toast.success('Welcome back!')
      }
    } catch (error) {
      toast.error('Authentication failed', {
        description: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Logout failed', {
        description: error.message
      })
    } else {
      toast('Successfully signed out')
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full h-16 border-b backdrop-filter backdrop-blur-xl bg-opacity-5 md:px-4 px-2">
      <div className="mx-auto flex h-full items-center justify-between p-1 sm:p-3 md:gap-2">
        <div className="flex items-center gap-5">
          <SheetLeft />
          <div className="flex items-center gap-6">
            <div className="hidden md:flex">
              <Logo />
            </div>
            <div className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
              <NavMenu user={user} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Search />
          <div className="flex sm:ml-0 gap-2">
            {GitHubLink.href && (
              <Link
                href={GitHubLink.href}
                className={buttonVariants({ variant: "outline", size: "icon" })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View the repository on GitHub"
              >
                <LuGithub className="w-[1.1rem] h-[1.1rem]" />
              </Link>
            )}
            <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
              <DialogTrigger asChild>
                <button
                  className={buttonVariants({ variant: "outline", size: "icon" })}
                  aria-label="Login"
                >
                  <LuUser className="w-[1.1rem] h-[1.1rem]" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] overflow-hidden">
                <DialogHeader>
                  <DialogTitle>{authView === 'signup' ? 'Create Account' : 'Welcome Back'}</DialogTitle>
                </DialogHeader>
                
                <AnimatePresence initial={false} mode="wait">
                  {!user ? (
                    currentView === "options" ? (
                      <motion.div
                        key="options"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex flex-col gap-4 py-4"
                      >
                        <button
                          className={buttonVariants({ variant: "outline", className: "gap-2" })}
                          onClick={() => handleOAuthLogin("github")}
                        >
                          <LuGithub className="w-5 h-5" />
                          Continue with GitHub
                        </button>
                        <button
                          className={buttonVariants({ variant: "outline", className: "gap-2" })}
                          onClick={() => setCurrentView("email")}
                        >
                          <LuMail className="w-5 h-5" />
                          Continue with Email
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="email"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex flex-col gap-4 py-4"
                      >
                        <button
                          onClick={() => setCurrentView("options")}
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-2"
                        >
                          <LuArrowUpRight className="w-4 h-4 rotate-180" />
                          Back to login options
                        </button>
                        <div className="space-y-2">
                          <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-3 py-2 border rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-3 py-2 border rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {authView === 'signup' && (
                            <input
                              type="password"
                              placeholder="Confirm Password"
                              className="w-full px-3 py-2 border rounded-md"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                          )}
                        </div>
                        <button
                          className={buttonVariants({ className: "gap-2" })}
                          onClick={handleEmailAuth}
                        >
                          {authView === 'signup' ? 'Sign Up' : 'Sign In'}
                        </button>
                        <p className="text-center text-sm text-muted-foreground">
                          {authView === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
                          <button
                            onClick={() => setAuthView(authView === 'signup' ? 'login' : 'signup')}
                            className="underline hover:text-primary"
                          >
                            {authView === 'signup' ? 'Login instead' : 'Sign up'}
                          </button>
                        </p>
                      </motion.div>
                    )
                  ) : (
                    <motion.div
                      key="logged-in"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="flex flex-col gap-4 py-4"
                    >
                      <Link
                        href="/profile"
                        onClick={() => setIsAuthModalOpen(false)}
                        className={buttonVariants({ className: 'w-full' })}
                      >
                        View Profile
                      </Link>
                      <button
                        className={buttonVariants({ variant: "destructive" })}
                        onClick={handleLogout}
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </DialogContent>
            </Dialog>
            <ModeToggle />
          </div>
        </div>
      </div>
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="bg-black/80 backdrop-blur-sm border-2 border-amber-400/30 shadow-lg shadow-amber-400/20">
          <div className="relative z-10">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-3xl">
                <FiZap className="text-amber-400 animate-pulse" />
                <span className="bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
                  Welcome to Web Dev Academy!
                </span>
                <FiZap className="text-amber-400 animate-pulse" />
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-amber-100/90 space-y-4 text-center"
              >
                <p className="text-lg">
                  Learn through doc-based learning
                </p>
                <p className="text-sm opacity-80">
                  There are plenty of resources out there and you can find curated ones here.
                </p>
                <p className="text-sm opacity-80">
                  I hope this site helps you master web development!
                </p>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-2 mt-6"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="checkbox"
                  id="dontShowAgain"
                  className="w-5 h-5 accent-amber-600/80 checked:bg-amber-500"
                  onChange={(e) => {
                    if (e.target.checked && user) {
                      localStorage.setItem(`welcomeShown_${user?.id}`, 'true')
                    }
                  }}
                />
                <label htmlFor="dontShowAgain" className="text-amber-300/80 text-sm">
                  Don&apos;t show this welcome message again
                </label>
              </motion.div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  )
}

export function NavMenu({ isSheet = false, user }: NavMenuProps) {
  return (
    <>
      {Navigations.map((item) => {
        const Comp = (
          <Anchor
            key={item.title + item.href}
            activeClassName="font-bold text-primary"
            absolute
            className="flex items-center gap-1 text-sm"
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
          >
            {item.title}{" "}
            {item.external && (
              <LuArrowUpRight className="w-3 h-3 align-super" strokeWidth={3} />
            )}
          </Anchor>
        )
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        )
      })}
      {user && (
        <Anchor
          href="/profile"
          activeClassName="font-bold text-primary"
          className="flex items-center gap-1 text-sm"
        >
          Profile
        </Anchor>
      )}
    </>
  )
}
