import { motion } from 'motion/react';

export default function SacredCross() {
  return (
    <motion.svg 
      width="280" 
      height="320" 
      viewBox="0 0 280 320" 
      xmlns="http://www.w3.org/2000/svg"
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Radiant glow behind cross */}
      <radialGradient id="glow" cx="50%" cy="55%" r="40%">
        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25"/>
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
      </radialGradient>
      <ellipse cx="140" cy="175" rx="80" ry="80" fill="url(#glow)"/>

      {/* The Cross */}
      <rect x="128" y="90" width="24" height="130" rx="3" fill="#4338ca"/>
      <rect x="88" y="130" width="104" height="22" rx="3" fill="#4338ca"/>
      {/* Cross inner highlight */}
      <rect x="132" y="90" width="4" height="130" rx="2" fill="rgba(129,140,248,0.18)"/>
      <rect x="88" y="133" width="104" height="5" rx="2" fill="rgba(129,140,248,0.18)"/>

      {/* ESSENCE in Gothic emanating from cross center */}
      <text x="140" y="178" 
        fontFamily="UnifrakturMaguntia, serif"
        fontSize="22"
        fill="#e2e8f0"
        textAnchor="middle"
        opacity="0.92">Essence</text>

      {/* Rays emanating from cross center */}
      <motion.g 
        opacity="0.15" 
        stroke="#6366f1" 
        strokeWidth="1"
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="origin-center"
        style={{ transformOrigin: '140px 141px' }}
      >
        <line x1="140" y1="141" x2="100" y2="101"/>
        <line x1="140" y1="141" x2="180" y2="101"/>
        <line x1="140" y1="141" x2="68" y2="141"/>
        <line x1="140" y1="141" x2="212" y2="141"/>
        <line x1="140" y1="141" x2="110" y2="111"/>
        <line x1="140" y1="141" x2="170" y2="111"/>
      </motion.g>

      {/* Hand from sky reaching down to the word ESSENCE */}
      {/* Arm/sleeve */}
      <path d="M192 30 Q205 45 200 65 L188 80 Q185 85 178 82 L168 76" 
        fill="#C9A84C" opacity="0.85"/>
      {/* Sleeve cuff detail */}
      <path d="M188 80 Q185 88 175 84 L165 78" 
        fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.5"/>
      {/* Index finger pointing down */}
      <path d="M178 82 Q175 95 172 108 Q171 114 173 118 Q176 122 179 118 Q182 112 181 100 L181 84" 
        fill="#E8D9B5" opacity="0.88"/>
      {/* Other fingers curled */}
      <path d="M181 84 Q186 92 184 104 Q183 110 186 112 Q189 113 190 108 Q192 98 189 86" 
        fill="#E8D9B5" opacity="0.75"/>
      <path d="M189 86 Q193 93 192 103 Q191 108 194 109 Q197 109 197 103 Q198 93 195 84" 
        fill="#E8D9B5" opacity="0.62"/>
      {/* Thumb */}
      <path d="M168 76 Q162 82 163 92 Q165 98 169 97 Q174 96 175 88 L175 78" 
        fill="#E8D9B5" opacity="0.75"/>
      {/* Light beam from fingertip to ESSENCE */}
      <line x1="173" y1="120" x2="155" y2="162" 
        stroke="#C9A84C" strokeWidth="1" strokeDasharray="3,4" opacity="0.4"/>

      {/* TRINITY below the cross */}
      <text x="140" y="248" 
        fontFamily="Cinzel, serif"
        fontSize="13"
        fontWeight="400"
        fill="#C9A84C"
        textAnchor="middle"
        letterSpacing="6">TRINITY</text>
      {/* Decorative line under TRINITY */}
      <line x1="90" y1="258" x2="190" y2="258" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5"/>
      {/* Tri-dot symbol */}
      <circle cx="126" cy="268" r="2" fill="#C9A84C" opacity="0.6"/>
      <circle cx="140" cy="268" r="2" fill="#C9A84C" opacity="0.6"/>
      <circle cx="154" cy="268" r="2" fill="#C9A84C" opacity="0.6"/>
    </motion.svg>
  );
}
