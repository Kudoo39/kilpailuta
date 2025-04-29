'use client'

import { useState, useEffect } from 'react' // Add useState for data
import { useSelector } from 'react-redux'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import api from '~/lib/api' // Import configured axios

export default function SearchClient() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')?.toLowerCase() || ''
  const {
    loading: authLoading,
    error: authError,
    token
  } = useSelector((state) => state.auth)
  const router = useRouter()

  // State for API data
  const [professionals, setProfessionals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      toast.info('You are not logged in!', {
        position: 'bottom-left'
      })
      router.push('/login')
    }
  }, [token, router])

  // Fetch professionals
  useEffect(() => {
    const fetchProfessionals = async () => {
      if (!token) return // Skip fetch if no token
      setLoading(true)
      setError(null)
      try {
        const response = await api.get('/pros/search', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProfessionals(response.data || []) // Ensure array
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || 'Failed to load professionals'
        setError(errorMessage)
        toast.error(errorMessage, { position: 'bottom-left' })
      } finally {
        setLoading(false)
      }
    }
    fetchProfessionals()
  }, [token])

  // Filter results based on query
  const filteredResults = query
    ? professionals.filter(
        (pro) =>
          pro.jobTitle?.toLowerCase().includes(query) ||
          pro.description?.toLowerCase().includes(query)
      )
    : professionals

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 p-8'>
      <h1 className='text-4xl font-bold text-sky-800 mb-6'>
        {query ? `Pros for "${query}"` : 'Browse Available Professionals'}
      </h1>
      {loading ? (
        <p className='text-gray-600'>Loading professionals...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : filteredResults.length > 0 ? (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredResults.map((pro) => (
            <div
              key={pro.userId}
              className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow'
            >
              <h2 className='text-xl font-semibold text-sky-700'>
                {pro.jobTitle}
              </h2>
              <p className='text-gray-800 font-medium'>{pro.name}</p>
              <p className='text-gray-600'>{pro.location}</p>
              <p className='text-gray-600 mt-2'>{pro.description}</p>
              <p className='text-sky-600 font-semibold mt-2'>
                {pro.rate !== undefined && pro.rate !== null
                  ? `${pro.rate}€/hour`
                  : 'Rate not specified'}
              </p>
              <button className='mt-4 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors'>
                Contact
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-600'>
          No professionals found for {query || 'your search'}. Try a different
          search!
        </p>
      )}
    </div>
  )
}
