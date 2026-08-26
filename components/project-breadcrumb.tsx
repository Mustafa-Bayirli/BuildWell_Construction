import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface ProjectBreadcrumbProps {
  category: string;
  projectTitle: string;
}

export function ProjectBreadcrumb({ category, projectTitle }: ProjectBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Link 
        href="/" 
        className="flex items-center hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link 
        href="/projects" 
        className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
      >
        Projects
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link 
        href={`/projects?category=${category.toLowerCase()}`}
        className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
      >
        {category}
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-gray-900 dark:text-white font-medium truncate max-w-xs">
        {projectTitle}
      </span>
    </nav>
  );
}
