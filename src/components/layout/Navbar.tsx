import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { user, userProfile, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center justify-between px-8 md:px-12 bg-ink/92 backdrop-blur-xl border-b border-gold/20">
        <div className="flex items-center gap-8">
          <a className="flex items-center gap-3" href="#">
            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center shadow-lg shadow-gold/20">
              <span className="text-ink font-bold font-cinzel">Ω</span>
            </div>
            <span className="font-cinzel font-bold text-xl tracking-[0.1em] text-gold uppercase">Apologetic <span className="text-parchment/60 font-medium lowercase italic">Intelligence</span></span>
          </a>
          
          <ul className="hidden lg:flex items-center gap-6">
            <li><a className="font-cinzel text-[0.7rem] tracking-widest text-parchment/60 hover:text-gold transition-colors uppercase" href="#streams">Broadcasts</a></li>
            <li><a className="font-cinzel text-[0.7rem] tracking-widest text-parchment/60 hover:text-gold transition-colors uppercase" href="#library">Archive</a></li>
            <li><a className="font-cinzel text-[0.7rem] tracking-widest text-parchment/60 hover:text-gold transition-colors uppercase" href="#chat">Apologist</a></li>
            <li><a className="font-cinzel text-[0.7rem] tracking-widest text-parchment/60 hover:text-gold transition-colors uppercase" href="#formula">Theorem</a></li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <a target="_blank" href="https://faith.tools/app/525-opentheo?utm_source=badge&utm_medium=embed" className="hidden xl:block transition-transform hover:scale-105" rel="noreferrer">
            <img style={{ maxHeight: '34px', maxWidth: '100%', aspectRatio: '1000/216', borderRadius: '4px', objectFit: 'cover' }} src="https://faith.tools/.netlify/images/?url=/embed-badge-featured-v2.png" alt="Featured on faith.tools" loading="lazy" />
          </a>
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gold/5 border border-gold/20 rounded">
                <User className="w-4 h-4 text-gold/60" />
                <span className="text-[0.65rem] font-cinzel text-parchment/80 uppercase tracking-widest">
                  {userProfile?.tier || 'Injhil'}
                </span>
              </div>
              <button 
                onClick={() => signOut()}
                className="text-parchment/40 hover:text-crimson transition-colors"
                title="Log Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="btn-primary px-6 py-2 text-xs"
            >
              Sign In
            </button>
          )}
          
          <button className="lg:hidden text-gold">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
