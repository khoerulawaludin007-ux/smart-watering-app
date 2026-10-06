import React, { useState } from 'react';
import { 
  Droplet, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  KeyRound,
  Cpu,
  LogIn,
  UserPlus
} from 'lucide-react';

export default function AuthScreen({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Pemilik Kebun / Admin');
  
  // Alert/Error Message state
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (isRegister) {
      if (!fullName || !email || !password || !confirmPassword) {
        setErrorMessage('Mohon lengkapi seluruh kolom pendaftaran!');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Konfirmasi password tidak cocok dengan password!');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password minimal harus 6 karakter!');
        return;
      }

      setSuccessMessage('Pendaftaran berhasil! Mengalihkan ke Dashboard...');
      setTimeout(() => {
        onLoginSuccess({
          name: fullName,
          email: email,
          role: role,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fullName)}`
        });
      }, 1000);

    } else {
      if (!email || !password) {
        setErrorMessage('Masukkan email dan password kamu!');
        return;
      }

      setSuccessMessage('Login Berhasil! Selamat datang kembali.');
      setTimeout(() => {
        onLoginSuccess({
          name: email.split('@')[0] || 'Khoerul Awaludin',
          email: email,
          role: 'Super Admin IoT',
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`
        });
      }, 800);
    }
  };

  // Quick Demo Login Handler
  const handleDemoLogin = (demoName, demoEmail, demoRole) => {
    setSuccessMessage(`Login Demo sebagai ${demoName}...`);
    setTimeout(() => {
      onLoginSuccess({
        name: demoName,
        email: demoEmail,
        role: demoRole,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(demoName)}`
      });
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-950 text-slate-100">
      
      {/* 3D Background Lighting Aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Holographic floor grid */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(16, 185, 129, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.15) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            transform: 'perspective(500px) rotateX(60deg) scale(1.5)',
            transformOrigin: 'top center'
          }}
        />
      </div>

      {/* Main Glassmorphism Auth Container */}
      <div className="relative z-10 max-w-md w-full bg-slate-900/90 border border-slate-800/80 rounded-3xl p-8 shadow-2xl shadow-slate-950/90 backdrop-blur-2xl transition-all">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-xl shadow-emerald-500/20 mb-4">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
              <Droplet className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
          </div>

          <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            AgroFlow IoT
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Sistem Kontrol Penyiraman Otomatis Berbasis ESP32
          </p>
        </div>

        {/* Tab Switcher: Masuk vs Daftar */}
        <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800/80 mb-6 shadow-inner">
          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              !isRegister
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsRegister(true);
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              isRegister
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Daftar Akun</span>
          </button>
        </div>

        {/* Alerts Banner */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 text-red-300 rounded-xl text-xs flex items-center gap-2 animate-shake">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Registered Full Name field */}
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Contoh: Khoerul Awaludin"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Alamat Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Role selector field for Registration */}
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Peran / Jabatan IoT
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition-all"
              >
                <option value="Pemilik Kebun / Admin">Pemilik Kebun / Admin</option>
                <option value="Teknisi Sensor ESP32">Teknisi Sensor ESP32</option>
                <option value="Supervisor Pertanian">Supervisor Pertanian</option>
              </select>
            </div>
          )}

          {/* Password field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-2.5 pl-10 pr-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password field for Registration */}
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Konfirmasi Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-2.5 pl-10 pr-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider mt-2"
          >
            <span>{isRegister ? 'Daftar Akun Baru' : 'Masuk ke Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-400 mb-3 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Atau Akses Cepat Mode Demo:</span>
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('Khoerul Awaludin', 'khoerul.awaludin@kci.id', 'Super Admin IoT')}
              className="px-3 py-2 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-[11px] font-semibold text-slate-300 hover:text-emerald-400 transition-all flex items-center justify-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Demo</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('Tamu Kebun', 'tamu@agroflow.id', 'Tamu Pengamat')}
              className="px-3 py-2 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 rounded-xl text-[11px] font-semibold text-slate-300 hover:text-cyan-400 transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Mode Tamu</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
