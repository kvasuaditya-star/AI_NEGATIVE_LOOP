import React from 'react';
import { ArrowRight, FlaskConical, Eye, Zap, BookOpen } from 'lucide-react';
import { ThreeNeuralBrain } from './ThreeNeuralBrain';

interface HeroSectionProps {
  onExploreFeedback: () => void;
  onOpenDiagnostic: () => void;
  onOpenTopology: () => void;
  biasIntensity: number;
  onBiasChange: (val: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreFeedback,
  onOpenDiagnostic,
  onOpenTopology,
  biasIntensity,
  onBiasChange,
}) => {
  return (
    <section
      id="hero-section"
      className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start min-h-[600px] pt-6 pb-12 border-b border-[#1A1A1A]/10"
    >
      {/* Left Column: Editorial Feature Essay */}
      <div className="lg:col-span-6 flex flex-col justify-between h-full">
        <div>
          {/* Header Eyebrow with Hairline */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-[#1A1A1A]"></div>
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#1A1A1A]/70 font-semibold">
              Feature Thesis / Issue 04
            </span>
          </div>

          {/* Editorial Display Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-serif font-normal text-[#1A1A1A] leading-[1.02] tracking-tight mb-6">
            The Architecture <br />
            <span className="italic font-normal text-[#A37B5C]">of Artificial Bias.</span>
          </h1>

          {/* Subtitle / Proposition */}
          <p className="font-serif text-lg sm:text-xl text-[#1A1A1A]/80 leading-relaxed max-w-xl mb-8">
            How deep neural networks absorb, concentrate, and recursively amplify human negativity bias through asymmetrical loss landscapes and attention gradient gravity.
          </p>

          {/* Editorial CTAs */}
          <div className="flex flex-wrap gap-4 pt-1 mb-8">
            <button
              id="btn-hero-feedback"
              onClick={onExploreFeedback}
              className="bg-[#1A1A1A] text-[#F9F7F2] px-7 py-3.5 rounded-none font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#333333] transition-all flex items-center gap-3 cursor-pointer active:scale-98 shadow-sm group"
            >
              <span>Explore Amplification Cycle</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="btn-hero-diagnostic"
              onClick={onOpenDiagnostic}
              className="border border-[#1A1A1A] text-[#1A1A1A] bg-transparent px-7 py-3.5 rounded-none font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#1A1A1A] hover:text-[#F9F7F2] transition-all flex items-center gap-2.5 cursor-pointer active:scale-98"
            >
              <FlaskConical className="w-3.5 h-3.5 text-[#A37B5C]" />
              <span>Run Diagnostic Lab</span>
            </button>
          </div>
        </div>

        {/* Dynamic Bias Modulation Plate & Contributor Footnote */}
        <div className="mt-4 pt-6 border-t border-[#1A1A1A]/10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
          {/* Bias Slider */}
          <div className="flex flex-col gap-2 p-3.5 bg-[#F2EFE8] border border-[#1A1A1A]/10">
            <div className="flex justify-between items-center text-[10px] font-sans uppercase tracking-widest font-bold">
              <span className="text-[#1A1A1A] flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#9E382A]" />
                Synaptic Distortion:
              </span>
              <span className="text-[#9E382A]">
                {Math.round(biasIntensity * 100)}% Salience
              </span>
            </div>
            <input
              id="hero-bias-slider"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={biasIntensity}
              onChange={(e) => onBiasChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-[#D1CCBE] rounded-none appearance-none cursor-pointer accent-[#1A1A1A]"
            />
            <div className="flex justify-between text-[9px] font-mono text-[#66635B]">
              <span>0% (Neutral)</span>
              <span>100% (Critical)</span>
            </div>
          </div>

          {/* Contributor Credit */}
          <div className="flex flex-col justify-end">
            <div className="text-[10px] uppercase font-sans font-bold tracking-[0.2em] text-[#A37B5C] mb-1">
              Investigative Protocol
            </div>
            <div className="text-lg italic font-serif text-[#1A1A1A]">
              Dr. Claire Vance &amp; S. Miller
            </div>
            <div className="text-xs text-[#1A1A1A]/60 font-sans mt-0.5">
              Neural Ethics &amp; Epistemology Group
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Architectural Plate with 3D Neural Brain Canvas */}
      <div className="lg:col-span-6 relative h-[460px] sm:h-[520px] lg:h-[580px] w-full bg-[#EAE6DC] border border-[#1A1A1A]/20 flex flex-col justify-between p-6 shadow-[0_4px_24px_rgba(26,26,26,0.06)] overflow-hidden">
        {/* Top Monograph Plate Label */}
        <div className="flex justify-between items-center z-20 border-b border-[#1A1A1A]/10 pb-3 bg-[#EAE6DC]/80 backdrop-blur-xs">
          <div className="text-[10px] uppercase font-sans font-bold tracking-[0.25em] text-[#1A1A1A]">
            Fig. 01 / Three-Dimensional Latent Manifold
          </div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#66635B]">
            784 Nodes · 12 Heads
          </div>
        </div>

        {/* 3D Brain instance */}
        <div className="absolute inset-0 w-full h-full pt-10 pb-12 px-6">
          <ThreeNeuralBrain biasIntensity={biasIntensity} interactive={true} />
        </div>

        {/* Bottom Plate Caption & Action Trigger */}
        <div className="flex justify-between items-end z-20 pt-3 border-t border-[#1A1A1A]/10 bg-[#EAE6DC]/80 backdrop-blur-xs">
          <div className="text-[11px] font-serif italic text-[#1A1A1A]/70 max-w-[280px]">
            “Attention weights concentrate disproportionately around high-entropy negative token clusters.”
          </div>

          <button
            id="btn-live-topology-badge"
            onClick={onOpenTopology}
            className="border border-[#1A1A1A] bg-[#1A1A1A] text-[#F9F7F2] hover:bg-[#333333] px-3.5 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all active:scale-95"
          >
            <Eye className="w-3.5 h-3.5 text-[#A37B5C]" />
            <span>Examine Topology</span>
          </button>
        </div>
      </div>
    </section>
  );
};
