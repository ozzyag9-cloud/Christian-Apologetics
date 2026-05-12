import { useState, useEffect } from 'react';
import { getDailyWord } from '@/lib/gemini';
import { motion, AnimatePresence } from 'motion/react';

export default function DailyWord() {
  const [word, setWord] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getDailyWord();
      setWord(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section className="bg-crimson/90 relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-radial-[ellipse_50%_80%_at_50%_50%] from-black/40 to-transparent"></div>
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="font-cinzel text-[0.7rem] tracking-[0.3em] text-parchment/60 uppercase mb-8 block">✦ Today's Word ✦</span>
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
               key="loading"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="h-32 flex items-center justify-center"
            >
              <div className="w-8 h-8 border-2 border-parchment/20 border-t-parchment rounded-full animate-spin"></div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-12">
                <span className="font-cinzel text-gold text-xs tracking-[0.3em] uppercase mb-4 block">{word.formulaTitle}</span>
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="p-6 bg-black/40 border border-gold/10 rounded-lg">
                    <span className="text-[0.6rem] font-cinzel text-gold/40 uppercase tracking-widest block mb-3">Old Testament (Πᵥ)</span>
                    <p className="font-cormorant italic text-lg text-parchment/90 mb-4 leading-relaxed">"{word.otText}"</p>
                    <p className="font-cinzel text-[0.6rem] text-gold/60 uppercase">{word.otRef}</p>
                  </div>
                  <div className="p-6 bg-black/40 border border-gold/10 rounded-lg">
                    <span className="text-[0.6rem] font-cinzel text-gold/40 uppercase tracking-widest block mb-3">New Testament (Λσ/Φρ)</span>
                    <p className="font-cormorant italic text-lg text-parchment/90 mb-4 leading-relaxed">"{word.ntText}"</p>
                    <p className="font-cinzel text-[0.6rem] text-gold/60 uppercase">{word.ntRef}</p>
                  </div>
                </div>
                
                <div className="relative py-12 px-8 border-y border-gold/10">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-crimson px-6 py-1 border border-gold/20 rounded-full font-cinzel text-[0.6rem] text-gold tracking-widest">Synthesis</div>
                   <p className="font-cormorant text-xl md:text-3xl text-parchment leading-relaxed drop-shadow-lg">
                     {word.synthesis}
                   </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
