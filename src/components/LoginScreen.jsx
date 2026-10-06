import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  KeyRound, 
  Eye, 
  EyeOff, 
  Droplet, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-react';

export const defaultAccounts = [
  {
    username: 'admin',
    name: 'Khoerul Awaludin',
    role: 'Super Admin',
    roleBadge: 'ADMIN',
    password: 'admin123',
    avatar: '👨‍💼',
    permissions: 'Akses Penuh (Kontrol Zona, Parameter ESP32, Jadwal & Pengaturan)'
  },
  {
    username: 'operator',
    name: 'Operator Kebun',
    role: 'Operator Penyiraman',
    roleBadge: 'OPERATOR',
    password: 'user123',
    avatar: '🌾',
    permissions: 'Akses Operasional (Monitoring Sensor & Trigger Manual)'
  }
];

export default function LoginScreen({ onLoginSuccess }) {
  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const foundAccount = defaultAccounts.find(
        acc => (acc.username.toLowerCase() === usernameInput.trim().toLowerCase()) && acc.password === passwordInput
      );

      if (foundAccount) {
        onLoginSuccess(foundAccount);
      } else {
        setErrorMessage('Username atau Password salah! Ganti dengan admin / admin123 atau operator / user123.');
        setIsLoading(false);
      }
    }, 600);
  };

  const handleFillDemo = (account) => {
    setUsernameInput(account.username);
    setPasswordInput(account.password);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative z-20">
      
      {/* Login Card Container */}
      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/90 relative overflow-hidden animate-fadeIn">
        
        {/* Top Glow Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center mb-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Droplet className="w-7 h-7 text-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              AgroFlow IoT
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Sistem Otomatisasi Penyiraman Kebun Smart Agriculture
          </p>
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          
          {/* Username Input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Username / ID Pengguna
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Masukkan username (contoh: admin)"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Kata Sandi / Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Masukkan password"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Memverifikasi Akses...</span>
              </span>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Login Credentials Selector */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <p className="text-[11px] font-semibold text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Klik Akun Demo Kredensial di Bawah:</span>
          </p>

          <div className="grid grid-cols-2 gap-2">
            {defaultAccounts.map(acc => (
              <button
                key={acc.username}
                type="button"
                onClick={() => handleFillDemo(acc)}
                className={`p-2.5 rounded-xl border text-left transition-all hover:scale-[1.02] ${
                  usernameInput === acc.username 
                    ? 'border-emerald-500/60 bg-emerald-950/40 text-white' 
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{acc.avatar}</span>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{acc.roleBadge}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {acc.username} / {acc.password}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Credit */}
        <div className="mt-6 text-center text-[11px] text-slate-500">
          AgroFlow Security v2.4 • ESP32 Smart Garden System
        </div>

      </div>
    </div>
  );
}
