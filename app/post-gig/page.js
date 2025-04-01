'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function PostGigClient() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()
  const { token } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        '/clients/gigs',
        { title, description, budget },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      router.push('/search') // Redirect after posting
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post gig')
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 p-8'>
      <h1 className='text-3xl font-bold text-sky-800 mb-6'>Post a Gig</h1>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto space-y-4'>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Gig Title'
          className='w-full p-2 border rounded'
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
          className='w-full p-2 border rounded'
        />
        <input
          type='text'
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder='Budget (e.g., €100)'
          className='w-full p-2 border rounded'
        />
        {error && <p className='text-red-500'>{error}</p>}
        <button type='submit' className='bg-sky-600 text-white p-2 rounded'>
          Post Gig
        </button>
      </form>
    </div>
  )
}
