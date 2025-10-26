"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Coffee, Heart, Zap, Target, Users } from "lucide-react";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleDownloadResume = () => {
    // Direct download of resume from Google Drive
    window.open("https://drive.google.com/file/d/1dpqKDtVmfVTaIx7z3BzdwPdcU8c1WYYz/view?usp=sharing", '_blank');
  };

  const values = [
    {
      icon: Zap,
      title: "Innovation",
      description: "Always exploring new technologies and methodologies to solve complex problems."
    },
    {
      icon: Target,
      title: "Quality",
      description: "Committed to writing clean, maintainable code that stands the test of time."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Believe in the power of teamwork and clear communication to achieve great results."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Genuinely love what I do and it shows in every project I work on."
    }
  ];

  const personalStats = [
    { label: "Years of Experience", value: "7+" },
    { label: "Projects Delivered", value: "50+" },
    { label: "Technologies Mastered", value: "25+" },
    { label: "Happy Clients", value: "40+" }
  ];

  return (
    <section id="about" className="py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-foreground">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Senior Full-Stack Engineer with 7+ years of experience building scalable, secure, and high-performance 
            web and mobile applications using Python, .NET, Node.js, and modern front-end frameworks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-semibold font-display mb-4">My Journey</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a Senior Full-Stack Engineer with 7+ years of experience building scalable, secure, and high-performance 
                  web and mobile applications. I specialize in bridging robust back-end systems with modern, dynamic front-end 
                  interfaces — delivering solutions that are maintainable, reliable, and business-focused.
                </p>
                <p>
                  I have deep expertise in .NET (C#), Python (Django), Node.js, Angular, React and a wide range of databases 
                  and cloud platforms. I excel in full-cycle development — from architecture design and API development to 
                  responsive UI creation and cloud deployment.
                </p>
                <p>
                  Whether you need a custom SaaS platform, enterprise solution, or complex web application, I bring the experience, 
                  professionalism, and technical leadership to turn your vision into a high-quality product. From scalable backends 
                  to modern UIs, I'm ready to deliver excellence.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="hover-elevate">
                Python & Django
              </Badge>
              <Badge variant="secondary" className="hover-elevate">
                .NET & C#
              </Badge>
              <Badge variant="secondary" className="hover-elevate">
                Angular & React
              </Badge>
              <Badge variant="secondary" className="hover-elevate">
                Node.js & Express
              </Badge>
              <Badge variant="secondary" className="hover-elevate">
                AWS & Azure
              </Badge>
            </div>

            <Button 
              onClick={handleDownloadResume}
              className="hover-elevate"
              data-testid="button-about-resume"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </motion.div>

          {/* Stats and Values */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Stats */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold font-display mb-6 text-center">
                By the Numbers
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {personalStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Values */}
            <div>
              <h3 className="text-xl font-semibold font-display mb-6">
                What Drives Me
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    >
                      <Card className="p-4 h-full hover-elevate transition-all duration-300">
                        <CardContent className="p-0">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">{value.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {value.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}