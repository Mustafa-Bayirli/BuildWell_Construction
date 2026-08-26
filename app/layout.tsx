import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from './pageComponents/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Navbar from './pageComponents/navbar/Navbar';
import { AuthProvider } from '@/lib/auth-context';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Home,
  Wrench,
  Palette,
  Zap,
  Droplets,
  Hammer,
  Sparkles,
  Layers,
  Scissors
} from 'lucide-react';
import Logo from './logo/logo2.svg';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.westsiderenovationinc.com'),
  title: 'Westside Renovation Inc - Premier NYC Renovation & Construction Experts',
  description: 'Professional renovation, construction, and home improvement services in New York City. Specializing in interior remodeling, electrical, plumbing, painting, flooring, and more. Licensed, insured, and trusted since 2012.',
  keywords: [
    'renovation NYC',
    'construction New York',
    'interior remodeling',
    'home improvement NYC',
    'electrical services NYC',
    'plumbing NYC',
    'painting contractors',
    'flooring installation',
    'kitchen renovation',
    'bathroom remodeling',
    'drywall repair',
    'wallpaper installation',
    'cleaning services',
    'licensed contractors NYC',
    'residential renovation',
    'commercial renovation'
  ].join(', '),
  authors: [{ name: 'Westside Renovation Inc', url: 'https://www.westsiderenovationinc.com' }],
  creator: 'Westside Renovation Inc',
  publisher: 'Westside Renovation Inc',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // Add other search engine verification codes as needed
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3b82f6' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.westsiderenovationinc.com',
    siteName: 'Westside Renovation Inc',
    title: 'Westside Renovation Inc - Premier NYC Renovation & Construction Experts',
    description: 'Professional renovation, construction, and home improvement services in New York City. Licensed, insured, and trusted since 2012.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Westside Renovation Inc - Quality Craftsmanship in NYC',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'Westside Renovation Inc Logo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@WestsideRenovation',
    creator: '@WestsideRenovation',
    title: 'Westside Renovation Inc - Premier NYC Renovation Experts',
    description: 'Professional renovation, construction, and home improvement services in New York City. Licensed, insured, and trusted since 2012.',
    images: ['/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.westsiderenovationinc.com',
  },
  category: 'construction',
  classification: 'Business',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// JSON-LD Structured Data
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.westsiderenovationinc.com/#organization',
      name: 'Westside Renovation Inc',
      alternateName: 'Westside Renovation',
      description: 'Professional renovation, construction, and home improvement services in New York City.',
      url: 'https://www.westsiderenovationinc.com',
      telephone: '+1-646-239-1844',
      email: 'info@westsidereno.com',
      foundingDate: '2012',
      priceRange: '$$-$$$',
      image: 'https://www.westsiderenovationinc.com/logo-large.jpg',
      logo: 'https://www.westsiderenovationinc.com/logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Renovation St',
        addressLocality: 'New York',
        addressRegion: 'NY',
        postalCode: '10001',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '40.7589',
        longitude: '-73.9851',
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'New York',
          sameAs: 'https://en.wikipedia.org/wiki/New_York_City',
        },
        {
          '@type': 'State',
          name: 'New York',
          sameAs: 'https://en.wikipedia.org/wiki/New_York_(state)',
        },
      ],
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: '40.7589',
          longitude: '-73.9851',
        },
        geoRadius: '50000',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Renovation Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Interior Remodeling',
              description: 'Complete interior transformations including kitchen and bathroom renovations',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Electrical Services',
              description: 'Licensed electrical work including installations, repairs, and upgrades',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Plumbing Services',
              description: 'Professional plumbing solutions for residential and commercial properties',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Painting Services',
              description: 'Interior and exterior painting with color consultation',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Flooring Installation',
              description: 'Expert installation of hardwood, tile, vinyl, and other flooring materials',
            },
          },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        ratingCount: '150',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: 'Sarah Johnson',
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
          reviewBody: 'Outstanding service! The team was professional, thorough, and left our home absolutely spotless.',
        },
      ],
      sameAs: [
        'https://www.facebook.com/westsiderenovation',
        'https://www.instagram.com/westsiderenovation',
        'https://www.twitter.com/westsidereno',
      ],
      openingHours: ['Mo-Fr 08:00-18:00', 'Sa 09:00-16:00'],
      paymentAccepted: ['Cash', 'Credit Card', 'Check', 'Bank Transfer'],
      currenciesAccepted: 'USD',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.westsiderenovationinc.com/#website',
      url: 'https://www.westsiderenovationinc.com',
      name: 'Westside Renovation Inc',
      description: 'Professional renovation and construction services in New York City',
      publisher: {
        '@id': 'https://www.westsiderenovationinc.com/#organization',
      },
      potentialAction: [
        {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://www.westsiderenovationinc.com/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const services = [
    { name: 'Interior Remodeling', path: '/services/interior-remodeling', icon: Home },
    { name: 'Installation', path: '/services/installation', icon: Wrench },
    { name: 'Painting', path: '/services/painting', icon: Palette },
    { name: 'Electrical', path: '/services/electrical', icon: Zap },
    { name: 'Plumbing', path: '/services/plumbing', icon: Droplets },
    { name: 'Wallpaper', path: '/services/wallpaper', icon: Scissors },
    { name: 'Drywall Repairs', path: '/services/repairs', icon: Hammer },
    { name: 'Cleaning', path: '/services/cleaning', icon: Sparkles },
    { name: 'Flooring', path: '/services/flooring', icon: Layers },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="geo.region" content="US-NY" />
        <meta name="geo.placename" content="New York" />
        <meta name="geo.position" content="40.7589;-73.9851" />
        <meta name="ICBM" content="40.7589, -73.9851" />
      </head>
      <body className={cn('min-h-screen flex flex-col antialiased')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            
            {/* Enhanced Modern Footer */}
            <footer className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                  
                  {/* Company Info */}
                  <div className="sm:col-span-2 lg:col-span-1 space-y-6">
                    <Link href="/" className="flex items-center space-x-3 group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-blue-200/20 dark:from-blue-400/20 dark:to-cyan-400/20 rounded-xl blur-sm"></div>
                        <Image
                          src={Logo}
                          alt="Westside Renovation Logo"
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-xl relative z-10 shadow-lg"
                        />
                      </div>
                      <div>
                        <h2 className="font-black text-lg sm:text-xl bg-gradient-to-r from-white to-blue-200 dark:from-blue-100 dark:to-cyan-200 bg-clip-text text-transparent">
                          WESTSIDE
                        </h2>
                        <p className="text-xs text-blue-200 dark:text-blue-300 font-semibold tracking-wider">
                          RENOVATION INC
                        </p>
                      </div>
                    </Link>
                    
                    <p className="text-blue-100 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                      Transforming spaces in NYC with quality craftsmanship and innovative design solutions since 2012.
                    </p>
                    
                    <div className="flex space-x-3">
                      {[
                        { icon: Facebook, href: 'https://facebook.com/westsiderenovation', label: 'Facebook' },
                        { icon: Twitter, href: 'https://twitter.com/westsidereno', label: 'Twitter' },
                        { icon: Instagram, href: 'https://instagram.com/westsiderenovation', label: 'Instagram' },
                      ].map((social, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="icon"
                          asChild
                          className="hover:bg-white/10 dark:hover:bg-white/20 text-blue-200 dark:text-blue-300 hover:text-white transition-colors duration-300"
                        >
                          <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                            <social.icon className="h-5 w-5" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full"></div>
                      <h3 className="text-lg font-bold text-white dark:text-gray-100">Quick Links</h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        { name: 'Home', path: '/' },
                        { name: 'About Us', path: '/about' },
                        { name: 'All Services', path: '/services' },
                        { name: 'Our Projects', path: '/projects' },
                        { name: 'Contact Us', path: '/contact' },
                      ].map((item) => (
                        <li key={item.path}>
                          <Link
                            href={item.path}
                            className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-blue-200 transition-colors duration-300 flex items-center group text-sm"
                          >
                            <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Our Services */}
                  <div>
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="w-2 h-2 bg-cyan-400 dark:bg-cyan-500 rounded-full"></div>
                      <h3 className="text-lg font-bold text-white dark:text-gray-100">Our Services</h3>
                    </div>
                    <ul className="space-y-3">
                      {services.slice(0, 6).map((service) => (
                        <li key={service.path}>
                          <Link
                            href={service.path}
                            className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-blue-200 transition-colors duration-300 flex items-center group text-sm"
                          >
                            <service.icon className="h-3 w-3 mr-2 text-blue-300 dark:text-blue-400" />
                            <span>{service.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact & CTA */}
                  <div>
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full"></div>
                      <h3 className="text-lg font-bold text-white dark:text-gray-100">Get In Touch</h3>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-4 w-4 mt-1 text-blue-300 dark:text-blue-400 flex-shrink-0" />
                        <span className="text-blue-200 dark:text-gray-300 text-sm leading-relaxed">
                          New York, NY<br />
                          All 5 Boroughs
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-blue-300 dark:text-blue-400 flex-shrink-0" />
                        <a 
                          href="tel:+16462391844" 
                          className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-blue-200 transition-colors duration-300 text-sm font-medium"
                        >
                          (646) 239-1844
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-blue-300 dark:text-blue-400 flex-shrink-0" />
                        <a
                          href="mailto:info@westsidereno.com"
                          className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-blue-200 transition-colors duration-300 text-sm"
                        >
                          info@westsidereno.com
                        </a>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-blue-200 dark:text-gray-300 text-sm leading-relaxed">
                        Ready to transform your space? Get a free consultation today!
                      </p>
                      <Button
                        className="w-full  bg-blue-700 dark:bg-blue-300 text-white dark:text-black"
                        asChild
                      >
                        <Link href="/contact" className="flex items-center justify-center py-2">
                          Get Free Quote
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-blue-700/50 dark:border-gray-600/50">
                  <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
                    <div className="text-center sm:text-left">
                      <p className="text-sm text-blue-200 dark:text-gray-300 mb-2 sm:mb-0">
                        &copy; {new Date().getFullYear()} Westside Renovation Inc. All rights reserved.
                      </p>
                      <div className="flex justify-center sm:justify-start space-x-4 text-xs text-blue-300 dark:text-gray-400">
                        <Link href="/privacy" className="hover:text-white dark:hover:text-blue-200 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white dark:hover:text-blue-200 transition-colors">Terms of Service</Link>
                      </div>
                    </div>
                    
                    <div className="flex justify-center sm:justify-end items-center space-x-4 text-sm text-blue-200 dark:text-gray-300">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Licensed & Insured
                      </span>
                      <span className="flex items-center">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        5.0 Rating
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
            
            <Toaster position="top-right" richColors expand visibleToasts={4} closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}