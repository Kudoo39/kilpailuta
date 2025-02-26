'use client'
import { motion } from 'framer-motion'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '~/components/ui/card'
import { Search, Shield, Briefcase, BarChart } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    title: 'Smart Matching',
    description:
      'Our intelligent system matches professionals with the perfect job opportunities.',
    icon: Search
  },
  {
    title: 'Verified Profiles',
    description:
      'All professionals and companies are thoroughly verified for your peace of mind.',
    icon: Shield
  },
  {
    title: 'Easy Application',
    description:
      'Streamlined process for both job seekers and employers to connect efficiently.',
    icon: Briefcase
  },
  {
    title: 'Career Insights',
    description:
      'Access detailed market data and salary insights for informed decisions.',
    icon: BarChart
  }
]

export default function About() {
  return (
    <>
      {/* hero section */}
      <section className='relative min-h-[90vh] flex items-center bg-gradient-to-br from-sky-50 via-white to-sky-50'>
        <div className='container mx-auto px-4 py-20'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className='text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6'>
                Connect with Top Talent and Opportunities
              </h1>
              <p className='text-xl text-gray-600 mb-8'>
                Kilpailuta bridges the gap between skilled professionals and
                companies seeking exceptional talent. Find your next career move
                or perfect candidate today.
              </p>
              <div className='flex gap-4'>
                <Button size='lg' className='bg-sky-600 hover:bg-sky-700'>
                  Start Hiring <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
                <Button size='lg' variant='outline'>
                  Find Jobs
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

      {/* features section */}
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
              Discover how we make professional recruitment more efficient and
              effective for everyone.
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

      {/* about section */}
      <section className='min-h-screen '>
        <div className='container mx-auto px-4 py-12'>
          {/* Hero Section */}
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
              Connecting companies with top-tier professionals to build the
              future of work.
            </p>
          </motion.section>

          {/* Content Section */}
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
              At Kilpailuta, we believe in simplifying the hiring process. Our
              platform bridges the gap between talented professionals and
              innovative companies, fostering growth and opportunity for all.
            </p>
            <h2 className='text-2xl font-semibold text-sky-800 mb-4'>
              Our Vision
            </h2>
            <p className='text-gray-600'>
              To create a world where every company finds the perfect talent and
              every professional discovers their dream job—effortlessly.
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
