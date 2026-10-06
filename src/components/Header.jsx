import React from 'react';
import { 
  Droplet, 
  Power, 
  CloudRain, 
  Cpu, 
  SlidersHorizontal, 
  Clock, 
  ShieldCheck, 
  ShieldAlert,
  Sparkles,
  Wifi
} from 'lucide-react';

export default function Header({ 
  systemState, 
  setSystemState, 
  onOpenHardware, 
  onOpenSettings,
  zonesWateringCount 
}) {
  const toggleMasterPump = () => {
    setSystemState(prev => {
      const nextPumpState = !prev.masterPumpState;
      return {
        ...prev,
        masterPumpState: nextPumpState
      };
    });
  };

  const toggleAutoMode = () => {
    setSystemState(prev => ({
      ...prev,
      autoMode: !prev.autoMode
    }));
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/25 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-emerald-400 animate-pulse" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  AgroFlow
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  IoT Smart v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center space-x-1.5 mt-0.5">
                <Wifi className="w-3 h-3 text-emerald-400 inline" />
                <span>ESP32 connected</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Kebun Otomatis</span>
              </p>
            </div>
          </div>

          {/* Mobile Hardware Simulator Button */}
          <div className="md:hidden">
            <button
              onClick={onOpenHardware}
              className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 border border-slate-700"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Simulasi</span>
            </button>
          </div>
        </div>

        {/* Global Controls & Status Badges */}
        <div className="flex items-center flex-wrap gap-2.5">
          
          {/* Mode Selector Toggle (Otomatis / Manual) */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 shadow-inner">
            <button
              onClick={() => setSystemState(prev => ({ ...prev, autoMode: true }))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                systemState.autoMode 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/40' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto Smart</span>
            </button>
            <button
              onClick={() => setSystemState(prev => ({ ...prev, autoMode: false }))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                !systemState.autoMode 
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Manual Override</span>
            </button>
          </div>

          {/* Rain Delay Status */}
          {systemState.rainDelayHours > 0 ? (
            <div className="px-3 py-1.5 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span>Tunda Hujan ({systemState.rainDelayHours}j)</span>
            </div>
          ) : null}

          {/* Master Water Pump Switch */}
          <button
            onClick={toggleMasterPump}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
              systemState.masterPumpState || zonesWateringCount > 0
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30 animate-pulse'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Power className={`w-4 h-4 ${systemState.masterPumpState || zonesWateringCount > 0 ? 'text-slate-950' : 'text-slate-400'}`} />
            <span>
              {systemState.masterPumpState || zonesWateringCount > 0 
                ? `POMPA UTAMA AKTIF (${systemState.masterPumpFlowRate} L/min)` 
                : 'POMPA UTAMA MATI'}
            </span>
          </button>

          {/* Desktop Hardware Simulator Button */}
          <button
            onClick={onOpenHardware}
            className="hidden md:flex px-3.5 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 rounded-xl items-center gap-2 transition-all hover:shadow-glow-cyan"
          >
            <Cpu className="w-4 h-4" />
            <span>Simulasi ESP32</span>
          </button>

          {/* Settings Modal Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
            title="Pengaturan Sistem"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
