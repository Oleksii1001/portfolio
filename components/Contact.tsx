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
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";

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
      // Direct email integration - opens user's email client with pre-filled data
      const subject = encodeURIComponent(data.subject);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
      );
      const emailUrl = `mailto:oleksii.shamanov2@gmail.com?subject=${subject}&body=${body}`;
      
      window.open(emailUrl, '_blank');
      
      setIsSubmitted(true);
      reset();
      
      toast({
        title: "Email client opened!",
        description: "Your message has been prepared in your email client. Please send it to complete the contact.",
      });
    } catch (error) {
      toast({
        title: "Unable to open email client",
        description: "Please contact me directly at oleksii.shamanov2@gmail.com",
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
      value: "oleksii.shamanov2@gmail.com",
      action: () => window.open("mailto:oleksii.shamanov2@gmail.com", '_blank')
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Arizona, USA",
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
            Ready to build something amazing? Let's discuss your next project and turn your vision into a high-quality, scalable solution.
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
                  Feel free to reach out through any of these channels.
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
                  <h3 className="font-semibold mb-4">Let's Connect</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Looking for a skilled full-stack engineer to bring your vision to life? 
                    I specialize in Python, .NET, Node.js, Angular, and React, creating scalable web and enterprise 
                    applications with robust architectures and modern interfaces.
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>💻 Full-stack development expertise</div>
                    <div>⏰ Quick response within 24 hours</div>
                    <div>🌍 Available for remote work worldwide</div>
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
                  Fill out the form below and I'll get back to you as soon as possible.
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
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-4">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                      data-testid="button-send-another"
                    >
                      Send Another Message
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
                          placeholder="Your full name"
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
                        placeholder="What's this about?"
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
                        placeholder="Tell me about your project or just say hello..."
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
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By sending this message, you agree that I may contact you regarding your inquiry.
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