"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, ArrowUp, Github, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSocialClick = (platform: string) => {
    const links = {
      github: "https://github.com/Oleksiiloo1",
      email: "mailto:nellebrowns0413@gmail.com"
    };
    
    if (links[platform as keyof typeof links]) {
      window.open(links[platform as keyof typeof links], '_blank');
    }
  };

  const handleQuickNavigation = (section: string) => {
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const quickLinks = [
    { label: "About", section: "about" },
    { label: "Experience", section: "experience" },
    { label: "Skills", section: "skills" },
    { label: "Projects", section: "projects" },
    { label: "Contact", section: "contact" },
  ];

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding & Description */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold font-display text-primary mb-4">
                David Partida
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Senior Full Stack Developer specializing in <strong>Angular, .NET Core, C#, Python, and Django</strong>. 
                Building secure, high-performance web applications with 10+ years of experience.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-2">
                {[
                  { icon: Github, label: "GitHub", platform: "github" },
                  { icon: Mail, label: "Email", platform: "email" },
                ].map(({ icon: Icon, label, platform }) => (
                  <Button
                    key={platform}
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSocialClick(platform)}
                    className="hover-elevate text-muted-foreground hover:text-primary"
                    data-testid={`footer-${platform}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{label}</span>
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <Button
                    key={link.section}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickNavigation(link.section)}
                    className="justify-start p-0 h-auto font-normal text-muted-foreground hover:text-foreground hover-elevate"
                    data-testid={`footer-nav-${link.section}`}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Get In Touch</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📧 nellebrowns0413@gmail.com</p>
                <p>📍 Merced, CA</p>
                <p className="mt-4">
                  Open to senior full-stack roles and technical leadership opportunities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} David Partida. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>and lots of coffee.</span>
          </div>

          {/* Back to Top */}
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="hover-elevate"
            data-testid="button-back-to-top"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Back to Top
          </Button>
        </motion.div>
      </div>
    </footer>
  );
}