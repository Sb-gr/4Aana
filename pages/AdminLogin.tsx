
import React, { useState } from 'react';
import { Lock, User, Mail } from 'lucide-react';

interface AdminLoginPageProps {
  onLogin: () => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Updated Credentials per user request
    const validEmail = 'sumanbasnet2030@gmail.com';
    const validPassword = 'sum@n2030';

    setTimeout(() => {
        if (email === validEmail && password === validPassword) {
            onLogin();
        } else {
            setError('The email or password you entered is incorrect.');
            setIsLoading(false);
        }
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-900/20 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[150px]"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-[0_25px_100px_rgba(0,0,0,0.5)] border border-white/5">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-emerald-600 text-white font-bold p-4 rounded-3xl text-4xl leading-none flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-900/30">
              4
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">Admin Login</h1>
            <p className="text-slate-500 mt-3 font-medium">Management portal for 4 Aana Nepal</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100 font-bold animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  required
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl border-2 border-transparent text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl border-2 border-transparent text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 text-lg flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-10 text-center">
            <p className="text-slate-400 text-sm">
                Protected by 4 Aana Security Services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
