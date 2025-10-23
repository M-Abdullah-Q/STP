"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Volume2, VolumeX } from "lucide-react";

export default function Hero() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.5;
        audioRef.current
          .play()
          .then(() => {
            setIsMuted(false);
            setHasInteracted(true);
            console.log("Audio started after interaction");
          })
          .catch((err) => {
            console.warn("Audio play failed:", err);
          });
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    return () => window.removeEventListener("click", handleFirstInteraction);
  }, [hasInteracted]);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        height: "100vh",
        minHeight: "100svh",
      }}
    >
      <div className="absolute z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-[5] md:scale-100"
          style={{ transformOrigin: "center center" }}
        >
          <source src="/videos/output_compressed.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background via-background/50 to-transparent z-20 pointer-events-none" />

      <audio
        ref={audioRef}
        src="calm-nature-sounds-196258.mp3"
        autoPlay
        loop
        muted
      />

      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 leading-tight"
        >
          Find Your Path to{" "}
          <span className="text-sage-400 font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Inner Peace
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/95 font-light leading-relaxed px-2 sm:px-0"
        >
          Professional therapy services in a safe, supportive environment.
          <br className="hidden sm:block" />
          Take the first step towards healing and growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-sage-500 hover:bg-sage-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
          >
            Start Your Journey
          </Button>
          <Button
            size="lg"
            onClick={() =>
              document
                .querySelector("#about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border-white bg-black text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            Learn More
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white/80 cursor-pointer"
          onClick={() =>
            document
              .querySelector("#about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.div>
      </motion.div>

      <button
        onClick={toggleMute}
        className="absolute bottom-4 z-40 sm:bottom-6 right-4 sm:right-6 bg-background text-foreground p-2 rounded-full transition"
        aria-label="Toggle Mute"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </button>
    </section>
  );
}
