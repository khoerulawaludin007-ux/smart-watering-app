import React from 'react';
import { bgThemes } from './ThreeDBackground';
import { Palette, Check, Sparkles, X, Box } from 'lucide-react';

export default function ThemeSelectorModal({
  isOpen,
  onClose,
  currentThemeId,
  onSelectTheme
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900/95 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl shadow-slate-950/80 relative overflow-hidden">
        
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500" />

        {/* Modal Title */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Box className="w-5 h-5 text-emerald-400 animate-bounce" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Pilih Warna Background 3D</span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-extrabold bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                  3D Mesh Live
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Pilih tema aura 3D & efek holografik untuk tampilan dashboard kamu
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Options Grid */}
        <div className="space-y-3 mb-6 max-h-[60vh] overflow-y-auto pr-1">
          {bgThemes.map(theme => {
            const isSelected = theme.id === currentThemeId;

            return (
              <button
                key={theme.id}
                onClick={() => {
                  onSelectTheme(theme.id);
                }}
                className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center justify-between group relative overflow-hidden ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-950/30 shadow-lg shadow-emerald-950/40 ring-2 ring-emerald-500/50'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                {/* Visual Swatch Preview Box */}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-12 rounded-xl bg-gradient-to-br ${theme.previewGradient} border border-slate-700 p-1 flex items-center justify-center shadow-inner relative overflow-hidden group-hover:scale-105 transition-transform`}>
                    <div className="w-full h-full rounded-lg border border-white/10 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center">
                      <Sparkles className={`w-4 h-4 ${isSelected ? 'text-emerald-400 animate-spin' : 'text-slate-400'}`} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {theme.name}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                        {theme.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Efek aura pencahayaan 3D & efek kisi holografik
                    </p>
                  </div>
                </div>

                {/* Selection Check Indicator */}
                <div className="ml-3">
                  {isSelected ? (
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-emerald-500/30">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-xl border border-slate-700 bg-slate-900 flex items-center justify-center text-slate-600 group-hover:border-slate-500 group-hover:text-slate-400 transition-all">
                      <Palette className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs text-slate-400">
          <span className="flex items-center gap-1 text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Perubahan akan langsung tersimpan & otomatis aktif.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-md shadow-emerald-500/20"
          >
            Terapkan Tema 3D
          </button>
        </div>

      </div>
    </div>
  );
}
