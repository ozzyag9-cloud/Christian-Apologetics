import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Book, FileText, Download, Lock, Edit3, CheckCircle, Clock, Volume2, Pause } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';

function AudioPlayer({ url, isActive, onToggle }: { url?: string, isActive: boolean, onToggle: () => void }) {
  if (!url) return null;
  return (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isActive ? "Pause audio content" : "Play audio content"}
      aria-pressed={isActive}
      className={`p-2 rounded-full border transition-all ${
        isActive ? 'bg-gold border-gold text-ink animate-pulse' : 'bg-gold/10 border-gold/20 text-gold hover:bg-gold/20'
      }`}
    >
      {isActive ? <Pause className="w-4 h-4" aria-hidden="true" /> : <Volume2 className="w-4 h-4" aria-hidden="true" />}
    </button>
  );
}

function ProgressBadge({ userId, itemId }: { userId?: string, itemId: number }) {
  const [status, setStatus] = useState<'unread' | 'reading' | 'studied'>('unread');

  useEffect(() => {
    if (!userId) return;
    const docRef = doc(db, 'users', userId, 'progress', String(itemId));
    const unsub = onSnapshot(docRef, (doc) => {
      if (doc.exists()) setStatus(doc.data().status);
    });
    return unsub;
  }, [userId, itemId]);

  if (status === 'studied') return <div className="text-[0.6rem] font-cinzel px-2 py-1 bg-green-900/40 border border-green-500/50 text-green-400 rounded">Studied</div>;
  if (status === 'reading') return <div className="text-[0.6rem] font-cinzel px-2 py-1 bg-gold/20 border border-gold/40 text-gold rounded animate-pulse">Studying</div>;
  return null;
}

const libraryItems = [
  {
    id: 1,
    title: "Codex Sinaiticus (Digital Reconstruction)",
    category: "Manuscripts",
    author: "Constantin von Tischendorf",
    year: "4th Century Original",
    tier: "Zaburum",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "The Summa Theologica (Annotated)",
    category: "Theology",
    author: "Thomas Aquinas",
    year: "1265–1274",
    tier: "Archimedes",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Early Church Patristics: Vol I",
    category: "History",
    author: "Various Authors",
    year: "1st-3rd Century",
    tier: "Injhil",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 4,
    title: "Athanasian Creed Philosophical Proof",
    category: "Logic",
    author: "The Academy Scholars",
    year: "2024 AI Synthesis",
    tier: "Archimedes",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 5,
    title: "The Didache: The Lord's Teaching",
    category: "Sacred Texts",
    author: "The Twelve Apostles",
    year: "1st Century",
    tier: "Injhil",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  }
];

interface StudyNoteModalProps {
  item: typeof libraryItems[0];
  onClose: () => void;
}

