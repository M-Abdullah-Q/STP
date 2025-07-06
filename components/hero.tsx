"use client";

import BackgroundVideo from "next-video/background-video";
import bckgVid from "/videos/13975885_4096_2160_25fps.mp4.json";
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
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0">
        <BackgroundVideo
          src={bckgVid}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

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
          className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6 leading-tight"
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
          className="text-lg sm:text-xl lg:text-2xl mb-8 text-white/95 font-light leading-relaxed"
        >
          Professional therapy services in a safe, supportive environment.
          <br className="hidden sm:block" />
          Take the first step towards healing and growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-sage-500 hover:bg-sage-600 text-white px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
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
            className="border-white bg-black text-white hover:bg-white/10 px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Learn More
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
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
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-10 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
        aria-label="Toggle Mute"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button>
    </section>
  );
}
