import { motion } from 'motion/react';

export default function BurningBushScene() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink py-24">
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full object-cover opacity-90" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="desert-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#080504"/>
              <stop offset="42%" stopColor="#321808"/>
              <stop offset="100%" stopColor="#200E04"/>
            </linearGradient>
            <radialGradient id="fireGlow" cx="48%" cy="55%" r="30%">
              <stop offset="0%" stopColor="#FFEE88" stopOpacity="0.7"/>
              <stop offset="30%" stopColor="#E07018" stopOpacity="0.35"/>
              <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#desert-sky)"/>
          
          {/* Desert ground */}
          <rect x="0" y="780" width="1920" height="300" fill="#0f172a"/>
          
          {/* Bush Fire Glow */}
          <rect width="1920" height="1080" fill="url(#fireGlow)"/>

          {/* Hebrew YHWH in fire glow */}
          <text x="940" y="600" fontFamily="serif" fontSize="88" fill="#e2e8f0" textAnchor="middle" opacity="0.1" letterSpacing="18">יהוה</text>
        </svg>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5 }}
        >
          <div className="formula-highlight mb-2 text-[#E8A832]">Ω(Θ³) ≡ 1</div>
          <div className="font-cinzel text-xs md:text-sm tracking-[0.3em] uppercase text-[#E8A832]/50 mb-12">
            Πᵥ(ℵ∞) · The Father Eternal
          </div>
          
          <h2 className="font-cinzel-decorative text-4xl md:text-6xl lg:text-7xl text-parchment leading-none mb-4 drop-shadow-[0_0_80px_rgba(232,168,50,0.2)]">
            I AM<br/>
            <span className="text-[#E8A832]">WHO I AM</span>
          </h2>
          
          <p className="font-cormorant italic text-lg md:text-2xl text-parchment/70 max-w-2xl mx-auto mb-12">
            "God said to Moses, 'I AM WHO I AM.' This is what you are to say to the Israelites: I AM has sent me to you." — Exodus 3:14
          </p>
          
          <div className="font-cinzel text-3xl tracking-[0.5em] text-[#E8A832]/60 mt-4">
            י ה ו ה
          </div>
        </motion.div>
      </div>
    </div>
  );
}
