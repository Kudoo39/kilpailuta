'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchClient() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || 'No search term provided'

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 p-8'>
      <h1 className='text-4xl font-bold text-sky-800 mb-6'>Pros for {query}</h1>
      <p className='text-gray-600'>
        Showing professionals available for {query}. (This is a
        placeholder—replace with real data.)
      </p>
    </div>
  )
}
