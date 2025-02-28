'use client'
import { motion } from 'framer-motion'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '~/components/ui/card'
import { Search, Shield, Briefcase, Users } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    title: 'Quick Connections',
    description:
      'Easily find pros for any task or gigs that match your skills with our simple platform.',
    icon: Search
  },
  {
    title: 'Trusted Pros',
    description:
      'We verify every professional so you can hire or work with confidence.',
    icon: Shield
  },
  {
    title: 'Hassle-Free Process',
    description:
      'Get started fast—whether you are hiring help or picking up work, it is straightforward.',
    icon: Briefcase
  },
  {
    title: 'Community-Driven',
    description:
      'Join a network of people and pros helping each other get things done.',
    icon: Users
  }
]

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className='relative min-h-[90vh] flex items-center bg-gradient-to-br from-sky-50 via-white to-sky-50'>
        <div className='container mx-auto px-4 py-20'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className='text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6'>
                Hire Help or Earn with Your Skills
              </h1>
              <p className='text-xl text-gray-600 mb-8'>
                Kilpailuta connects everyday people with skilled pros for any
                task—big or small—and helps pros find work that fits their
                expertise.
              </p>
              <div className='flex gap-4'>
                <Button size='lg' className='bg-sky-600 hover:bg-sky-700'>
                  Hire a Pro <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
                <Button size='lg' variant='outline'>
                  Find Gigs
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='relative'
            >
              <div className='aspect-square rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-600 p-1'>
                <div className='rounded-xl bg-white p-8 h-full'>
                  <svg
                    className='w-full h-full text-sky-600'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-gradient-to-br from-sky-50 to-blue-50'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Why Choose Kilpailuta
            </h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              See how we make it simple for people to hire pros and for pros to
              find work.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className='h-full hover:shadow-lg transition-shadow'>
                  <CardHeader>
                    <feature.icon className='h-12 w-12 text-sky-600 mb-4' />
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className='min-h-screen'>
        <div className='container mx-auto px-4 py-12'>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='text-center mb-12'
          >
            <h1 className='text-4xl md:text-5xl font-extrabold text-sky-800 mb-4'>
              About Kilpailuta
            </h1>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Helping people get things done and pros earn a living, one task at
              a time.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto'
          >
            <h2 className='text-2xl font-semibold text-sky-800 mb-4'>
              Our Mission
            </h2>
            <p className='text-gray-600 mb-6'>
              At Kilpailuta, we are here to make life easier. We connect people
              who need help with pros who can get the job done—whether it is
              fixing a leak, painting a room, or designing a flyer.
            </p>
            <h2 className='text-2xl font-semibold text-sky-800 mb-4'>
              Our Vision
            </h2>
            <p className='text-gray-600'>
              To build a community where anyone can find the right help for any
              task, and every pro can find work that matches their
              skills—quickly and simply.
            </p>
            <div className='mt-8'>
              <Link href='/'>
                <Button className='bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105'>
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.section>
        </div>
      </section>
    </>
  )
}
