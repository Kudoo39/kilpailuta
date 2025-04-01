'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logout, clearError } from '~/lib/features/auth/authSlice'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const schema = yup
  .object({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup.string().required('Password is required')
  })
  .required()

export default function LoginClient() {
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
    const result = await dispatch(loginUser(data))
    if (!result.error) {
      toast.success('Login successful!', {
        position: 'bottom-left'
      })
      router.push('/search')
    } else {
      toast.error(result.payload || 'Login failed', {
        position: 'bottom-left'
      })
    }
  }

  if (token) return null

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-xl shadow-lg p-8 max-w-md w-full'>
        <h1 className='text-3xl font-bold text-sky-800 mb-6 text-center'>
          Log In to Kilpailuta
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
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 ${errors.email ? 'border-red-500' : ''}`}
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
              placeholder='Enter your password'
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 ${errors.password ? 'border-red-500' : ''}`}
              disabled={loading}
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>
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
