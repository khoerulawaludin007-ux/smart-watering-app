import React from 'react';
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  Wind, 
  Thermometer, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function WeatherWidget({ weather, systemState, onSetRainDelay }) {
  const isHighRainRisk = weather.rainProbability >= 60;

  return (
    <div className="glass-panel rounded-2xl p-6 mb-8 border border-slate-800 relative overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Weather Info Main */}
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            {weather.rainProbability > 50 ? (
              <CloudRain className="w-8 h-8 animate-bounce text-cyan-400" />
            ) : (
              <Sun className="w-8 h-8 animate-pulse text-amber-400" />
            )}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> {weather.location}
              </span>
              <span className="px-2 py-0.5 text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full font-semibold">
                Live OpenWeather
              </span>
            </div>

            <div className="flex items-baseline space-x-3 mt-1">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {weather.temp}°C
              </span>
              <span className="text-sm font-semibold text-slate-300">
                {weather.condition}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-xs text-slate-400 mt-1">
              <span>Kelembapan Udara: <strong className="text-slate-200">{weather.humidity}%</strong></span>
              <span>•</span>
              <span>Kecepatan Angin: <strong className="text-slate-200">{weather.windSpeed}</strong></span>
            </div>
          </div>
        </div>

        {/* Rain Forecast & Smart Delay Action */}
        <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 lg:w-96">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <CloudRain className="w-4 h-4 text-cyan-400" /> Peluang Hujan Hari Ini:
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isHighRainRisk ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'
            }`}>
              {weather.rainProbability}%
            </span>
          </div>

          <p className="text-[11px] text-slate-400 mb-3">
            {isHighRainRisk ? (
              <span className="text-cyan-300 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Rekomendasi AI: Aktifkan Tunda Hujan untuk menghemat air.
              </span>
            ) : (
              <span>Kondisi cuaca stabil. Penjadwalan penyiraman berjalan sesuai standar.</span>
            )}
          </p>

          {/* Quick Rain Delay Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-semibold text-slate-400">Tunda Hujan:</span>
            {[0, 24, 48].map(hours => (
              <button
                key={hours}
                onClick={() => onSetRainDelay(hours)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all border ${
                  systemState.rainDelayHours === hours 
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm' 
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800'
                }`}
              >
                {hours === 0 ? 'Matikan' : `${hours} Jam`}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
