export default function Footer() {
  return (
    <footer className="bg-stone py-16 px-8 md:px-12 border-t border-gold/15">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div>
          <p className="font-cinzel text-lg tracking-widest text-gold mb-4">Apologetic Intelligence</p>
          <p className="font-cormorant italic text-parchment/40 max-w-sm">
            "Taking AI to Christianity — because we believe AI is a tool from God, for God, to His people."
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end">
          <p className="font-cinzel text-[0.65rem] tracking-[0.1em] text-parchment/25 uppercase mb-2">
            © 2026 Apologetic Intelligence · Catholic & Messianic
          </p>
          <p className="font-cinzel text-[0.65rem] tracking-[0.1em] text-parchment/25 uppercase">
            All Scripture is God-breathed
          </p>
        </div>
      </div>
    </footer>
  );
}
