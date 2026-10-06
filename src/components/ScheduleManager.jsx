import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Check, 
  CloudRain, 
  Droplet, 
  Sparkles,
  CheckCircle2,
  XCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export default function ScheduleManager({ 
  schedules, 
  zones, 
  onToggleSchedule, 
  onAddSchedule, 
  onDeleteSchedule 
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSched, setNewSched] = useState({
    name: '',
    zoneId: zones[0]?.id || '',
    time: '07:00',
    days: ['Sen', 'Rab', 'Jum'],
    durationMinutes: 10,
    smartRainSkip: true,
  });

  const availableDays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

  const toggleDaySelect = (day) => {
    setNewSched(prev => {
      const exists = prev.days.includes(day);
      if (exists) {
        return { ...prev, days: prev.days.filter(d => d !== day) };
      } else {
        return { ...prev, days: [...prev.days, day] };
      }
    });
  };

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    const selectedZone = zones.find(z => z.id === newSched.zoneId);
    onAddSchedule({
      ...newSched,
      id: `sched-${Date.now()}`,
      zoneName: selectedZone ? selectedZone.name : 'Zona Utama',
      enabled: true,
    });
    setShowAddForm(false);
    setNewSched({
      name: '',
      zoneId: zones[0]?.id || '',
      time: '07:00',
      days: ['Sen', 'Rab', 'Jum'],
      durationMinutes: 10,
      smartRainSkip: true,
    });
  };

  return (
    <div className="glass-panel rounded-2xl p-6 mb-8 border border-slate-800">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800 mb-6">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-100 tracking-tight">
                Jadwal Penyiraman Otomatis
              </h2>
              <p className="text-xs text-slate-400">
                Atur waktu penyiraman otomatis berkala per zona dengan sensor tunda hujan cerdas
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 self-start sm:self-auto transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Jadwal Baru</span>
        </button>
      </div>

      {/* Add New Schedule Drawer Form */}
      {showAddForm && (
        <form onSubmit={handleCreateSchedule} className="bg-slate-900/90 rounded-2xl p-5 border border-emerald-500/30 mb-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Buat Penjadwalan Cerdas Baru
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Batal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Jadwal</label>
              <input
                type="text"
                placeholder="Contoh: Penyiraman Pagi Kebun Sayur"
                value={newSched.name}
                onChange={e => setNewSched({ ...newSched, name: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl glass-input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Zona</label>
              <select
                value={newSched.zoneId}
                onChange={e => setNewSched({ ...newSched, zoneId: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl glass-input bg-slate-900"
              >
                {zones.map(z => (
                  <option key={z.id} value={z.id}>{z.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Waktu Penyiraman (WIB)</label>
              <input
                type="time"
                value={newSched.time}
                onChange={e => setNewSched({ ...newSched, time: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl glass-input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Durasi Menyiram (Menit)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={newSched.durationMinutes}
                onChange={e => setNewSched({ ...newSched, durationMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm rounded-xl glass-input"
                required
              />
            </div>
          </div>

          {/* Days Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hari Penyiraman</label>
            <div className="flex flex-wrap gap-2">
              {availableDays.map(day => {
                const isSelected = newSched.days.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDaySelect(day)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rain Skip Toggle */}
          <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2.5">
              <CloudRain className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Smart Rain Skip (Lewati Jika Hujan)</span>
                <span className="text-[11px] text-slate-400">Batalkan otomatis jika sensor/prakiraan mencatat hujan</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={newSched.smartRainSkip}
              onChange={e => setNewSched({ ...newSched, smartRainSkip: e.target.checked })}
              className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md"
            >
              Simpan Penjadwalan
            </button>
          </div>
        </form>
      )}

      {/* Schedule Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedules.map(sched => (
          <div 
            key={sched.id}
            className={`bg-slate-900/70 rounded-2xl p-4 border transition-all flex flex-col justify-between ${
              sched.enabled 
                ? 'border-slate-700/80 shadow-sm' 
                : 'border-slate-800/40 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-xl border ${
                    sched.enabled ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">{sched.name}</h4>
                    <p className="text-[11px] text-emerald-400 font-medium">{sched.zoneName}</p>
                  </div>
                </div>

                {/* Enable Switch Toggle */}
                <button
                  onClick={() => onToggleSchedule(sched.id)}
                  className={`text-xl transition-all ${sched.enabled ? 'text-emerald-400' : 'text-slate-600'}`}
                  title={sched.enabled ? 'Jadwal Aktif' : 'Jadwal Nonaktif'}
                >
                  {sched.enabled ? <ToggleRight className="w-8 h-8 text-emerald-400" /> : <ToggleLeft className="w-8 h-8 text-slate-600" />}
                </button>
              </div>

              {/* Time & Duration */}
              <div className="flex items-baseline justify-between bg-slate-950/70 p-3 rounded-xl border border-slate-800 mb-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Waktu</span>
                  <span className="text-lg font-extrabold text-white font-mono">{sched.time} WIB</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Durasi</span>
                  <span className="text-sm font-bold text-cyan-400">{sched.durationMinutes} Menit</span>
                </div>
              </div>

              {/* Days Badges */}
              <div className="flex flex-wrap gap-1 mb-3">
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(d => {
                  const isDayActive = sched.days.includes(d);
                  return (
                    <span 
                      key={d} 
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        isDayActive 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                          : 'bg-slate-950 text-slate-600'
                      }`}
                    >
                      {d}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
              <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                {sched.smartRainSkip ? (
                  <span className="text-cyan-400 flex items-center gap-1 font-medium">
                    <CloudRain className="w-3 h-3" /> Smart Rain Skip
                  </span>
                ) : (
                  <span className="text-slate-500">Normal</span>
                )}
              </div>

              <button
                onClick={() => onDeleteSchedule(sched.id)}
                className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition-all"
                title="Hapus Jadwal"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
