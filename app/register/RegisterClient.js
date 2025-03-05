'use client'

import { useState, useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearError } from '~/lib/features/auth/authSlice'

export default function RegisterClient() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('client') // Default to 'client'
  const [search, setSearch] = useState('') // Store search value

  const dispatch = useDispatch()
  const { token, loading, error } = useSelector((state) => state.auth)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const searchQuery = searchParams.get('search')
    if (searchQuery) setSearch(decodeURIComponent(searchQuery))
  }, [searchParams])

  useEffect(() => {
    if (token) {
      const redirectPath = search
        ? `/search?query=${encodeURIComponent(search)}`
        : '/companies'
      router.push(redirectPath)
    }
  }, [token, search, router])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(clearError())
    dispatch(registerUser({ email, password, role }))
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-white rounded-xl shadow-lg p-8 max-w-md w-full'
      >
        <h1 className='text-3xl font-bold text-sky-800 mb-6 text-center'>
          Join Kilpailuta
        </h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-gray-700 mb-2' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all'
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-2' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Create a password'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all'
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-2' htmlFor='role'>
              I am here to:
            </label>
            <select
              id='role'
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all'
              disabled={loading}
            >
              <option value='pro'>Find Gigs (I&apos;m a Professional)</option>
              <option value='client'>Hire a Pro (I Need Help)</option>
            </select>
          </div>
          {search && (
            <p className='text-gray-600 text-sm'>
              Signing up to find pros for: <strong>{search}</strong>
            </p>
          )}
          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
          <Button
            type='submit'
            className='w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105'
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
        <p className='mt-4 text-center text-gray-600'>
          Already have an account?{' '}
          <Link href='/login' className='text-sky-600 hover:underline'>
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
