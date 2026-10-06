import React, { useState } from 'react';
import { LineChart, BarChart3, RefreshCw, Layers, TrendingUp, Droplets } from 'lucide-react';

export default function SensorAnalyticsChart({ historyData, zones, onSimulateTick }) {
  const [activeTab, setActiveTab] = useState('moisture'); // 'moisture' | 'water'
  const [selectedZoneFilter, setSelectedZoneFilter] = useState('all');

  // SVG Chart Dimensions
  const svgWidth = 700;
  const svgHeight = 220;
  const padding = 40;

  const times = historyData.map(d => d.time);
  
  // Zone color mapping
  const zoneColors = {
    'zone-1': '#22c55e', // Emerald
    'zone-2': '#06b6d4', // Cyan
    'zone-3': '#a855f7', // Purple
    'zone-4': '#f59e0b', // Amber
  };

  const getPoints = (key) => {
    if (!historyData.length) return '';
    const maxVal = 100;
    const stepX = (svgWidth - padding * 2) / (historyData.length - 1 || 1);
    
    return historyData.map((item, index) => {
      const x = padding + index * stepX;
      const val = item[key] !== undefined ? item[key] : 50;
      const y = svgHeight - padding - (val / maxVal) * (svgHeight - padding * 2);
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="glass-panel rounded-2xl p-6 mb-8 border border-slate-800">
      
      {/* Header Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <LineChart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-100 tracking-tight">
              Grafik Analytics Sensor & Konsumsi Air
            </h2>
            <p className="text-xs text-slate-400">
              Pantau histori tren kelembapan tanah real-time & debit penggunaan air per jam
            </p>
          </div>
        </div>

        {/* Tab Controls & Live Ticks */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800">
            <button
              onClick={() => setActiveTab('moisture')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'moisture' 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Kelembapan Tanah (%)
            </button>
            <button
              onClick={() => setActiveTab('water')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'water' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Debit Air (Liters)
            </button>
          </div>

          <button
            onClick={onSimulateTick}
            className="p-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 rounded-xl flex items-center gap-1 transition-all"
            title="Simulasikan Data Sensor Baru (Realtime Tick)"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simulasi Realtime</span>
          </button>
        </div>
      </div>

      {/* Legend & Filter Bar */}
      {activeTab === 'moisture' && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center space-x-4 text-xs">
            <span className="text-slate-400 font-semibold">Legenda Zona:</span>
            {zones.map(z => (
              <div key={z.id} className="flex items-center space-x-1.5">
                <span 
                  className="w-3 h-3 rounded-full inline-block" 
                  style={{ backgroundColor: zoneColors[z.id] }} 
                />
                <span className="text-slate-300 font-medium">{z.name.split(':')[0]}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Tampilkan:</span>
            <select
              value={selectedZoneFilter}
              onChange={e => setSelectedZoneFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs"
            >
              <option value="all">Semua Zona</option>
              {zones.map(z => (
                <option key={z.id} value={z.id}>{z.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Interactive SVG Line & Bar Chart */}
      <div className="relative w-full overflow-x-auto bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80">
        <svg 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
          className="w-full h-auto min-w-[550px] overflow-visible"
        >
          {/* Grid lines & Y Axis labels */}
          {[0, 25, 50, 75, 100].map((val) => {
            const y = svgHeight - padding - (val / 100) * (svgHeight - padding * 2);
            return (
              <g key={val}>
                <line 
                  x1={padding} 
                  y1={y} 
                  x2={svgWidth - padding} 
                  y2={y} 
                  stroke="#1e293b" 
                  strokeDasharray="4 4" 
                  strokeWidth="1"
                />
                <text 
                  x={padding - 10} 
                  y={y + 4} 
                  fill="#64748b" 
                  fontSize="10" 
                  textAnchor="end"
                  className="font-mono"
                >
                  {val}{activeTab === 'moisture' ? '%' : 'L'}
                </text>
              </g>
            );
          })}

          {/* X Axis Labels */}
          {historyData.map((d, i) => {
            const stepX = (svgWidth - padding * 2) / (historyData.length - 1 || 1);
            const x = padding + i * stepX;
            return (
              <text 
                key={i} 
                x={x} 
                y={svgHeight - 12} 
                fill="#94a3b8" 
                fontSize="11" 
                textAnchor="middle"
                className="font-mono"
              >
                {d.time}
              </text>
            );
          })}

          {/* Render Lines for Moisture */}
          {activeTab === 'moisture' && (
            <>
              {/* Zone 1 Line */}
              {(selectedZoneFilter === 'all' || selectedZoneFilter === 'zone-1') && (
                <polyline
                  fill="none"
                  stroke={zoneColors['zone-1']}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={getPoints('moistureZ1')}
                />
              )}

              {/* Zone 2 Line */}
              {(selectedZoneFilter === 'all' || selectedZoneFilter === 'zone-2') && (
                <polyline
                  fill="none"
                  stroke={zoneColors['zone-2']}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={getPoints('moistureZ2')}
                />
              )}

              {/* Zone 3 Line */}
              {(selectedZoneFilter === 'all' || selectedZoneFilter === 'zone-3') && (
                <polyline
                  fill="none"
                  stroke={zoneColors['zone-3']}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={getPoints('moistureZ3')}
                />
              )}

              {/* Zone 4 Line */}
              {(selectedZoneFilter === 'all' || selectedZoneFilter === 'zone-4') && (
                <polyline
                  fill="none"
                  stroke={zoneColors['zone-4']}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={getPoints('moistureZ4')}
                />
              )}
            </>
          )}

          {/* Render Bar Chart for Water Usage */}
          {activeTab === 'water' && (
            <g>
              {historyData.map((item, index) => {
                const stepX = (svgWidth - padding * 2) / (historyData.length - 1 || 1);
                const x = padding + index * stepX - 14;
                const barHeight = (item.waterUsed / 60) * (svgHeight - padding * 2);
                const y = svgHeight - padding - barHeight;

                return (
                  <g key={index} className="group cursor-pointer">
                    <rect
                      x={x}
                      y={y}
                      width="28"
                      height={Math.max(barHeight, 2)}
                      fill="url(#waterBarGradient)"
                      rx="6"
                      className="transition-all hover:opacity-80"
                    />
                    <text
                      x={x + 14}
                      y={y - 6}
                      fill="#38bdf8"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {item.waterUsed > 0 ? `${item.waterUsed}L` : ''}
                    </text>
                  </g>
                );
              })}

              <defs>
                <linearGradient id="waterBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>
            </g>
          )}

        </svg>
      </div>

    </div>
  );
}
