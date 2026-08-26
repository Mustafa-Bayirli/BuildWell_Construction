'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/app/logo/logo2.svg';
import {
  Moon,
  Sun,
  Menu,
  User,
  LogOut,
  Settings,
  Shield,
  Home,
  Info,
  Wrench,
  Mail,
  Eye,
  Plus,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from '@/lib/utils';

// Navigation items with TypeScript interfaces
interface SubNavItem {
  name: string;
  path: string;
  description?: string;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  submenu?: boolean;
  subItems?: SubNavItem[];
}

const navItems: NavItem[] = [
  {
    name: 'Home',
    path: '/',
    icon: <Home className="w-4 h-4" />,
  },
  {
    name: 'About',
    path: '/about',
    icon: <Info className="w-4 h-4" />,
  },
   {
    name: 'Projects',
    path: '/projects',
    icon: <Eye className="w-4 h-4" />,
  },
  {
    name: 'Contact',
    path: '/contact',
    icon: <Mail className="w-4 h-4" />,
  },
  {
    name: 'Services',
    path: '/services',
    submenu: true,
    icon: <Wrench className="w-4 h-4" />,
    subItems: [
      {
        name: 'All Services',
        path: '/services',
        description: 'Explore all our services',
      },
      {
        name: 'Interior Remodeling',
        path: '/services/interior-remodeling',
        description: 'Complete interior transformations',
      },
      {
        name: 'Installation',
        path: '/services/installation',
        description: 'Expert installation services for all needs',
      },
      {
        name: 'Painting',
        path: '/services/painting',
        description: 'Professional interior & exterior painting',
      },
      {
        name: 'Electrical',
        path: '/services/electrical',
        description: 'Safe and reliable electrical work',
      },
      {
        name: 'Plumbing',
        path: '/services/plumbing',
        description: 'Expert plumbing solutions',
      },
      {
        name: 'Wallpaper',
        path: '/services/wallpaper',
        description: 'Expert wallpaper installation and removal',
      },
      {
        name: 'Drywall Repairs',
        path: '/services/repairs',
        description: 'Expert drywall repair services for your home',
      },
      {
        name: 'Cleaning',
        path: '/services/cleaning',
        description: 'Beautiful cleaning services',
      },
      {
        name: 'Flooring',
        path: '/services/flooring',
        description: 'Expert flooring installation and repair services',
      },
    ],
  },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, isAdmin, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <div className="mx-auto max-w-6xl bg-background/95 dark:bg-gray-900/95 rounded-2xl shadow-xl backdrop-blur-xl border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between px-6 py-3 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
              <Image
                src={Logo}
                alt="Westside Renovation Logo"
                width={48}
                height={48}
                className="object-cover h-12 w-12 rounded-xl relative z-10"
                priority
                sizes="48px"
              />
            </div>
            <div className="hidden sm:block">
              <h2 className="font-bold text-lg bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-300 bg-clip-text text-transparent">
                WESTSIDE
              </h2>
              <p className="text-xs text-gray-800 dark:text-gray-200 font-medium tracking-wide">
                RENOVATION INC
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) =>
              item.submenu ? (
                <NavigationMenu key={item.path}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={cn(
                          'px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2',
                          isActive(item.path)
                            ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white'
                            : 'text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30',
                        )}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[500px] gap-2 p-6 md:w-[600px] md:grid-cols-2 bg-background border border-blue-200 dark:border-blue-800">
                          {item.subItems?.map((subItem) => (
                            <NavigationMenuLink key={subItem.path} asChild>
                              <Link
                                href={subItem.path}
                                className={cn(
                                  'block rounded-xl p-4 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all',
                                  pathname === subItem.path && 'bg-blue-100 dark:bg-blue-900/50 border-l-4 border-blue-600',
                                )}
                              >
                                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {subItem.name}
                                </div>
                                {subItem.description && (
                                  <p className="text-xs text-gray-800 dark:text-gray-200 mt-1">
                                    {subItem.description}
                                  </p>
                                )}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2',
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white'
                      : 'text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30',
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ),
            )}
          </div>

          {/* Right Side: Theme Toggle + User Menu + Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:scale-110 transition-transform"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-blue-600" />
              )}
            </Button>

            {/* User Menu */}
            {user && isAdmin ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white"
                    aria-label="Admin menu"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Admin</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border-blue-200 dark:border-blue-800">
                  <DropdownMenuLabel>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.email?.split('@')[0]}</p>
                      <p className="text-xs text-gray-800 dark:text-gray-200">Administrator</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-blue-200 dark:bg-blue-800" />
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard" className="flex items-center">
                      <Settings className="h-4 w-4 mr-2 text-blue-600" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/projects/new" className="flex items-center">
                      <Plus className="h-4 w-4 mr-2 text-green-500" />
                      Add Project
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-blue-200 dark:bg-blue-800" />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2 text-red-500" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                className="border-blue-300 text-blue-600 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30"
                asChild
              >
                <Link href="/admin/login" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                  aria-label="Open mobile menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 p-0 bg-blue-50/90 dark:bg-blue-900/90 backdrop-blur-sm border-l border-blue-200 dark:border-blue-800"
              >
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden>
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className="flex flex-col h-full"
                >
                  <div className="p-4 border-b border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={Logo}
                        alt="Westside Renovation Logo"
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-xl"
                      />
                      <div>
                        <h2 className="font-bold text-lg text-gray-900 dark:text-white">WESTSIDE</h2>
                        <p className="text-xs text-gray-800 dark:text-gray-200">RENOVATION INC</p>
                      </div>
                    </div>
                  </div>
                  <nav className="flex-1 p-4 space-y-2 overflow-auto">
                    {navItems.map((item) => (
                      <div key={item.path}>
                        {item.submenu ? (
                          <div>
                            <Button
                              variant="ghost"
                              className={cn(
                                'w-full justify-between text-left text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30',
                                isActive(item.path) && 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300',
                              )}
                              onClick={() => {
                                if (isActive(item.path)) {
                                  router.push(item.path);
                                }
                              }}
                            >
                              <div className="flex items-center space-x-2">
                                {item.icon}
                                <span>{item.name}</span>
                              </div>
                            </Button>
                            <div className="ml-4 mt-2 space-y-1">
                              {item.subItems?.map((subItem) => (
                                <Link
                                  key={subItem.path}
                                  href={subItem.path}
                                  className={cn(
                                    'block p-3 rounded-lg text-sm',
                                    pathname === subItem.path
                                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300'
                                      : 'text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30',
                                  )}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <div className="font-medium">{subItem.name}</div>
                                  {subItem.description && (
                                    <p className="text-xs text-gray-800 dark:text-gray-200 mt-1">
                                      {subItem.description}
                                    </p>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={item.path}
                            className={cn(
                              'flex items-center space-x-2 w-full p-3 rounded-lg text-sm',
                              isActive(item.path)
                                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300'
                                : 'text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30',
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.icon}
                            <span>{item.name}</span>
                          </Link>
                        )}
                      </div>
                    ))}
                    {user && isAdmin && (
                      <div className="border-t border-blue-200 dark:border-blue-800 pt-4 mt-4">
                        <div className="text-xs font-medium text-gray-800 dark:text-gray-200 mb-2 px-3">
                          ADMIN PANEL
                        </div>
                        <Link
                          href="/admin/dashboard"
                          className={cn(
                            'flex items-center space-x-2 w-full p-3 rounded-lg text-sm',
                            pathname === '/admin/dashboard'
                              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300'
                              : 'text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30',
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4 text-blue-600" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          href="/admin/projects/new"
                          className={cn(
                            'flex items-center space-x-2 w-full p-3 rounded-lg text-sm',
                            pathname === '/admin/projects/new'
                              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300'
                              : 'text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30',
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Plus className="h-4 w-4 text-green-500" />
                          <span>Add Project</span>
                        </Link>
                        <Button
                          variant="ghost"
                          className="flex items-center space-x-2 w-full p-3 text-sm justify-start text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                        >
                          <LogOut className="h-4 w-4 text-red-500" />
                          <span>Logout</span>
                        </Button>
                      </div>
                    )}
                  </nav>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;