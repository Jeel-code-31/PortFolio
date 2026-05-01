import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ChevronRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('darjijeel31@gmail.com');
  const [password, setPassword] = useState('jeel31');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Access Denied');
      }
    } catch (err) {
      setError('Connection failed. Is the server running?');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background elements to match the portfolio theme */}
      <div className="fixed inset-0 opacity-10 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-secondary/30 backdrop-blur-xl border border-primary/10 p-8 rounded-2xl shadow-2xl relative group"
      >
        <div className="absolute -top-px left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 border border-primary/20 group-hover:border-primary/50 transition-colors">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Terminal</h1>
          <p className="text-primary/50 text-xs font-mono mt-2 uppercase tracking-widest">// SQL Backend Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-primary/70 uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-3 h-3" /> Identity
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all font-mono text-sm"
              placeholder="admin@terminal.sys"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-primary/70 uppercase tracking-widest flex items-center gap-2">
              <Lock className="w-3 h-3" /> Access Code
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background/50 border border-primary/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all font-mono text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-lg flex items-center gap-3 font-mono"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-hover text-background font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                AUTHENTICATING...
              </span>
            ) : (
              <>
                INITIALIZE ACCESS
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-primary/30 font-mono uppercase tracking-[0.2em]">
            SQL v3.45 | Server v5.0.0
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
