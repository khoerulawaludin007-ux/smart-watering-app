import React from 'react';

export const bgThemes = [
  {
    id: 'cyber-obsidian',
    name: '3D Cyber Obsidian',
    category: 'Dark Cyberpunk',
    gradientClass: 'from-slate-950 via-slate-900 to-emerald-950/50',
    accentColor: 'emerald',
    primaryOrb: 'rgba(16, 185, 129, 0.25)', // emerald
    secondaryOrb: 'rgba(6, 182, 212, 0.2)', // cyan
    tertiaryOrb: 'rgba(15, 23, 42, 0.8)',
    gridColor: 'rgba(16, 185, 129, 0.12)',
    previewGradient: 'from-slate-950 via-emerald-900 to-cyan-900'
  },
  {
    id: 'emerald-nebula',
    name: '3D Emerald Bio-Sphere',
    category: 'Nature & Tech',
    gradientClass: 'from-emerald-950 via-slate-950 to-teal-950',
    accentColor: 'teal',
    primaryOrb: 'rgba(20, 184, 166, 0.35)', // teal
    secondaryOrb: 'rgba(52, 211, 153, 0.25)', // green
    tertiaryOrb: 'rgba(6, 78, 59, 0.6)',
    gridColor: 'rgba(20, 184, 166, 0.15)',
    previewGradient: 'from-emerald-950 via-teal-900 to-emerald-700'
  },
  {
    id: 'aurora-violet',
    name: '3D Aurora Sunset',
    category: 'Deep Space',
    gradientClass: 'from-slate-950 via-purple-950/60 to-indigo-950',
    accentColor: 'purple',
    primaryOrb: 'rgba(168, 85, 247, 0.3)', // purple
    secondaryOrb: 'rgba(99, 102, 241, 0.25)', // indigo
    tertiaryOrb: 'rgba(236, 72, 153, 0.2)', // pink
    gridColor: 'rgba(168, 85, 247, 0.15)',
    previewGradient: 'from-slate-950 via-purple-900 to-indigo-800'
  },
  {
    id: 'oceanic-depth',
    name: '3D Oceanic Hydro',
    category: 'Aqua Luminescence',
    gradientClass: 'from-blue-950 via-slate-950 to-cyan-950',
    accentColor: 'cyan',
    primaryOrb: 'rgba(14, 165, 233, 0.35)', // sky
    secondaryOrb: 'rgba(6, 182, 212, 0.3)', // cyan
    tertiaryOrb: 'rgba(30, 58, 138, 0.6)',
    gridColor: 'rgba(6, 182, 212, 0.15)',
    previewGradient: 'from-blue-950 via-cyan-900 to-sky-700'
  },
  {
    id: 'golden-harvest',
    name: '3D Golden Matrix',
    category: 'Luxury Tech',
    gradientClass: 'from-slate-950 via-amber-950/40 to-emerald-950/40',
    accentColor: 'amber',
    primaryOrb: 'rgba(245, 158, 11, 0.28)', // amber
    secondaryOrb: 'rgba(16, 185, 129, 0.25)', // emerald
    tertiaryOrb: 'rgba(120, 53, 15, 0.6)',
    gridColor: 'rgba(245, 158, 11, 0.12)',
    previewGradient: 'from-slate-950 via-amber-900 to-emerald-800'
  }
];

export default function ThreeDBackground({ currentThemeId = 'cyber-obsidian' }) {
  const activeTheme = bgThemes.find(t => t.id === currentThemeId) || bgThemes[0];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-1000 ease-in-out">
      
      {/* Dynamic 3D Mesh Base Gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${activeTheme.gradientClass} transition-colors duration-1000`} 
      />

      {/* 3D Dynamic Lighting Orbs with CSS 3D perspective transforms */}
      <div className="absolute inset-0 filter blur-3xl opacity-70">
        
        {/* Orb 1: Top Left 3D Floating Sphere */}
        <div 
          className="absolute -top-24 -left-24 w-[32rem] h-[32rem] rounded-full animate-pulse transition-all duration-1000"
          style={{ 
            background: `radial-gradient(circle, ${activeTheme.primaryOrb} 0%, transparent 70%)`,
            transform: 'perspective(1000px) rotateX(25deg) translateZ(40px)',
            animationDuration: '6s'
          }}
        />

        {/* Orb 2: Top Right 3D Floating Sphere */}
        <div 
          className="absolute top-1/4 -right-32 w-[36rem] h-[36rem] rounded-full transition-all duration-1000"
          style={{ 
            background: `radial-gradient(circle, ${activeTheme.secondaryOrb} 0%, transparent 70%)`,
            transform: 'perspective(1000px) rotateY(-30deg) translateZ(60px)',
            animation: 'floatOrb 10s ease-in-out infinite alternate'
          }}
        />

        {/* Orb 3: Bottom Center Deep 3D Ambient Aura */}
        <div 
          className="absolute -bottom-32 left-1/3 w-[40rem] h-[40rem] rounded-full transition-all duration-1000"
          style={{ 
            background: `radial-gradient(circle, ${activeTheme.tertiaryOrb} 0%, transparent 75%)`,
            transform: 'perspective(1000px) rotateX(45deg) translateZ(20px)'
          }}
        />
      </div>

      {/* 3D Holographic Perspective Floor Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-20 transition-all duration-1000"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${activeTheme.gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${activeTheme.gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(600px) rotateX(50deg) scale(1.6) translateY(-50px)',
          transformOrigin: 'top center'
        }}
      />

      {/* Subtle Dynamic Ambient Noise Texture */}
      <div className="absolute inset-0 bg-slate-950/20 backdrop-brightness-105" />

      {/* Inline Keyframe Styles for Floating Orbs */}
      <style>{`
        @keyframes floatOrb {
          0% {
            transform: perspective(1000px) rotateY(-30deg) translate3d(0, 0, 60px);
          }
          100% {
            transform: perspective(1000px) rotateY(-10deg) translate3d(-40px, 50px, 100px);
          }
        }
      `}</style>

    </div>
  );
}
