import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from './pageComponents/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Navbar from './pageComponents/navbar/Navbar';
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
  Scissors,
  Ruler
} from 'lucide-react';
import Logo from './logo/logo2.svg';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.buildwellconstruction.com'),
  title: 'BuildWell Construction | Building Today, For a Stronger Tomorrow',
  description: 'Construction, renovation, design, and project management for commercial, industrial, and residential clients in Toronto and Ontario.',
  keywords: [
    'BuildWell Construction',
    'construction Toronto',
    'construction Ontario',
    'commercial construction',
    'industrial construction',
    'residential renovation',
    'kitchen renovation',
    'bathroom renovation',
    'basement renovation',
    'home extensions',
    'interior design',
    'water damage restoration',
    'emergency construction services'
  ].join(', '),
  authors: [{ name: 'BuildWell Construction', url: 'https://www.buildwellconstruction.com' }],
  creator: 'BuildWell Construction',
  publisher: 'BuildWell Construction',
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
    url: 'https://www.buildwellconstruction.com',
    siteName: 'BuildWell Construction',
    title: 'BuildWell Construction | Building Today, For a Stronger Tomorrow',
    description: 'Construction, renovation, design, and project management for commercial, industrial, and residential clients in Toronto and Ontario.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BuildWell Construction - Quality construction in Toronto and Ontario',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'BuildWell Construction Logo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildWell Construction | Toronto Construction and Renovation',
    description: 'Commercial, industrial, and residential construction, renovation, design, and project management in Toronto and Ontario.',
    images: ['/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.buildwellconstruction.com',
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
      '@id': 'https://www.buildwellconstruction.com/#organization',
      name: 'BuildWell Construction',
      description: 'Construction, renovation, design, and project management for commercial, industrial, and residential clients in Toronto and Ontario.',
      url: 'https://www.buildwellconstruction.com',
      telephone: '+1-437-688-1994',
      email: 'info@buildwellconstruction.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Construction Way',
        addressLocality: 'Toronto',
        addressRegion: 'ON',
        postalCode: 'M1M 1M1',
        addressCountry: 'CA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '43.7973',
        longitude: '-79.2390',
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Toronto',
          sameAs: 'https://en.wikipedia.org/wiki/Toronto',
        },
        {
          '@type': 'State',
          name: 'Ontario',
          sameAs: 'https://en.wikipedia.org/wiki/Ontario',
        },
      ],
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: '43.7973',
          longitude: '-79.2390',
        },
        geoRadius: '50000',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'BuildWell Construction Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Planning, Conception and Execution',
              description: 'Project planning, design coordination, construction, and execution from concept to completion',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Commercial, Industrial and Residential Construction',
              description: 'Construction and renovation solutions for commercial, industrial, and residential projects',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Kitchen, Bathroom and Basement Renovation',
              description: 'Functional renovation solutions with quality materials and professional workmanship',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Extensions and Interior Design',
              description: 'Property extensions, general renovation, and interior design services',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Emergency and Water Damage Restoration',
              description: 'Responsive construction and restoration support when property damage occurs',
            },
          },
        ],
      },
      openingHours: ['Mo-Fr 08:00-18:00', 'Sa 09:00-16:00'],
      currenciesAccepted: 'CAD',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.buildwellconstruction.com/#website',
      url: 'https://www.buildwellconstruction.com',
      name: 'BuildWell Construction',
      description: 'Professional construction, renovation, design, and project management services in Toronto and Ontario',
      publisher: {
        '@id': 'https://www.buildwellconstruction.com/#organization',
      },
      potentialAction: [
        {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://www.buildwellconstruction.com/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const services = [
    { name: 'Planning & Execution', path: '/services', icon: Ruler },
    { name: 'Kitchen & Bathroom', path: '/services/interior-remodeling', icon: Home },
    { name: 'Basement Renovation', path: '/services/interior-remodeling', icon: Hammer },
    { name: 'General Renovation', path: '/services/interior-remodeling', icon: Wrench },
    { name: 'Interior Design', path: '/services/interior-remodeling', icon: Palette },
    { name: 'Emergency & Water Damage', path: '/services/repairs', icon: Droplets },
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
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Toronto, Ontario" />
        <meta name="geo.position" content="43.7973;-79.2390" />
        <meta name="ICBM" content="43.7973, -79.2390" />
      </head>
      <body className={cn('min-h-screen flex flex-col antialiased')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
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
                          alt="BuildWell Construction Logo"
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-xl relative z-10 shadow-lg"
                        />
                      </div>
                      <div>
                        <h2 className="font-black text-lg sm:text-xl bg-gradient-to-r from-white to-blue-200 dark:from-blue-100 dark:to-cyan-200 bg-clip-text text-transparent">
                          BUILDWELL
                        </h2>
                        <p className="text-xs text-blue-200 dark:text-blue-300 font-semibold tracking-wider">
                          CONSTRUCTION
                        </p>
                      </div>
                    </Link>
                    
                    <p className="text-blue-100 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                      Construction, renovation, design, and project management for commercial, industrial, and residential clients.
                    </p>
                    
                    <div className="flex space-x-3">
                      {[
                        { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
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
                          123 Construction Way<br />
                          Toronto, ON M1M 1M1
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-blue-300 dark:text-blue-400 flex-shrink-0" />
                        <a 
                          href="tel:+14376881994" 
                          className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-blue-200 transition-colors duration-300 text-sm font-medium"
                        >
                          (437) 688-1994
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-blue-300 dark:text-blue-400 flex-shrink-0" />
                        <a
                          href="mailto:info@buildwellconstruction.com"
                          className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-blue-200 transition-colors duration-300 text-sm"
                        >
                          info@buildwellconstruction.com
                        </a>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-blue-200 dark:text-gray-300 text-sm leading-relaxed">
                        Ready to build something better? Request a consultation today.
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
                        &copy; {new Date().getFullYear()} BuildWell Construction. All rights reserved.
                      </p>
                      <div className="flex justify-center sm:justify-start space-x-4 text-xs text-blue-300 dark:text-gray-400">
                        <Link href="/privacy" className="hover:text-white dark:hover:text-blue-200 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white dark:hover:text-blue-200 transition-colors">Terms of Service</Link>
                      </div>
                    </div>
                    
                    <div className="flex justify-center sm:justify-end items-center space-x-4 text-sm text-blue-200 dark:text-gray-300">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Commercial · Industrial · Residential
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
            
            <Toaster position="top-right" richColors expand visibleToasts={4} closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}