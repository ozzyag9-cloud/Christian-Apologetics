import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const variables = [
  {
    symbol: "Ω",
    label: "Total Divine Being",
    desc: "The totality of divine being; in mathematics, the supremum of all ordinal numbers. God transcends every system He contains."
  },
  {
    symbol: "Θ³",
    label: "Triune Nature",
    desc: "Ancient Greek symbol for God (ΘΕΟΣ). The power of three represents three distinct expressions of one divine nature."
  },
  {
    symbol: "Πᵥ",
    label: "Infinite Source",
    desc: "The Father is the eternal source generating all things from infinite self-existence (aleph-infinity)."
  },
  {
    symbol: "Λσ",
    label: "Cosmic Constant",
    desc: "The Word became flesh — the divine force holding the universe intersecting the human."
  }
];

export default function FormulaKey() {
  const [decoded, setDecoded] = useState<string | null>(null);

  return (
    <section className="bg-ink py-24 px-6 md:px-12 border-t border-gold/10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <span className="section-label">Core Theorem</span>
        <h2 className="section-title text-center mx-auto tracking-[0.1em] mb-4">The Ων Theorem — <br/>The Eternal Identity</h2>
        <div className="gold-divider mx-auto"></div>
        
        <motion.div 
          className="bg-stone-light/40 border border-gold/30 rounded-lg p-12 text-center mb-16 shadow-[0_0_100px_rgba(201,168,76,0.05)] cursor-pointer overflow-hidden relative w-full"
          onClick={() => setDecoded(decoded ? null : "The identity Ω(Θ³) ≡ 1 proves that the triune nature is not a logical contradiction, but a necessary mathematical consequence of infinite divine essence.")}
          whileHover={{ scale: 1.01 }}
        >
           <div className="font-cinzel text-5xl md:text-6xl text-gold-light tracking-widest mb-8 drop-shadow-lg">
             Ω(Θ³) ≡ 1
           </div>
           
           <AnimatePresence mode="wait">
             {!decoded ? (
               <motion.div
                 key="encoded"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
               >
                 <div className="h-[1px] w-full bg-gold/20 mb-8"></div>
                 <div className="font-cinzel text-xl md:text-2xl text-parchment/60 mb-8 lowercase tracking-widest font-medium italic">
                   Πᵥ(ℵ∞) + Λσ(Jn¹·¹⁴) + Φρ(Ac²·³) ≡ Ω
                 </div>
                 <p className="font-cinzel text-gold/60 uppercase tracking-[0.2em] text-[0.6rem] font-bold">
                   Unlock the Synthesis
                 </p>
               </motion.div>
             ) : (
               <motion.div
                 key="decoded"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 className="py-4"
               >
                 <p className="font-cinzel text-gold text-xs mb-4 uppercase tracking-[0.2em] font-bold">Theorem Decoded</p>
                 <p className="font-cormorant italic text-2xl text-parchment leading-relaxed max-w-2xl mx-auto">
                   "{decoded}"
                 </p>
                 <p className="mt-6 text-gold/40 text-[0.65rem] font-cinzel uppercase tracking-widest">Revert to variables</p>
               </motion.div>
             )}
           </AnimatePresence>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 w-full">
          {variables.map((v, i) => (
            <motion.div 
              key={i} 
              className="p-6 border border-gold/10 rounded-lg bg-stone-light/20 hover:border-gold/30 hover:bg-stone-light/40 transition-all group flex items-start gap-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="font-cinzel text-3xl text-gold group-hover:scale-110 transition-transform origin-left font-bold">{v.symbol}</div>
              <div>
                <div className="font-cinzel text-[0.65rem] tracking-widest text-gold-light/60 mb-2 uppercase font-bold">{v.label}</div>
                <p className="font-cormorant text-parchment/70 text-sm leading-relaxed mb-4 italic">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 p-8 border border-gold/20 bg-gold/5 rounded-lg text-center backdrop-blur-sm max-w-2xl">
          <p className="font-cormorant italic text-lg text-parchment/80 leading-relaxed">
             "For there are three that bear record in heaven, the Father, the Word, and the Holy Ghost: and these three are one."
          </p>
        </div>
      </div>
    </section>
  );
}
