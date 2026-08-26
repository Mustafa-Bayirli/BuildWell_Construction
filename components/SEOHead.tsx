// components/SEOHead.tsx
import Head from 'next/head';
import { Project } from '@/lib/firebase-admin';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  project?: Project;
}

export function SEOHead({ title, description, image, url, project }: SEOHeadProps) {
  const defaultTitle = 'Westside Renovation - NYC Premier Renovation Experts';
  const defaultDescription = 'Professional renovation and construction services in New York City. Custom carpentry, interior remodeling, and quality craftsmanship since 2012.';
  const defaultImage = '/og-image.jpg'; // You'll need to create this
  
  const pageTitle = project ? `${project.title} - ${defaultTitle}` : title || defaultTitle;
  const pageDescription = project ? 
    `${project.description.substring(0, 160)}...` : 
    description || defaultDescription;
  const pageImage = project?.images?.[0] || image || defaultImage;
  const pageUrl = url || 'https://westsideren.com';

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={pageUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="Westside Renovation" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Westside Renovation" />
      <meta name="keywords" content="renovation, construction, NYC, carpentry, remodeling, interior design" />
      
      {/* Structured Data for Projects */}
      {project && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CreativeWork',
              name: project.title,
              description: project.description,
              image: project.images,
              dateCompleted: project.completedDate.toISOString(),
              creator: {
                '@type': 'Organization',
                name: 'Westside Renovation',
                url: 'https://westsideren.com',
              },
              locationCreated: {
                '@type': 'Place',
                name: project.location,
              },
            }),
          }}
        />
      )}
    </Head>
  );
}