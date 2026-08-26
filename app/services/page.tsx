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
  Wrench,
  Zap,
  Droplets,
  Layers,
  Hammer,
  Scissors,
  ArrowRight,
  Award,
  Target,
  Lightbulb
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Services() {
  const services = [
    {
      icon: Home,
      title: "Interior Remodeling",
      description: "Complete interior transformations for modern living.",
      link: "/services/interior-remodeling",
      features: ["Kitchen remodeling", "Bathroom renovation", "Living room upgrades"]
    },
    {
      icon: Wrench,
      title: "Installation",
      description: "Expert installation services for all your needs.",
      link: "/services/installation",
      features: ["Appliance installation", "Fixture installation", "Hardware installation"]
    },
    {
      icon: Palette,
      title: "Painting",
      description: "Professional interior & exterior painting services.",
      link: "/services/painting",
      features: ["Interior painting", "Exterior painting", "Color consultation"]
    },
    {
      icon: Zap,
      title: "Electrical",
      description: "Safe and reliable electrical work by licensed professionals.",
      link: "/services/electrical",
      features: ["Lighting installation", "Electrical repairs", "Panel upgrades"]
    },
    {
      icon: Droplets,
      title: "Plumbing",
      description: "Expert plumbing solutions for residential & commercial.",
      link: "/services/plumbing",
      features: ["Pipe repairs", "Bathroom plumbing", "Drain cleaning"]
    },
    {
      icon: Scissors,
      title: "Wallpaper",
      description: "Expert wallpaper installation and removal services.",
      link: "/services/wallpaper",
      features: ["Installation", "Removal", "Design consultation"]
    },
    {
      icon: Hammer,
      title: "Drywall Repairs",
      description: "Expert drywall repair services for seamless results.",
      link: "/services/repairs",
      features: ["Hole repairs", "Crack repairs", "Texture matching"]
    },
    {
      icon: Sparkles,
      title: "Cleaning",
      description: "Professional cleaning services for spotless spaces.",
      link: "/services/cleaning",
      features: ["Residential cleaning", "Commercial cleaning", "Deep cleaning"]
    },
    {
      icon: Layers,
      title: "Flooring",
      description: "Expert flooring installation and repair services.",
      link: "/services/flooring",
      features: ["Hardwood flooring", "Tile installation", "Vinyl & LVP"]
    }
  ];

  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Happy Customers"
    },
    {
      icon: Award,
      number: "1000+",
      label: "Projects Completed"
    },
    {
      icon: Target,
      number: "5★",
      label: "Average Rating"
    },
    {
      icon: Clock,
      number: "20+",
      label: "Years Experience"
    }
  ];

  const router = useRouter();

  const handleContactNavigation = () => {
    router.push('/contact');
  };

  const handleServiceNavigation = (link: string) => {
    router.push(link);
  };

  const handlePhoneCall = () => {
    if (typeof window !== "undefined") {
      window.open("tel:+16462391844", "_self");
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              Professional Renovation Services
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Complete Home & Business Renovation Services
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
              From interior remodeling to electrical work, we're your trusted partner for all renovation needs in New York. 
              Quality craftsmanship, reliable service, and exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                className="border-white text-blue-700 hover:bg-white/10 hover:text-white px-8 py-3 text-lg"
              >
                Call (646) 239-1844
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-fit">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Comprehensive Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Professional renovation services tailored to transform your space. From design to completion, we handle every detail.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => handleServiceNavigation(service.link)}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-600 h-full">
                  <div className="text-center mb-6">
                    <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl group-hover:scale-110 transition-transform duration-300 w-fit">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{service.description}</p>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Why Choose Westside Renovation Inc?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Fully Licensed & Insured
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Complete peace of mind with comprehensive insurance coverage and proper licensing for all services.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Expert Craftsmen
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Skilled professionals with years of experience and rigorous background checks for your security.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Quality Guarantee
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We stand behind our work with comprehensive warranties and a commitment to excellence.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      On-Time Delivery
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Reliable scheduling and timely project completion to minimize disruption to your life.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Our Process</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Free Consultation</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">We assess your project and provide detailed estimates.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Custom Planning</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">We create a tailored plan that fits your vision and budget.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Expert Execution</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Our skilled team delivers exceptional results on schedule.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Final Walkthrough</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">We ensure every detail meets our high standards.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Trusted by homeowners and businesses across New York</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Manhattan Homeowner",
                content: "Westside Renovation transformed our entire apartment. From painting to electrical work, every service was top-notch. Highly recommend!",
                rating: 5,
                image: "SJ",
                service: "Multiple Services"
              },
              {
                name: "Mike Chen",
                role: "Brooklyn Business Owner",
                content: "Professional team that handled our office renovation perfectly. Great communication and quality work across all trades.",
                rating: 5,
                image: "MC",
                service: "Commercial Renovation"
              },
              {
                name: "Lisa Rodriguez",
                role: "Queens Resident",
                content: "Outstanding flooring and painting work. The attention to detail and craftsmanship exceeded our expectations.",
                rating: 5,
                image: "LR",
                service: "Flooring & Painting"
              }
            ].map((testimonial, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.image}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed italic mb-3">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {testimonial.service}
                  </div>
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
              Join hundreds of satisfied customers across New York. Get your free consultation today and let's bring your vision to life.
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
              Get Free Consultation
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handlePhoneCall}
              className="border-2 border-white text-blue-700 hover:bg-white hover:text-blue-200 px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              Call Now
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 text-blue-200">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Licensed & Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">5-Star Rated</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span className="text-sm">1000+ Projects</span>
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