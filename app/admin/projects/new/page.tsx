'use client';

import React from 'react';
import ProjectForm from '@/components/ProjectForm';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function NewProjectPage() {
  return (
    <ProtectedRoute>
      <ProjectForm />
    </ProtectedRoute>
  );
}
