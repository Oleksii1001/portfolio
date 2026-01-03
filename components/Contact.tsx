"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/lib/hooks/use-toast";
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const watchedFields = watch();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    
    try {
      // Open user's default email client with pre-filled message
      const subject = encodeURIComponent(data.subject);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
      );
      const emailUrl = `mailto:nellebrowns0413@gmail.com?subject=${subject}&body=${body}`;
      
      window.open(emailUrl, '_blank');
      
      setIsSubmitted(true);
      reset();
      
      toast({
        title: "Email client opened!",
        description: "Your message has been prepared. Please send it to complete your inquiry.",
      });
    } catch (error) {
      toast({
        title: "Unable to open email client",
        description: "Please contact me directly at nellebrowns0413@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "nellebrowns0413@gmail.com",
      action: () => window.open("mailto:nellebrowns0413@gmail.com", '_blank')
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Merced, CA",
      action: () => {}
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-foreground">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interested in a senior full-stack developer with 10+ years of experience in Angular, .NET, and Python? 
            Let’s discuss how I can contribute to your engineering team or technical leadership needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="font-display">Contact Information</CardTitle>
                <p className="text-muted-foreground">
                  Reach out for senior engineering roles, technical leadership, or architecture consulting.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-lg hover-elevate transition-all duration-300 cursor-pointer"
                      onClick={info.action}
                      data-testid={`contact-${info.label.toLowerCase()}`}
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{info.label}</h3>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </motion.div>
                  );
                })}

                <div className="pt-6 border-t">
                  <h3 className="font-semibold mb-4">Professional Focus</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    I specialize in building secure, high-performance applications using:
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• Angular & .NET Core for enterprise web apps</div>
                    <div>• Python/Django for data-intensive platforms</div>
                    <div>• Azure cloud, Docker, and CI/CD pipelines</div>
                    <div>• Technical leadership and mentoring</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Send a Message</CardTitle>
                <p className="text-muted-foreground">
                  I’m currently open to senior full-stack and technical leadership opportunities.
                </p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Message Prepared!</h3>
                    <p className="text-muted-foreground mb-4">
                      Your email draft has been opened. Please review and send it to complete your inquiry.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                      data-testid="button-send-another"
                    >
                      Compose Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          {...register("name")}
                          className={`mt-1 ${errors.name ? "border-destructive" : ""}`}
                          placeholder="Your name"
                          data-testid="input-name"
                        />
                        {errors.name && (
                          <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          className={`mt-1 ${errors.email ? "border-destructive" : ""}`}
                          placeholder="your.email@example.com"
                          data-testid="input-email"
                        />
                        {errors.email && (
                          <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        {...register("subject")}
                        className={`mt-1 ${errors.subject ? "border-destructive" : ""}`}
                        placeholder="e.g., Senior Developer Role"
                        data-testid="input-subject"
                      />
                      {errors.subject && (
                        <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        className={`mt-1 min-h-32 ${errors.message ? "border-destructive" : ""}`}
                        placeholder="Tell me about your team, project, or opportunity..."
                        data-testid="textarea-message"
                      />
                      {errors.message && (
                        <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.message.message}
                        </p>
                      )}
                      <div className="text-xs text-muted-foreground mt-1 text-right">
                        {watchedFields.message?.length || 0} characters
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full hover-elevate"
                      disabled={isSubmitting}
                      data-testid="button-send-message"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                          Preparing Email...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      This form opens your email client. Your message is not sent automatically.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}