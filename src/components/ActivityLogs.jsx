import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Sparkles, 
  Trash2, 
  Download,
  Filter
} from 'lucide-react';

export default function ActivityLogs({ logs, onClearLogs }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'schedule' | 'auto' | 'system'

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(l => l.type === filter);

  const exportLogsCSV = () => {
    const headers = "Timestamp,Type,Severity,Message\n";
    const rows = logs.map(l => `"${l.timestamp}","${l.type}","${l.severity}","${l.message.replace(/"/g, '""')}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agroflow_activity_logs_${Date.now()}.csv`;
    a.click();
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-cyan-400 shrink-0" />;
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-100 tracking-tight">
              Log Riwayat Aktivitas & Event Sistem
            </h2>
            <p className="text-xs text-slate-400">
              Catatan otomatis event penyiraman, trigger sensor, status koneksi ESP32 & log manual
            </p>
          </div>
        </div>

        {/* Filter & Export Buttons */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filter === 'all' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Semua ({logs.length})
            </button>
            <button
              onClick={() => setFilter('auto')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filter === 'auto' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Otomatis
            </button>
            <button
              onClick={() => setFilter('schedule')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filter === 'schedule' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Jadwal
            </button>
          </div>

          <button
            onClick={exportLogsCSV}
            className="p-2 text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 rounded-xl"
            title="Export CSV"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={onClearLogs}
            className="p-2 text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-800 rounded-xl"
            title="Bersihkan Log"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Logs Feed */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            Belum ada catatan log aktivitas dalam kategori ini.
          </div>
        ) : (
          filteredLogs.map(log => (
            <div 
              key={log.id} 
              className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 flex items-start justify-between gap-3 text-xs hover:border-slate-700 transition-all"
            >
              <div className="flex items-start space-x-3">
                {getSeverityIcon(log.severity)}
                <div>
                  <p className="text-slate-200 leading-relaxed font-medium">{log.message}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="px-2 py-0.5 bg-slate-950 text-slate-400 rounded text-[10px] uppercase tracking-wider font-mono">
                      {log.type}
                    </span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] text-slate-500 font-mono shrink-0">
                {log.timestamp}
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
