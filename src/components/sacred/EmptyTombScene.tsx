import { motion } from 'motion/react';

export default function EmptyTombScene() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink py-24">
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full object-cover opacity-90" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dawn-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A0612"/>
              <stop offset="55%" stopColor="#4A3A58"/>
              <stop offset="100%" stopColor="#5A8AC8"/>
            </linearGradient>
            <radialGradient id="sunrise" cx="45%" cy="18%" r="28%">
              <stop offset="0%" stopColor="#FFE8A0" stopOpacity="0.85"/>
              <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#dawn-sky)"/>
          <rect width="1920" height="1080" fill="url(#sunrise)"/>
        </svg>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5 }}
        >
          <div className="formula-highlight mb-2 text-[#6FC2E8]">Ω(Θ³) ≡ 1</div>
          <div className="font-cinzel text-xs md:text-sm tracking-[0.3em] uppercase text-[#6FC2E8]/50 mb-12">
            Λσ(Jn¹·¹⁴) · The Son Resurrected
          </div>
          
          <h2 className="font-cinzel-decorative text-4xl md:text-6xl lg:text-7xl text-parchment leading-none mb-4 drop-shadow-[0_0_100px_rgba(111,194,232,0.18)]">
            He Is<br/>
            <span className="text-[#6FC2E8]">Risen</span>
          </h2>
          
          <p className="font-cormorant italic text-lg md:text-2xl text-parchment/70 max-w-2xl mx-auto mb-12">
            "Jesus said, 'I am the resurrection and the life. The one who believes in me will live, even though they die.'" — John 11:25
          </p>
          
          <p className="text-sm font-cinzel tracking-widest text-[#6FC2E8]/60 uppercase">
             The Stone is Rolled Away · Resurrection Dawn
          </p>
        </motion.div>
      </div>
    </div>
  );
}
