import React, { useState } from 'react';
import { Smile, Frown, Info, PlusCircle, RotateCcw } from 'lucide-react';

export const AsymmetrySection: React.FC = () => {
  const [positiveItems, setPositiveItems] = useState<number>(9);
  const [negativeMultiplier, setNegativeMultiplier] = useState<number>(9.0);
  const [lastEvent, setLastEvent] = useState<string>('Equilibrium state: 90% volume vs. 9x singular negative impact.');

  const handleAddPositive = () => {
    setPositiveItems((prev) => Math.min(prev + 1, 16));
    setLastEvent('Added +1 neutral positive token. Backpropagation gradient shifted +0.02% (negligible loss reduction).');
  };

  const handleReset = () => {
    setPositiveItems(9);
    setNegativeMultiplier(9.0);
    setLastEvent('Reset to standard benchmark ratio (9:1 volume vs 1:9 gradient gravity).');
  };

  return (
    <section id="human-bias" className="flex flex-col gap-8 scroll-mt-24 border-b border-[#1A1A1A]/10 pb-16">
      {/* Section Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-[#1A1A1A]/40"></div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#A37B5C]">
            Section 01 // Epistemic Foundations
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1A1A1A] tracking-tight">
          The Asymmetry <span className="italic font-normal">of Attention.</span>
        </h2>
        <p className="font-serif text-base sm:text-lg text-[#1A1A1A]/75 max-w-3xl leading-relaxed">
          Human cognition inherently prioritizes threat stimuli—an evolutionary survival mechanism.
          When projected onto computational training sets, this creates an asymmetrical foundation where
          loss functions reward machines for over-indexing on friction and conflict.
        </p>
      </div>

      {/* Grid Comparison: Light Paper vs. Stark Charcoal Editorial Contrast */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Positive Input Density Card (Light Paper Monograph) */}
        <div
          id="card-positive-density"
          className="bg-[#FFFFFF] border border-[#1A1A1A]/15 p-6 sm:p-8 flex flex-col justify-between relative shadow-[0_2px_15px_rgba(26,26,26,0.03)]"
        >
          <div>
            <div className="flex justify-between items-start border-b border-[#1A1A1A]/10 pb-4 mb-4">
              <div>
                <span className="text-[10px] uppercase font-sans font-bold tracking-[0.2em] text-[#66635B] block mb-1">
                  Fig. 02A / High Volume
                </span>
                <h3 className="text-2xl font-serif text-[#1A1A1A] flex items-center gap-2">
                  Positive Input Density
                </h3>
              </div>
              <span className="text-[10px] uppercase font-sans tracking-widest px-2.5 py-1 bg-[#F2EFE8] text-[#1A1A1A] border border-[#1A1A1A]/15 font-semibold">
                Flat Gradient
              </span>
            </div>

            <p className="font-serif text-sm text-[#1A1A1A]/70 leading-relaxed mb-6">
              Represents the vast majority of human digital expression. However, standard cross-entropy loss treats these tokens as predictable background noise with minimal gradient reward.
            </p>

            {/* Grid of Minimalist Monograph Stamp Glyphs */}
            <div className="grid grid-cols-3 gap-2.5 my-4">
              {Array.from({ length: positiveItems }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-14 bg-[#F9F7F2] border border-[#1A1A1A]/10 flex flex-col items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] transition-all cursor-pointer group"
                  title={`Positive Corpus Token #${idx + 1}`}
                >
                  <Smile className="w-4 h-4 text-[#1A1A1A] group-hover:text-[#F9F7F2] transition-colors" />
                  <span className="text-[9px] font-mono text-[#66635B] group-hover:text-[#D1CCBE] mt-0.5">
                    w: 0.11
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Metric Rule */}
          <div className="flex justify-between items-center border-t border-[#1A1A1A]/10 pt-4 mt-6">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#66635B]">Corpus Share</span>
              <span className="font-serif text-lg font-bold text-[#1A1A1A]">
                {Math.round((positiveItems / (positiveItems + 1)) * 100)}% Volume
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#66635B]">Loss Sensitivity</span>
              <span className="font-serif text-lg text-[#66635B]">Low (0.11x)</span>
            </div>
          </div>
        </div>

        {/* Negative Input Gravity Card (Stark Charcoal Feature Plate) */}
        <div
          id="card-negative-gravity"
          className="bg-[#1A1A1A] text-[#F9F7F2] border border-[#1A1A1A] p-6 sm:p-8 flex flex-col justify-between relative shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
        >
          <div>
            <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
              <div>
                <span className="text-[10px] uppercase font-sans font-bold tracking-[0.2em] text-[#A37B5C] block mb-1">
                  Fig. 02B / High Gravity
                </span>
                <h3 className="text-2xl font-serif text-[#F9F7F2] flex items-center gap-2">
                  Negative Input Singularity
                </h3>
              </div>
              <span className="text-[10px] uppercase font-sans tracking-widest px-2.5 py-1 bg-[#9E382A] text-white font-bold">
                Gradient Surge
              </span>
            </div>

            <p className="font-serif text-sm text-[#F9F7F2]/80 leading-relaxed mb-6">
              Infrequent in proportion, but causes intense loss spikes and steep backpropagation gradients, forcing model weights to permanently distort toward alarmist reasoning.
            </p>

            {/* Stark Negative Impact Box */}
            <div className="h-32 border border-[#9E382A]/50 bg-[#251817] flex flex-col items-center justify-center p-4 relative overflow-hidden my-4">
              <Frown className="w-8 h-8 text-[#FF7A66] mb-1.5" />
              <div className="text-xs uppercase font-sans tracking-[0.2em] font-bold text-white">
                Disproportionate Gradient Pull
              </div>
              <div className="text-sm font-serif italic text-[#C49B7A] mt-0.5">
                Attention Salience: {(negativeMultiplier * 1.05).toFixed(1)}x Baseline
              </div>
            </div>
          </div>

          {/* Bottom Metric Rule */}
          <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-6">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#F9F7F2]/60">Corpus Share</span>
              <span className="font-serif text-lg font-bold text-[#FF7A66]">
                {Math.round((1 / (positiveItems + 1)) * 100)}% Volume
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#F9F7F2]/60">Loss Sensitivity</span>
              <span className="font-serif text-lg font-bold text-[#FF7A66]">
                Extreme ({negativeMultiplier.toFixed(1)}x)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Micro-Lab (Editorial Ledger Plate) */}
      <div className="p-5 sm:p-6 bg-[#EAE6DC] border border-[#1A1A1A]/15 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-8 h-8 border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] shrink-0">
            <Info className="w-4 h-4 text-[#A37B5C]" />
          </div>
          <div>
            <div className="text-xs uppercase font-sans font-bold tracking-wider text-[#1A1A1A]">
              Interactive Gradient Balance Simulator
            </div>
            <div className="text-xs font-serif italic text-[#1A1A1A]/75 mt-0.5">{lastEvent}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={handleAddPositive}
            className="px-4 py-2 bg-[#1A1A1A] text-[#F9F7F2] hover:bg-[#333333] text-xs font-sans uppercase tracking-wider font-bold flex items-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#A37B5C]" />
            <span>Feed Positive Corpus ({positiveItems})</span>
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 border border-[#1A1A1A] bg-transparent hover:bg-[#1A1A1A] hover:text-[#F9F7F2] text-xs font-sans uppercase tracking-wider font-bold text-[#1A1A1A] transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </section>
  );
};
