'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function AvatarUploader({ initialUrl, onChange }) {
  const [url, setUrl] = useState(initialUrl || null)

  useEffect(() => {
    if (initialUrl) setUrl(initialUrl)
  }, [initialUrl])

  const openWidget = () => {
    if (!window.cloudinary) return
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
        sources: ['local', 'url', 'camera'],
        cropping: true,
        multiple: false,
        folder: 'avatars',
        clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
        maxImageFileSize: 2_000_000
      },
      (err, result) => {
        if (err) return console.error(err)
        if (result.event === 'success') {
          setUrl(result.info.secure_url)
          onChange(result.info.secure_url)
        }
      }
    )

    widget.open()
  }

  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='w-24 h-24 rounded-full overflow-hidden ring-2 ring-primary'>
        {url ? (
          <Image
            src={url}
            width={96}
            height={96}
            alt='Avatar'
            className='object-cover w-full h-full'
          />
        ) : (
          <div className='w-full h-full bg-gray-100 flex items-center justify-center text-gray-400'>
            No Avatar
          </div>
        )}
      </div>
      <button
        type='button'
        onClick={openWidget}
        className='px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700'
      >
        {url ? 'Change Avatar' : 'Upload Avatar'}
      </button>
    </div>
  )
}
