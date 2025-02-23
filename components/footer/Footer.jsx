'use client'

import { Button } from '~/components/ui/button'
import { motion } from 'framer-motion'
import { Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className='bg-gradient-to-br from-sky-50 to-blue-50 border-t border-gray-200'>
      <div className='container mx-auto px-4 py-12'>
        {/* Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold text-sky-800'>Kilpailuta</h3>
            <p className='text-gray-600'>
              Connecting companies with top-tier professionals to build the
              future of work.
            </p>
            <div className='flex items-center gap-4'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 hover:text-sky-600 transition-colors'
              >
                <Facebook className='w-5 h-5' />
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 hover:text-sky-600 transition-colors'
              >
                <Twitter className='w-5 h-5' />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 hover:text-sky-600 transition-colors'
              >
                <Instagram className='w-5 h-5' />
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 hover:text-sky-600 transition-colors'
              >
                <Linkedin className='w-5 h-5' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-sky-800'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='/about'
                  className='text-gray-600 hover:text-sky-600 transition-colors'
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href='/services'
                  className='text-gray-600 hover:text-sky-600 transition-colors'
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href='/careers'
                  className='text-gray-600 hover:text-sky-600 transition-colors'
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href='/contact'
                  className='text-gray-600 hover:text-sky-600 transition-colors'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-sky-800'>Resources</h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='/blog'
                  className='text-gray-600 hover:text-sky-600 transition-colors'
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href='/faq'
                  className='text-gray-600 hover:text-sky-600 transition-colors'
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href='/privacy-policy'
                  className='text-gray-600 hover:text-sky-600 transition-colors'
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href='/terms-of-service'
                  className='text-gray-600 hover:text-sky-600 transition-colors'
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-sky-800'>Newsletter</h4>
            <p className='text-gray-600'>
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className='flex items-center gap-2'>
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none'
                required
              />
              <Button
                type='submit'
                className='bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105'
              >
                <Mail className='w-5 h-5' />
              </Button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-200 my-8' />

        {/* Copyright */}
        <div className='text-center text-gray-600'>
          <p>
            &copy; {new Date().getFullYear()} Kilpailuta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
