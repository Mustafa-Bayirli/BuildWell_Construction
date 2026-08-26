"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sparkles, 
  Shield, 
  Clock, 
  CheckCircle, 
  Home, 
  Building2, 
  Palette, 
  Users, 
  Star,
  Phone,
  Mail,
  MapPin,
  Brush,
  ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Painting() {
  const services = [
    {
      icon: Home,
      title: "Interior Painting",
      description: "Transform your indoor spaces with professional painting.",
      features: ["Wall painting", "Ceiling painting", "Trim & molding"]
    },
    {
      icon: Building2,
      title: "Exterior Painting",
      description: "Protect and beautify your home's exterior surfaces.",
      features: ["Siding painting", "Deck staining", "Fence painting"]
    },
    {
      icon: Palette,
      title: "Commercial Painting",
      description: "Professional painting services for businesses and offices.",
      features: ["Office interiors", "Retail spaces", "Coffee shops", "Restaurants"]
    },
    {
      icon: Brush,
      title: "Specialty Finishes",
      description: "Unique finishes and textures for distinctive looks.",
      features: ["Texture painting", "Accent walls", "Custom finishes"]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Fully Insured",
      description: "Complete peace of mind with comprehensive insurance coverage."
    },
    {
      icon: Users,
      title: "Trained Professionals",
      description: "Background-checked staff with rigorous training."
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "We work around your schedule with convenient timing."
    },
  ];

  const router = useRouter();

  const handleContactNavigation = () => {
    router.push('/contact');
  };

  const handlePhoneCall = () => {
    if (typeof window !== "undefined") {
      window.open("tel:+16462391844", "_self");
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
                Professional Painting Services
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Professional Painting Services
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Transform your space with Westside Renovation Inc's professional painting services in New York. 
                We deliver beautiful, lasting results with attention to every detail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={handleContactNavigation}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg"
                >
                  Get Free Quote
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={handlePhoneCall}
                  className="border-white text-blue-700 dark:text-white  hover:bg-white/10 hover:text-white px-8 py-3 text-lg"
                >
                  Call (646) 239-1844
                </Button>
              </div>
            </div>
            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-200/20 to-blue-300/30 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl flex items-center justify-center">
                <div className="text-center text-blue-100">
                  <Palette className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">Professional Painting Image</p>
                  <p className="text-sm opacity-75">Replace with actual painting photo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Painting Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive painting solutions for both interior and exterior projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-600 h-full flex flex-col">
                  <div className="text-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto w-fit">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{service.description}</p>
                  </div>
                  
                  <div className="flex-1">
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                Why Choose Westside Renovation Inc?
              </h2>
              <div className="grid grid-cols-1 lg:grid-rows-4 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-3xl shadow-xl flex items-center justify-center">
                <div className="text-center text-blue-700 dark:text-blue-300">
                  <Users className="h-20 w-20 mx-auto mb-4" />
                  <p className="text-xl font-medium">Our Team Image</p>
                  <p className="text-sm opacity-75">Replace with team photo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Trusted by homeowners and businesses across New York</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                name: "James Parker",
                role: "Manhattan Resident",
                content: "Amazing painting job! The team was professional, clean, and the color consultation was spot on. Our living room looks incredible now. Highly recommend their services!",
                rating: 5,
                image: "JP"
              },
              {
                name: "Linda Davis",
                role: "Bronx Homeowner",
                content: "Westside Renovation painted our entire house exterior. The prep work was thorough and the finish is flawless. Great communication throughout the project.",
                rating: 5,
                image: "LD"
              }
            ].map((testimonial, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-blue-100 dark:border-gray-600">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.image}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-lg">{testimonial.name}</p>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed italic">
                    "{testimonial.content}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of satisfied customers across New York. Get your free consultation today and experience the difference professional painting makes.
            </p>
          </div>
          
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Phone className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Call Us</h3>
              <p className="text-blue-100 text-center">(646) 239-1844</p>
              <p className="text-sm text-blue-200 text-center mt-1">Available 24/7</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Mail className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Email Us</h3>
              <p className="text-blue-100 text-center">info@westsidereno.com</p>
              <p className="text-sm text-blue-200 text-center mt-1">Quick response</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Service Area</h3>
              <p className="text-blue-100 text-center">New York, NY</p>
              <p className="text-sm text-blue-200 text-center mt-1">All 5 boroughs</p>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              onClick={handleContactNavigation}
              className="bg-white text-blue-700 hover:bg-blue-50 px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Free Estimate
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handlePhoneCall}
              className="border-2 border-white dark:bg-white text-blue-700 hover:bg-blue-700 hover:text-blue-100 px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              Schedule Service
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 text-blue-200">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Fully Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">5-Star Rated</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">500+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}