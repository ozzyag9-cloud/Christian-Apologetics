import { motion } from 'motion/react';

export default function PentecostScene() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink py-24">
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full object-cover opacity-90" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="spirit-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF"/>
              <stop offset="40%" stopColor="#D8ECFF"/>
              <stop offset="100%" stopColor="#7090E8"/>
            </linearGradient>
            <radialGradient id="vignetteLight" cx="50%" cy="50%" r="62%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0"/>
              <stop offset="100%" stopColor="#2A4A90" stopOpacity="0.45"/>
            </radialGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#spirit-sky)"/>
          
          {/* Cloud Masses */}
          <ellipse cx="480" cy="320" rx="340" ry="220" fill="#FEFFFF" opacity="0.6" />
          <ellipse cx="1440" cy="320" rx="340" ry="220" fill="#FEFFFF" opacity="0.6" />
          <ellipse cx="960" cy="480" rx="320" ry="280" fill="#FFFEFF" opacity="0.7" />

          <rect width="1920" height="1080" fill="url(#vignetteLight)"/>
        </svg>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5 }}
        >
          <div className="formula-highlight mb-2 text-gold-dim">Ω(Θ³) ≡ 1</div>
          <div className="font-cinzel text-xs md:text-sm tracking-[0.3em] uppercase text-ink/70 mb-12">
            Φρ(Ac²·³) · The Spirit Outpoured
          </div>
          
          <h2 className="font-cinzel-decorative text-4xl md:text-6xl lg:text-7xl text-ink leading-none mb-4 drop-shadow-[0_0_120px_rgba(216,232,255,0.25)]">
            The Holy<br/>
            <span className="text-gold-dim font-bold">Spirit Descends</span>
          </h2>
          
          <p className="font-cormorant italic text-lg md:text-2xl text-ink/80 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            "When the day of Pentecost came, they were all together in one place... All of them were filled with the Holy Spirit." — Acts 2:1-4
          </p>
          
          <p className="text-sm font-cinzel tracking-widest text-ink/65 uppercase font-bold">
             Tongues of Fire · Clouds of Glory · The Paraclete
          </p>
        </motion.div>
      </div>
    </div>
  );
}