function StudyNoteModal({ item, onClose }: StudyNoteModalProps) {
  const { user } = useAuth();
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'unread' | 'reading' | 'studied'>('unread');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Focus management: focus first input when modal opens
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }

    // Escape to close
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (!user) return;

    // Listen to live updates for this item's note and progress
    const noteDocRef = doc(db, 'users', user.uid, 'notes', String(item.id));
    const progressDocRef = doc(db, 'users', user.uid, 'progress', String(item.id));

    const unsubNote = onSnapshot(noteDocRef, (doc) => {
      if (doc.exists()) setNote(doc.data().content);
    });

    const unsubProgress = onSnapshot(progressDocRef, (doc) => {
      if (doc.exists()) setStatus(doc.data().status);
      setLoading(false);
    });

    return () => {
      unsubNote();
      unsubProgress();
    };
  }, [user, item.id]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const noteDocRef = doc(db, 'users', user.uid, 'notes', String(item.id));
      await setDoc(noteDocRef, {
        userId: user.uid,
        libraryItemId: item.id,
        content: note,
        updatedAt: serverTimestamp(),
      });

      const progressDocRef = doc(db, 'users', user.uid, 'progress', String(item.id));
      await setDoc(progressDocRef, {
        userId: user.uid,
        libraryItemId: item.id,
        status: status,
        updatedAt: serverTimestamp(),
      }, { merge: true });

    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/notes/${item.id}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        ref={modalRef}
        className="relative w-full max-w-2xl bg-stone border border-gold/30 rounded-lg p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-8">
          <Book className="w-8 h-8 text-gold" aria-hidden="true" />
          <div>
            <h3 id="modal-title" className="font-cinzel text-xl text-parchment tracking-widest">{item.title}</h3>
            <p className="text-xs text-gold/40 font-cinzel uppercase tracking-[0.2em]">{item.category} • Study Session</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <label htmlFor="digital-reflections" className="block font-cinzel text-[0.65rem] text-gold/60 uppercase tracking-widest">Digital Reflections</label>
            <textarea 
              id="digital-reflections"
              ref={firstInputRef}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Record your theological insights and academic findings..."
              className="w-full h-64 bg-black/40 border border-gold/20 rounded p-4 text-parchment font-cormorant text-lg focus:outline-none focus:border-gold/50 transition-all resize-none"
            />
          </div>

          <div className="space-y-6">
            <div>
              <label className="block font-cinzel text-[0.65rem] text-gold/60 uppercase tracking-widest mb-4">Academic Status</label>
              <div className="space-y-2" role="radiogroup" aria-label="Academic progress status">
                {[
                  { id: 'unread', label: 'Unread', icon: Clock },
                  { id: 'reading', label: 'In Progress', icon: Book },
                  { id: 'studied', label: 'Stated & Proven', icon: CheckCircle },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStatus(s.id as any)}
                    role="radio"
                    aria-checked={status === s.id}
                    className={`w-full flex items-center gap-3 p-3 rounded border text-[0.65rem] font-cinzel uppercase tracking-widest transition-all ${
                      status === s.id 
                        ? 'bg-gold/10 border-gold/40 text-gold' 
                        : 'bg-black/20 border-gold/5 text-parchment/40 hover:border-gold/20'
                    }`}
                  >
                    <s.icon className="w-4 h-4" aria-hidden="true" />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleSave}
              disabled={saving}
              aria-busy={saving}
              className="w-full btn-primary py-4 text-[0.7rem] disabled:opacity-50"
            >
              {saving ? 'Archiving...' : 'Save Notes'}
            </button>
            <button 
              onClick={onClose}
              aria-label="Close modal and cancel changes"
              className="w-full text-[0.6rem] font-cinzel tracking-widest text-parchment/30 hover:text-parchment transition-colors uppercase"
            >
              Close Ledger
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const TIER_LEVELS = {
  'Injhil': 0,
  'Archimedes': 1,
  'Zaburum': 2
};

