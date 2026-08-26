'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProjectForm from '@/components/ProjectForm';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { projectService, Project } from '@/lib/firebase-admin';

export default function EditProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectData = await projectService.getProjectById(params.id as string);
        setProject(projectData);
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadProject();
    }
  }, [params.id]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading project...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <ProjectForm project={project} />
    </ProtectedRoute>
  );
}
