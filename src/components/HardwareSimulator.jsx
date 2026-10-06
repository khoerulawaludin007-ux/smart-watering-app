import React, { useState } from 'react';
import { 
  Cpu, 
  HardDrive, 
  Wifi, 
  CloudRain, 
  Zap, 
  RefreshCw, 
  Sliders, 
  X, 
  CheckCircle2, 
  AlertTriangle,
  Radio,
  Gauge,
  Droplet
} from 'lucide-react';

export default function HardwareSimulator({ 
  isOpen, 
  onClose, 
  systemState, 
  setSystemState, 
  zones, 
  setZones,
  onAddLog 
}) {
  if (!isOpen) return null;

  const triggerRefillTank = () => {
    setSystemState(prev => ({
      ...prev,
      waterTankLevel: 100
    }));
    onAddLog('system', 'Tangki air telah diisi ulang ke 100% (1000 Liters).', 'success');
  };

  const triggerRainEvent = () => {
    const nextState = !systemState.rainDetected;
    setSystemState(prev => ({
      ...prev,
      rainDetected: nextState,
      rainDelayHours: nextState ? 24 : 0
    }));
    if (nextState) {
      onAddLog('system', 'Sensor Hujan Terdeteksi BASAH (Rain Drop FC-37 Active)! Mengaktifkan Tunda Hujan 24 Jam.', 'warning');
    } else {
      onAddLog('system', 'Sensor Hujan KERING. Tunda Hujan dinonaktifkan.', 'info');
    }
  };

  const forceDryZone = (zoneId) => {
    setZones(prev => prev.map(z => {
      if (z.id === zoneId) {
        return { ...z, moisture: Math.max(15, z.moisture - 25) };
      }
      return z;
    }));
    onAddLog('system', `Simulasi penurunan kelembapan ekstrem pada zona (${zoneId}).`, 'warning');
  };

  const forceMoistZone = (zoneId) => {
    setZones(prev => prev.map(z => {
      if (z.id === zoneId) {
        return { ...z, moisture: Math.min(95, z.moisture + 25) };
      }
      return z;
    }));
    onAddLog('system', `Simulasi penyiraman langsung pada zona (${zoneId}).`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="glass-panel w-full max-w-3xl rounded-2xl p-6 border border-cyan-500/40 shadow-glow-cyan relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <span>Simulator Hardware ESP32 & Controller Bench</span>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-mono">
                  ONLINE
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Uji coba input sensor, simulasi hujan, status relay solenoid, dan trigger pengisian tangki
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controller Node Hardware Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-cyan-400 mb-2 text-xs font-bold">
              <Radio className="w-4 h-4" />
              <span>Koneksi MQTT Broker</span>
            </div>
            <p className="text-xs font-mono text-slate-300">broker.agroflow.local:1883</p>
            <p className="text-[11px] text-slate-500 mt-1">Topic: <code className="text-emerald-400">agroflow/sensors/#</code></p>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-emerald-400 mb-2 text-xs font-bold">
              <Wifi className="w-4 h-4" />
              <span>Sinyal Wi-Fi ESP32</span>
            </div>
            <p className="text-xs font-mono text-slate-300">AgroFlow_Mesh (-58 dBm)</p>
            <p className="text-[11px] text-slate-500 mt-1">IP Address: <code className="text-cyan-400">192.168.1.105</code></p>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-amber-400 mb-2 text-xs font-bold">
              <Gauge className="w-4 h-4" />
              <span>Tegangan Catu Daya</span>
            </div>
            <p className="text-xs font-mono text-slate-300">12.2 Volt DC (Adapter 5A)</p>
            <p className="text-[11px] text-slate-500 mt-1">Arus Saat Ini: <code className="text-amber-400">1.85 Amperes</code></p>
          </div>
        </div>

        {/* Relay Module Status LED Display */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" /> Relay Module 8-Channel (12V Solenoid & Master Pump)
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {zones.map((z, i) => (
              <div 
                key={z.id}
                className={`p-3 rounded-xl border text-center transition-all ${
                  z.valveOpen 
                    ? 'bg-emerald-950/80 border-emerald-500/50 shadow-glow-emerald' 
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-center space-x-1.5 mb-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${z.valveOpen ? 'bg-emerald-400 animate-ping' : 'bg-slate-700'}`} />
                  <span className="text-[11px] font-bold text-slate-300">Relay {i+1}</span>
                </div>
                <p className="text-[10px] text-slate-400 truncate">{z.name.split(':')[0]}</p>
                <p className={`text-[10px] font-extrabold uppercase mt-1 ${z.valveOpen ? 'text-emerald-400' : 'text-slate-600'}`}>
                  {z.valveOpen ? 'OPEN (HIGH)' : 'CLOSED (LOW)'}
                </p>
              </div>
            ))}

            {/* Master Pump Relay */}
            <div className={`p-3 rounded-xl border text-center transition-all ${
              systemState.masterPumpState 
                ? 'bg-cyan-950/80 border-cyan-500/50 shadow-glow-cyan' 
                : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="flex items-center justify-center space-x-1.5 mb-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${systemState.masterPumpState ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'}`} />
                <span className="text-[11px] font-bold text-slate-300">Relay 5</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">Pompa Utama</p>
              <p className={`text-[10px] font-extrabold uppercase mt-1 ${systemState.masterPumpState ? 'text-cyan-400' : 'text-slate-600'}`}>
                {systemState.masterPumpState ? 'POWER ON' : 'POWER OFF'}
              </p>
            </div>
          </div>
        </div>

        {/* Environmental & Hardware Simulator Controls */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" /> Aksi Simulasi Lingkungan Lingkungan Cerdas
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Action 1: Rain Drop Sensor Toggle */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <CloudRain className="w-4 h-4 text-cyan-400" /> Sensor Hujan (FC-37 Rain Drop)
                </h5>
                <p className="text-[11px] text-slate-400 mt-1">
                  Status: {systemState.rainDetected ? <strong className="text-cyan-300">Basah (Terdeteksi Hujan)</strong> : 'Kering'}
                </p>
              </div>

              <button
                onClick={triggerRainEvent}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all border ${
                  systemState.rainDetected 
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400' 
                    : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                }`}
              >
                {systemState.rainDetected ? 'Hentikan Hujan' : 'Simulasi Hujan'}
              </button>
            </div>

            {/* Action 2: Refill Water Tank */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-emerald-400" /> Isi Ulang Tangki Air Utama
                </h5>
                <p className="text-[11px] text-slate-400 mt-1">
                  Level Saat Ini: <strong className="text-emerald-400">{systemState.waterTankLevel}%</strong>
                </p>
              </div>

              <button
                onClick={triggerRefillTank}
                className="px-3 py-1.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-all shadow-md shadow-emerald-500/20"
              >
                Isi Penuh (100%)
              </button>
            </div>

          </div>

          {/* Action 3: Soil Moisture Force Sliders */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <h5 className="text-xs font-bold text-slate-200 mb-3">
              Simulasikan Perubahan Kelembapan Tanah per Sensor Probe (Capacitive Soil Sensor):
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {zones.map(z => (
                <div key={z.id} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-300">{z.name.split(':')[0]}</p>
                    <p className="text-[11px] text-emerald-400 font-mono">Kelembapan: {z.moisture}%</p>
                  </div>

                  <div className="flex space-x-1.5">
                    <button
                      onClick={() => forceDryZone(z.id)}
                      className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 text-[10px] font-bold rounded-lg"
                      title="Kurangi Kelembapan (-25%)"
                    >
                      Keringkan
                    </button>
                    <button
                      onClick={() => forceMoistZone(z.id)}
                      className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-lg"
                      title="Tambah Kelembapan (+25%)"
                    >
                      Basahi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
