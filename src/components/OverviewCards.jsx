import React from 'react';
import { 
  Droplets, 
  Database, 
  Activity, 
  TrendingDown, 
  CloudRain, 
  AlertTriangle,
  Zap,
  Gauge,
  Thermometer,
  Wind
} from 'lucide-react';

export default function OverviewCards({ systemState, zones, weather, t }) {
  // Calculate average soil moisture
  const avgMoisture = Math.round(
    zones.reduce((sum, z) => sum + z.moisture, 0) / (zones.length || 1)
  );

  const activeZonesCount = zones.filter(z => z.valveOpen || z.status === 'watering').length;

  const currentWaterLiters = Math.round((systemState.waterTankLevel / 100) * systemState.waterTankCapacityLiters);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      
      {/* Card 1: Rata-Rata Kelembapan Tanah */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t?.avgMoisture || 'RATA-RATA KELEMBAPAN'}
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Droplets className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {avgMoisture}%
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            avgMoisture < 40 
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          }`}>
            {avgMoisture < 40 ? 'Needs Water' : (t?.optimal || 'Optimal')}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 mt-4 overflow-hidden p-0.5">
          <div 
            className="bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 h-full rounded-full transition-all duration-700"
            style={{ width: `${avgMoisture}%` }}
          />
        </div>

        <p className="text-[11px] text-slate-400 mt-2.5 flex items-center justify-between">
          <span>{t?.targetIdeal || 'Target Ideal'}: 50% - 70%</span>
          <span className="text-emerald-400 font-medium">{zones.length} {t?.sensorActive || 'Sensor Aktif'}</span>
        </p>
      </div>

      {/* Card 2: Kapasitas Tangki Air */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t?.mainTankLevel || 'LEVEL TANGKI UTAMA'}
          </span>
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Database className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {systemState.waterTankLevel}%
          </span>
          <span className="text-xs text-slate-400 font-medium">
            ({currentWaterLiters} / {systemState.waterTankCapacityLiters} L)
          </span>
        </div>

        {/* Tank Level Bar with Animated Gradient */}
        <div className="w-full bg-slate-800 rounded-full h-2 mt-4 overflow-hidden p-0.5">
          <div 
            className={`h-full rounded-full transition-all duration-700 ${
              systemState.waterTankLevel < 25 
                ? 'bg-rose-500 shadow-glow-amber animate-pulse' 
                : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
            }`}
            style={{ width: `${systemState.waterTankLevel}%` }}
          />
        </div>

        <p className="text-[11px] text-slate-400 mt-2.5 flex items-center justify-between">
          {systemState.waterTankLevel < 25 ? (
            <span className="text-rose-400 font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Low Water Warning!
            </span>
          ) : (
            <span className="text-cyan-400 font-medium">{t?.safeStorage || 'Cadangan Aman'}</span>
          )}
          <span>{t?.sensorUS || 'Sensor US-01'}</span>
        </p>
      </div>

      {/* Card 3: Status Penyiraman Zona */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t?.activeZoneStatus || 'STATUS AKTIVITAS ZONA'}
          </span>
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {activeZonesCount}
          </span>
          <span className="text-sm font-medium text-slate-400">
            / {zones.length} Active Zones
          </span>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          {activeZonesCount > 0 ? (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t?.wateringNow || 'Katup Menyiram Air'}</span>
            </div>
          ) : (
            <div className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 text-xs font-medium">
              Valves Closed (Standby)
            </div>
          )}
        </div>

        <p className="text-[11px] text-slate-400 mt-2.5 flex items-center justify-between">
          <span>{t?.modeAuto || 'Mode: Otomatis'}</span>
          <span>{t?.solenoid12v || 'Solenoid 12V'}</span>
        </p>
      </div>

      {/* Card 4: Konsumsi Air Hari Ini & Cuaca */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t?.waterUsageToday || 'PENGGUNAAN AIR HARI INI'}
          </span>
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
            <TrendingDown className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {systemState.totalWaterTodayLiters}
          </span>
          <span className="text-sm text-slate-400 font-medium">Liters</span>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-slate-400">Smart Water Savings:</span>
          <span className="text-emerald-400 font-bold px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">
            +{systemState.estimatedWaterSavedLiters} L {t?.saved || 'Saved'}
          </span>
        </div>

        <p className="text-[11px] text-slate-400 mt-2.5 flex items-center justify-between">
          <span>Rain Chance: {weather.rainProbability}%</span>
          <span className="text-teal-400">{weather.condition}</span>
        </p>
      </div>

    </div>
  );
}
