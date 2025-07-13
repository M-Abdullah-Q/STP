"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, BookOpen, Users, Heart, Quote } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const achievements = [
    {
      icon: Award,
      title: "Licensed Professional",
      description: "PsyD (Clinical Psychologist)",
    },
    {
      icon: BookOpen,
      title: " 8 years of practice",
      description: "Almost a Decade of helping individuals heal and grow",
    },
    {
      icon: Users,
      title: "500+ Clients Helped",
      description: "Successful therapy outcomes across diverse populations",
    },
    {
      icon: Heart,
      title: "Holistic Approach",
      description: "Mind, body, and spirit integrated healing",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
            Meet{" "}
            <span className="text-sage-500 font-medium">Dr. Serena Blake</span>
          </h2>
          <div className="w-24 h-1 bg-sage-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="portrait-young-businesswoman-holding-eyeglasses-hand-against-gray-backdrop.jpg"
                alt="Dr. Sarah Chen"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-sage-500 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dr. Serena Blake is a licensed clinical psychologist (PsyD)
                based in Los Angeles, CA, with eight years of experience and
                over 500 client sessions. She blends evidence-based
                approaches—like cognitive-behavioral therapy and
                mindfulness—with compassionate, personalized care to help you
                overcome anxiety, strengthen relationships, and heal from
                trauma. Whether you meet in her Maplewood Drive office or
                connect virtually via Zoom, Dr. Blake is committed to creating a
                safe, supportive space for you to thrive.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-card hover:bg-sage-50 dark:hover:bg-sage-900/20 transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-sage-100 dark:bg-sage-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <achievement.icon className="w-5 h-5 text-sage-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="mt-20"
      >
        <div className="w-full h-px bg-gradient-to-r from-transparent via-sage-300 to-transparent mb-12"></div>

        <div className="text-center max-w-4xl mx-auto px-2">
          <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-8">
            Words of <span className="text-sage-500 font-medium">Wisdom</span>
          </h3>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center opacity-20">
              <Quote className="w-6 h-6 text-white" />
            </div>

            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light text-foreground leading-relaxed italic mb-6">
              "The curious paradox is that when I accept myself just as I am,
              then I can change. The very first step in healing is to stop
              fighting yourself and start embracing who you are."
            </blockquote>

            <cite className="text-lg text-muted-foreground font-medium">
              — Carl Rogers, Humanistic Psychologist
            </cite>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-sage-300 to-transparent mt-12"></div>
      </motion.div>
    </section>
  );
}
