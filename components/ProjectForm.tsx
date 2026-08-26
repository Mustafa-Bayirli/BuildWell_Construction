'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  X,
  Save,
  Star,
  Calendar,
  MapPin,
  Tag,
  FileText,
  Image as ImageIcon,
  Camera,
  FolderOpen,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { projectService, Project } from '@/lib/firebase-admin';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

interface ProjectFormProps {
  project?: Project | null;
}

interface FormErrors {
  title?: string;
  description?: string;
  location?: string;
  category?: string;
  completedDate?: string;
}

const categories = [
  'Interior Remodeling',
  'Custom Carpentry',
  'Painting',
  'Electrical',
  'Plumbing',
  'Bathroom Renovation',
  'Kitchen Remodeling',
  'Flooring',
  'Other',
];

const ProjectForm: React.FC<ProjectFormProps> = ({ project }) => {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const isEditing = !!project;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    location: project?.location || '',
    category: project?.category || categories[0],
    featured: project?.featured || false,
    completedDate: project?.completedDate
      ? project.completedDate.toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [images, setImages] = useState<string[]>(project?.images || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/admin/login');
    }
  }, [authLoading, isAdmin, router]);

  // Don't render if still loading auth or not admin
  if (authLoading || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.completedDate) errors.completedDate = 'Completion date is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue,
    }));
    
    // Clear error for this field
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear messages
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setErrorMessage(null);

    try {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter(file => file.type.startsWith('image/'));
      
      if (validFiles.length === 0) {
        throw new Error('Please select valid image files');
      }

      const uploadPromises = validFiles.map(file => 
        projectService.uploadImage(file, project?.id)
      );

      const newUrls = await Promise.all(uploadPromises);
      const successfulUploads = newUrls.filter(url => url);

      if (successfulUploads.length > 0) {
        setImages(prev => [...prev, ...successfulUploads]);
        setSuccessMessage(`Successfully uploaded ${successfulUploads.length} image(s)`);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to upload images');
    } finally {
      setUploading(false);
      // Reset file inputs
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (cameraInputRef.current) cameraInputRef.current.value = '';
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const handleRemoveImage = async (imageUrl: string, index: number) => {
    try {
      // Only delete from storage if it's a Firebase URL
      if (imageUrl.includes('firebase') || imageUrl.includes('storage.googleapis.com')) {
        await projectService.deleteImage(imageUrl);
      }
      
      setImages(prev => prev.filter((_, i) => i !== index));
      setSuccessMessage('Image removed successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error removing image:', error);
      // Remove from UI anyway
      setImages(prev => prev.filter((_, i) => i !== index));
      setErrorMessage('Image removed from project, but may still exist in storage');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setErrorMessage('Please fill out all required fields');
      return;
    }

    setSaving(true);
    setErrorMessage(null);

    try {
      const projectData = {
        ...formData,
        images: images.filter(url => url && url.trim() !== ''),
        completedDate: new Date(formData.completedDate),
      };

      if (isEditing && project?.id) {
        await projectService.updateProject(project.id, projectData);
        setSuccessMessage('Project updated successfully!');
      } else {
        await projectService.createProject(projectData);
        setSuccessMessage('Project created successfully!');
      }

      // Redirect after short delay to show success message
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error saving project:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20 pb-16 sm:pb-20">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="bg-blue-50/90 dark:bg-blue-900/90 backdrop-blur-sm border border-blue-200 dark:border-blue-800 rounded-xl mb-4 sm:mb-6 lg:mb-8 p-3 sm:p-4 lg:p-6 sticky top-4 z-10">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push('/admin/dashboard')}
              className="text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 h-8 px-2 sm:h-10 sm:px-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline text-sm sm:text-base">Back</span>
            </Button>
            <div className="text-center flex-1 mx-2 sm:mx-4">
              <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                {isEditing ? 'Edit Project' : 'Create Project'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 mt-0.5 sm:mt-1 hidden sm:block">
                {isEditing ? 'Update project details' : 'Add a new project to your portfolio'}
              </p>
            </div>
            <div className="w-8 sm:w-12 lg:w-20" />
          </div>
        </header>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl flex items-start">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-green-600 dark:text-green-300">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl flex items-start">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-600 dark:text-red-300">{errorMessage}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Project Information */}
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/90 dark:bg-blue-900/90 backdrop-blur-sm shadow-sm">
            <div className="h-1 bg-gradient-to-r from-blue-600 to-sky-500" />
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center text-gray-900 dark:text-white text-base sm:text-lg">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                Project Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4 sm:space-y-6">
                {/* Title */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="title" className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center">
                    <span>Title</span>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Modern Kitchen Renovation"
                    className="border-blue-200 dark:border-blue-800 h-11 sm:h-12 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                  {formErrors.title && (
                    <p className="text-sm text-red-500 flex items-center mt-1">
                      <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                      {formErrors.title}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="location" className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center">
                    <MapPin className="w-3 h-3 mr-1 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                    <span>Location</span>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Manhattan, NY"
                    className="border-blue-200 dark:border-blue-800 h-11 sm:h-12 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                  {formErrors.location && (
                    <p className="text-sm text-red-500 flex items-center mt-1">
                      <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                      {formErrors.location}
                    </p>
                  )}
                </div>

                {/* Category and Date Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Category */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label htmlFor="category" className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center">
                      <Tag className="w-3 h-3 mr-1 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                      <span>Category</span>
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 sm:py-3 border border-blue-200 dark:border-blue-800 rounded-md bg-background text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base h-11 sm:h-12 transition-all"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {formErrors.category && (
                      <p className="text-sm text-red-500 flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                        {formErrors.category}
                      </p>
                    )}
                  </div>

                  {/* Completion Date */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label htmlFor="completedDate" className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center">
                      <Calendar className="w-3 h-3 mr-1 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                      <span>Completion Date</span>
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <Input
                      id="completedDate"
                      type="date"
                      name="completedDate"
                      value={formData.completedDate}
                      onChange={handleInputChange}
                      className="border-blue-200 dark:border-blue-800 h-11 sm:h-12 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
                      style={{ 
                        WebkitAppearance: 'none',
                        MozAppearance: 'textfield'
                      }}
                      required
                    />
                    {formErrors.completedDate && (
                      <p className="text-sm text-red-500 flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                        {formErrors.completedDate}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center">
                    <span>Description</span>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the project details, challenges, and results..."
                    className="min-h-[120px] sm:min-h-[140px] border-blue-200 dark:border-blue-800 resize-none text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                  {formErrors.description && (
                    <p className="text-sm text-red-500 flex items-center mt-1">
                      <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                      {formErrors.description}
                    </p>
                  )}
                </div>

                {/* Featured checkbox */}
                <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-100/60 to-sky-100/60 dark:from-blue-900/40 dark:to-sky-900/40 rounded-lg border border-blue-200 dark:border-blue-800">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 mt-0.5 text-blue-600 border-blue-300 focus:ring-blue-600 rounded"
                  />
                  <div className="flex-1">
                    <label htmlFor="featured" className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center cursor-pointer">
                      <Star className="w-4 h-4 mr-2 text-yellow-500 flex-shrink-0" />
                      Mark as Featured Project
                    </label>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Featured projects are highlighted on your portfolio homepage
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Images */}
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/90 dark:bg-blue-900/90 backdrop-blur-sm shadow-sm">
            <div className="h-1 bg-gradient-to-r from-blue-600 to-sky-500" />
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center justify-between text-gray-900 dark:text-white text-base sm:text-lg">
                <div className="flex items-center">
                  <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                  Project Images
                </div>
                <Badge variant="outline" className="border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-300 text-xs">
                  {images.length} uploaded
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              {/* Upload Area */}
              <div
                className={cn(
                  'border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-colors',
                  dragOver
                    ? 'border-blue-600 bg-blue-100/50 dark:bg-blue-900/50'
                    : 'border-blue-200 dark:border-blue-800 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30',
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="space-y-3 sm:space-y-4">
                  <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-blue-600 dark:text-blue-300" />
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                      Upload Images
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                      Drag and drop images or select from your device
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                      disabled={uploading}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 h-9 sm:h-10"
                    >
                      <FolderOpen className="w-4 h-4 mr-2" />
                      Gallery
                    </Button>
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileInputChange}
                      className="hidden"
                      disabled={uploading}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => cameraInputRef.current?.click()}
                      disabled={uploading}
                      className="border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 h-9 sm:h-10"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Camera
                    </Button>
                  </div>
                  {uploading && (
                    <div className="mt-3 sm:mt-4">
                      <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-300">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Uploading...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Grid */}
              {images.length > 0 && (
                <div className="mt-4 sm:mt-6">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3 sm:mb-4 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                    Images ({images.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {images.map((imageUrl, index) => (
                      <div
                        key={`${imageUrl}-${index}`}
                        className="relative group aspect-square rounded-lg overflow-hidden border border-blue-200 dark:border-blue-800 bg-gray-100 dark:bg-gray-800"
                      >
                        <Image
                          src={imageUrl}
                          alt={`Project image ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        />
                        {index === 0 && (
                          <Badge className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-blue-600 text-white text-xs">
                            Main
                          </Badge>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(imageUrl, index)}
                          className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 p-1 sm:p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                          aria-label={`Remove image ${index + 1}`}
                        >
                          <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end pt-6 sm:pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/dashboard')}
              className="border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 h-11 sm:h-12 order-2 sm:order-1 transition-all"
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:from-blue-700 hover:to-sky-600 h-11 sm:h-12 order-1 sm:order-2 font-medium transition-all shadow-lg hover:shadow-xl"
              disabled={saving || uploading}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Update Project' : 'Create Project'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;