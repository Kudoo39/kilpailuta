'use client'

import { useSearchParams } from 'next/navigation'

// Mock data for professionals/gigs
const mockResults = [
  {
    id: 1,
    jobTitle: 'Plumber',
    name: 'John Reijo',
    location: 'Helsinki, Finland',
    description: 'Experienced plumber for residential and commercial fixes.',
    rate: '€20/hr'
  },
  {
    id: 2,
    jobTitle: 'Web Developer',
    name: 'Reijo Heinonen',
    location: 'Tampere, Finland',
    description: 'Full-stack developer specializing in React and Node.js.',
    rate: '€30/hr'
  },
  {
    id: 3,
    jobTitle: 'Graphic Designer',
    name: 'Matti Aronen',
    location: 'Espoo, Finland',
    description: 'Creative designer for logos, branding, and digital art.',
    rate: '€22/hr'
  },
  {
    id: 4,
    jobTitle: 'Electrician',
    name: 'Mikko Virtanen',
    location: 'Oulu, Finland',
    description: 'Certified electrician for wiring and repairs.',
    rate: '€21/hr'
  },
  {
    id: 5,
    jobTitle: 'Chef',
    name: 'Emma Korhonen',
    location: 'Turku, Finland',
    description: 'Professional chef for events and catering.',
    rate: '€23/hr'
  },
  {
    id: 6,
    jobTitle: 'Painter',
    name: 'Liam Brown',
    location: 'Helsinki, Finland',
    description: 'Interior and exterior painting expert.',
    rate: '€18/hr'
  }
]

export default function SearchClient() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')?.toLowerCase() || ''

  // Filter mock results based on query
  const filteredResults = query
    ? mockResults.filter(
        (result) =>
          result.jobTitle.toLowerCase().includes(query) ||
          result.description.toLowerCase().includes(query)
      )
    : mockResults

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 p-8'>
      <h1 className='text-4xl font-bold text-sky-800 mb-6'>
        {query ? `Pros for "${query}"` : 'Browse Available Professionals'}
      </h1>
      {filteredResults.length > 0 ? (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredResults.map((result) => (
            <div
              key={result.id}
              className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow'
            >
              <h2 className='text-xl font-semibold text-sky-700'>
                {result.jobTitle}
              </h2>
              <p className='text-gray-800 font-medium'>{result.name}</p>
              <p className='text-gray-600'>{result.location}</p>
              <p className='text-gray-600 mt-2'>{result.description}</p>
              <p className='text-sky-600 font-semibold mt-2'>{result.rate}</p>
              <button className='mt-4 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors'>
                Contact
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-600'>
          No professionals found for "{query}". Try a different search!
        </p>
      )}
    </div>
  )
}
