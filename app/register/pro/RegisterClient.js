'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearError } from '~/lib/features/auth/authSlice'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const schema = yup
  .object({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    role: yup
      .string()
      .oneOf(['client', 'pro'], 'Role must be "client" or "pro"')
      .required('Role is required')
  })
  .required()

export default function RegisterClient() {
  const dispatch = useDispatch()
  const { loading, error, token } = useSelector((state) => state.auth)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (token) {
      toast.info('You are already logged in', {
        position: 'bottom-left'
      })
      router.push('/search')
    }
  }, [token, router])

  const onSubmit = async (data) => {
    dispatch(clearError())
    const result = await dispatch(registerUser(data))
    if (!result.error) {
      toast.success('Registration successful!', {
        position: 'bottom-left'
      })
      router.push(data.role === 'pro' ? '/pro-profile' : '/search')
    } else {
      toast.error(result.payload || 'Registration failed', {
        position: 'bottom-left'
      })
    }
  }

  if (token) return null

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-xl shadow-lg p-8 max-w-md w-full'>
        <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 mb-6 text-center'>
          Sign Up for Kilpailuta
        </h1>
        {loading && <p className='text-center text-gray-600'>Loading...</p>}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            <label className='block text-gray-700 mb-2' htmlFor='email'>
              Email
            </label>
            <input
              id='email'
              {...register('email')}
              placeholder='Enter your email'
              className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors.email ? 'border-red-500' : ''}`}
              disabled={loading}
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className='block text-gray-700 mb-2' htmlFor='password'>
              Password
            </label>
            <input
              id='password'
              type='password'
              {...register('password')}
              placeholder='Enter your password (min 6 chars)'
              className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors.password ? 'border-red-500' : ''}`}
              disabled={loading}
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className='block text-gray-700 mb-2' htmlFor='role'>
              Role
            </label>
            <div className='relative'>
              <input
                id='role'
                type='text'
                defaultValue="Find Gigs (I'm a Professional)"
                className='w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 cursor-default'
                readOnly
              />
              <input type='hidden' {...register('role')} value='pro' />
            </div>
            <p className='text-sm text-gray-500 mt-1'>
              You&apos;re registering as a pro
            </p>
          </div>
          <button
            type='submit'
            className='w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-70'
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className='mt-4 text-center text-gray-600'>
          Already have an account?{' '}
          <Link href='/login' className='text-purple-600 hover:underline'>
            Log In
          </Link>
        </p>
        <p className='mt-4 text-center text-gray-600'>
          Register as a client?{' '}
          <Link
            href='/register/client'
            className='text-purple-600 hover:underline'
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
