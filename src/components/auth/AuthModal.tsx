import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, UserPlus, LogIn, Github } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-0">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-stone border border-gold/20 rounded-lg overflow-hidden shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-parchment/40 hover:text-gold transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/30">
              <span className="text-gold text-3xl font-cinzel">Ω</span>
            </div>
            <h2 className="font-cinzel text-2xl text-parchment tracking-widest uppercase">
              {isLogin ? 'Login' : 'Sign Up'}
            </h2>
            <p className="font-cormorant italic text-parchment/60 mt-1">
              {isLogin ? 'Enter the digital archive' : 'Join the Christian academy'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/40" />
              <input
                type="email"
                required
                placeholder="Sacred Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-gold/20 rounded px-10 py-3 text-parchment text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/40" />
              <input
                type="password"
                required
                placeholder="Secret Knowledge"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-gold/20 rounded px-10 py-3 text-parchment text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            {error && (
              <p className="text-crimson text-xs font-cinzel text-center bg-crimson/5 py-2 rounded">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-ink border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  <span>{isLogin ? 'Ascend' : 'Initialize'}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gold/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-cinzel tracking-widest">
              <span className="bg-stone px-4 text-gold/40">Or continue with</span>
            </div>
          </div>

          <button 
            onClick={handleGoogleSignIn}
            className="mt-6 w-full flex items-center justify-center gap-3 py-3 bg-white/5 border border-gold/10 rounded font-cinzel text-xs tracking-widest text-parchment hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google Login
          </button>

          <p className="mt-8 text-center font-cormorant italic text-parchment/40">
            {isLogin ? "New to the path?" : "Already a member?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-gold hover:text-gold-light transition-colors font-bold not-italic"
            >
              {isLogin ? "Join the Academy" : "Access Archive"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