export default function ScholarLibrary() {
  const { user, userProfile } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<typeof libraryItems[0] | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const userTier = userProfile?.tier || 'Injhil';
  const userTierLevel = TIER_LEVELS[userTier as keyof typeof TIER_LEVELS] ?? 0;

  useEffect(() => {
    if (playingId) {
      const item = libraryItems.find(i => i.id === playingId);
      if (item?.audioUrl) {
        if (audioRef.current) {
          audioRef.current.src = item.audioUrl;
          audioRef.current.play().catch(console.error);
        } else {
          audioRef.current = new Audio(item.audioUrl);
          audioRef.current.play().catch(console.error);
          audioRef.current.onended = () => setPlayingId(null);
        }
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [playingId]);

  const filtered = libraryItems.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.author.toLowerCase().includes(search.toLowerCase()) ||
    item.year.toLowerCase().includes(search.toLowerCase())
  );

  const handleItemClick = (item: typeof libraryItems[0]) => {
    if (!user) {
      alert('Please sign in to access the Sacred Archive.');
      return;
    }

    const itemTierLevel = TIER_LEVELS[item.tier as keyof typeof TIER_LEVELS] ?? 0;
    if (userTierLevel < itemTierLevel) {
      alert(`Ascension Required: The "${item.title}" requires the ${item.tier} tier. Please visit the Academy Threshold to upgrade.`);
      document.getElementById('tiers')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setSelectedItem(item);
  };

  return (
    <section id="library" className="bg-stone py-24 px-6 md:px-12 border-t border-gold/10">
      <AnimatePresence>
        {selectedItem && (
          <StudyNoteModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label" id="library-heading">Archive Search</span>
          <h2 className="section-title">The Scholar Library</h2>
          <div className="gold-divider mx-auto"></div>
          
          <div className="mt-12 relative max-w-2xl mx-auto">
            <label htmlFor="archive-search" className="sr-only">Search the Sacred Archive</label>
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gold/40" aria-hidden="true" />
            <input 
              id="archive-search"
              type="text" 
              placeholder="Search manuscripts, theology, or authors..."
              className="w-full bg-black/40 border border-gold/20 rounded-full py-5 px-16 text-parchment text-lg font-cormorant focus:outline-none focus:border-gold/50 transition-all placeholder:text-parchment/20 shadow-2xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => {
            const itemTierLevel = TIER_LEVELS[item.tier as keyof typeof TIER_LEVELS] ?? 0;
            const isLocked = userTierLevel < itemTierLevel;
            
            return (
              <motion.div 
                key={item.id}
                role="button"
                tabIndex={0}
                aria-label={`Study ${item.title} by ${item.author}`}
                aria-disabled={isLocked}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleItemClick(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleItemClick(item);
                  }
                }}
                className={`group bg-stone-light/20 border border-gold/10 p-6 rounded-lg transition-all relative overflow-hidden flex flex-col h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/50 ${
                  isLocked ? 'grayscale opacity-60' : 'hover:border-gold/30 hover:bg-gold/5'
                }`}
              >
                {/* Lock Overlay */}
                {isLocked && (
                  <div className="absolute inset-0 z-10 bg-black/40 flex flex-col items-center justify-center backdrop-blur-[1px] group-hover:backdrop-blur-none transition-all">
                    <Lock className="w-8 h-8 text-gold/60 mb-2" />
                    <span className="font-cinzel text-[0.6rem] text-gold tracking-widest uppercase">{item.tier} Access Required</span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-gold/10 border border-gold/20 rounded">
                    <Book className="w-6 h-6 text-gold" aria-hidden="true" />
                  </div>
                  <div className="flex gap-2 items-center">
                    {!isLocked && (
                      <AudioPlayer 
                        url={item.audioUrl} 
                        isActive={playingId === item.id} 
                        onToggle={() => setPlayingId(playingId === item.id ? null : item.id)}
                      />
                    )}
                    {/* Progress Badge */}
                    {!isLocked && (
                      <div className="hidden group-hover:block transition-all">
                        <ProgressBadge userId={user?.uid} itemId={item.id} />
                      </div>
                    )}
                    <div className={`text-[0.6rem] font-cinzel px-2 py-1 border rounded ${
                      item.tier === 'Zaburum' ? 'border-crimson text-crimson bg-crimson/5' : 
                      item.tier === 'Archimedes' ? 'border-gold text-gold bg-gold/5' : 
                      'border-parchment/40 text-parchment/40'
                    }`}>
                      {item.tier}
                    </div>
                  </div>
                </div>

                <h3 className="font-cinzel text-lg text-parchment tracking-wider mb-2 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                
                <div className="space-y-1 mb-6">
                  <div className="flex items-center gap-2 text-xs font-cinzel text-parchment/40">
                    <span className="uppercase tracking-widest">{item.category}</span>
                    <span>•</span>
                    <span>{item.year}</span>
                  </div>
                  <div className="text-sm font-cormorant italic text-parchment/60">
                     By {item.author}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-auto">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClick(item);
                    }}
                    aria-label={isLocked ? "Upgrade to unlock document" : "Open study notes"}
                    className="flex-1 btn-ghost py-2 text-[0.65rem] flex items-center justify-center gap-2 group-hover:bg-gold/10 font-bold"
                  >
                    <Edit3 className="w-3 h-3" aria-hidden="true" />
                    {isLocked ? 'Upgrade to Unlock' : 'Study Notes'}
                  </button>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Download ${item.title}`}
                    className="p-2 border border-gold/10 rounded hover:bg-gold/10 transition-colors"
                  >
                    <Download className="w-4 h-4 text-gold/60" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button className="btn-ghost px-12 py-4">View All Archive Folders</button>
          <p className="mt-8 font-cinzel text-[0.6rem] tracking-[0.3em] text-gold/30 uppercase">
            Curated by the Apologetic Intelligence Foundation
          </p>
        </div>
      </div>
    </section>
  );
}
