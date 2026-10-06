import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronUp } from 'lucide-react';

export default function LanguageSwitcher({ currentLang, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close popup if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    {
      code: 'id',
      name: 'Bahasa Indonesia',
      shortName: 'ID',
      flag: '🇮🇩'
    },
    {
      code: 'en',
      name: 'English (US)',
      shortName: 'EN',
      flag: '🇬🇧'
    }
  ];

  const activeLang = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div ref={dropdownRef} className="fixed bottom-4 left-4 z-50">
      
      {/* Popover Language Selector Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-52 bg-slate-900/95 border border-slate-800 rounded-2xl p-2 shadow-2xl shadow-slate-950/90 backdrop-blur-xl animate-fadeIn">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800/80 mb-1 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-emerald-400" />
            <span>Pilih Bahasa / Language</span>
          </div>

          <div className="space-y-1">
            {languages.map((lang) => {
              const isSelected = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Trigger Button in Bottom Left Corner */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-800/90 hover:border-emerald-500/50 rounded-2xl shadow-xl shadow-slate-950/80 backdrop-blur-xl text-xs font-bold text-slate-200 hover:text-emerald-400 transition-all group"
        title="Ganti Bahasa / Change Language"
      >
        <span className="text-base leading-none">{activeLang.flag}</span>
        <span className="text-slate-300 group-hover:text-emerald-300">{activeLang.shortName}</span>
        <ChevronUp className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
      </button>

    </div>
  );
}
