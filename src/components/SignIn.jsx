import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ContactsContext } from '../context/ContactsContext';
import { Heart, LogIn, Eye, EyeOff } from 'lucide-react';

export default function SignIn() {
  const { signIn } = useContext(ContactsContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    // Fake delay for realism
    setTimeout(() => {
      signIn(email.trim());
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand/[0.06] blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center shadow-lg shadow-brand/25">
              <Heart size={22} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold gradient-text tracking-tight mb-2">Rolo</h1>
          <p className="text-warm-500 text-sm">Stay connected with everyone</p>
        </div>

        {/* Sign in card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl p-8">
          <h2 className="text-lg font-bold text-warm-800 mb-1">Welcome back</h2>
          <p className="text-warm-500 text-sm mb-6">Sign in to your Rolo</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-warm-600 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 text-sm placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/40 transition-all"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-warm-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 text-sm placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/40 transition-all pr-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-400 hover:text-warm-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-warm-500 cursor-pointer">
                <input type="checkbox" className="rounded border-warm-300 text-brand focus:ring-brand/30" defaultChecked />
                Remember me
              </label>
              <button type="button" className="text-brand hover:text-brand-dark font-medium transition-colors">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || !email.trim() || !password.trim()}
              className="w-full py-3 rounded-xl gradient-brand text-white font-semibold text-sm shadow-md shadow-brand/20 hover:shadow-lg hover:shadow-brand/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-warm-100 text-center">
            <p className="text-xs text-warm-400">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setEmail('demo@rolo.app');
                  setPassword('demo');
                }}
                className="text-brand font-semibold hover:text-brand-dark transition-colors"
              >
                Try the demo
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-warm-400 text-xs mt-6">
          Your data stays on your device. Always.
        </p>
      </motion.div>
    </div>
  );
}
