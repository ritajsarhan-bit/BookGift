/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow images from these external domains
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'covers.openlibrary.org' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  // Support for internationalization (Hebrew RTL + English)

};

module.exports = nextConfig;
