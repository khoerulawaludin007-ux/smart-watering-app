export const initialSystemState = {
  autoMode: true,
  masterPumpState: false, // OFF / ON
  masterPumpFlowRate: 14.5, // Liters per minute
  waterTankLevel: 82, // percentage %
  waterTankCapacityLiters: 1000,
  rainDelayHours: 0, // 0 = no delay, 24, 48, 72
  rainDetected: false,
  totalWaterTodayLiters: 184,
  estimatedWaterSavedLiters: 45,
  esp32Status: 'Online',
  lastMqttPing: '2 detik lalu',
  wifiSignal: 92, // %
};

export const initialZones = [
  {
    id: 'zone-1',
    name: 'Zona 1: Kebun Sayur Organik',
    type: 'Vegetable Garden',
    icon: 'Sprout',
    moisture: 38, // %
    targetMoisture: 55,
    thresholdMin: 40,
    temperature: 27.5,
    humidity: 62,
    status: 'idle', // 'idle' | 'watering' | 'paused' | 'warning'
    valveOpen: false,
    durationMinutes: 10,
    timeRemaining: 0, // seconds
    crop: 'Bayam, Kangkung & Tomat',
    soilType: 'Lempur Berpasir',
    lastWatered: 'Hari ini, 06:00 WIB',
    waterFlowRate: 4.2, // L/min
    autoWaterEnabled: true,
  },
  {
    id: 'zone-2',
    name: 'Zona 2: Taman Bunga & Depan',
    type: 'Flower Garden',
    icon: 'Flower2',
    moisture: 64, // %
    targetMoisture: 60,
    thresholdMin: 45,
    temperature: 28.1,
    humidity: 59,
    status: 'idle',
    valveOpen: false,
    durationMinutes: 8,
    timeRemaining: 0,
    crop: 'Anggrek, Mawar & Miana',
    soilType: 'Tanah Humus',
    lastWatered: 'Kemarin, 17:30 WIB',
    waterFlowRate: 3.5,
    autoWaterEnabled: true,
  },
  {
    id: 'zone-3',
    name: 'Zona 3: Greenhouse Hidroponik / Bibit',
    type: 'Greenhouse',
    icon: 'Building2',
    moisture: 78, // %
    targetMoisture: 75,
    thresholdMin: 65,
    temperature: 26.2,
    humidity: 75,
    status: 'idle',
    valveOpen: false,
    durationMinutes: 5,
    timeRemaining: 0,
    crop: 'Bibit Melon & Selada',
    soilType: 'Cocopeat & Perlite',
    lastWatered: 'Hari ini, 12:00 WIB',
    waterFlowRate: 2.8,
    autoWaterEnabled: true,
  },
  {
    id: 'zone-4',
    name: 'Zona 4: Kebun Buah & Tabulampot',
    type: 'Fruit Orchard',
    icon: 'Apple',
    moisture: 32, // % (Needs watering!)
    targetMoisture: 50,
    thresholdMin: 35,
    temperature: 29.4,
    humidity: 54,
    status: 'idle',
    valveOpen: false,
    durationMinutes: 15,
    timeRemaining: 0,
    crop: 'Jeruk Chokanan, Mangga & Kelengkeng',
    soilType: 'Tanah Merah Berkompos',
    lastWatered: '2 hari lalu',
    waterFlowRate: 5.0,
    autoWaterEnabled: true,
  },
];

export const initialSchedules = [
  {
    id: 'sched-1',
    name: 'Penyiraman Pagi Kebun Sayur',
    zoneId: 'zone-1',
    zoneName: 'Zona 1: Kebun Sayur Organik',
    time: '06:00',
    days: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    durationMinutes: 10,
    enabled: true,
    smartRainSkip: true,
  },
  {
    id: 'sched-2',
    name: 'Penyiraman Sore Taman & Bunga',
    zoneId: 'zone-2',
    zoneName: 'Zona 2: Taman Bunga & Depan',
    time: '16:30',
    days: ['Sen', 'Rab', 'Jum', 'Min'],
    durationMinutes: 8,
    enabled: true,
    smartRainSkip: true,
  },
  {
    id: 'sched-3',
    name: 'Kelembapan Kritis Kebun Buah',
    zoneId: 'zone-4',
    zoneName: 'Zona 4: Kebun Buah & Tabulampot',
    time: '11:00',
    days: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    durationMinutes: 15,
    enabled: true,
    smartRainSkip: true,
  }
];

export const initialWeather = {
  location: 'Bandung, Jawa Barat',
  temp: 27,
  condition: 'Cerah Berawan',
  humidity: 62,
  windSpeed: '12 km/jam',
  rainProbability: 20, // %
  forecast: [
    { day: 'Hari Ini', temp: '27°C', icon: 'SunCloud', rainProb: 20 },
    { day: 'Besok', temp: '25°C', icon: 'Rain', rainProb: 75 },
    { day: 'Lusa', temp: '28°C', icon: 'Sun', rainProb: 10 },
  ]
};

export const initialLogs = [
  {
    id: 'log-1',
    timestamp: '20:25:10 WIB',
    type: 'system',
    message: 'Mikrokontroler ESP32 terhubung kembali via MQTT broker.',
    severity: 'info'
  },
  {
    id: 'log-2',
    timestamp: '18:00:00 WIB',
    type: 'auto',
    message: 'Sensor Zona 4 mencatat kelembapan 32% (dibawah ambang batas 35%). Sistem menyarankan penyiraman.',
    severity: 'warning'
  },
  {
    id: 'log-3',
    timestamp: '12:00:15 WIB',
    type: 'schedule',
    message: 'Penyiraman otomatis Zona 3 selesai (Durasi: 5 Menit). Air digunakan: 14 Liters.',
    severity: 'success'
  },
  {
    id: 'log-4',
    timestamp: '06:00:00 WIB',
    type: 'schedule',
    message: 'Penyiraman otomatis Zona 1 dimulai sesuai jadwal pagi.',
    severity: 'info'
  }
];

export const initialHistoryData = [
  { time: '06:00', moistureZ1: 58, moistureZ2: 65, moistureZ3: 76, moistureZ4: 45, waterUsed: 42 },
  { time: '09:00', moistureZ1: 52, moistureZ2: 64, moistureZ3: 75, moistureZ4: 42, waterUsed: 0 },
  { time: '12:00', moistureZ1: 46, moistureZ2: 62, moistureZ3: 78, moistureZ4: 38, waterUsed: 14 },
  { time: '15:00', moistureZ1: 41, moistureZ2: 60, moistureZ3: 74, moistureZ4: 35, waterUsed: 0 },
  { time: '18:00', moistureZ1: 39, moistureZ2: 64, moistureZ3: 76, moistureZ4: 33, waterUsed: 0 },
  { time: '20:30', moistureZ1: 38, moistureZ2: 64, moistureZ3: 78, moistureZ4: 32, waterUsed: 0 },
];
