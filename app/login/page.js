'use client'

import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { motion } from 'framer-motion'
import { Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-50'>
      {/* Background Animation */}
      <div className='absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-500/10 rounded-xl blur-3xl' />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md bg-white rounded-xl shadow-2xl p-8 relative z-10'
      >
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-sky-800 mb-2'>Welcome Back</h1>
          <p className='text-gray-600'>Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form className='space-y-6'>
          {/* Email Input */}
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <div className='mt-1 relative'>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Enter your email'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none'
                required
              />
              <Mail className='w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2' />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <div className='mt-1 relative'>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Enter your password'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none'
                required
              />
              <Lock className='w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2' />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type='submit'
            className='w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105'
          >
            Sign In
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className='mt-6 text-center'>
          <p className='text-gray-600'>
            Don&apos;t have an account?{' '}
            <Link
              href='/register'
              className='text-sky-600 hover:text-sky-700 font-semibold'
            >
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
