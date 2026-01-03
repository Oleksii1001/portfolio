"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Zap, Target, Users, Heart } from "lucide-react";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleDownloadResume = () => {
    // Fixed: removed extra spaces in URL
    window.open("https://drive.google.com/file/d/1dpqKDtVmfVTaIx7z3BzdwPdcU8c1WYYz/view?usp=sharing", '_blank');
  };

  const values = [
    {
      icon: Zap,
      title: "Performance-Driven",
      description: "Optimized systems to achieve 40–60% latency reduction and 25% cloud cost savings."
    },
    {
      icon: Target,
      title: "Engineering Excellence",
      description: "Built reliable, secure applications with 99.9% uptime for 200K+ users."
    },
    {
      icon: Users,
      title: "Leadership & Mentorship",
      description: "Mentored junior developers and led Agile teams to improve velocity by 20%."
    },
    {
      icon: Heart,
      title: "Full-Stack Ownership",
      description: "Architected end-to-end solutions—from Angular frontends to .NET/Python backends."
    }
  ];

  const personalStats = [
    { label: "Years of Experience", value: "10+" },
    { label: "Enterprise Clients", value: "200+" },
    { label: "System Uptime", value: "99.9%" },
    { label: "Latency Reduction", value: "60%" }
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
          {/* ✅ FIXED: Added missing = after className */}
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-foreground">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Senior Full Stack Developer with 10+ years of experience building secure, high-performance web applications using Angular, .NET Core, C#, Python, and Django-serving 200K+ users with 99.9% uptime.
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
                  I’m a Senior Full Stack Developer based in Merced, CA, with over a decade of experience designing and scaling secure, cloud-native applications for agriculture, healthcare, and enterprise domains.
                </p>
                <p>
                  My expertise centers on <strong>Angular</strong> for dynamic frontends and <strong>.NET Core / C#</strong> and <strong>Python/Django</strong> for robust backends-all deployed on <strong>Azure</strong> with Docker, CI/CD, and infrastructure-as-code. I’ve led migrations from legacy monoliths to microservices, cut cloud costs by 25%, and reduced data latency by 60%.
                </p>
                <p>
                  I thrive in senior engineering roles where I can drive architecture decisions, mentor developers, and deliver high-impact solutions that balance performance, security, and maintainability.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="hover-elevate">Angular</Badge>
              <Badge variant="secondary" className="hover-elevate">.NET Core / C#</Badge>
              <Badge variant="secondary" className="hover-elevate">Python / Django</Badge>
              <Badge variant="secondary" className="hover-elevate">Azure</Badge>
              <Badge variant="secondary" className="hover-elevate">Docker & CI/CD</Badge>
              <Badge variant="secondary" className="hover-elevate">Microservices</Badge>
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