import { Book, GraduationCap, Bot, BookOpen, Church, Globe } from 'lucide-react';

const features = [
  {
    icon: Book,
    title: "Scholar Library",
    text: "Private, curated access to primary sources — Church Fathers, Councils, manuscripts from Assyrian to Coptic traditions. Not Google. Our own."
  },
  {
    icon: GraduationCap,
    title: "AI-Built Curriculum",
    text: "From the Council of Nicaea to the Trinity, from denominations' formation to modern apologetics — structured pathways built by AI agents seeded with the Gospels."
  },
  {
    icon: Bot,
    title: "Apologist AI Agent",
    text: "Ask anything about Christianity. Receive answers grounded in two millennia of scholarship — patristics, exegesis, textual criticism, comparative religion."
  },
  {
    icon: BookOpen,
    title: "Daily Word",
    text: "Every day, a verse curated from the Old and New Testaments — chosen by AI with contextual depth, to reach hearts across every timezone on earth."
  },
  {
    icon: Church,
    title: "Church History",
    text: "Trace the full arc — from Pentecost through persecution, Nicaea, the Great Schism, Reformation, to today's global church. Taught by AI, rooted in sources."
  },
  {
    icon: Globe,
    title: "Comparative Faith",
    text: "Understand Christianity in relation to Abrahamic traditions — with scholarly integrity, charitable accuracy, and the confidence of deep apologetic grounding."
  }
];

export default function Features() {
  return (
    <section id="academy" className="bg-[#0A0B0E] py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <span className="section-label">Infrastructure</span>
        <h2 className="section-title text-center max-w-2xl tracking-tighter">
          A Living Christian Encyclopedia <br className="hidden md:block"/>Built for the <span className="text-indigo-400">Digital Age</span>
        </h2>
        <div className="gold-divider"></div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full">
          {features.map((f, i) => (
            <div key={i} className="p-8 rounded-2xl border border-slate-800 bg-slate-900/20 transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-900/40 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <f.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
