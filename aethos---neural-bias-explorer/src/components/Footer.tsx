import React, { useState } from 'react';
import { X, FileText, BookOpen, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'docs' | 'methodology' | 'privacy' | null>(null);

  return (
    <>
      <footer
        id="app-footer"
        className="bg-[#F2EFE8] w-full py-10 mt-auto border-t border-[#1A1A1A]/15 flex flex-col md:flex-row justify-between items-center px-6 sm:px-12 gap-6 z-40 relative text-xs"
      >
        <div className="flex flex-col gap-1">
          <span className="font-serif font-bold text-[#1A1A1A] text-sm tracking-wide">
            THE DIGITAL MIRROR &middot; MONOGRAPH VOL. IV
          </span>
          <span className="font-sans text-[10px] uppercase tracking-widest text-[#66635B]">
            &copy; 2024–2026 Neural Ethics &amp; Epistemology Research Group. All rights reserved.
          </span>
        </div>

        <div className="flex gap-8 items-center font-sans text-[11px] uppercase tracking-wider font-semibold">
          <button
            onClick={() => setActiveModal('docs')}
            className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors cursor-pointer hover:underline"
          >
            Documentation
          </button>
          <button
            onClick={() => setActiveModal('methodology')}
            className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors cursor-pointer hover:underline"
          >
            Methodology
          </button>
          <button
            onClick={() => setActiveModal('privacy')}
            className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors cursor-pointer hover:underline"
          >
            Privacy Protocol
          </button>
        </div>
      </footer>

      {/* Popups / Editorial Dossier Modals */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 bg-[#1A1A1A]/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-[#F9F7F2] p-8 sm:p-10 max-w-xl w-full border border-[#1A1A1A] shadow-2xl flex flex-col gap-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start border-b border-[#1A1A1A]/15 pb-4">
              <div>
                <span className="text-[10px] uppercase font-sans font-bold tracking-[0.25em] text-[#A37B5C]">
                  Reference Material
                </span>
                <h3 className="text-2xl font-serif text-[#1A1A1A] mt-1 flex items-center gap-2">
                  {activeModal === 'docs'
                    ? 'System Documentation'
                    : activeModal === 'methodology'
                    ? 'Research Methodology'
                    : 'Privacy & Governance Protocol'}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 text-[#1A1A1A]/60 hover:text-[#1A1A1A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-sm font-serif text-[#1A1A1A]/85 leading-relaxed space-y-4">
              {activeModal === 'docs' && (
                <>
                  <p>
                    <strong className="text-[#1A1A1A] font-sans text-xs uppercase tracking-wider block mb-1">AETHOS Framework v2.4:</strong> A suite for measuring, diagnosing, and mitigating structural asymmetry in deep neural network loss functions.
                  </p>
                  <p>
                    Covers cross-entropy error distributions, attention head activation mappings, and synthetic dataset curation protocols.
                  </p>
                </>
              )}
              {activeModal === 'methodology' && (
                <>
                  <p>
                    <strong className="text-[#1A1A1A] font-sans text-xs uppercase tracking-wider block mb-1">Empirical Baseline:</strong> Data collected across 1.2M synthetic and human-authored dialogue turns. We compute loss curvature second-derivatives:
                  </p>
                  <div className="p-3 bg-[#EAE6DC] text-[#1A1A1A] font-mono text-xs border border-[#1A1A1A]/15">
                    <code>∇² L(θ_neg) &gt;&gt; ∇² L(θ_pos) where |gradient_ratio| &gt; 8.4</code>
                  </div>
                  <p>
                    Experiments demonstrate that Inverse Attention Reweighting (IAR) suppresses alarmist bias by 62.4% without degrading standard language fluency benchmarks.
                  </p>
                </>
              )}
              {activeModal === 'privacy' && (
                <>
                  <p>
                    All diagnostic inference and tensor matrix evaluations are processed locally within the client browser session.
                  </p>
                  <p>
                    Zero private text samples or user-submitted prompts are retained or transmitted to central training servers.
                  </p>
                </>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-[#1A1A1A]/15">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] font-sans text-xs uppercase tracking-widest font-bold cursor-pointer transition-all active:scale-95"
              >
                Close Reference
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
