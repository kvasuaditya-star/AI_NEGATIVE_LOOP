import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ResearchQuestionCalloutProps {
  onOpenDiagnostic: () => void;
}

export const ResearchQuestionCallout: React.FC<ResearchQuestionCalloutProps> = ({
  onOpenDiagnostic,
}) => {
  return (
    <section
      id="research-callout"
      className="py-20 sm:py-28 text-center flex flex-col items-center justify-center border-b border-[#1A1A1A]/10 mt-8 relative"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="h-[1px] w-10 bg-[#1A1A1A]/30"></div>
        <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#A37B5C]">
          Epistemic Inquiry // Monograph Epilogue
        </span>
        <div className="h-[1px] w-10 bg-[#1A1A1A]/30"></div>
      </div>

      <blockquote className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-[#1A1A1A] max-w-4xl leading-tight px-4 tracking-tight">
        “If we construct artificial minds from our collective digital exhaust, how do we prevent them from inheriting our darkest instincts?”
      </blockquote>

      <p className="mt-8 text-xs sm:text-sm uppercase tracking-[0.2em] font-sans text-[#66635B] max-w-xl font-semibold">
        Dr. Claire Vance &middot; Neural Ethics &amp; Epistemology Group
      </p>

      <div className="mt-10">
        <button
          onClick={onOpenDiagnostic}
          className="px-8 py-4 bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all cursor-pointer shadow-sm active:scale-98 flex items-center gap-3 mx-auto group"
        >
          <span>Open Interactive Diagnostic Lab</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
