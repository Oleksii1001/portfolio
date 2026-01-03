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
    title: "Climate FieldView (AgriTech Reference)",
    description: "Reference: Real-time farm data platform similar to my work at AgriTech Solutions Inc.",
    fullDescription: "Climate FieldView delivers field-level insights using real-time sensor data, satellite imagery, and agronomic models—similar in scope and scale to the cloud-native telemetry platform I architected using Angular, .NET 7, and Python/Django for 200+ enterprise farms.",
    technologies: ["Angular", ".NET 7", "Python", "Django", "Azure", "Real-time Telemetry"],
    category: "enterprise",
    image: "assets/fieldview_1.jpg",
    playStoreUrl: "https://www.fieldview.com",
    features: [
      "Real-time agronomic insights",
      "Sensor & equipment telemetry",
      "Cloud-native SaaS architecture",
      "Enterprise client focus"
    ],
    stats: { downloads: "200+ Enterprise Clients", rating: "60% Latency Reduction" },
    completedDate: "2020–Present"
  },
  {
    id: "2",
    title: "Taranis (AgriTech Reference)",
    description: "Reference: AI-powered crop monitoring platform similar to my telemetry dashboard work.",
    fullDescription: "Taranis uses AI, aerial imagery, and real-time dashboards to monitor crop health at scale—reflecting the same technical challenges I solved in building a sub-second telemetry system processing 10,000+ events/hour with SignalR and WebSockets.",
    technologies: ["React", "WebSockets", "AI/ML", "Cloud Infrastructure", "Real-time UI"],
    category: "enterprise",
    image: "assets/taranis_1.jpg",
    playStoreUrl: "https://www.taranis.com",
    features: [
      "AI-driven field scouting",
      "Real-time alerting",
      "High-scale data visualization",
      "Farmer & agronomist workflows"
    ],
    stats: { downloads: "10K+ Sensor Events/Hour", rating: "Sub-Second Response" },
    completedDate: "2020–Present"
  },
  {
    id: "3",
    title: "Meddbase (Healthcare SaaS Reference)",
    description: "Reference: Clinical management SaaS similar to my work at Central Valley Software Labs.",
    fullDescription: "Meddbase provides secure, role-based clinical operations software with audit logging and compliance—directly comparable to the HIPAA-aligned healthcare logistics platform I built using React, .NET Core, PostgreSQL, and Redis.",
    technologies: ["React", ".NET Core", "PostgreSQL", "RBAC", "JWT", "Audit Logging"],
    category: "healthcare",
    image: "assets/meddbase_1.jpg",
    playStoreUrl: "https://www.meddbase.com",
    features: [
      "Role-based access control",
      "Patient & workflow management",
      "Regulated healthcare environment",
      "High uptime & security"
    ],
    stats: { downloads: "10K+ Monthly Users", rating: "99.95% Uptime" },
    completedDate: "2017–2020"
  },
  {
    id: "4",
    title: "Cortext (Healthcare Communication Reference)",
    description: "Reference: Secure clinical messaging platform similar to my secure API work.",
    fullDescription: "Cortext (by Imprivata) enables HIPAA-compliant clinical communication with audit trails—similar to the secure OAuth 2.0 and JWT systems I implemented for 10K+ users with 99.95% uptime.",
    technologies: ["React", ".NET Core", "OAuth 2.0", "JWT", "Redis", "Azure"],
    category: "healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    playStoreUrl: "https://www.cortext.com",
    features: [
      "Secure real-time messaging",
      "Compliance & auditability",
      "Scalable backend APIs",
      "Healthcare-grade security"
    ],
    stats: { downloads: "Healthcare Providers", rating: "99.95% Uptime" },
    completedDate: "2017–2020"
  },
  {
    id: "5",
    title: "CityGro (Legacy Modernization Reference)",
    description: "Reference: Farm-to-retail SaaS similar to my legacy-to-React migration work.",
    fullDescription: "CityGro modernized legacy supply chain tools into a responsive SaaS platform—mirroring my work refactoring ASP.NET MVC to React and automating workflows with Python, reducing bugs by 40%.",
    technologies: ["React", "Python", "Flask", "Legacy Modernization", "Automation"],
    category: "enterprise",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    playStoreUrl: "https://www.citygro.com",
    features: [
      "Legacy system modernization",
      "B2B supply chain SaaS",
      "Automated reporting",
      "Operational efficiency gains"
    ],
    stats: { downloads: "Internal Operations", rating: "40% Bug Reduction" },
    completedDate: "2014–2016"
  },
  {
    id: "6",
    title: "GoFarma (Pharmacy SaaS Reference)",
    description: "Reference: Pharmacy management platform similar to my internal tool work.",
    fullDescription: "GoFarma offers pharmacy ordering and management via modern web UIs over Python/Flask backends—similar to the internal automation and reporting pipelines I built to save 8+ hours/week.",
    technologies: ["React", "Python", "Flask", "SQL", "Internal Tools"],
    category: "enterprise",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    playStoreUrl: "https://www.gofarma.com",
    features: [
      "Internal workflow automation",
      "Python-based reporting",
      "B2B SaaS interface",
      "Operational time savings"
    ],
    stats: { downloads: "Operational Teams", rating: "8+ Hours Saved/Week" },
    completedDate: "2014–2016"
  },
  {
    id: "7",
    title: "FacilityBot (Internal Tools Reference)",
    description: "Reference: Internal facility request tool similar to my internship work.",
    fullDescription: "FacilityBot digitizes internal maintenance requests—similar to the ASP.NET Web Forms and Python/Flask internal tools I built during my internship at Stanislaus Tech Innovations.",
    technologies: ["ASP.NET Web Forms", "C#", "Python", "Flask", "SQL Server"],
    category: "enterprise",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    playStoreUrl: "https://www.facilitybot.com",
    features: [
      "Internal CRUD applications",
      "Task & asset tracking",
      "Lightweight automation",
      "Agile feature delivery"
    ],
    stats: { downloads: "Internal Use", rating: "Full-Time Offer" },
    completedDate: "2013"
  },
  {
    id: "8",
    title: "Flask Admin Examples (Internal Tool UI Reference)",
    description: "Reference: Open-source internal dashboards similar to my Flask tooling.",
    fullDescription: "This GitHub collection showcases Flask-based admin panels for internal tools—reflecting the type of lightweight, high-impact internal applications I built with Python/Flask during early roles.",
    technologies: ["Python", "Flask", "Admin UI", "Internal Tools"],
    category: "enterprise",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
    playStoreUrl: "https://github.com/tanrax/awesome-flask-admin",
    features: [
      "Admin dashboard patterns",
      "Internal data management",
      "Rapid prototyping",
      "Developer productivity"
    ],
    stats: { downloads: "Open-Source Community", rating: "Dev Productivity Boost" },
    completedDate: "2013"
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
                      Play on Website
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
                            View on Website
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
