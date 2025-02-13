/** @type {import('next').NextConfig()} */
const config = {
  pages: {
    '': '/index',
    '/app LANDING': '/LandingPage'
  },
  images: {
    optimize: {
      quality: 'high',
      format: 'webp'
    }
  }
};
