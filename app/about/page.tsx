"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Hammer, 
  Home, 
  ChefHat, 
  Bath, 
  Layers, 
  Award, 
  Users, 
  Sparkles, 
  Mail,
  Shield,
  Star,
  Clock,
  Ruler
} from "lucide-react";

const About: React.FC = () => {
  // Optimized animation variants
  const fadeInUp = {
    hidden: { opacity: 0, transform: "translateY(30px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };

  const skills = [
    { name: "Project Planning", value: 95, icon: <Ruler className="w-4 h-4 text-blue-500" /> },
    { name: "General Renovation", value: 90, icon: <Home className="w-4 h-4 text-blue-500" /> },
    { name: "Kitchen & Bathroom", value: 88, icon: <ChefHat className="w-4 h-4 text-blue-500" /> },
    { name: "Construction Execution", value: 92, icon: <Layers className="w-4 h-4 text-blue-500" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section - Fixed navbar overlap */}
      <section className="relative h-[400px] w-full overflow-hidden mt-16 lg:mt-20">
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
            Established 2016
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg"
            style={{ willChange: "transform" }}
          >
            About BuildWell Construction
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-100 max-w-2xl drop-shadow-md"
          >
            Building today, for a stronger tomorrow
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-16 sm:px-6 lg:px-8">
        
        {/* Our Story & Team - Combined Section */}
        <section className="mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            className="text-center mb-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
            <Separator className="w-24 mx-auto bg-blue-500 h-1 mb-4" />
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Story Content */}
            <motion.div 
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              style={{ willChange: "transform" }}
            >
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-blue-500 mr-2" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">From concept to completion</span>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Founded in 2016, BuildWell Construction helps clients create practical, durable spaces that support the way they live and work. We take pride in thoughtful planning, clear communication, and quality execution.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300">
                We bring construction, renovation, design, and project management together for commercial, industrial, and residential projects across Toronto and Ontario.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2016</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Project types</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">360°</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Project support</div>
                </div>
              </div>
            </motion.div>
            
            {/* Team Cards */}
            <motion.div 
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {/* Founder */}
              <motion.div 
                variants={fadeInUp} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                style={{ willChange: "transform" }}
              >
                <div className="flex items-center">
                  <Avatar className="w-16 h-16 rounded-full border-2 border-blue-500 mr-4">
                    <AvatarFallback className="text-xl bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200">MA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Moe Asslan</h3>
                    <p className="text-gray-600 dark:text-gray-400">Project Manager</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs">Master Carpenter</Badge>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs">Designer</Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="italic text-gray-700 dark:text-gray-300 text-sm">
                    "We don't just build structures, we craft homes that tell your story."
                  </p>
                </div>
              </motion.div>
              
            </motion.div>
          </div>
        </section>

        {/* Our Values & Expertise - Combined */}
        <section className="mb-16">
          <motion.div 
            className="text-center mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us</h2>
            <Separator className="w-24 mx-auto bg-blue-500 h-1 mb-4" />
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Values */}
            <motion.div 
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Award className="w-6 h-6 text-blue-500 mr-2" />
                Our Values
              </h3>
              
              <motion.div variants={fadeInUp} className="flex items-start space-x-4" style={{ willChange: "transform" }}>
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Quality Craftsmanship</h4>
                  <p className="text-gray-700 dark:text-gray-300">Excellence in every detail, from material selection to finishing touches.</p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex items-start space-x-4" style={{ willChange: "transform" }}>
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Personal Attention</h4>
                  <p className="text-gray-700 dark:text-gray-300">Small team approach ensures personalized service for every project.</p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex items-start space-x-4" style={{ willChange: "transform" }}>
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Reliable Service</h4>
                  <p className="text-gray-700 dark:text-gray-300">On-time delivery, within budget, exceeding quality expectations.</p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Skills */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              style={{ willChange: "transform" }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Hammer className="w-6 h-6 text-blue-500 mr-2" />
                Our Expertise
              </h3>
              
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {skill.icon}
                        <span className="font-medium text-gray-900 dark:text-white ml-2 text-sm">{skill.name}</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{skill.value}%</span>
                    </div>
                    <div className="relative h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Customer satisfaction */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Quality-focused project delivery</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <motion.section 
          className="text-center rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 p-10 shadow-xl text-white relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
          style={{ willChange: "transform" }}
        >
          <div className="absolute inset-0 bg-[url('/fencepainting.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative z-10">Ready to Build Something Better?</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-6 relative z-10">
            Contact BuildWell Construction to discuss your commercial, industrial, or residential project.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 transition-colors duration-200" asChild>
              <a href="mailto:info@buildwellconstruction.com"><Mail className="w-5 h-5 mr-2" />Contact Us</a>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 transition-colors duration-200" asChild>
              <a href="tel:+14376881994">(437) 688-1994</a>
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;