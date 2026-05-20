"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Script from "next/script";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Programmatically handle video playback to ensure autoplay works on all browsers
  useEffect(() => {
    if (mounted && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn("Video autoplay failed or was blocked by browser policies:", err);
      });
    }
  }, [mounted]);

  // Cleanly remove the "Built with Spline" logo and anchor tags inside the Shadow DOM
  useEffect(() => {
    if (!mounted) return;

    const hideSplineLogo = () => {
      const splineViewer = document.querySelector("spline-viewer");
      if (splineViewer && splineViewer.shadowRoot) {
        // Target Spline's logo container in Shadow DOM
        const logo = splineViewer.shadowRoot.querySelector("#logo");
        if (logo) {
          (logo as HTMLElement).style.display = "none";
        }
        
        // Target any external promotional links referencing spline
        const anchors = splineViewer.shadowRoot.querySelectorAll("a");
        anchors.forEach((anchor) => {
          if (anchor.href && anchor.href.includes("spline.design")) {
            anchor.style.display = "none";
          }
        });
      }
    };

    // Run periodically since Spline viewer updates/hydrates its template asynchronously
    hideSplineLogo();
    const interval = setInterval(hideSplineLogo, 500);

    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-glow-dark-1">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 w-full h-full bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-105"
        >
          <source src="/video/waterfall.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,.88) 0%, rgba(0,0,0,.55) 40%, rgba(0,0,0,.2) 100%)",
          }}
        ></div>

        {/* Additional Cinematic Effects */}
        <div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,2,4,0.6)_100%)] pointer-events-none"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Side: Copy & CTA */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl pt-24 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
            <span className="text-sm font-medium tracking-wider text-brand-light uppercase">
              Ideas don&apos;t wait
            </span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
            >
              Launch Faster. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light via-white to-brand-accent">
                Build Bigger.
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl font-medium text-white/90 mb-4 mt-4"
          >
            Your Digital Growth Partner
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-white/60 mb-8 max-w-lg leading-relaxed"
          >
            We design, build and launch high-converting websites and digital
            experiences for ambitious brands and startups.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <button className="relative px-8 py-4 rounded-full font-semibold text-white group overflow-hidden transition-all hover:scale-105 active:scale-95">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-glow-purple-2 to-brand-accent group-hover:opacity-80 transition-opacity"></span>
              <span className="absolute inset-0 w-full h-full rounded-full ring-2 ring-white/20 ring-inset"></span>
              <span className="absolute -inset-1 rounded-full blur bg-gradient-to-r from-glow-purple-1 to-brand-light opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></span>
              <span className="relative z-10 flex items-center gap-2">
                Book a Call
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>

            <button className="px-8 py-4 rounded-full font-medium text-white bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
              View Work
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-white/50"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/70"></div>
              <span>50+ projects delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/70"></div>
              <span>4.9 client rating</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/70"></div>
              <span>Fast turnaround</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Robot positioned perfectly to the right, showing full model */}
        <div className="absolute right-0 bottom-0 top-0 w-full md:w-[48vw] h-full pointer-events-none flex items-center justify-end z-30">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="w-full h-full pointer-events-auto flex items-center justify-center md:justify-end pr-0 md:pr-4 lg:pr-12 xl:pr-24 pt-20 md:pt-0"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-[300px] sm:w-[420px] md:w-[500px] lg:w-[600px] xl:w-[680px] h-[65vh] md:h-[85vh] relative flex items-center justify-center"
            >
              {/* Soft futuristic backdrop glow */}
              <div className="absolute inset-0 bg-glow-purple-1/10 rounded-full blur-[100px] -z-10 mix-blend-screen scale-75 pointer-events-none"></div>
              {mounted && (
                <>
                  <Script
                    type="module"
                    src="https://unpkg.com/@splinetool/viewer@1.12.94/build/spline-viewer.js"
                    strategy="lazyOnload"
                  />
                  {/* @ts-expect-error - Custom element not typed */}
                  <spline-viewer
                    url="https://prod.spline.design/xCgldf856ibUQLnK/scene.splinecode"
                    style={{ width: "100%", height: "100%", outline: "none" }}
                  />
                </>
              )}
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
