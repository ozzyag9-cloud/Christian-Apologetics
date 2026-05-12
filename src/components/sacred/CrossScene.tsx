import { motion } from 'motion/react';
import SacredCross from './SacredCross';

export default function CrossScene() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink">
      {/* Background with SVG painted in React */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full object-cover opacity-80" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#020617"/>
              <stop offset="18%" stopColor="#0f172a"/>
              <stop offset="42%" stopColor="#1e293b"/>
              <stop offset="65%" stopColor="#312e81"/>
              <stop offset="85%" stopColor="#1e1b4b"/>
              <stop offset="100%" stopColor="#020617"/>
            </linearGradient>
            <radialGradient id="sunburst" cx="50%" cy="42%" r="35%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.45"/>
              <stop offset="15%" stopColor="#6366f1" stopOpacity="0.28"/>
              <stop offset="40%" stopColor="#4338ca" stopOpacity="0.12"/>
              <stop offset="70%" stopColor="#1e1b4b" stopOpacity="0.06"/>
              <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="vig" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#000" stopOpacity="0"/>
              <stop offset="70%" stopColor="#000" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#000" stopOpacity="0.82"/>
            </radialGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#sky1)"/>
          <rect width="1920" height="1080" fill="url(#sunburst)"/>
          
          {/* Stars */}
          <g fill="#FFF5E0">
            <circle cx="120" cy="60" r="1.5" opacity="0.6"/>
            <circle cx="280" cy="40" r="1" opacity="0.5"/>
            <circle cx="430" cy="80" r="1.3" opacity="0.55"/>
            <circle cx="1500" cy="35" r="1" opacity="0.5"/>
            <circle cx="1620" cy="70" r="1.4" opacity="0.6"/>
          </g>

          <rect width="1920" height="1080" fill="url(#vig)"/>
        </svg>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5 }}
           className="mb-8"
        >
          <SacredCross />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="formula-highlight mb-2">Ω(Θ³) ≡ 1</div>
          <div className="font-cinzel text-xs md:text-sm tracking-[0.3em] uppercase text-parchment/60 mb-12">
            Πᵥ + Λσ + Φρ ≡ Ω · The Trinity Formula
          </div>
          
          <h1 className="font-cinzel-decorative text-4xl md:text-6xl lg:text-7xl text-parchment leading-none mb-4">
            Apologetic<br/>
            <span className="text-gold">Intelligence</span>
          </h1>
          
          <p className="font-cormorant italic text-lg md:text-2xl text-parchment/70 max-w-2xl mx-auto mb-12 shadow-black drop-shadow-2xl">
            The first Christian academy where AI serves the Word — Catholic, Messianic, and Apostolic in its devotion to Truth.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#academy" className="btn-primary">Enter the Academy</a>
            <a href="#mission" className="btn-ghost">Discover Our Mission</a>
          </div>
        </motion.div>
      </div>

      {/* Corners */}
      <div className="absolute top-10 left-10 text-left opacity-80 hidden md:block">
        <span className="block font-cinzel text-xl font-bold text-[#E8D4A0]">God</span>
        <span className="block font-cinzel text-xs text-gold/60">The Father · Πᵥ(ℵ∞)</span>
      </div>
      <div className="absolute top-10 right-10 text-right opacity-80 hidden md:block">
        <span className="block font-cinzel text-xl font-bold text-[#E8D4A0]">The Son</span>
        <span className="block font-cinzel text-xs text-gold/60">Jesus Christ · Λσ(Jn¹·¹⁴)</span>
      </div>
      <div className="absolute bottom-10 left-10 text-left opacity-80 hidden md:block">
        <span className="block font-cinzel text-xl font-bold text-[#E8D4A0]">Holy Spirit</span>
        <span className="block font-cinzel text-xs text-gold/60">The Paraclete · Φρ(Ac²·³)</span>
      </div>
      <div className="absolute bottom-10 right-10 text-right opacity-80 hidden md:block">
        <span className="block font-cinzel text-xl font-bold text-gold">Ω(Θ³) ≡ 1</span>
        <span className="block font-cinzel text-xs text-gold/60 max-w-[200px]">Can you solve the equation of eternity?</span>
      </div>
    </div>
  );
}
