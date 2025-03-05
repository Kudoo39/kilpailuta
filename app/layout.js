import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ClientLayout from './ClientLayout'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata = {
  title: 'Kilpailuta',
  description: 'Professional Finding Site',
  icons: {
    icon: '/logo.ico',
    shortcut: '/logo.ico'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
