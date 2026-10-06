import React, { useState } from 'react';
import { 
  Play, 
  Square, 
  Droplet, 
  Thermometer, 
  Wind, 
  Sliders, 
  Clock, 
  Sprout, 
  Flower2, 
  Building2, 
  Apple,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Edit3
} from 'lucide-react';

const iconMap = {
  Sprout: Sprout,
  Flower2: Flower2,
  Building2: Building2,
  Apple: Apple,
};

export default function ZoneCard({ 
  zone, 
  onToggleValve, 
  onStartWatering, 
  onStopWatering, 
  onUpdateThreshold,
  onEditZone,
  t 
}) {
  const IconComponent = iconMap[zone.icon] || Sprout;
  const isWatering = zone.valveOpen || zone.status === 'watering';
  const isLowMoisture = zone.moisture <= zone.thresholdMin;

  const getMoistureColor = (m) => {
    if (m < 35) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    if (m <= 65) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
  };

  const formatCountdown = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={`glass-panel rounded-2xl p-5 relative transition-all duration-300 flex flex-col justify-between ${
      isWatering 
        ? 'border-emerald-500/50 shadow-glow-emerald bg-slate-900/90' 
        : isLowMoisture 
        ? 'border-amber-500/40 shadow-glow-amber' 
        : 'hover:border-slate-700'
    }`}>
      
      {/* Top Bar: Icon, Name & Status */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${
              isWatering 
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 animate-bounce' 
                : 'bg-slate-900 text-emerald-400 border-slate-800'
            }`}>
              <IconComponent className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-bold text-slate-100 text-base leading-snug flex items-center gap-1.5">
                {zone.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>{zone.crop}</span>
                <span>•</span>
                <span className="text-slate-500">{zone.soilType}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => onEditZone(zone)}
            className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all"
            title="Edit Parameter Zona"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Moisture Gauge & Status Badge */}
        <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 text-cyan-400" /> {t?.moisture || 'Kelembapan Tanah'}
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${getMoistureColor(zone.moisture)}`}>
              {zone.moisture}% ({t?.target || 'Target'}: {zone.targetMoisture}%)
            </span>
          </div>

          {/* Moisture Bar */}
          <div className="relative w-full bg-slate-900 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-800">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isWatering 
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 animate-pulse' 
                  : zone.moisture < zone.thresholdMin 
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500' 
                  : 'bg-gradient-to-r from-teal-500 to-emerald-400'
              }`}
              style={{ width: `${zone.moisture}%` }}
            />
            {/* Threshold Line Indicator */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-10 shadow-sm"
              style={{ left: `${zone.thresholdMin}%` }}
              title={`${t?.minThreshold || 'Ambang Min'}: ${zone.thresholdMin}%`}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2">
            <span className="flex items-center gap-1">
              {t?.minThreshold || 'Ambang Min'}: <strong className="text-amber-400">{zone.thresholdMin}%</strong>
            </span>
            <span className="text-slate-400">{t?.lastWatered || 'Terakhir'}: {zone.lastWatered}</span>
          </div>
        </div>

        {/* Live Metrics: Temp & Humidity */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
            <Thermometer className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-medium">{t?.soilTemp || 'Suhu Tanah'}</p>
              <p className="text-xs font-bold text-slate-200">{zone.temperature} °C</p>
            </div>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
            <Wind className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-medium">{t?.airHumidity || 'Kelembapan Udara'}</p>
              <p className="text-xs font-bold text-slate-200">{zone.humidity} %</p>
            </div>
          </div>
        </div>

        {/* Interactive Threshold Slider */}
        <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/60 mb-4">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" /> {t?.autoThresholdTrigger || 'Ambang Pemicu Otomatis'}:
            </span>
            <span className="text-emerald-400 font-bold">{zone.thresholdMin}%</span>
          </div>
          <input 
            type="range"
            min="20"
            max="80"
            value={zone.thresholdMin}
            onChange={(e) => onUpdateThreshold(zone.id, Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
      </div>

      {/* Bottom Controls & Watering Action */}
      <div>
        {isWatering ? (
          <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="flex space-x-1">
                <Droplet className="w-4 h-4 text-cyan-400 anim-drop" />
                <Droplet className="w-4 h-4 text-emerald-400 anim-drop-delay-1" />
                <Droplet className="w-4 h-4 text-teal-400 anim-drop-delay-2" />
              </div>
              <span className="text-xs font-bold text-emerald-300">
                Watering Active ({zone.waterFlowRate} L/min)
              </span>
            </div>

            {zone.timeRemaining > 0 && (
              <p className="text-xs font-semibold text-slate-300 mb-2">
                Time Left: <span className="text-emerald-400 font-mono text-sm">{formatCountdown(zone.timeRemaining)}</span>
              </p>
            )}

            <button
              onClick={() => onStopWatering(zone.id)}
              className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-900/30"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>{t?.stopWatering || 'Hentikan'}</span>
            </button>
          </div>
        ) : (
          <div>
            <p className="text-[11px] text-slate-400 font-semibold mb-2 flex items-center justify-between">
              <span>{t?.startWatering || 'Mulai Siram Manual'}:</span>
              <span className="text-slate-400 font-normal">Solenoid 12V</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onStartWatering(zone.id, 1)}
                className="py-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all hover:border-emerald-400"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>1 {t?.minutes || 'Min'}</span>
              </button>
              <button
                onClick={() => onStartWatering(zone.id, 5)}
                className="py-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all hover:border-emerald-400"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>5 {t?.minutes || 'Min'}</span>
              </button>
              <button
                onClick={() => onStartWatering(zone.id, 10)}
                className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-md shadow-emerald-900/30"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>10 {t?.minutes || 'Min'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
