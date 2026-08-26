import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Star, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { Project } from '@/lib/firebase-admin';

interface ProjectCardProps {
  project: Project;
  index?: number;
  showDescription?: boolean;
  className?: string;
}

export function ProjectCard({ project, index = 0, showDescription = true, className }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={className}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-shadow group h-full">
        {project.images && project.images.length > 0 && (
          <div className="relative h-48">
            <ImageWithFallback
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fallbackClassName="bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
              priority={index === 0} // Load first image with priority
            />
            {project.featured && (
              <Badge className="absolute top-4 left-4 bg-yellow-500">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-4 left-4 right-4">
                <Button size="sm" className="w-full bg-white text-gray-900 hover:bg-gray-100" asChild>
                  <Link href={`/projects/${project.id}`}>
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline">{project.category}</Badge>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {project.completedDate.toLocaleDateString()}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {project.title}
          </h3>
          
          {showDescription && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1">
              {project.description}
            </p>
          )}
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
            <MapPin className="w-4 h-4 mr-1" />
            {project.location}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
