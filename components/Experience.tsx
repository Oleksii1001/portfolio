"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2 } from "lucide-react";

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
}

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      id: "1",
      company: "AgriTech Solutions Inc",
      position: "Senior Full Stack Developer",
      location: "Merced, CA",
      startDate: "Jan 2020",
      endDate: "Present",
      description: [
        "Architected a cloud-native farm intelligence platform using Angular 16, .NET 7, and Python/Django serving 200+ enterprise clients.",
        "Reduced telemetry data latency by 60% using SignalR and WebSockets for real-time dashboard updates.",
        "Migrated monolithic .NET Framework app to Dockerized microservices on Azure, cutting cloud costs by 25%.",
        "Implemented CI/CD with GitHub Actions and Infrastructure as Code (IaC), achieving 99.9% uptime.",
        "Mentored 4 junior developers in Angular, C#, and cloud best practices."
      ],
      technologies: ["Angular", ".NET 7", "C#", "Python", "Django", "Azure", "Docker", "SignalR", "WebSockets", "GitHub Actions", "IaC"],
    },
    {
      id: "2",
      company: "Central Valley Software Labs",
      position: "Full Stack Developer",
      location: "Merced, CA",
      startDate: "Jan 2017",
      endDate: "Dec 2020",
      description: [
        "Built a secure healthcare logistics SaaS using React, .NET Core, and PostgreSQL for 10K+ monthly users.",
        "Implemented RBAC, JWT/OAuth 2.0, and comprehensive audit logging to meet HIPAA-aligned security standards.",
        "Integrated Redis caching to achieve sub-200ms response times and 99.95% system uptime.",
        "Drove test coverage from 35% to 80% using xUnit, Jest, and Cypress via TDD practices.",
        "Containerized applications and deployed to Azure App Services using Docker."
      ],
      technologies: ["React", ".NET Core", "C#", "PostgreSQL", "Redis", "JWT", "OAuth 2.0", "Docker", "Azure", "xUnit", "Jest", "Cypress"],
    },
    {
      id: "3",
      company: "Merced Digital Systems",
      position: "Software Developer",
      location: "Merced, CA",
      startDate: "Jan 2014",
      endDate: "Dec 2016",
      description: [
        "Modernized legacy ASP.NET 2.0 MVC UIs to React, reducing UI-related bug reports by 40%.",
        "Built Python (Pandas/Flask) automation pipelines to replace manual Excel reporting, saving 8+ hours/week.",
        "Maintained and extended internal business applications using SQL Server and C#.",
        "Collaborated with stakeholders to translate business requirements into technical solutions.",
        "Improved code maintainability through modular architecture and documentation."
      ],
      technologies: ["React", "ASP.NET MVC", "C#", "Python", "Pandas", "Flask", "SQL Server", "JavaScript", "HTML/CSS"],
    },
    {
      id: "4",
      company: "Stanislaus Tech Innovations",
      position: "Software Development Intern",
      location: "Turlock, CA",
      startDate: "Jan 2013",
      endDate: "Dec 2013",
      description: [
        "Developed internal CRUD tools using ASP.NET Web Forms and SQL Server for task and data management.",
        "Enhanced functionality with lightweight Python/Flask scripts for data validation and export.",
        "Participated in Agile sprints, delivering 3–4 production features per cycle with consistent velocity.",
        "Learned Git, CI/CD concepts, and professional software development workflows.",
        "Received full-time offer based on performance and reliability."
      ],
      technologies: ["ASP.NET Web Forms", "C#", "SQL Server", "Python", "Flask", "Git", "Agile"],
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-20 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-foreground">
            Professional Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Over 10 years of experience building secure, high-performance applications across agriculture, healthcare, and enterprise domains-with a focus on Angular, .NET, Python, and cloud-native solutions.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full transform md:-translate-x-1/2 z-10 border-2 border-background" />

                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"} ml-12 md:ml-0`}>
                  <Card className="hover-elevate transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <Building2 className="h-5 w-5 text-primary" />
                          <h3 className="text-xl font-semibold font-display text-foreground">
                            {experience.company}
                          </h3>
                        </div>
                        <Badge variant="secondary" className="w-fit">
                          {experience.startDate} – {experience.endDate}
                        </Badge>
                      </div>
                      
                      <h4 className="text-lg font-medium text-primary mb-2">
                        {experience.position}
                      </h4>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {experience.description.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs hover-elevate"
                            data-testid={`badge-tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for desktop */}
                <div className="hidden md:block w-2/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}