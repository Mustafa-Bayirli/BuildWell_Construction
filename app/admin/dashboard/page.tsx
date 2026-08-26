'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Plus,
  LogOut,
  FolderOpen,
  Star,
  Calendar,
  MapPin,
  Search,
  Grid3X3,
  List,
  TrendingUp,
  BarChart3,
  Target,
  Edit,
  Trash2,
  AlertTriangle,
  Menu,
  User,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useAuth } from '@/lib/auth-context';
import { projectService, Project } from '@/lib/firebase-admin';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  onEdit: (id: string) => void;
  onDelete: (project: Project) => void;
}

const ProjectCard = React.memo(({ project, onEdit, onDelete }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-md transition-all duration-200 group">
        <div className="h-1 bg-gradient-to-r from-blue-600 to-sky-500" />
        {project.images?.[0] && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {project.featured && (
              <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link href={`/projects/${project.id}`}>
                <Button variant="secondary" size="sm" className="bg-blue-50/90 hover:bg-blue-100 text-blue-600">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View
                </Button>
              </Link>
            </div>
          </div>
        )}
        <CardContent className="p-4 bg-blue-50/50 dark:bg-blue-900/30">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className="text-blue-600 border-blue-200 dark:text-blue-300 dark:border-blue-800">
              {project.category}
            </Badge>
            <span className="text-xs text-gray-800 dark:text-gray-200 flex items-center">
              <Calendar className="w-3 h-3 mr-1 text-blue-600 dark:text-blue-300" />
              {new Date(project.completedDate).toLocaleDateString()}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">{project.title}</h3>
          <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-2 mb-3">{project.description}</p>
          <div className="flex items-center text-sm text-gray-800 dark:text-gray-200 mb-4">
            <MapPin className="w-4 h-4 mr-1 text-blue-600 dark:text-blue-300" />
            {project.location}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-800 dark:text-gray-200">
              {project.images?.length || 0} images
            </span>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => project.id && onEdit(project.id)}
                disabled={!project.id}
                className="text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(project)}
                className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

interface DataTableProps<T> {
  columns: {
    header: string;
    accessorKey?: keyof T;
    cell?: (props: { row: { getValue: (key: string) => any; original: T } }) => React.ReactNode;
  }[];
  data: T[];
}

function DataTable<T>({ columns, data }: DataTableProps<T>) {
  return (
    <div className="rounded-md border border-blue-200 dark:border-blue-800">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50 dark:bg-blue-900/30">
            {columns.map((column) => (
              <TableHead key={column.header} className="text-gray-900 dark:text-white">
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-4 text-gray-800 dark:text-gray-200">
                No projects found
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index} className="hover:bg-blue-100/50 dark:hover:bg-blue-900/50">
                {columns.map((column) => (
                  <TableCell key={column.header} className="text-gray-800 dark:text-gray-200">
                    {column.cell
                      ? column.cell({ row: { getValue: (key) => row[column.accessorKey as keyof T], original: row } })
                      : column.accessorKey
                      ? row[column.accessorKey as keyof T] as React.ReactNode
                      : null}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { logout, user } = useAuth();
  const router = useRouter();

  const categories = [
    'All',
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

  const stats = useMemo(
    () => ({
      total: projects.length,
      featured: projects.filter((p) => p.featured).length,
      thisMonth: projects.filter((p) => {
        const thisMonth = new Date();
        thisMonth.setDate(1);
        return new Date(p.completedDate) >= thisMonth;
      }).length,
      categories: new Set(projects.map((p) => p.category)).size,
    }),
    [projects],
  );

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await projectService.getAllProjects();
        setProjects(projectsData);
        setFilteredProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.location.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((project) => project.category === selectedCategory);
    }

    setFilteredProjects(filtered);
  }, [projects, searchQuery, selectedCategory]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const projectsData = await projectService.getAllProjects();
      setProjects(projectsData);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete?.id) return;

    setDeleteLoading(true);
    try {
      await projectService.deleteProject(projectToDelete.id);
      setProjects(projects.filter((p) => p.id !== projectToDelete.id));
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[256px_1fr] gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-auto border-r border-blue-200 dark:border-blue-800 bg-blue-50/90 dark:bg-blue-900/90 backdrop-blur-sm rounded-xl shadow-sm">
            <div className="p-4 border-b border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Project Dashboard</h2>
              </div>
            </div>
            <nav className="p-4 space-y-2">
              <Link
                href="/admin/projects/new"
                className="flex items-center w-full px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:from-blue-700 hover:to-sky-600"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Link>
              <Button
                variant="ghost"
                onClick={handleRefresh}
                className="w-full justify-start text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30"
              >
                <RefreshCw className={cn('mr-2 h-4 w-4', refreshing && 'animate-spin')} />
                Refresh
              </Button>
            </nav>
            <div className="p-4 border-t border-blue-200 dark:border-blue-800 absolute bottom-0 w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  >
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>{user?.email?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="truncate">{user?.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border-blue-200 dark:border-blue-800">
                  <DropdownMenuLabel className="text-gray-900 dark:text-white">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-blue-200 dark:bg-blue-800" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  >
                    <LogOut className="mr-2 h-4 w-4 text-red-500" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <header className="lg:hidden mb-6 bg-blue-50/90 dark:bg-blue-900/90 backdrop-blur-sm rounded-xl border border-blue-200 dark:border-blue-800 p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Project Dashboard</h2>
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                      aria-label="Open dashboard menu"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-64 p-0 bg-blue-50/90 dark:bg-blue-900/90 backdrop-blur-sm border-l border-blue-200 dark:border-blue-800"
                  >
                    <VisuallyHidden>
                      <SheetTitle>Dashboard Menu</SheetTitle>
                    </VisuallyHidden>
                    <motion.div
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'tween', duration: 0.3 }}
                      className="flex flex-col h-full"
                    >
                      <div className="p-4 border-b border-blue-200 dark:border-blue-800">
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Project Dashboard</h2>
                        </div>
                      </div>
                      <nav className="flex-1 p-4 space-y-2">
                        <Link
                          href="/admin/projects/new"
                          className="flex items-center w-full px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:from-blue-700 hover:to-sky-600"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          New Project
                        </Link>
                        <Button
                          variant="ghost"
                          onClick={handleRefresh}
                          className="w-full justify-start text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                        >
                          <RefreshCw className={cn('mr-2 h-4 w-4', refreshing && 'animate-spin')} />
                          Refresh
                        </Button>
                      </nav>
                      <div className="p-4 border-t border-blue-200 dark:border-blue-800">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          onClick={handleLogout}
                        >
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>{user?.email?.[0]?.toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span className="truncate">{user?.email}</span>
                        </Button>
                      </div>
                    </motion.div>
                  </SheetContent>
                </Sheet>
              </div>
            </header>

      

            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {[
                { title: 'Total Projects', value: stats.total, icon: FolderOpen, color: 'from-blue-600 to-sky-500' },
                { title: 'Featured', value: stats.featured, icon: Star, color: 'from-yellow-500 to-orange-500' },
                { title: 'This Month', value: stats.thisMonth, icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
                { title: 'Categories', value: stats.categories, icon: Target, color: 'from-purple-500 to-indigo-500' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`bg-gradient-to-br ${stat.color} text-white shadow-lg border-blue-200 dark:border-blue-800`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium opacity-80">{stat.title}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <stat.icon className="h-8 w-8 opacity-80" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Filters */}
            <Card className="mb-6 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/30">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-800 dark:text-gray-200" />
                    <Input
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-blue-200 dark:border-blue-800 text-gray-800 dark:text-gray-200"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px] border-blue-200 dark:border-blue-800 text-gray-800 dark:text-gray-200">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-blue-200 dark:border-blue-800">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-gray-800 dark:text-gray-200">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex border border-blue-200 dark:border-blue-800 rounded-md overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-800 dark:text-gray-200'}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-800 dark:text-gray-200'}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {(searchQuery || selectedCategory !== 'All') && (
                  <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">
                    Showing {filteredProjects.length} of {projects.length} projects
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Projects Display */}
            {filteredProjects.length === 0 ? (
              <Card className="text-center p-8 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/30">
                <FolderOpen className="h-12 w-12 text-gray-800 dark:text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {projects.length === 0 ? 'No projects yet' : 'No projects found'}
                </h3>
                <p className="text-gray-800 dark:text-gray-200 mb-4">
                  {projects.length === 0 ? 'Get started by adding your first project.' : 'Try adjusting your filters.'}
                </p>
                {projects.length === 0 ? (
                  <Link
                    href="/admin/projects/new"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:from-blue-700 hover:to-sky-600"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Project
                  </Link>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="border-blue-300 text-blue-600 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30"
                  >
                    Clear Filters
                  </Button>
                )}
              </Card>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={(id) => router.push(`/admin/projects/edit/${id}`)}
                    onDelete={(project) => {
                      setProjectToDelete(project);
                      setDeleteDialogOpen(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <DataTable
                columns={[
                  {
                    header: 'Title',
                    accessorKey: 'title',
                    cell: ({ row }) => (
                      <Link href={`/projects/${row.original.id}`} className="font-medium text-blue-600 dark:text-blue-300 hover:underline">
                        {row.getValue('title')}
                      </Link>
                    ),
                  },
                  {
                    header: 'Category',
                    accessorKey: 'category',
                    cell: ({ row }) => (
                      <Badge variant="outline" className="text-blue-600 border-blue-200 dark:text-blue-300 dark:border-blue-800">
                        {row.getValue('category')}
                      </Badge>
                    ),
                  },
                  {
                    header: 'Date',
                    accessorKey: 'completedDate',
                    cell: ({ row }) => new Date(row.original.completedDate).toLocaleDateString(),
                  },
                  { header: 'Location', accessorKey: 'location' },
                  {
                    header: 'Actions',
                    cell: ({ row }) => (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => router.push(`/admin/projects/edit/${row.original.id}`)}
                          className="text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                        >
                          <Edit className="h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setProjectToDelete(row.original);
                            setDeleteDialogOpen(true);
                          }}
                          className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
                        >
                          <Trash2 className="h-4" />
                        </Button>
                      </div>
                    ),
                  },
                ]}
                data={filteredProjects}
              />
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <AlertDialogContent className="bg-background border-blue-200 dark:border-blue-800">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center text-gray-900 dark:text-white">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                    Delete Project
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-800 dark:text-gray-200">
                    Are you sure you want to delete "{projectToDelete?.title}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-blue-200 dark:border-blue-800 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={deleteLoading}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    {deleteLoading ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </>
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}