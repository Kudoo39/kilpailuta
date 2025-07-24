import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '~/lib/features/auth/authSlice'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { Button } from '~/components/ui/button'
import { Menu as HeadlessMenu } from '@headlessui/react'
import { Menu as MenuIcon, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const { token, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()
  const DEFAULT_AVATAR = '/avatar.png'

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const handleLogout = () => {
    dispatch(logout())
    toast.info('Logged out successfully', { position: 'bottom-left' })
    router.push('/login')
    closeMenu()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'For Professionals', href: '/professionals' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  // Determine auth-specific links based on role
  let authLinks = []
  if (token) {
    const { role } = jwtDecode(token)
    if (role === 'pro')
      authLinks.push({ name: 'Profile', href: '/pro-profile' })
    if (role === 'client')
      authLinks.push({ name: 'Post Gig', href: '/post-gig' })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm'
    >
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/logo.png'
            alt='Logo'
            width={40}
            height={40}
            className='h-10 w-auto'
            onError={(e) => (e.target.src = '/fallback-logo.png')}
          />
          <span className='text-xl font-bold text-sky-800'>Kilpailuta</span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex items-center gap-8'>
          {/* Main nav links */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-gray-700 hover:text-sky-600 transition-colors font-medium'
            >
              {link.name}
            </Link>
          ))}

          {/* Avatar dropdown for auth */}
          {token ? (
            <HeadlessMenu as='div' className='relative'>
              <HeadlessMenu.Button className='focus:outline-none'>
                <div className='w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary ring-offset-2 ring-offset-base-100'>
                  <Image
                    src={user?.avatar || DEFAULT_AVATAR}
                    alt='User Avatar'
                    className='w-full h-full object-cover'
                    width={48}
                    height={48}
                  />
                </div>
              </HeadlessMenu.Button>
              <HeadlessMenu.Items className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50'>
                {authLinks.map((link) => (
                  <HeadlessMenu.Item key={link.name}>
                    {({ active }) => (
                      <Link
                        href={link.href}
                        className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''} text-gray-700`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </HeadlessMenu.Item>
                ))}
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''} text-gray-700`}
                    >
                      Logout
                    </button>
                  )}
                </HeadlessMenu.Item>
              </HeadlessMenu.Items>
            </HeadlessMenu>
          ) : (
            <Button
              asChild
              className='bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105'
            >
              <Link href='/register/client'>Get Started</Link>
            </Button>
          )}
        </div>

        {/* Mobile Controls: avatar + hamburger */}
        <div className='lg:hidden flex items-center gap-3'>
          {token && (
            <HeadlessMenu as='div' className='relative'>
              <HeadlessMenu.Button className='focus:outline-none'>
                <div className='w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary ring-offset-2 ring-offset-base-100'>
                  <Image
                    src={user?.avatar || DEFAULT_AVATAR}
                    alt='Avatar'
                    width={40}
                    height={40}
                    className='object-cover w-full h-full'
                  />
                </div>
              </HeadlessMenu.Button>
              <HeadlessMenu.Items className='absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg py-2 z-50'>
                {authLinks.map((link) => (
                  <HeadlessMenu.Item key={link.name}>
                    {({ active }) => (
                      <Link
                        href={link.href}
                        className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </HeadlessMenu.Item>
                ))}
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                    >
                      Logout
                    </button>
                  )}
                </HeadlessMenu.Item>
              </HeadlessMenu.Items>
            </HeadlessMenu>
          )}
          <button
            onClick={toggleMenu}
            className='p-2 text-gray-700 hover:text-sky-600 focus:outline-none'
          >
            {isOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <MenuIcon className='w-6 h-6' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200'
        >
          <div className='container mx-auto px-4 py-6 flex flex-col gap-4'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className='text-gray-700 hover:text-sky-600 transition-colors font-medium text-lg'
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            {!token && (
              <Button
                asChild
                className='bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full mt-4'
                onClick={closeMenu}
              >
                <Link href='/register/client'>Get Started</Link>
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
