import { Suspense } from 'react'
import ProProfileClient from './ProProfileClient'

export default function ProProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProProfileClient />
    </Suspense>
  )
}

export const metadata = {
  title: 'Professional Profile - Kilpailuta',
  description: 'Manage your professional profile'
}
