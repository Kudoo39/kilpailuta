'use client'

import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Facebook, Twitter, Instagram, Linkedin, X } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  const openModal = (content) => {
    setModalContent(content)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalContent(null)
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  }

  const resourceContent = {
    faq: {
      title: 'Frequently Asked Questions',
      body: (
        <div>
          <h3 className='text-lg font-semibold text-sky-800 mb-2'>
            Common Questions
          </h3>
          <ul className='space-y-3 text-gray-600'>
            <li>
              <strong>How does Kilpailuta work?</strong> We connect people who
              need help with skilled pros for any task, making it easy to hire
              or find work.
            </li>
            <li>
              <strong>Is it free to join?</strong> Yes, signing up is free for
              both those hiring and pros looking for gigs.
            </li>
            <li>
              <strong>How do I contact support?</strong> Email us at
              support@kilpailuta.com or visit our Contact page.
            </li>
            <li>
              <strong>Can I hire multiple pros?</strong> Absolutely, you can
              find as many pros as you need for different tasks after joining.
            </li>
          </ul>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      body: (
        <div>
          <p className='mb-4'>
            At Kilpailuta, we are committed to protecting your privacy. Here is
            how we handle your data:
          </p>
          <ul className='list-disc list-inside text-gray-600 mb-4'>
            <li>
              <strong>Data Collection:</strong> We collect only what is
              necessary—like your name, email, and task needs—to connect you
              with pros or gigs.
            </li>
            <li>
              <strong>Data Use:</strong> Your information helps us match you
              with the right help or work opportunities.
            </li>
            <li>
              <strong>Security:</strong> We use top-notch encryption to keep
              your data safe.
            </li>
            <li>
              <strong>Sharing:</strong> We never sell your data to third
              parties. It is used only within Kilpailuta.
            </li>
          </ul>
          <p>Questions? Contact us at support@kilpailuta.com.</p>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service',
      body: (
        <div>
          <p className='mb-4'>
            By using Kilpailuta, you agree to these terms to ensure a fair and
            respectful experience:
          </p>
          <ul className='list-disc list-inside text-gray-600 mb-4'>
            <li>
              <strong>Account Responsibility:</strong> Keep your login details
              secure and do not share them.
            </li>
            <li>
              <strong>Content Guidelines:</strong> Do not post misleading,
              offensive, or harmful content.
            </li>
            <li>
              <strong>Usage:</strong> Use the platform for its
              purpose—connecting people with pros for tasks and gigs.
            </li>
            <li>
              <strong>Termination:</strong> We may suspend accounts for
              violations of these terms.
            </li>
          </ul>
          <p>Need clarification? Reach out to support@kilpailuta.com.</p>
        </div>
      )
    }
  }

  return (
    <footer className='bg-gradient-to-br from-sky-50 to-blue-50 border-t border-gray-200'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold text-sky-800'>Kilpailuta</h3>
            <p className='text-gray-600'>
              Connecting people with pros for any task and helping pros find
              work that fits.
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

          {/* Quick Links (Navigates to Pages) */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-sky-800'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/about'
                  className='text-gray-600 hover:text-sky-600 transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-gray-600 hover:text-sky-600 transition-colors'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources (Triggers Popup) */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-sky-800'>Resources</h4>
            <ul className='space-y-2'>
              <li>
                <button
                  onClick={() => openModal(resourceContent.faq)}
                  className='text-gray-600 hover:text-sky-600 transition-colors'
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal(resourceContent.privacy)}
                  className='text-gray-600 hover:text-sky-600 transition-colors'
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal(resourceContent.terms)}
                  className='text-gray-600 hover:text-sky-600 transition-colors'
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-sky-800'>Newsletter</h4>
            <p className='text-gray-600'>
              Subscribe for tips on hiring pros or finding gigs.
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
          <p>© {new Date().getFullYear()} Kilpailuta. All rights reserved.</p>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
            onClick={closeModal}
          >
            <motion.div
              variants={modalVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 relative'
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className='absolute top-4 right-4 text-gray-600 hover:text-sky-600'
              >
                <X className='w-5 h-5' />
              </button>
              <h2 className='text-2xl font-semibold text-sky-800 mb-4'>
                {modalContent?.title}
              </h2>
              <div className='text-gray-600 mb-6'>{modalContent?.body}</div>
              <Button
                onClick={closeModal}
                className='bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105'
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
