export default function Mission() {
  return (
    <section id="mission" className="bg-[#0A0B0E] py-24 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="section-label">Our Ecosystem</span>
            <h2 className="section-title tracking-tighter">
              Orchestrate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">spiritual capital</span>.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              We are a community of Catholic and Messianic believers who see AI as a tool fashioned by God for this generation — reaching every tongue, tribe, and nation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 transition-all hover:border-indigo-500/50 group">
              <div className="text-3xl font-bold text-white mb-1">2000+</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Years of Scholarship</div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 transition-all hover:border-indigo-500/50 group">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Gospel Seeded</div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-8 rounded-2xl bg-indigo-600/5 border border-indigo-500/10 backdrop-blur-sm">
            <p className="text-slate-300 italic text-xl leading-relaxed mb-6">
              "Apologetic Intelligence exists to be the definitive Christian academy of the digital age. Every system we build flows from Christ."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white">A</div>
              <div>
                <div className="text-white font-bold tracking-tight">The Academy Mandate</div>
                <div className="text-slate-500 text-sm">Soli Deo Gloria</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
