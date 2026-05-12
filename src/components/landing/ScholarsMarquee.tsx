const scholars = [
  "Origen of Alexandria", "Augustine of Hippo", "Athanasius the Great", "Jerome",
  "John Chrysostom", "Thomas Aquinas", "Tertullian", "Irenaeus of Lyon",
  "C.S. Lewis", "N.T. Wright", "Josephus Flavius", "Eusebius of Caesarea",
  "Clement of Alexandria", "Cyril of Jerusalem", "Basil the Great", "Gregory of Nyssa"
];

export default function ScholarsMarquee() {
  return (
    <div className="bg-stone py-12 overflow-hidden border-y border-gold/10">
      <p className="text-center font-cinzel text-[0.7rem] tracking-[0.3em] text-gold/50 uppercase mb-8">Scholars in our library</p>
      <div className="marquee-track">
        {[...scholars, ...scholars].map((s, i) => (
          <div key={i} className="flex items-center gap-12 whitespace-nowrap">
            <span className="font-cormorant italic text-xl text-parchment/40 hover:text-gold transition-colors cursor-default">{s}</span>
            <span className="text-gold/30 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
