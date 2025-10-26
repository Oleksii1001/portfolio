"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Play, Eye, Calendar, Download } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  category: string;
  image: string;
  playStoreUrl?: string;
  features: string[];
  stats: {
    downloads?: string;
    rating?: string;
  };
  completedDate: string;
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "1",
      title: "KAMI Workforce - HR Management Platform",
      description: "Innovative HR software built for the modern workforce, streamlining every people process with a powerful, fully integrated system.",
      fullDescription: "KAMI delivers next-gen HR solutions that adapt to your business — combining enterprise-grade features, modular flexibility, and exceptional value for SMEs. Manage HR, payroll, attendance, and approvals anytime, anywhere with the mobile app. One platform, unlimited possibilities.",
      technologies: ["Angular", "Node.js", "PostgreSQL", "React", "TypeScript", "Mobile Development"],
      category: "enterprise",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
      playStoreUrl: "https://ziphr.co/",
      features: [
        "All-in-one HR management system",
        "Payroll and attendance tracking",
        "Mobile app for anytime, anywhere access",
        "Modular and customizable platform",
        "Enterprise-grade security and compliance",
        "Real-time analytics and reporting",
        "Seamless integration with existing tools"
      ],
      stats: { downloads: "N/A", rating: "N/A" },
      completedDate: "2024"
    },
    {
      id: "2",
      title: "ExaWizards Recruit Assistant Agent",
      description: "AI-powered recruiting assistant that maximizes candidate engagement through personalized communication from application to offer acceptance.",
      fullDescription: "exaBase Recruit Assistant is an AI agent that executes motivation through dialogue, from when candidates learn about the company until they accept an offer. Candidate questions are answered immediately, related information is delivered in conversational format, and communication content is standardized.",
      technologies: ["Python", "AI/ML", "NLP", "React", "Node.js", "PostgreSQL"],
      category: "ai",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
      playStoreUrl: "https://exawizards.com/exabase/recruit-assistant-agent/",
      features: [
        "AI-powered candidate communication",
        "24/7 instant response to questions",
        "Personalized information delivery",
        "Standardized recruiting communication",
        "Candidate engagement analytics",
        "Data-driven recruitment optimization",
        "Seamless integration with ATS systems"
      ],
      stats: { downloads: "N/A", rating: "N/A" },
      completedDate: "2024"
    },
    {
      id: "3",
      title: "TopChrétien - Christian Community Platform",
      description: "Leading French Christian platform providing daily inspiration, Bible study tools, formations, and community engagement for 500,000+ members.",
      fullDescription: "TopChrétien is a comprehensive Christian community platform offering La Pensée du Jour (Thought of the Day), PassLeMot (Share the Word), TopBible with multiple translations, TopFormations for spiritual growth, and TopTV for live streaming. A platform for sharing God's love through quality resources and community encouragement.",
      technologies: ["PHP", "Laravel", "Vue.js", "MySQL", "Video Streaming", "Mobile Apps"],
      category: "community",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      playStoreUrl: "https://www.topchretien.com/",
      features: [
        "Daily devotional content and Bible verses",
        "Comprehensive Bible study tools",
        "Live TV streaming and on-demand videos",
        "Online formations and courses",
        "Community engagement features",
        "Multi-platform accessibility (web & mobile)",
        "500,000+ active community members"
      ],
      stats: { downloads: "500K+", rating: "4.7" },
      completedDate: "2023"
    },
    {
      id: "4",
      title: "Stanford Haptic Breathing Pacer Research",
      description: "Innovative wearable device using haptic feedback to help individuals with autism and emotion dysregulation manage stress through breathing.",
      fullDescription: "Developed at Stanford's Wehab Lab, this haptic breathing pacer (HBP) applies vibrations to synchronize breathing and reduce arousal in high-stress situations. Research shows promising efficacy for individuals with Autism Spectrum Disorder, using machine learning to personalize the approach for individual differences.",
      technologies: ["Python", "Machine Learning", "IoT", "Wearable Tech", "Health APIs", "Data Analytics"],
      category: "research",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
      playStoreUrl: "https://stanforddaily.com/2019/10/21/researchers-work-on-device-to-help-individuals-with-autism-handle-stress/",
      features: [
        "Haptic feedback for breathing synchronization",
        "Machine learning personalization",
        "Stress and affect regulation",
        "Research-backed efficacy",
        "Wearable technology integration",
        "Data-driven insights",
        "Focus on ASD population needs"
      ],
      stats: { downloads: "Research", rating: "N/A" },
      completedDate: "2019"
    },
    {
      id: "5",
      title: "Quantum Mini-Apps for Engineering",
      description: "Research on implementing variational quantum algorithms for solving the Poisson equation and engineering applications on non-fault-tolerant systems.",
      fullDescription: "This work presents a case study in implementing variational quantum algorithms for solving partial differential equations commonly encountered in science and engineering. Highlights practical challenges in mapping algorithms to physical hardware and software engineering considerations for realistic results on today's quantum systems.",
      technologies: ["Python", "Quantum Computing", "Qiskit", "Algorithm Design", "Scientific Computing"],
      category: "research",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
      playStoreUrl: "https://arxiv.org/abs/2411.12920",
      features: [
        "Variational quantum algorithms",
        "Poisson equation solver implementation",
        "Practical hardware mapping",
        "Software engineering for quantum systems",
        "Non-fault-tolerant system optimization",
        "Engineering applications focus",
        "Published research (IEEE)"
      ],
      stats: { downloads: "Research Paper", rating: "N/A" },
      completedDate: "2024"
    },
    {
      id: "6",
      title: "GE Healthcare Solutions Integration",
      description: "Contributed to enterprise healthcare solutions and digital transformation initiatives for improving patient care and clinical workflows.",
      fullDescription: "Worked on healthcare technology solutions that support precision care and innovation in medical imaging, diagnostics, and patient monitoring systems. Focused on building integrated solutions for hospitals and healthcare providers to enhance efficiency and patient outcomes.",
      technologies: [".NET", "C#", "Azure", "Healthcare APIs", "Microservices", "Enterprise Integration"],
      category: "healthcare",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
      playStoreUrl: "https://www.gehealthcare.com/",
      features: [
        "Healthcare IT solutions integration",
        "Medical imaging software development",
        "Clinical workflow optimization",
        "Cloud-based healthcare platforms",
        "Patient monitoring systems",
        "Enterprise-grade security compliance",
        "Scalable microservices architecture"
      ],
      stats: { downloads: "Enterprise", rating: "N/A" },
      completedDate: "2023"
    }
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "enterprise", label: "Enterprise & SaaS" },
    { id: "ai", label: "AI & Machine Learning" },
    { id: "community", label: "Community Platforms" },
    { id: "research", label: "Research & Innovation" },
    { id: "healthcare", label: "Healthcare Tech" },
  ];

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleProjectAction = (action: string, project: Project) => {
    if (action === "view-details") {
      setSelectedProject(project);
    } else if (action === "play-store" && project.playStoreUrl) {
      window.open(project.playStoreUrl, '_blank');
    }
  };

  return (
    <section id="projects" className="py-20 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-foreground">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating various technologies and problem-solving approaches.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => handleCategoryChange(category.id)}
              className="hover-elevate"
              data-testid={`filter-${category.id}`}
            >
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`${project.id}-${selectedCategory}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover-elevate transition-all duration-300 overflow-hidden h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    data-testid={`img-project-${project.id}`}
                  />
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleProjectAction("play-store", project)}
                      data-testid={`button-playstore-${project.id}`}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Play Store
                    </Button>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-display group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {project.completedDate}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs hover-elevate"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Project Stats */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    {project.stats.downloads && (
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {project.stats.downloads}
                      </div>
                    )}
                    {project.stats.rating && (
                      <div className="flex items-center gap-1">
                        ⭐ {project.stats.rating}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 hover-elevate"
                          onClick={() => handleProjectAction("view-details", project)}
                          data-testid={`button-details-${project.id}`}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-display">
                            {project.title}
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              {project.stats.downloads && (
                                <div className="flex items-center gap-1">
                                  <Download className="h-4 w-4" />
                                  {project.stats.downloads} downloads
                                </div>
                              )}
                              {project.stats.rating && (
                                <div className="flex items-center gap-1">
                                  ⭐ {project.stats.rating} rating
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold mb-2">About</h3>
                            <p className="text-muted-foreground mb-4">
                              {project.fullDescription}
                            </p>
                            
                            <h3 className="font-semibold mb-2">Key Features</h3>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {project.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="w-1 h-1 bg-primary rounded-full mt-2" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 pt-4 border-t">
                          <Button 
                            onClick={() => handleProjectAction("play-store", project)}
                            data-testid={`button-modal-playstore-${project.id}`}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View on Play Store
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
