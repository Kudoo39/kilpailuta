'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

export default function ProProfileClient() {
  const [jobTitle, setJobTitle] = useState('')
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [profileExists, setProfileExists] = useState(false)
  const router = useRouter()
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/pros/search', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const myProfile = response.data.find(
          (p) => p.userId === jwtDecode(token).id
        )
        if (myProfile) {
          setJobTitle(myProfile.jobTitle)
          setName(myProfile.name)
          setLocation(myProfile.location)
          setDescription(myProfile.description || '')
          setProfileExists(true)
        }
      } catch (err) {
        console.log(
          'No profile yet or error fetching:',
          err.response?.data?.message
        )
      }
    }
    fetchProfile()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const endpoint = profileExists ? '/pros/profile' : '/pros/profile'
      const method = profileExists ? 'put' : 'post'
      await axios[method](
        endpoint,
        { jobTitle, name, location, description },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      router.push('/search')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile')
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete your profile?')) {
      try {
        await axios.delete('/pros/profile', {
          headers: { Authorization: `Bearer ${token}` }
        })
        router.push('/register') // Redirect after deletion
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete profile')
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
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder='Job Title (e.g., Plumber)'
          className='w-full p-2 border rounded'
          required
        />
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Your Name'
          className='w-full p-2 border rounded'
          required
        />
        <input
          type='text'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder='Location (e.g., Helsinki)'
          className='w-full p-2 border rounded'
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description (optional)'
          className='w-full p-2 border rounded'
        />
        {error && <p className='text-red-500'>{error}</p>}
        <button type='submit' className='bg-sky-600 text-white p-2 rounded'>
          {profileExists ? 'Update Profile' : 'Create Profile'}
        </button>
        {profileExists && (
          <button
            type='button'
            onClick={handleDelete}
            className='bg-red-600 text-white p-2 rounded mt-2'
          >
            Delete Profile
          </button>
        )}
      </form>
    </div>
  )
}
