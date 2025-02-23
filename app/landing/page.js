'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { jwtDecode } from 'jwt-decode'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import {
  Briefcase,
  Heart,
  Search,
  ThumbsUp,
  Globe,
  ChartBar,
  Share2,
  Users,
  Handshake,
  UserCircle,
  Building2,
  Rocket
} from 'lucide-react'
import { Marquee } from '~/components/magicui/marquee'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const jobTitles = [
  'Painter',
  'Electrician',
  'Plumber',
  'Chef',
  'Delivery Driver',
  'Graphic Designer',
  'Web Developer',
  'Marketing Specialist'
]

// Color theme constants
const COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  light: '#eef2ff',
  dark: '#1e1b4b'
}

export default function LandingPage() {
  const [currentJobTitle, setCurrentJobTitle] = useState(jobTitles[0])
  const [typingText, setTypingText] = useState('')
  const [typingIndex, setTypingIndex] = useState(0)
  const [userRole, setUserRole] = useState(null)
  const [idFromToken, setIdFromToken] = useState(null)
  const [isMounted, setIsMounted] = useState(false)

  // Rotate job titles every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJobTitle((prev) => {
        const currentIndex = jobTitles.indexOf(prev)
        return jobTitles[(currentIndex + 1) % jobTitles.length]
      })
      setTypingText('')
      setTypingIndex(0)
    }, 2400)
    return () => clearInterval(interval)
  }, [])

  // Simulate typing effect
  useEffect(() => {
    if (typingIndex < currentJobTitle.length) {
      const timeout = setTimeout(() => {
        setTypingText((prev) => prev + currentJobTitle[typingIndex])
        setTypingIndex((prev) => prev + 1)
      }, 80)
      return () => clearTimeout(timeout)
    }
  }, [typingIndex, currentJobTitle])

  // Auth check
  useEffect(() => {
    const token = typeof window !== 'undefined' && localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUserRole(decoded.role)
        setIdFromToken(decoded.id)
      } catch (error) {
        console.error('Token error:', error)
        localStorage.removeItem('token')
      }
    }
    setIsMounted(true)
  }, [])

  const getNavigationPath = (targetPath) =>
    userRole ? targetPath : '/register'

  if (!isMounted) return null

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[${COLORS.light}] via-white to-indigo-50 overflow-hidden relative`}
    >
      {/* Optimized background */}
      <div className='absolute inset-0'>
        <Image
          src='/background.svg'
          alt='Decorative background pattern'
          fill
          className='opacity-5'
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <main className='container mx-auto px-4 py-8 relative mt-2'>
        {/* Animated Marquee */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className='bg-gradient-to-r from-blue-900/20 to-sky-900/20 rounded-xl py-3 px-6 mb-16 backdrop-blur-lg border border-black-800/30 shadow-lg hover:shadow-xl transition-shadow'
        >
          <Marquee speed={40} className='text-white font-semibold'>
            {[
              {
                icon: Share2,
                text: 'Find top talent fast!',
                color: 'text-blue-500'
              },
              {
                icon: Rocket,
                text: 'Land your dream job today!',
                color: 'text-sky-500'
              },
              {
                icon: Users,
                text: 'Build your dream team!',
                color: 'text-blue-500'
              },
              {
                icon: ChartBar,
                text: 'Boost your career with expert advice!',
                color: 'text-sky-500'
              },
              {
                icon: Briefcase,
                text: 'Explore exciting job openings!',
                color: 'text-blue-500'
              },
              {
                icon: Handshake,
                text: 'Hire the best professionals effortlessly!',
                color: 'text-sky-500'
              }
            ].map((item, idx) => (
              <motion.span
                key={idx}
                className='mx-6 flex items-center gap-3'
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className={item.color}>{item.text}</span>
              </motion.span>
            ))}
          </Marquee>
        </motion.div>

        {/* Hero Section */}
        <section className='mb-28 relative px-1'>
          {/* Background gradient animation */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className='absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-500/10 rounded-xl blur-3xl'
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='relative z-10 text-left'
          >
            <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6'>
              <span className='block bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-400 mb-2'>
                Find & Connect
              </span>
              <span className='block text-gray-800 mb-2'>
                With Top-tier{' '}
                <motion.span
                  animate={{ opacity: [1, 0.8, 1], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className='inline-block'
                >
                  Professionals
                </motion.span>{' '}
                in
              </span>
              <span className='block bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-600'>
                {typingText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className='ml-1'
                >
                  |
                </motion.span>{' '}
                {/* Typing cursor */}
              </span>
            </h1>

            <p className='mt-6 text-xl text-gray-600 max-w-2xl'>
              Whether you&apos;re a{' '}
              <span className='font-semibold text-sky-600'>professional</span>{' '}
              looking for opportunities or a{' '}
              <span className='font-semibold text-blue-600'>company</span>{' '}
              seeking top talent, we&apos;ve got you covered.
            </p>
          </motion.div>

          {/* Floating shapes for visual interest */}
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className='absolute top-1/4 left-1/4 w-16 h-16 bg-sky-400/20 rounded-full blur-lg'
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className='absolute top-1/2 right-1/4 w-20 h-20 bg-blue-400/20 rounded-full blur-lg'
          />
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -30, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className='absolute bottom-1/4 left-1/2 w-24 h-24 bg-sky-600/20 rounded-full blur-lg'
          />
        </section>

        {/* Content */}
        <div className='relative z-10 text-center max-w-4xl mx-auto px-4'>
          <h2 className='text-4xl md:text-5xl font-extrabold tracking-tight mb-6'>
            <span className='block bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-400'>
              Find the Right Professionals
            </span>
          </h2>
          <p className='text-xl text-gray-600 mb-8'>
            Search for skilled professionals in any field. Whether you need an
            electrician, developer, or designer, we&apos;ve got you covered.
          </p>

          {/* Search Bar */}
          <div className='relative w-full max-w-2xl mx-auto'>
            <input
              type='text'
              placeholder='Search for professionals (e.g., electrician, developer)'
              className='w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none shadow-lg hover:shadow-xl transition-shadow'
            />
            <Button
              size='lg'
              className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105'
            >
              <Search className='w-5 h-5' />
            </Button>
          </div>

          {/* Autocomplete Suggestions */}
          <div className='mt-6 text-left max-w-2xl mx-auto'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>
              Popular Searches
            </h3>
            <div className='flex flex-wrap gap-3'>
              {[
                'Electrician',
                'Web Developer',
                'Graphic Designer',
                'Plumber',
                'Chef',
                'Marketing Specialist',
                'Delivery Driver',
                'Painter'
              ].map((job, idx) => (
                <Button
                  key={idx}
                  variant='outline'
                  className='text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors'
                >
                  {job}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
