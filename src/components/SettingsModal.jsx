import React, { useState } from 'react';
import { X, Save, Sliders, Radio, Wifi, Volume2, ShieldCheck, HardDrive } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, systemState, setSystemState, onAddLog }) {
  const [mqttBroker, setMqttBroker] = useState('broker.agroflow.local:1883');
  const [wifiSsid, setWifiSsid] = useState('AgroFlow_Mesh_Garden');
  const [soilCheckInterval, setSoilCheckInterval] = useState(5); // Minutes
  const [soundEnabled, setSoundEnabled] = useState(true);

  if (!isOpen) return null;

  const handleSaveSettings = (e) => {
    e.preventDefault();
    onAddLog('system', 'Pengaturan sistem & konfigurasi MQTT berhasil diperbarui.', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-slate-700 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Pengaturan Sistem AgroFlow</h3>
              <p className="text-xs text-slate-400">Konfigurasi IoT & Server MQTT</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400" /> Host Broker MQTT
            </label>
            <input
              type="text"
              value={mqttBroker}
              onChange={e => setMqttBroker(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm glass-input font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" /> SSID Wi-Fi ESP32
            </label>
            <input
              type="text"
              value={wifiSsid}
              onChange={e => setWifiSsid(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm glass-input font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Interval Sensor (Menit)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={soilCheckInterval}
                onChange={e => setSoilCheckInterval(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl text-sm glass-input"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kapasitas Tangki (Liters)</label>
              <input
                type="number"
                value={systemState.waterTankCapacityLiters}
                onChange={e => setSystemState({ ...systemState, waterTankCapacityLiters: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl text-sm glass-input"
              />
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-200">Suara Notifikasi & Peringatan</span>
            </div>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={e => setSoundEnabled(e.target.checked)}
              className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
            />
          </div>

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
              <span>Simpan Konfigurasi</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
