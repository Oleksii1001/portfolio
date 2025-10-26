"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Code2, Server, Database, Cloud, Palette, Users } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillCategory {
  id: string;
  label: string;
  icon: any;
  skills: Skill[];
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  const skillCategories: SkillCategory[] = [
    {
      id: "frontend",
      label: "Frontend Development",
      icon: Code2,
      skills: [
        { name: "Angular", level: 95, category: "frontend" },
        { name: "React.js", level: 92, category: "frontend" },
        { name: "Vue.js", level: 88, category: "frontend" },
        { name: "Next.js", level: 90, category: "frontend" },
        { name: "Nuxt.js", level: 85, category: "frontend" },
        { name: "TypeScript", level: 93, category: "frontend" },
        { name: "JavaScript", level: 95, category: "frontend" },
        { name: "HTML5/CSS3", level: 95, category: "frontend" },
      ],
    },
    {
      id: "backend",
      label: "Backend & APIs",
      icon: Server,
      skills: [
        { name: "Python", level: 95, category: "backend" },
        { name: "Django", level: 93, category: "backend" },
        { name: ".NET / C#", level: 92, category: "backend" },
        { name: "Node.js", level: 90, category: "backend" },
        { name: "Express.js", level: 88, category: "backend" },
        { name: "NestJS", level: 87, category: "backend" },
        { name: "Laravel / PHP", level: 85, category: "backend" },
        { name: "REST APIs", level: 95, category: "backend" },
        { name: "GraphQL", level: 88, category: "backend" },
      ],
    },
    {
      id: "database",
      label: "Databases",
      icon: Database,
      skills: [
        { name: "PostgreSQL", level: 93, category: "database" },
        { name: "MySQL", level: 92, category: "database" },
        { name: "MongoDB", level: 90, category: "database" },
        { name: "SQL Server", level: 88, category: "database" },
        { name: "MariaDB", level: 87, category: "database" },
      ],
    },
    {
      id: "cloud",
      label: "Cloud & DevOps",
      icon: Cloud,
      skills: [
        { name: "AWS", level: 90, category: "cloud" },
        { name: "Azure", level: 88, category: "cloud" },
        { name: "GCP", level: 85, category: "cloud" },
        { name: "Docker", level: 92, category: "cloud" },
        { name: "CI/CD", level: 90, category: "cloud" },
        { name: "Git", level: 95, category: "cloud" },
      ],
    },
  ];

  const allSkills = skillCategories.flatMap(category => category.skills);
  
  const filteredSkills = activeCategory === "all" 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeCategory);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <section id="skills" className="py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-foreground">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technical expertise and programming skills for building scalable, high-performance web applications.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            onClick={() => handleCategoryChange("all")}
            className="hover-elevate"
            data-testid="filter-all"
          >
            <Palette className="mr-2 h-4 w-4" />
            All Skills
          </Button>
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => handleCategoryChange(category.id)}
                className="hover-elevate"
                data-testid={`filter-${category.id}`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {category.label}
              </Button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={`${skill.category}-${skill.name}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="hover-elevate transition-all duration-300 group-hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">{skill.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {skill.level}%
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress 
                      value={skill.level} 
                      className="h-2"
                      data-testid={`progress-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Proficiency</span>
                      <span className="font-medium">{skill.level}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-center font-display">
                <Users className="inline-block mr-2 h-5 w-5" />
                Additional Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">7+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">25+</div>
                  <div className="text-sm text-muted-foreground">Technologies</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}