"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MessageSquare
} from "lucide-react";

const Contact: React.FC = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "general"
  });
  
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async () => {
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormState("error");
      setErrorMessage("Please fill out all required fields.");
      return;
    }
    
    // Set submitting state
    setFormState("submitting");
    
    // Simulate form submission
    try {
      // Replace this with your actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success state
      setFormState("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        service: "general"
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormState("idle");
      }, 3000);
      
    } catch (error) {
      // Error state
      setFormState("error");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };
  
  // Optimized animation variants - using transform properties for better performance
  const fadeInUp = {
    hidden: { opacity: 0, transform: "translateY(30px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smoother animation
      }
    }
  };
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section - Added top padding for navbar */}
      <section className="relative h-[300px] w-full overflow-hidden mt-16 lg:mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/70">
          <div className="absolute inset-0 bg-[url('/cabinetinstallation.jpg')] bg-cover bg-center opacity-60"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <motion.div
            initial={{ opacity: 0, transform: "translateY(-20px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-blue-600/30 backdrop-blur-sm text-blue-100 rounded-full px-4 py-1 inline-block mb-4 border border-blue-400/30"
            style={{ willChange: "transform" }}
          >
            Get In Touch
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg"
            style={{ willChange: "transform" }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-100 max-w-2xl drop-shadow-md"
          >
            We're here to answer your questions and bring your vision to life
          </motion.p>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8"
            style={{ willChange: "transform" }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <MessageSquare className="w-6 h-6 text-blue-500 mr-2" />
                Send Us a Message
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full"
                    required
                    disabled={formState === "submitting"}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full"
                    required
                    disabled={formState === "submitting"}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  className="w-full"
                  disabled={formState === "submitting"}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={formState === "submitting"}
                >
                  <option value="general">General Inquiry</option>
                  <option value="renovation">Home Renovation</option>
                  <option value="carpentry">Custom Carpentry</option>
                  <option value="kitchen">Kitchen Remodeling</option>
                  <option value="bathroom">Bathroom Renovation</option>
                  <option value="deck">Deck Construction</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  className="w-full min-h-[150px]"
                  required
                  disabled={formState === "submitting"}
                />
              </div>
              
              {formState === "error" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-3 rounded-md flex items-start"
                >
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </motion.div>
              )}
              
              {formState === "success" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-3 rounded-md flex items-start"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>Your message has been sent successfully! We'll be in touch soon.</p>
                </motion.div>
              )}
              
              <Button 
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                disabled={formState === "submitting"}
              >
                {formState === "submitting" ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
          
          {/* Contact Information Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Business Info Card */}
            <motion.div 
              variants={fadeInUp} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8"
              style={{ willChange: "transform" }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Phone</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      <a href="tel:+16462391844" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                        (646) 239-1844
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      <a href="mailto:info@westsideren.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                        info@westsideren.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Office Location</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      123 Renovation Street<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Business Hours</h3>
                    <div className="mt-1 text-gray-600 dark:text-gray-300 space-y-1">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 2:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Schedule Appointment Card */}
            <motion.div 
              variants={fadeInUp} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8"
              style={{ willChange: "transform" }}
            >
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Schedule a Consultation</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Prefer to schedule a specific time? Book a consultation with our team to discuss your project in detail.
              </p>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200">
                Book Appointment
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mt-16 text-center rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 p-10 shadow-xl text-white relative overflow-hidden"
          style={{ willChange: "transform" }}
        >
          <div className="absolute inset-0 bg-[url('/cabinetinstallation.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

          <h2 className="text-3xl font-bold mb-4 relative z-10">Ready to Transform Your Space?</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-6 relative z-10">
            Contact us today and let us help bring your renovation dreams to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 transition-colors duration-200">
              Call (646) 239-1844
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 transition-colors duration-200">
              Email Us
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;