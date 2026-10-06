import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import OverviewCards from './components/OverviewCards';
import ZoneCard from './components/ZoneCard';
import ZoneModal from './components/ZoneModal';
import ScheduleManager from './components/ScheduleManager';
import SensorAnalyticsChart from './components/SensorAnalyticsChart';
import HardwareSimulator from './components/HardwareSimulator';
import ActivityLogs from './components/ActivityLogs';
import WeatherWidget from './components/WeatherWidget';
import SettingsModal from './components/SettingsModal';
import ThreeDBackground from './components/ThreeDBackground';
import ThemeSelectorModal from './components/ThemeSelectorModal';

import { 
  initialSystemState, 
  initialZones, 
  initialSchedules, 
  initialWeather, 
  initialLogs, 
  initialHistoryData 
} from './data/initialData';

import { 
  Plus, 
  Droplets, 
  Sparkles, 
  RefreshCw, 
  SlidersHorizontal,
  CloudRain,
  Play,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function App() {
  const [systemState, setSystemState] = useState(initialSystemState);
  const [zones, setZones] = useState(initialZones);
  const [schedules, setSchedules] = useState(initialSchedules);
  const [weather, setWeather] = useState(initialWeather);
  const [logs, setLogs] = useState(initialLogs);
  const [historyData, setHistoryData] = useState(initialHistoryData);

  // Modals & 3D Theme State
  const [activeZoneToEdit, setActiveZoneToEdit] = useState(null);
  const [isHardwareOpen, setIsHardwareOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem('agroflow_theme_3d') || 'cyber-obsidian';
  });

  const handleSelectTheme = (newThemeId) => {
    setThemeId(newThemeId);
    localStorage.setItem('agroflow_theme_3d', newThemeId);
    addLog('system', `Tema background 3D diubah ke "${newThemeId}".`, 'info');
  };

  // Add Log Helper
  const addLog = (type, message, severity = 'info') => {
    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: timeStr,
      type,
      message,
      severity
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // Real-time Simulation Engine Loop (Runs every 1.5s for dynamic interactive feel)
  useEffect(() => {
    const timer = setInterval(() => {
      setZones(prevZones => {
        let totalWaterUsedInTick = 0;

        const updatedZones = prevZones.map(zone => {
          let nextMoisture = zone.moisture;
          let nextTimeRem = zone.timeRemaining;
          let nextValve = zone.valveOpen;
          let nextStatus = zone.status;

          // If watering is active on this zone:
          if (zone.valveOpen || zone.status === 'watering') {
            // Increase soil moisture by +2% per tick up to targetMoisture + 10
            nextMoisture = Math.min(100, nextMoisture + 2);
            totalWaterUsedInTick += (zone.waterFlowRate / 60) * 1.5;

            if (nextTimeRem > 0) {
              nextTimeRem = Math.max(0, nextTimeRem - 1.5);
              if (nextTimeRem === 0) {
                // Timer finished!
                nextValve = false;
                nextStatus = 'idle';
                addLog('schedule', `Penyiraman otomatis ${zone.name} telah Selesai (Target Kelembapan ${nextMoisture}% tercapai).`, 'success');
              }
            }
          } else {
            // Soil slowly dries up naturally (-0.1% chance)
            if (Math.random() < 0.3) {
              nextMoisture = Math.max(10, nextMoisture - 1);
            }
          }

          // Auto Smart Mode trigger check:
          if (systemState.autoMode && systemState.rainDelayHours === 0 && !systemState.rainDetected) {
            if (!nextValve && nextMoisture < zone.thresholdMin && zone.autoWaterEnabled) {
              // Trigger Auto Watering!
              nextValve = true;
              nextStatus = 'watering';
              nextTimeRem = zone.durationMinutes * 60;
              addLog('auto', `SISTEM OTOMATIS: Kelembapan ${zone.name} (${nextMoisture}%) dibawah ambang min (${zone.thresholdMin}%). Membuka Solenoid Valve.`, 'warning');
            }
          }

          return {
            ...zone,
            moisture: nextMoisture,
            timeRemaining: Math.round(nextTimeRem),
            valveOpen: nextValve,
            status: nextStatus
          };
        });

        // Update tank level & water consumption if water was used
        if (totalWaterUsedInTick > 0) {
          setSystemState(prev => {
            const addedLiters = Math.round(totalWaterUsedInTick);
            const nextLevel = Math.max(0, prev.waterTankLevel - (addedLiters / prev.waterTankCapacityLiters) * 100);
            return {
              ...prev,
              totalWaterTodayLiters: prev.totalWaterTodayLiters + addedLiters,
              waterTankLevel: Math.round(nextLevel)
            };
          });
        }

        return updatedZones;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [systemState.autoMode, systemState.rainDelayHours, systemState.rainDetected]);

  // Zone Manual Water Trigger
  const handleStartWatering = (zoneId, durationMinutes) => {
    setZones(prev => prev.map(z => {
      if (z.id === zoneId) {
        return {
          ...z,
          valveOpen: true,
          status: 'watering',
          durationMinutes: durationMinutes,
          timeRemaining: durationMinutes * 60,
          lastWatered: 'Baru saja'
        };
      }
      return z;
    }));

    const zoneObj = zones.find(z => z.id === zoneId);
    addLog('manual', `Manual Override: Memulai penyiraman ${zoneObj?.name || zoneId} selama ${durationMinutes} Menit.`, 'info');
  };

  // Zone Manual Stop Trigger
  const handleStopWatering = (zoneId) => {
    setZones(prev => prev.map(z => {
      if (z.id === zoneId) {
        return {
          ...z,
          valveOpen: false,
          status: 'idle',
          timeRemaining: 0
        };
      }
      return z;
    }));

    const zoneObj = zones.find(z => z.id === zoneId);
    addLog('manual', `Penyiraman ${zoneObj?.name || zoneId} Dihentikan secara manual.`, 'info');
  };

  // Update Threshold slider
  const handleUpdateThreshold = (zoneId, newThreshold) => {
    setZones(prev => prev.map(z => z.id === zoneId ? { ...z, thresholdMin: newThreshold } : z));
  };

  // Edit Zone Modal Save
  const handleSaveZoneEdit = (zoneId, updatedData) => {
    setZones(prev => prev.map(z => z.id === zoneId ? { ...z, ...updatedData } : z));
    addLog('system', `Parameter ${updatedData.name} berhasil diperbarui.`, 'info');
  };

  // Schedule Toggles
  const handleToggleSchedule = (schedId) => {
    setSchedules(prev => prev.map(s => {
      if (s.id === schedId) {
        const nextState = !s.enabled;
        addLog('schedule', `Jadwal "${s.name}" ${nextState ? 'Diaktifkan' : 'Dinonaktifkan'}.`, 'info');
        return { ...s, enabled: nextState };
      }
      return s;
    }));
  };

  const handleAddSchedule = (newSched) => {
    setSchedules(prev => [newSched, ...prev]);
    addLog('schedule', `Jadwal baru "${newSched.name}" berhasil ditambahkan.`, 'success');
  };

  const handleDeleteSchedule = (schedId) => {
    setSchedules(prev => prev.filter(s => s.id !== schedId));
    addLog('schedule', 'Jadwal penyiraman dihapus.', 'info');
  };

  // Add Chart Live Tick
  const handleSimulateTick = () => {
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
    const newHistory = {
      time: timeStr,
      moistureZ1: zones[0]?.moisture || 50,
      moistureZ2: zones[1]?.moisture || 60,
      moistureZ3: zones[2]?.moisture || 70,
      moistureZ4: zones[3]?.moisture || 35,
      waterUsed: Math.floor(Math.random() * 25) + 5
    };
    setHistoryData(prev => [...prev.slice(1), newHistory]);
    addLog('system', 'Data sensor telemetry diperbarui di grafik analytics.', 'info');
  };

  return (
    <div className="min-h-screen relative text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* Dynamic Interactive 3D Background */}
      <ThreeDBackground currentThemeId={themeId} />

      {/* Main Foreground Container */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">

        {/* App Header Bar */}
        <Header
          systemState={systemState}
          setSystemState={setSystemState}
          onOpenHardware={() => setIsHardwareOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenThemeModal={() => setIsThemeModalOpen(true)}
          zonesWateringCount={zones.filter(z => z.valveOpen).length}
        />

        {/* Main Content Dashboard */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
          
          {/* Top Weather Banner */}
          <WeatherWidget
            weather={weather}
            systemState={systemState}
            onSetRainDelay={(hours) => {
              setSystemState(prev => ({ ...prev, rainDelayHours: hours }));
              addLog('system', `Tunda Hujan diatur ke ${hours} Jam.`, 'info');
            }}
          />

          {/* Global Overview Cards (Sensors & Water Tank) */}
          <OverviewCards
            systemState={systemState}
            zones={zones}
            weather={weather}
          />

          {/* Section Title: Zone Controller Cards */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <Droplets className="w-5 h-5 text-emerald-400" />
                <span>Kontrol Utama Zona Penyiraman ({zones.length} Sektor)</span>
              </h2>
              <p className="text-xs text-slate-400">
                Setiap zona terhubung ke Solenoid Valve 12V dan Probe Kelembapan Capacitive
              </p>
            </div>
          </div>

          {/* Zone Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {zones.map(zone => (
              <ZoneCard
                key={zone.id}
                zone={zone}
                onStartWatering={handleStartWatering}
                onStopWatering={handleStopWatering}
                onUpdateThreshold={handleUpdateThreshold}
                onEditZone={(z) => setActiveZoneToEdit(z)}
              />
            ))}
          </div>

          {/* Schedule Manager Component */}
          <ScheduleManager
            schedules={schedules}
            zones={zones}
            onToggleSchedule={handleToggleSchedule}
            onAddSchedule={handleAddSchedule}
            onDeleteSchedule={handleDeleteSchedule}
          />

          {/* Analytics & Graph Section */}
          <SensorAnalyticsChart
            historyData={historyData}
            zones={zones}
            onSimulateTick={handleSimulateTick}
          />

          {/* System Activity Logs */}
          <ActivityLogs
            logs={logs}
            onClearLogs={() => setLogs([])}
          />

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-6 px-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© 2026 AgroFlow Smart Irrigation IoT by Khoerul Awaludin. All rights reserved.</p>
            <div className="flex items-center space-x-4 text-slate-400">
              <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-emerald-400" /> ESP32 Automatic Water System</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">System Status: Operational</span>
            </div>
          </div>
        </footer>

      </div>

      {/* Modals & Hardware Simulator */}
      <ZoneModal
        zone={activeZoneToEdit}
        isOpen={!!activeZoneToEdit}
        onClose={() => setActiveZoneToEdit(null)}
        onSave={handleSaveZoneEdit}
      />

      <HardwareSimulator
        isOpen={isHardwareOpen}
        onClose={() => setIsHardwareOpen(false)}
        systemState={systemState}
        setSystemState={setSystemState}
        zones={zones}
        setZones={setZones}
        onAddLog={addLog}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        systemState={systemState}
        setSystemState={setSystemState}
        onAddLog={addLog}
      />

      <ThemeSelectorModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentThemeId={themeId}
        onSelectTheme={handleSelectTheme}
      />

    </div>
  );
}
