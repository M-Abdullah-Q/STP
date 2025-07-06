"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  preferredTime: z.string().min(2, "Please specify your preferred time"),
  consent: z
    .boolean()
    .refine((val) => val === true, "You must agree to be contacted"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const consent = watch("consent");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", data);
    reset();
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "(323) 555-0192",
      action: "tel:+3235550192",
    },
    {
      icon: Mail,
      title: "Email",
      details: "serena@blakepsychology.com",
      action: "mailto:serena@blakepsychology.com",
    },
    {
      icon: MapPin,
      title: "Location",
      details: "1287 Maplewood Drive, Los Angeles, CA 90026",
      action: null,
    },
    {
      icon: Clock,
      title: "Hours",
      details: `In-person: Tue & Thu, 10 AM–6 PM
Virtual via Zoom: Mon, Wed & Fri, 1 PM–5 PM`,
      action: null,
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
            Get in <span className="text-sage-500 font-medium">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to take the first step? Reach out today to schedule your
            consultation
          </p>
          <div className="w-24 h-1 bg-sage-500 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Let's Start Your Journey
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Taking the first step towards therapy can feel daunting, but you
                don't have to do it alone. I'm here to answer any questions you
                might have and help you feel comfortable about beginning your
                healing journey.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-card hover:bg-sage-50 dark:hover:bg-sage-900/20 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-sage-100 dark:bg-sage-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-sage-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {info.title}
                    </h4>
                    {info.action ? (
                      <a
                        href={info.action}
                        className="text-muted-foreground hover:text-sage-600 transition-colors duration-200 whitespace-pre-line"
                      >
                        {info.details}
                      </a>
                    ) : (
                      <p className="text-muted-foreground whitespace-pre-line">
                        {info.details}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-card rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="form-field">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Name *
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="mt-1 bg-background border-border focus:border-sage-500 focus:ring-sage-500"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="form-field">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-foreground"
                >
                  Phone *
                </Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  className="mt-1 bg-background border-border focus:border-sage-500 focus:ring-sage-500"
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="form-field">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-1 bg-background border-border focus:border-sage-500 focus:ring-sage-500"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="form-field">
                <Label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  What brings you here? *
                </Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  rows={4}
                  className="mt-1 bg-background border-border focus:border-sage-500 focus:ring-sage-500"
                  placeholder="Tell me a bit about what you're looking for in therapy..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="form-field">
                <Label
                  htmlFor="preferredTime"
                  className="text-sm font-medium text-foreground"
                >
                  Preferred time to reach you *
                </Label>
                <Input
                  id="preferredTime"
                  {...register("preferredTime")}
                  className="mt-1 bg-background border-border focus:border-sage-500 focus:ring-sage-500"
                  placeholder="e.g., Weekday mornings, evenings after 6pm"
                />
                {errors.preferredTime && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.preferredTime.message}
                  </p>
                )}
              </div>

              <div className="form-field">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(checked) =>
                      setValue("consent", checked as boolean)
                    }
                    className="mt-1 data-[state=checked]:bg-sage-500 data-[state=checked]:border-sage-500"
                  />
                  <Label
                    htmlFor="consent"
                    className="text-sm text-foreground leading-relaxed"
                  >
                    I agree to be contacted about my inquiry and understand that
                    my information will be kept confidential *
                  </Label>
                </div>
                {errors.consent && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.consent.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sage-500 hover:bg-sage-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </div>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
