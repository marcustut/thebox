import { useQuery } from '@apollo/client'
import { Provider, Session, User } from '@supabase/gotrue-js'
import { UserCredentials } from '@supabase/supabase-js'
import React, { useContext, useState, useEffect, useCallback } from 'react'

import { GET_USER } from '@/graphql'
import { GetUser, GetUserVariables, GetUser_user } from '@/graphql/types/GetUser'
import { supabase } from '@/lib/supabase'
import { clearItem, getItem, setItem } from '@/utils/storage'

export type UserWithAuth = {
  user: GetUser_user
  auth: Session
}

interface IAuthContext {
  signUp: (
    params: UserCredentials,
    options?:
      | {
          redirectTo?: string | undefined
          data?: object | undefined
        }
      | undefined
  ) => Promise<{
    user: User | null
    session: Session | null
    error: Error | null
    data: Session | User | null // Deprecated
  }>
  signIn: (
    params: UserCredentials,
    options?:
      | {
          redirectTo?: string | undefined
          scopes?: string | undefined
        }
      | undefined
  ) => Promise<{
    session: Session | null
    user: User | null
    provider?: Provider
    url?: string | null
    error: Error | null
    data: Session | null // Deprecated
  }>
  signOut: () => Promise<{ error: Error | null }>
  resetPassword: (
    email: string,
    options?:
      | {
          redirectTo?: string | undefined
        }
      | undefined
  ) => Promise<{ data: {} | null; error: Error | null }>
  updateUserCache: (newUser: UserWithAuth['user']) =>
    | {
        user: null
        error: Error
      }
    | {
        user: UserWithAuth
        error: null
      }
  refetch: () => void
  user?: UserWithAuth
  loading: boolean
}

const AuthContext = React.createContext<IAuthContext>({
  signIn: null as unknown as IAuthContext['signIn'],
  signUp: null as unknown as IAuthContext['signUp'],
  signOut: null as unknown as IAuthContext['signOut'],
  resetPassword: null as unknown as IAuthContext['resetPassword'],
  updateUserCache: null as unknown as IAuthContext['updateUserCache'],
  refetch: null as unknown as IAuthContext['refetch'],
  loading: false
})

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserWithAuth>()
  const [loading, setLoading] = useState<boolean>(true)
  const { refetch: fetchUser } = useQuery<GetUser, GetUserVariables>(GET_USER, { skip: true })

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session()
    const { data: cachedUser } = getItem<UserWithAuth>('token')
    ;(async () => {
      if (session && session.user) {
        setLoading(true)

        if (cachedUser) {
          setUser(cachedUser)
          setItem<UserWithAuth>('token', cachedUser)
        } else {
          const { data, error, errors } = await fetchUser({ user_id: session.user.id })
          if (error || errors || !data || !data.user) {
            console.error(errors)
            console.error(error)
            return
          }
          setUser({ user: data.user, auth: session })
          setItem<UserWithAuth>('token', { user: data.user, auth: session })
        }

        setLoading(false)
      }
    })()

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && session.user) {
        setLoading(true)

        if (cachedUser) {
          setUser(cachedUser)
          setItem<UserWithAuth>('token', cachedUser)
        } else {
          const { data, error, errors } = await fetchUser({ user_id: session.user.id })
          if (error || errors || !data || !data.user) {
            console.error(errors)
            console.error(error)
            return
          }
          setUser({ user: data.user, auth: session })
          setItem<UserWithAuth>('token', { user: data.user, auth: session })
        }

        switch (event) {
          case 'PASSWORD_RECOVERY':
            window.location.href = '/app/profile/recovery'
            break
          case 'SIGNED_IN':
            window.location.href = '/app'
            break
          case 'SIGNED_OUT':
            window.location.href = '/login'
            break
        }

        setLoading(false)
      }
    })

    return () => {
      listener?.unsubscribe()
    }
  }, [fetchUser])

  const updateUserCache = useCallback(
    (newUser: UserWithAuth['user']) => {
      if (!user) return { user: null, error: new Error('No cached user present currently') }
      setUser({ user: newUser, auth: user.auth })
      setItem<UserWithAuth>('token', { user: newUser, auth: user.auth })
      return { user, error: null }
    },
    [user]
  )

  const refetch = useCallback(async () => {
    if (!user) return { user: null, error: new Error('No cached user present currently') }
    const { data, error, errors } = await fetchUser({ user_id: user.user.id })
    if (error || errors || !data || !data.user) {
      console.error(errors)
      console.error(error)
      return
    }
    setUser({ user: data.user, auth: user.auth })
    setItem<UserWithAuth>('token', { user: data.user, auth: user.auth })
  }, [fetchUser, user])

  // Will be passed down to Signup, Login and Dashboard components
  const value: IAuthContext = {
    signUp: (params, options) => supabase.auth.signUp(params, options),
    signIn: (params, options) => supabase.auth.signIn(params, options),
    signOut: () => {
      setTimeout(() => (window.location.href = '/login'), 500)
      clearItem('token')
      return supabase.auth.signOut()
    },
    resetPassword: (email, options) => supabase.auth.api.resetPasswordForEmail(email, options),
    updateUserCache,
    refetch,
    user,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
