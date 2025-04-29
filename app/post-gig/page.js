'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import api from '~/lib/api'
import { toast } from 'react-toastify'

export default function PostGigClient() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { token } = useSelector((state) => state.auth)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const userEmail = token ? jwtDecode(token).email : null
      const payload = { ...formData, userEmail }
      await api.post('/clients/gigs', payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Gig posted successfully!', {
        position: 'bottom-left'
      })
      router.push('/search')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post gig')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-xl shadow-lg p-8 max-w-md w-full'>
        <h1 className='text-3xl font-bold text-sky-800 mb-6 text-center'>
          Post a New Gig
        </h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-gray-700 mb-2' htmlFor='title'>
              Gig Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              placeholder='e.g., Website Development'
              className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500'
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className='block text-gray-700 mb-2' htmlFor='description'>
              Description
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Describe your gig in detail...'
              rows={5}
              className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500'
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className='block text-gray-700 mb-2' htmlFor='budget'>
              Budget
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-3 text-gray-500'>€</span>
              <input
                type='number'
                id='budget'
                name='budget'
                value={formData.budget}
                onChange={handleChange}
                placeholder='e.g., 1000'
                className='w-full pl-8 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500'
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {error && (
            <div className='p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center'>
              {error}
            </div>
          )}

          <button
            type='submit'
            className='w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 disabled:bg-sky-400 transition-colors'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Gig'}
          </button>
        </form>
      </div>
    </div>
  )
}
