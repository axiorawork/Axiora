"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Navbar() {
  const navItems = ["Services", "Projects", "Reviews", "FAQ", "Contact"];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[fit-content]"
    >
      <div className="relative group">
        {/* Glow behind the navbar */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-glow-purple-2/50 to-glow-purple-1/50 rounded-full blur-md opacity-30 group-hover:opacity-60 transition duration-500"></div>
        
        {/* Navbar Container */}
        <div className="relative flex items-center justify-center gap-1 sm:gap-2 px-6 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-full overflow-hidden group/item"
            >
              <span className="relative z-10">{item}</span>
              {/* Hover background fill */}
              <span className="absolute inset-0 bg-white/10 scale-50 opacity-0 group-hover/item:scale-100 group-hover/item:opacity-100 rounded-full transition-all duration-300 ease-out z-0"></span>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
