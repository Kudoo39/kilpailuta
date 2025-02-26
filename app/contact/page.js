'use client'
import { motion } from 'framer-motion'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Card, CardContent } from '~/components/ui/card'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <section className='py-20 bg-sky-50'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Get in Touch
          </h2>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Have questions? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-12'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent className='p-6'>
                <form className='space-y-6'>
                  <div className='space-y-4'>
                    <Input placeholder='Your Name' />
                    <Input type='email' placeholder='Email Address' />
                    <Input placeholder='Subject' />
                    <Textarea placeholder='Your Message' className='h-32' />
                  </div>
                  <Button className='w-full bg-sky-600 hover:bg-sky-700'>
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='space-y-6'
          >
            <div className='flex items-start gap-4'>
              <Mail className='h-6 w-6 text-sky-600' />
              <div>
                <h3 className='font-semibold text-gray-900'>Email</h3>
                <p className='text-gray-600'>support@kilpailuta.com</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <Phone className='h-6 w-6 text-sky-600' />
              <div>
                <h3 className='font-semibold text-gray-900'>Phone</h3>
                <p className='text-gray-600'>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <MapPin className='h-6 w-6 text-sky-600' />
              <div>
                <h3 className='font-semibold text-gray-900'>Address</h3>
                <p className='text-gray-600'>
                  123 Business Street
                  <br />
                  San Francisco, CA 94105
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
