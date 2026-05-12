export default function Tiers() {
  return (
    <section id="tiers" className="bg-[#0A0B0E] py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <span className="section-label">Access Plans</span>
        <h2 className="section-title text-center tracking-tighter">Choose Your Path <br/>Into the Kingdom</h2>
        <div className="gold-divider"></div>
        
        <div className="grid md:grid-cols-3 gap-6 items-start mt-12 w-full">
          {/* Injhil */}
          <div className="border border-slate-800 rounded-3xl p-10 bg-slate-900/10 relative overflow-hidden transition-all duration-300 hover:border-indigo-500/30 group">
            <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">Injhil</h3>
            <p className="text-[0.65rem] font-bold tracking-[0.2em] text-slate-500 uppercase mb-6">The Gospel Tier · Free</p>
            <div className="text-4xl font-bold text-white mb-8 group-hover:text-indigo-400 transition-colors">$0 <small className="text-sm font-normal text-slate-500">/ month</small></div>
            <ul className="space-y-4 mb-10 text-slate-400">
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Daily Word — curated verse</li>
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> AI Apologist chat (limited)</li>
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Select scholar library access</li>
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> 24/7 live stream viewing</li>
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Intro curriculum modules</li>
            </ul>
            <button className="w-full btn-ghost py-3 font-bold border-slate-800 text-slate-300">Begin Your Journey</button>
          </div>

          {/* Archimedes */}
          <div className="border border-indigo-500/50 rounded-3xl p-10 bg-indigo-500/5 relative overflow-hidden transition-all duration-300 shadow-2xl shadow-indigo-900/20 scale-105 z-10">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[0.6rem] font-bold tracking-[0.2em] px-4 py-1.5 rounded-bl-xl uppercase">Most Chosen</div>
            <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">Archimedes</h3>
            <p className="text-[0.65rem] font-bold tracking-[0.2em] text-indigo-400/70 uppercase mb-6">Silver · The Scholar's Way</p>
            <div className="text-4xl font-bold text-white mb-8">$12 <small className="text-sm font-normal text-slate-500">/ month</small></div>
            <ul className="space-y-4 mb-10 text-slate-300">
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div> Everything in Injhil</li>
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div> Full academia access</li>
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div> Complete scholar library</li>
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div> ALL streams + on demand</li>
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div> AI curriculum — full paths</li>
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div> Denomination studies</li>
            </ul>
            <button className="w-full btn-primary py-3 font-bold">Join Archimedes</button>
          </div>

          {/* Zaburum */}
          <div className="border border-slate-800 rounded-3xl p-10 bg-slate-900/10 relative overflow-hidden transition-all duration-300 hover:border-indigo-500/30 group">
            <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">Zaburum</h3>
            <p className="text-[0.65rem] font-bold tracking-[0.2em] text-slate-500 uppercase mb-6">VIP · The Psalms Covenant</p>
            <div className="text-4xl font-bold text-white mb-8 group-hover:text-indigo-400 transition-colors">$29 <small className="text-sm font-normal text-slate-500">/ month</small></div>
            <ul className="space-y-4 mb-10 text-slate-400">
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Everything in Archimedes</li>
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Scholar deep-dive access</li>
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Rare manuscripts & codices</li>
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Gnostic library</li>
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Priority AI sessions</li>
              <li className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Early feature access</li>
            </ul>
            <button className="w-full btn-ghost py-3 font-bold border-slate-800 text-slate-300">Ascend to Zaburum</button>
          </div>
        </div>
      </div>
    </section>
  );
}
