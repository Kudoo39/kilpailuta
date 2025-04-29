'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import api from '~/lib/api'
import { toast } from 'react-toastify'

export default function ProProfileClient() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    name: '',
    location: '',
    description: '',
    rate: ''
  })
  const [error, setError] = useState(null)
  const [profileExists, setProfileExists] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { token } = useSelector((state) => state.auth)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/pros/search', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const myProfile = response.data.find(
          (p) => p.userId === jwtDecode(token).id
        )
        if (myProfile) {
          setFormData({
            jobTitle: myProfile.jobTitle,
            name: myProfile.name,
            location: myProfile.location,
            description: myProfile.description || '',
            rate: myProfile.rate || ''
          })
          setProfileExists(true)
        }
      } catch (err) {
        console.log(
          'No profile yet or error fetching:',
          err.response?.data?.message
        )
      }
    }
    if (token) fetchProfile()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const endpoint = '/pros/profile'
      const method = profileExists ? 'put' : 'post'
      await api[method](endpoint, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success(
        profileExists
          ? 'Profile updated successfully!'
          : 'Profile created successfully!',
        {
          position: 'bottom-left'
        }
      )
      router.push('/search')
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Failed to save profile'
      setError(errorMessage)
      toast.error(errorMessage, {
        position: 'bottom-left'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete your profile?')) {
      try {
        await api.delete('/pros/profile', {
          headers: { Authorization: `Bearer ${token}` }
        })
        toast.info('Profile deleted successfully', {
          position: 'bottom-left'
        })
        router.push('/register')
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || 'Failed to delete profile'
        setError(errorMessage)
        toast.error(errorMessage)
      }
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 p-8'>
      <h1 className='text-3xl font-bold text-sky-800 mb-6'>
        {profileExists
          ? 'Update Your Profile'
          : 'Set Up Your Professional Profile'}
      </h1>

      <form onSubmit={handleSubmit} className='max-w-md mx-auto space-y-4'>
        <input
          type='text'
          name='jobTitle'
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder='Job Title (e.g., Plumber)'
          className='w-full p-2 border rounded'
          required
          disabled={isSubmitting}
        />

        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Your Name'
          className='w-full p-2 border rounded'
          required
          disabled={isSubmitting}
        />

        <input
          type='text'
          name='location'
          value={formData.location}
          onChange={handleChange}
          placeholder='Location (e.g., Helsinki)'
          className='w-full p-2 border rounded'
          required
          disabled={isSubmitting}
        />

        <textarea
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Description (optional)'
          className='w-full p-2 border rounded'
          disabled={isSubmitting}
        />

        <div>
          <label className='block text-gray-700 mb-2' htmlFor='rate'>
            Rate
          </label>
          <div className='relative'>
            <span className='absolute left-3 top-3 text-gray-500'>€</span>
            <input
              type='number'
              name='rate'
              value={formData.rate}
              onChange={handleChange}
              placeholder='e.g., 25€/hour'
              className='w-full pl-8 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500'
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        {error && <p className='text-red-500'>{error}</p>}

        <button
          type='submit'
          className='bg-sky-600 text-white p-2 rounded disabled:bg-sky-400'
          disabled={isSubmitting}
        >
          {isSubmitting
            ? profileExists
              ? 'Updating...'
              : 'Creating...'
            : profileExists
              ? 'Update Profile'
              : 'Create Profile'}
        </button>

        {profileExists && (
          <button
            type='button'
            onClick={handleDelete}
            className='bg-red-600 text-white p-2 rounded mt-2'
            disabled={isSubmitting}
          >
            Delete Profile
          </button>
        )}
      </form>
    </div>
  )
}
