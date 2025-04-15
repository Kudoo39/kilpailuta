'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { jwtDecode } from 'jwt-decode'
import { Button } from '~/components/ui/button'
import {
  Briefcase,
  Search,
  ChartBar,
  Share2,
  Users,
  Handshake,
  Rocket
} from 'lucide-react'
import { Marquee } from '~/components/magicui/marquee'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const jobTitles = [
  'Frontend Developer',
  'Plumber',
  'Graphic Designer',
  'Electrician',
  'Content Writer',
  'Painter',
  'Web Developer',
  'Chef'
]

// Color theme constants
const COLORS = {
  primary: '#8b5cf6', // Purple
  secondary: '#6366f1', // Indigo
  light: '#f5f3ff', // Light purple
  dark: '#1e1b4b'
}

export default function ProfessionalsLandingPage() {
  const [currentJobTitle, setCurrentJobTitle] = useState(jobTitles[0])
  const [typingText, setTypingText] = useState('')
  const [typingIndex, setTypingIndex] = useState(0)
  const [userRole, setUserRole] = useState(null)
  const [idFromToken, setIdFromToken] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()

  // Rotate job titles every 2.4 seconds
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
    userRole ? targetPath : '/register/pro'

  // Handler for clicking popular job buttons
  const handlePopularJobClick = (job) => {
    setSearchValue(job)
  }

  // Handler for search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (!searchValue.trim()) return // Prevent empty searches
    if (userRole) {
      // Logged in: go to results (e.g., a professionals dashboard or search)
      router.push(`/search?query=${encodeURIComponent(searchValue)}`)
    } else {
      // Not logged in: go to register with search value
      router.push(`/register/pro?search=${encodeURIComponent(searchValue)}`)
    }
  }

  if (!isMounted) return null

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[${COLORS.light}] via-white to-purple-50 overflow-hidden relative`}
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
          className='bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-xl py-3 px-6 mb-16 backdrop-blur-lg border border-purple-800/30 shadow-lg hover:shadow-xl transition-shadow'
        >
          <Marquee speed={40} className='text-white font-semibold'>
            {[
              {
                icon: Share2,
                text: 'Find gigs that fit your skills!',
                color: 'text-purple-500'
              },
              {
                icon: Rocket,
                text: 'Start earning quickly!',
                color: 'text-indigo-500'
              },
              {
                icon: Users,
                text: 'Connect with people who need you!',
                color: 'text-purple-500'
              },
              {
                icon: ChartBar,
                text: 'Grow your reputation fast!',
                color: 'text-indigo-500'
              },
              {
                icon: Briefcase,
                text: 'Pick up flexible work today!',
                color: 'text-purple-500'
              },
              {
                icon: Handshake,
                text: 'Get hired for your expertise!',
                color: 'text-indigo-500'
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

        {/* Search Section */}
        <div className='relative z-10 text-left max-w-4xl mx-auto px-4 pb-36'>
          <h2 className='text-4xl md:text-5xl font-extrabold tracking-tight mb-6'>
            <span className='block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400'>
              Discover Your Next Gig
            </span>
          </h2>
          <p className='text-xl text-gray-600 mb-8'>
            Search for tasks and opportunities that need your skills. From quick
            fixes to creative projects, find work that fits your schedule.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className='relative w-full'>
            <input
              type='text'
              placeholder='Search for gigs (e.g., electrician, designer)'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className='w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none shadow-lg hover:shadow-xl transition-shadow'
            />
            <Button
              type='submit' // Changed from no type to submit
              size='lg'
              className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105'
            >
              <Search className='w-5 h-5' />
            </Button>
          </form>

          {/* Autocomplete Suggestions */}
          <div className='mt-6'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>
              Popular Gigs
            </h3>
            <div className='flex flex-wrap gap-3'>
              {[
                'Frontend Developer',
                'Plumber',
                'Graphic Designer',
                'Electrician',
                'Content Writer',
                'Painter',
                'Web Developer',
                'Chef'
              ].map((job, idx) => (
                <Button
                  key={idx}
                  variant='outline'
                  className='text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors'
                  onClick={() => handlePopularJobClick(job)}
                >
                  {job}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className='mb-28 relative px-1'>
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl blur-3xl'
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='relative z-10 text-left'
          >
            <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6'>
              <span className='block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 mb-2'>
                Earn & Thrive
              </span>
              <span className='block text-gray-800 mb-2'>
                With Your{' '}
                <motion.span
                  animate={{ opacity: [1, 0.8, 1], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className='inline-block'
                >
                  Skills
                </motion.span>{' '}
                as a
              </span>
              <span className='block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600'>
                {typingText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className='ml-1'
                >
                  |
                </motion.span>
              </span>
            </h1>
            <p className='mt-6 text-xl text-gray-600 max-w-2xl'>
              Are you a{' '}
              <span className='font-semibold text-purple-600'>developer</span>,
              a <span className='font-semibold text-indigo-600'>plumber</span>,
              or a{' '}
              <span className='font-semibold text-purple-600'>designer</span>?
              Find gigs and tasks that match your expertise and start earning
              today.
            </p>
          </motion.div>
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className='absolute top-1/4 left-1/4 w-16 h-16 bg-purple-400/20 rounded-full blur-lg'
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className='absolute top-1/2 right-1/4 w-20 h-20 bg-indigo-400/20 rounded-full blur-lg'
          />
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -30, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className='absolute bottom-1/4 left-1/2 w-24 h-24 bg-purple-600/20 rounded-full blur-lg'
          />
        </section>
      </main>
    </div>
  )
}
