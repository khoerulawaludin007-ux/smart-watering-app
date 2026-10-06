import React, { useState, useEffect } from 'react';
import { X, Save, Sliders, Droplets, Sprout } from 'lucide-react';

export default function ZoneModal({ zone, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    crop: '',
    soilType: '',
    targetMoisture: 60,
    thresholdMin: 40,
    durationMinutes: 10,
    waterFlowRate: 4.0,
    autoWaterEnabled: true,
  });

  useEffect(() => {
    if (zone) {
      setFormData({
        name: zone.name || '',
        crop: zone.crop || '',
        soilType: zone.soilType || '',
        targetMoisture: zone.targetMoisture || 60,
        thresholdMin: zone.thresholdMin || 40,
        durationMinutes: zone.durationMinutes || 10,
        waterFlowRate: zone.waterFlowRate || 4.0,
        autoWaterEnabled: zone.autoWaterEnabled !== undefined ? zone.autoWaterEnabled : true,
      });
    }
  }, [zone]);

  if (!isOpen || !zone) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(zone.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-slate-700 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Pengaturan Parameter Zona</h3>
              <p className="text-xs text-slate-400">{zone.name}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Zona</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-sm glass-input"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Jenis Tanaman</label>
              <input
                type="text"
                value={formData.crop}
                onChange={e => setFormData({ ...formData, crop: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm glass-input"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tipe Tanah / Media</label>
              <input
                type="text"
                value={formData.soilType}
                onChange={e => setFormData({ ...formData, soilType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm glass-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Kelembapan (%)</label>
              <input
                type="number"
                min="30"
                max="90"
                value={formData.targetMoisture}
                onChange={e => setFormData({ ...formData, targetMoisture: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl text-sm glass-input"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Ambang Pemicu Min (%)</label>
              <input
                type="number"
                min="10"
                max="75"
                value={formData.thresholdMin}
                onChange={e => setFormData({ ...formData, thresholdMin: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl text-sm glass-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Durasi Standar (Menit)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={formData.durationMinutes}
                onChange={e => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl text-sm glass-input"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Debit Air (L/min)</label>
              <input
                type="number"
                step="0.1"
                value={formData.waterFlowRate}
                onChange={e => setFormData({ ...formData, waterFlowRate: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl text-sm glass-input"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div>
              <span className="text-xs font-semibold text-slate-200 block">Siram Otomatis Berdasarkan Sensor</span>
              <span className="text-[11px] text-slate-400">Sistem akan menyiram jika kelembapan &lt; {formData.thresholdMin}%</span>
            </div>
            <input
              type="checkbox"
              checked={formData.autoWaterEnabled}
              onChange={e => setFormData({ ...formData, autoWaterEnabled: e.target.checked })}
              className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-900 rounded-xl border border-slate-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
