'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Star,
  Share2,
  Phone,
  Mail,
  X,
  ZoomIn,
  Hammer,
  Clock,
  Users,
  Twitter,
  Facebook,
  Link as LinkIcon,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { projectService, Project } from '@/lib/firebase-admin';
import { cn } from '@/lib/utils';

// Animation variants - optimized for performance
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.05 },
  },
};

// Image loading skeleton
const ImageSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center", className)}>
    <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
  </div>
);

// Loading spinner component
const LoadingSpinner = () => (
  <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="relative w-12 h-12 mx-auto">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 animate-spin rounded-full" />
      </div>
      <p className="text-gray-800 dark:text-gray-200 font-medium">Loading project...</p>
    </div>
  </div>
);

// Error state component
const ErrorState = () => (
  <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
    <div className="text-center space-y-6 max-w-md mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project Not Found</h1>
      <p className="text-gray-800 dark:text-gray-200">
        The project you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/projects">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>
      </Button>
    </div>
  </div>
);

// Optimized Image component with loading state - Safari & Chrome optimized
const OptimizedImage = React.memo(({
  src,
  alt,
  className,
  fill,
  sizes,
  priority = false,
  onLoad,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  [key: string]: any;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <>
      {isLoading && !hasError && (
        <ImageSkeleton className={cn(fill ? "absolute inset-0" : "", className)} />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        quality={85}
        loading={priority ? "eager" : "lazy"}
        className={cn(
          className,
          isLoading ? "opacity-0" : "opacity-100",
          "transition-opacity duration-500 ease-out will-change-auto"
        )}
        style={{
          imageRendering: 'auto',
          WebkitTransform: 'translateZ(0)', // Safari optimization
        }}
        onLoad={() => {
          setIsLoading(false);
          onLoad?.();
        }}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        {...props}
      />
      {hasError && (
        <div className={cn("bg-gray-100 dark:bg-gray-800 flex items-center justify-center", fill ? "absolute inset-0" : "", className)}>
          <span className="text-gray-500 text-sm">Failed to load image</span>
        </div>
      )}
    </>
  );
});

// Mobile-optimized image gallery carousel
const MobileImageCarousel = React.memo(({
  images,
  onImageClick,
}: {
  images: string[];
  onImageClick: (index: number) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSwipe = useCallback((_: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.x < -threshold && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, images.length]);

  return (
    <Card className="border-blue-200 dark:border-blue-800 overflow-hidden shadow-lg">
      <div className="relative">
        <motion.div
          ref={containerRef}
          className="overflow-hidden"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleSwipe}
          dragElastic={0.1}
        >
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.8 }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 relative aspect-[16/10] cursor-pointer"
                onClick={() => onImageClick(index)}
              >
                <OptimizedImage
                  src={image}
                  alt={`Project image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors">
                  <ZoomIn className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Navigation arrows for larger screens */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full hidden sm:flex"
              onClick={() => setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full hidden sm:flex"
              onClick={() => setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}
              disabled={currentIndex === images.length - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}

        {/* Dots indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  currentIndex === index 
                    ? "bg-white scale-125" 
                    : "bg-white/60 hover:bg-white/80"
                )}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
});

// Enhanced mobile-optimized lightbox
const MobileLightbox = React.memo(({
  images,
  selectedIndex,
  isOpen,
  onClose,
  onSelect,
}: {
  images: string[];
  selectedIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (index: number) => void;
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && selectedIndex < images.length - 1) {
      onSelect(selectedIndex + 1);
    }
    if (isRightSwipe && selectedIndex > 0) {
      onSelect(selectedIndex - 1);
    }
  };

  const handleSwipe = useCallback((_: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold && selectedIndex > 0) {
      onSelect(selectedIndex - 1);
    } else if (info.offset.x < -threshold && selectedIndex < images.length - 1) {
      onSelect(selectedIndex + 1);
    }
  }, [selectedIndex, images.length, onSelect]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex flex-col"
          role="dialog"
          aria-label="Image lightbox"
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 z-10">
            <span className="text-white text-sm font-medium">
              {selectedIndex + 1} of {images.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="bg-black/50 hover:bg-black/70 text-white rounded-full"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Main image area */}
          <div className="flex-1 relative overflow-hidden">
            <motion.div
              className="h-full flex items-center justify-center p-4 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleSwipe}
              dragElastic={0.2}
              whileDrag={{ scale: 0.98 }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="relative w-full h-full max-w-4xl">
                <OptimizedImage
                  src={images[selectedIndex]}
                  alt={`Gallery image ${selectedIndex + 1}`}
                  fill
                  className="object-contain select-none"
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Thumbnail strip - fixed background issue */}
          <div className="p-4">
            <div className="bg-black/60 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => onSelect(index)}
                    className={cn(
                      "relative flex-shrink-0 w-16 h-16 rounded overflow-hidden transition-all duration-200",
                      selectedIndex === index 
                        ? "ring-2 ring-blue-500 scale-105" 
                        : "ring-1 ring-white/20 hover:ring-white/40"
                    )}
                    aria-label={`View image ${index + 1}`}
                  >
                    <OptimizedImage
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    if (params.id) {
      loadProject(params.id as string);
    }
  }, [params.id]);

  const loadProject = async (projectId: string) => {
    try {
      const [projectData, allProjects] = await Promise.all([
        projectService.getProjectById(projectId),
        projectService.getAllProjects(),
      ]);

      if (projectData) {
        setProject(projectData);
        const related = allProjects
          .filter((p) => p.id !== projectId && p.category === projectData.category)
          .slice(0, 3);
        setRelatedProjects(related);
      }
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error('Failed to load project', { description: 'Please try again later' });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = useCallback(
    async (platform?: 'twitter' | 'facebook' | 'copy') => {
      if (!project) return;

      const url = window.location.href;
      const title = project.title;
      const text = project.description;

      if (platform === 'twitter') {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          '_blank',
        );
      } else if (platform === 'facebook') {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank',
        );
      } else if (platform === 'copy' || !platform) {
        try {
          await navigator.clipboard.writeText(url);
          toast.success('Link copied to clipboard!', { description: 'Share this project with others' });
        } catch (error) {
          console.error('Failed to copy link:', error);
          toast.error('Failed to copy link', { description: 'Please try again' });
        }
      }
    },
    [project],
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          setLightboxOpen(false);
          break;
        case 'ArrowLeft':
          setSelectedImageIndex((prev) =>
            prev === 0 ? (project?.images?.length || 1) - 1 : prev - 1,
          );
          break;
        case 'ArrowRight':
          setSelectedImageIndex((prev) =>
            prev === (project?.images?.length || 1) - 1 ? 0 : prev + 1,
          );
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, project?.images]);

  // Handle image loading progress
  const handleImageLoad = useCallback(() => {
    setImagesLoaded(prev => prev + 1);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!project) return <ErrorState />;

  const totalImages = project.images?.length || 0;
  const loadingProgress = totalImages > 0 ? (imagesLoaded / totalImages) * 100 : 100;

  return (
    <div className="min-h-screen bg-background pt-32">
      {/* Secondary Navigation */}
      <div className="bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleShare('twitter')} className="flex items-center">
                  <Twitter className="w-4 h-4 mr-3 text-blue-600" />
                  Share on Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare('facebook')} className="flex items-center">
                  <Facebook className="w-4 h-4 mr-3 text-blue-600" />
                  Share on Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare('copy')} className="flex items-center">
                  <LinkIcon className="w-4 h-4 mr-3 text-blue-600" />
                  Copy Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8 sm:space-y-12">
              {/* Project Header */}
              <motion.div variants={fadeInUp} className="space-y-4 sm:space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-800"
                    >
                      <Hammer className="w-3 h-3 mr-1" />
                      {project.category}
                    </Badge>
                    {project.featured && (
                      <Badge className="bg-gradient-to-r from-blue-100 to-sky-100 text-blue-600 border-blue-200 dark:from-blue-900/30 dark:to-sky-900/30 dark:text-blue-300 dark:border-blue-800">
                        <Star className="w-3 h-3 mr-1" />
                        Featured Project
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    {project.title}
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6 text-gray-800 dark:text-gray-200">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">{project.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">
                        Completed{' '}
                        {new Date(project.completedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Image Gallery - Mobile Optimized */}
              {project.images && project.images.length > 0 && (
                <motion.div variants={fadeInUp}>
                  <MobileImageCarousel
                    images={project.images}
                    onImageClick={(index) => {
                      setSelectedImageIndex(index);
                      setLightboxOpen(true);
                    }}
                  />
                </motion.div>
              )}

              {/* Project Details and CTA */}
              <motion.div variants={fadeInUp}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Project Description */}
                  <div className="lg:col-span-2">
                    <Card className="border-blue-200 dark:border-blue-800 shadow-lg bg-blue-50 dark:bg-blue-900/30 h-full">
                      <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl text-gray-900 dark:text-white flex items-center">
                          <Hammer className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                          Project Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="prose prose-base sm:prose-lg dark:prose-invert max-w-none">
                          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{project.description}</p>
                        </div>
                        <div className="border-t border-blue-200 dark:border-blue-800 pt-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Project Information</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center text-gray-800 dark:text-gray-200">
                              <Clock className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                              <span className="text-sm sm:text-base">Duration: 2-3 weeks</span>
                            </div>
                            <div className="flex items-center text-gray-800 dark:text-gray-200">
                              <Users className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                              <span className="text-sm sm:text-base">Team size: 3-4 craftsmen</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* CTA Section - REMOVED mobile sticky, only show on desktop */}
                  <div className="lg:col-span-1">
                    <Card className="border-blue-200 dark:border-blue-800 shadow-lg bg-gradient-to-br from-blue-100 to-sky-100 dark:from-blue-900/30 dark:to-sky-900/30 h-full lg:sticky lg:top-20">
                      <CardHeader>
                        <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-white">Start Your Project</CardTitle>
                        <p className="text-gray-800 dark:text-gray-200 text-sm">
                          Ready to transform your space? Let's discuss your vision.
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button
                          size="lg"
                          className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-lg"
                          asChild
                        >
                          <Link href="/contact">Get Free Quote</Link>
                        </Button>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-blue-300 text-blue-600 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30"
                            asChild
                          >
                            <a href="tel:+16462391844" className="flex items-center justify-center">
                              <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="truncate">Call (646) 239-1844</span>
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-blue-300 text-blue-600 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30"
                            asChild
                          >
                            <a href="mailto:info@westsideren.com" className="flex items-center justify-center">
                              <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="truncate">Send Email</span>
                            </a>
                          </Button>
                        </div>
                        <div className="pt-4 border-t border-blue-200 dark:border-blue-800">
                          <p className="text-xs text-gray-800 dark:text-gray-200 text-center">
                            Licensed & Insured • Free Estimates
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <motion.div variants={fadeInUp} className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Similar Projects</h2>
                    <p className="text-gray-800 dark:text-gray-200">
                      Explore more of our {project.category.toLowerCase()} work
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {relatedProjects.map((relatedProject) => (
                      <Card
                        key={relatedProject.id}
                        className="border-blue-200 dark:border-blue-800 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 group"
                      >
                        {relatedProject.images && relatedProject.images.length > 0 && (
                          <div className="relative h-40 sm:h-48">
                            <OptimizedImage
                              src={relatedProject.images[0]}
                              alt={relatedProject.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <CardContent className="p-4 sm:p-6 space-y-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                              {relatedProject.title}
                            </h3>
                            <p className="text-gray-800 dark:text-gray-200 text-sm line-clamp-2">
                              {relatedProject.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className="text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-800"
                            >
                              {relatedProject.category}
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                              asChild
                            >
                              <Link href={`/projects/${relatedProject.id}`}>View Project</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Enhanced Mobile Lightbox */}
      {project.images && (
        <MobileLightbox
          images={project.images}
          selectedIndex={selectedImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onSelect={setSelectedImageIndex}
        />
      )}
    </div>
  );
}