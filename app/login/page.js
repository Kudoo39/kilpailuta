'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError } from '~/lib/features/auth/authSlice'
import Link from 'next/link'

export default function LoginClient() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearError())
    const result = await dispatch(loginUser({ email, password }))
    if (!result.error) {
      router.push('/search') // Redirect after login
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-xl shadow-lg p-8 max-w-md w-full'>
        <h1 className='text-3xl font-bold text-sky-800 mb-6 text-center'>
          Log In to Kilpailuta
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
              className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500'
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
              placeholder='Enter your password'
              className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500'
              required
              disabled={loading}
            />
          </div>
          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
          <button
            type='submit'
            className='w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 disabled:bg-sky-400'
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <p className='mt-4 text-center text-gray-600'>
          Don&apos;t have an account?{' '}
          <Link href='/register' className='text-sky-600 hover:underline'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
