'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Button } from '~/components/ui/button'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'For Professionals', href: '/professionals' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

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
          <img src='/logo.png' alt='Logo' className='h-10 w-auto' />
          <span className='text-xl font-bold text-sky-800'>Kilpailuta</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className='hidden lg:flex items-center gap-8'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-gray-700 hover:text-sky-600 transition-colors font-medium'
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Call-to-Action Button */}
        <div className='hidden lg:block'>
          <Button
            asChild
            className='bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105'
          >
            <Link href='/register'>Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className='lg:hidden p-2 text-gray-700 hover:text-sky-600 focus:outline-none'
        >
          {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200'
        >
          <div className='container mx-auto px-4 py-4 flex flex-col gap-4'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className='text-gray-700 hover:text-sky-600 transition-colors font-medium'
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            <Button
              asChild
              className='bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105'
              onClick={closeMenu}
            >
              <Link href='/register'>Get Started</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
