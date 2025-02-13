<motion.section
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
className='text-center py-24 relative'
>
<div className='relative z-10 space-y-6'>
  <h2 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-600'>
    Ready to Get Started?
  </h2>
  <p className='text-gray-600 text-lg max-w-xl mx-auto'>
    Join thousands of professionals and businesses already finding
    success through our trusted platform
  </p>
  <Button
    size='lg'
    className='bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-lg h-12 px-8'
    asChild
  >
    <Link href='/signup'>Start Your Free Journey Today</Link>
  </Button>
</div>
</motion.section>