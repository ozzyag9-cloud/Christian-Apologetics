import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-stone border border-gold/30 rounded-lg p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative background elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-parchment/40 hover:text-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-xl flex items-center justify-center">
                  <span className="text-gold font-cinzel text-3xl font-bold">Ω</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="font-cinzel text-2xl text-parchment tracking-widest uppercase">The Scholar's Gate</h2>
                <div className="gold-divider mx-auto w-24" />
                <p className="text-sm text-parchment/60 font-sans italic">
                  "Seek, and you shall find; knock, and it shall be opened unto you."
                </p>
              </div>
              
              <div className="pt-6">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-parchment text-ink font-bold py-4 px-6 rounded-lg transition-all transform hover:-translate-y-1 shadow-lg"
                >
                  <img 
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                    alt="Google" 
                    className="w-6 h-6"
                  />
                  <span>Access with Google</span>
                </button>
              </div>
              
              <p className="text-[0.6rem] font-cinzel text-gold/40 tracking-[0.2em] uppercase">
                Academic Authentication Required
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
