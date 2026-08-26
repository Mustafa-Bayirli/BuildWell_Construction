// app/page.tsx (Updated to use Firebase)
"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Award, CheckCircle, Clock, Phone, Hammer, Paintbrush, Wrench, HomeIcon, ArrowRight, Star } from "lucide-react";
import { projectService, Project } from "@/lib/firebase-admin";

// Reusable section header component
interface SectionHeaderProps {
  title: string;
  subtitle: string;
  gradient?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, gradient = false }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="text-center mb-12 max-w-3xl mx-auto px-4"
    >
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${gradient ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600' : 'dark:text-white'}`}>
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        {subtitle}
      </p>
    </motion.div>
  );
};

// Service cards data
const services = [
  {
    title: "Interior Remodeling",
    description: "Transform your living spaces with our expert interior remodeling services.",
    icon: <HomeIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
    link: "/services/interior-remodeling",
  },
  {
    title: "Custom Carpentry",
    description: "Bespoke woodwork crafted with precision and attention to detail.",
    icon: <Hammer className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
    link: "/services/custom-carpentry",
  },
  {
    title: "Painting",
    description: "Professional painting services for a fresh, flawless finish.",
    icon: <Paintbrush className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
    link: "/services/painting",
  },
  {
    title: "Electrical",
    description: "Safe, reliable electrical services for your home or business.",
    icon: <Wrench className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
    link: "/services/electrical",
  },
];

// Testimonials data
const testimonials = [
  {
    quote: "Westside Renovation transformed our outdated kitchen into a stunning modern space we love to cook in!",
    author: "Sarah M.",
    location: "Manhattan",
    rating: 5,
  },
  {
    quote: "Professional, punctual, and precise. The team delivered exactly what they promised and on schedule.",
    author: "David T.",
    location: "Brooklyn",
    rating: 5,
  },
  {
    quote: "The attention to detail in the custom cabinetry was remarkable. Truly exceptional craftsmanship.",
    author: "Jennifer L.",
    location: "Queens",
    rating: 5,
  },
];

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Create animations based on scroll position
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);

  // Load featured projects from Firebase
  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        const projects = await projectService.getFeaturedProjects();
        setFeaturedProjects(projects.slice(0, 6)); // Limit to 6 featured projects
      } catch (error) {
        console.error('Error loading featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProjects();
  }, []);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <div className="flex flex-col items-center w-full mt-14">
      {/* Hero Section with Parallax Effect */}
      <section className="relative w-full bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden h-[90vh] min-h-[600px] flex items-center">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            style={{ y: heroY, height: "120%", width: "100%", position: "absolute", top: "-10%" }}
          >
            <Image
              src="/icestudios.png" 
              alt="Luxury renovation showcase"
              fill
              priority
              className="object-cover opacity-30"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-black/70 z-0"></div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="container mx-auto px-4 relative z-10"
        >
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-blue-600/30 backdrop-blur-sm text-blue-100 rounded-full px-4 py-1 inline-block mb-6 border border-blue-400/30"
            >
              NYC's Premier Renovation Experts
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Westside Renovation
            </motion.h1>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-emerald-300">Crafting</span> Spaces That Inspire
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl mb-10 text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              Turning your vision into reality with precision, quality, and dedication.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <Button 
                size="lg" 
                className=" bg-blue-700 dark:bg-blue-300 text-white dark:text-black"
                asChild
              >
                <Link href="/contact">
                  Schedule a Consultation
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-blue-700 hover:text-white hover:bg-white/10"
                asChild
              >
                <Link href="/projects">
                  View Our Portfolio
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Scrolling indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div 
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Trust Indicators */}
      <section className="w-full py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Award className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Licensed & Insured</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Fully licensed contractors with complete insurance coverage
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <CheckCircle className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                We're not happy until you're completely satisfied with our work
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Clock className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">On-Time, Every Time</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                We respect your schedule and deliver projects on time
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Carousel */}
      <section className="w-full py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Featured Projects" 
            subtitle="Browse our recent transformations and get inspired for your next renovation project" 
          />

          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Loading projects...</p>
            </div>
          ) : featuredProjects.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent>
                  {featuredProjects.map((project, index) => (
                    <CarouselItem key={project.id || index}>
                      <motion.div 
                        className="relative aspect-video rounded-xl overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.images && project.images.length > 0 ? (
                          <Image
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400">No image available</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
                          <h3 className="text-2xl font-bold">{project.title}</h3>
                          <p className="text-gray-200">{project.location}</p>
                          <motion.button 
                            className="mt-4 flex items-center text-blue-300 font-medium text-sm" 
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            onClick={() => window.location.href = `/projects/${project.id}`}
                          >
                            View Project <ArrowRight className="ml-1 h-4 w-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 -translate-y-1/2" />
                <CarouselNext className="right-2 -translate-y-1/2" />
              </Carousel>
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">No featured projects available at the moment.</p>
            </div>
          )}

          {featuredProjects.length > 0 && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Button asChild variant="outline" className="dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 group" size="lg">
                <Link href="/projects" className="flex items-center">
                  View All Projects
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Our Services */}
      <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Our Services" 
            subtitle="Comprehensive renovation and construction services tailored to your needs" 
            gradient={true}
          />

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Card className="border-0 shadow-lg h-full overflow-hidden dark:bg-gray-800 dark:border-gray-700 group">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                  <CardHeader className="pb-2">
                    <motion.div 
                      className="mb-2 text-blue-600 dark:text-blue-400"
                      whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                    >
                      {service.icon}
                    </motion.div>
                    <CardTitle className="dark:text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base dark:text-gray-300">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href={service.link} className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center group">
                      Learn more
                      <motion.div
                        className="ml-1"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.div>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Button asChild variant="outline" className="dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 group" size="lg">
              <Link href="/services" className="flex items-center">
                View All Services
                <motion.div
                  className="ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="What Our Clients Say" 
            subtitle="Don't just take our word for it - hear from our satisfied customers" 
          />

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Card className="bg-gray-50 dark:bg-gray-800 border-0 shadow-md h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full -mr-12 -mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-600/10 rounded-full -ml-8 -mb-8"></div>
                  
                  <CardContent className="pt-8 relative z-10">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex flex-col">
                      <span className="font-semibold dark:text-white">{testimonial.author}</span>
                      <span className="text-sm text-blue-600 dark:text-blue-400">
                        {testimonial.location}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - with animated background */}
      <section className="w-full py-20 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundImage: 'url("/icestudios.png")',
            backgroundSize: '40%',
          }}
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Space?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today for a professional consultation. Let's bring your vision to life!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="secondary" className="bg-white text-blue-700 hover:bg-gray-100 dark:hover:bg-gray-200" asChild>
                  <a href="tel:+16462391844">
                    <Phone className="mr-2 h-5 w-5" />
                    (646) 239-1844
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-white/20 hover:bg-white/30 border-2 border-white" asChild>
                  <Link href="/contact">
                    Schedule Consultation
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Motto/Tagline Banner */}
      <section className="w-full py-12 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-2xl md:text-3xl font-light italic tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            "Building Quality. Crafting Excellence. Renovating Dreams."
          </motion.h2>
          <motion.p 
            className="mt-4 text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Westside Renovation Inc. — Proudly serving New York since 2012
          </motion.p>
        </div>
      </section>
    </div>
  );
}