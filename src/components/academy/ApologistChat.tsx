import { useState, useRef, useEffect } from 'react';
import { getApologistResponse } from '@/lib/gemini';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, User, Send, History } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';

export default function ApologistChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load history from Firestore if user is authenticated
  useEffect(() => {
    if (!user) {
      // Clear messages if user logs out
      setMessages([]);
      return;
    }

    const q = query(
      collection(db, 'users', user.uid, 'qa'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const historicalMessages = snapshot.docs.flatMap(doc => [
        { role: 'user', text: doc.data().question },
        { role: 'bot', text: doc.data().answer }
      ]);
      setMessages(historicalMessages);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/qa`);
    });

    return () => unsubscribe();
  }, [user]);

  const clearChat = () => {
    setMessages([]);
    // We don't delete from Firestore to keep the Archive, just visual clear
    // Or we could implement a delete all if requested.
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    
    // Optimistic update for UI if not seeing firestore sync yet
    if (!user) {
      setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    }
    
    setLoading(true);

    try {
      const history: { role: 'user' | 'model'; parts: { text: string }[] }[] = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model' as 'user' | 'model',
        parts: [{ text: m.text }]
      }));
      
      const responseText = await getApologistResponse(userMsg, history);
      
      if (user) {
        // Save to Firestore
        await addDoc(collection(db, 'users', user.uid, 'qa'), {
          userId: user.uid,
          question: userMsg,
          answer: responseText,
          createdAt: serverTimestamp()
        });
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm sorry, I'm having trouble connecting to the wisdom of the ages right now. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="chat" className="bg-stone py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto flex flex-col h-[700px] border border-gold/20 rounded-lg overflow-hidden bg-ink/50 backdrop-blur-md shadow-2xl">
        <div className="p-6 bg-stone-light/80 border-b border-gold/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30">
              <Bot className="text-gold w-6 h-6" />
            </div>
            <div>
              <h3 className="font-cinzel text-parchment tracking-widest text-sm uppercase">The Digital Apologist</h3>
              <p className="text-[0.65rem] text-gold/60 tracking-wider uppercase font-cinzel">Sacred Archive AI</p>
            </div>
          </div>
          <button 
            onClick={clearChat}
            className="text-[0.6rem] font-cinzel tracking-widest text-gold/40 hover:text-crimson transition-colors uppercase border border-gold/10 px-3 py-1 rounded hover:border-crimson/20"
          >
            Clear Archive
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gold/20">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <Bot className="w-16 h-16 text-gold mb-4" />
              <p className="font-cormorant text-xl max-w-sm italic">
                Greetings. I am here to serve your study of Christianity, patristics, and the Trinity. What questions may I help resolve?
              </p>
            </div>
          )}
          
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                m.role === 'user' ? 'border-gold/10 bg-gold/5' : 'border-gold/30 bg-gold/10 shadow-lg shadow-gold/5'
              }`}>
                {m.role === 'user' ? <User className="w-4 h-4 text-gold/40" /> : <Bot className="w-4 h-4 text-gold" />}
              </div>
              <div className={`p-4 rounded-lg max-w-[80%] text-sm font-sans leading-relaxed transition-all ${
                m.role === 'user' ? 'bg-gold/5 text-parchment border border-gold/10' : 'bg-gold/10 text-parchment border border-gold/20 shadow-xl'
              }`}>
                {m.role === 'bot' ? (
                  <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-cinzel prose-headings:text-gold prose-headings:mt-4 prose-headings:mb-2 prose-strong:text-gold-light italic">
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>
                ) : (
                  m.text
                )}
              </div>
            </motion.div>
          ))}
          
          {loading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-gold/20 bg-gold/5 animate-pulse">
                <Bot className="w-4 h-4 text-gold/60" />
              </div>
              <div className="p-4 rounded-lg bg-gold/5 text-parchment/60 border border-gold/10 italic text-sm animate-pulse font-cormorant">
                Consulting the digital archive...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 bg-black/40 border-t border-gold/10 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search the gospel ecosystem..."
            className="flex-1 bg-black/40 border border-gold/20 rounded-full px-6 py-3 text-parchment text-sm font-sans focus:outline-none focus:border-gold/50 transition-all placeholder:text-parchment/20"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-gold text-ink p-3 rounded-full group disabled:opacity-50 transition-all hover:bg-gold-light cursor-pointer shadow-lg shadow-gold/30"
          >
            <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
}
