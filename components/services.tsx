"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const services = [
    {
      title: "Anxiety and Stress Management",
      description:
        "Learn effective tools to calm your mind, reduce overwhelm, and regain control over anxious thoughts. We help you build resilience and restore balance in daily life.",
      image: "medium-shot-anxious-man-indoors.jpg",
    },
    {
      title: "Relationship Counselling",
      description:
        "Strengthen communication, rebuild trust, and deepen emotional connection. Whether individual or couples therapy, we support healthier, more fulfilling relationships.",
      image: "couple-standing-together-hand-hand-beach.jpg",
    },
    {
      title: "Trauma Recovery",
      description:
        "Heal from past wounds in a safe, compassionate space. Using evidence-based approaches, we guide you through processing trauma and reclaiming your sense of safety and self.",
      image: "pexels-raphael-brasileiro-1687007.jpg",
    },
  ];

  const visibleServices = [
    services[services.length - 1], // Clone of last
    ...services,
    services[0], // Clone of first
  ];

  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(index + 1);
  };

  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  const handleAnimationComplete = () => {
    if (currentSlide === 0) {
      setIsTransitioning(false);
      setCurrentSlide(services.length);
    } else if (currentSlide === visibleServices.length - 1) {
      setIsTransitioning(false);
      setCurrentSlide(1);
    }
  };

  const getActiveDotIndex = () => {
    if (currentSlide === 0) return services.length - 1;
    if (currentSlide === visibleServices.length - 1) return 0;
    return currentSlide - 1;
  };

  return (
    <div id="services" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
            Therapeutic{" "}
            <span className="text-sage-500 font-medium">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive mental health services tailored to your unique needs
            and goals
          </p>
          <div className="w-24 h-1 bg-sage-500 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group text-center p-6"
            >
              <div className="relative w-48 h-48 rounded-full overflow-hidden mx-auto mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover filter grayscale group-hover:filter-none transition-all duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: `-${currentSlide * 100}%`,
                transition: { duration: isTransitioning ? 0.5 : 0 },
              }}
              onAnimationComplete={handleAnimationComplete}
            >
              {visibleServices.map((service, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                    }
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group text-center p-6 max-w-sm mx-auto"
                  >
                    <div className="relative w-40 h-40 rounded-full overflow-hidden mx-auto mb-6">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover filter grayscale group-hover:filter-none transition-all duration-500"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full hover:bg-sage-100 dark:hover:bg-sage-900"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === getActiveDotIndex()
                      ? "bg-sage-500"
                      : "bg-sage-200"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full hover:bg-sage-100 dark:hover:bg-sage-900"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
