import React, { useState } from 'react';
import { ShieldCheck, CheckSquare, Square, Scale, Sparkles, AlertCircle } from 'lucide-react';
import { MitigationMethod } from '../types';

export const MitigationSolutions: React.FC = () => {
  const [methods, setMethods] = useState<MitigationMethod[]>([
    {
      id: 'iar',
      name: 'Inverse Attention Reweighting (IAR)',
      category: 'Attention Mechanism',
      reductionPercentage: 34,
      description:
        'Dynamically dampens high-variance negative attention scores during cross-attention layers using temperature-scaled entropy penalties.',
      mathematicalFormula: 'Attention(Q, K, V) = softmax((QKᵀ / √d_k) - λ · diag(V_neg)) V',
      active: true,
    },
    {
      id: 'anp',
      name: 'Adversarial Negativity Pruning (ANP)',
      category: 'Architecture Optimization',
      reductionPercentage: 28,
      description:
        'Identifies and structurally prunes feedforward neuron subsets in intermediate transformer blocks that disproportionately fire on outrage syntax.',
      mathematicalFormula: 'W_pruned = W ⊙ 1(|∇_W L_outrage| < τ)',
      active: true,
    },
    {
      id: 'scb',
      name: 'Synthetic Nuance Counter-Balancing (SNCB)',
      category: 'Corpus Engineering',
      reductionPercentage: 22,
      description:
        'Injects procedurally curated high-entropy constructive counter-examples into training checkpoints to restore latent space manifold balance.',
      mathematicalFormula: 'D_balanced = D_human ∪ D_synth(high_constructiveness)',
      active: false,
    },
    {
      id: 'lfcr',
      name: 'Loss Curvature Regularization (LFCR)',
      category: 'Objective Function',
      reductionPercentage: 16,
      description:
        'Bounds the second derivative of the loss surface for negative error spikes, preventing catastrophic parameter updates from single adversarial inputs.',
      mathematicalFormula: 'L_total = L_task + γ · ||∇² L(θ_neg)||_F',
      active: false,
    },
  ]);

  const toggleMethod = (id: string) => {
    setMethods((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
    );
  };

  const totalReduction = methods
    .filter((m) => m.active)
    .reduce((acc, m) => acc + m.reductionPercentage, 0);

  const baselineBiasIndex = 88;
  const currentBiasIndex = Math.max(8, baselineBiasIndex - Math.round(totalReduction * 0.85));

  return (
    <section id="solutions" className="flex flex-col gap-8 scroll-mt-24 border-b border-[#1A1A1A]/10 pb-16">
      {/* Section Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-[#1A1A1A]/40"></div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#A37B5C]">
            Section 04 // Calibration Engineering
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1A1A1A] tracking-tight">
          Algorithmic Countermeasures <span className="italic font-normal">&amp; Mitigations.</span>
        </h2>
        <p className="font-serif text-base sm:text-lg text-[#1A1A1A]/75 max-w-3xl leading-relaxed">
          Systemic negativity bias cannot be remedied through naive content moderation. It requires architectural interventions at the attention layer, loss formulation, and weight curvature tiers.
        </p>
      </div>

      {/* Interactive Calibration Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Toggles for methods */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#66635B]">
              Active Intervention Protocols:
            </span>
            <button
              onClick={() =>
                setMethods((prev) => prev.map((m) => ({ ...m, active: true })))
              }
              className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#1A1A1A] hover:underline cursor-pointer"
            >
              Engage All Protocols
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {methods.map((method) => (
              <div
                key={method.id}
                onClick={() => toggleMethod(method.id)}
                className={`p-5 border transition-all cursor-pointer select-none flex flex-col gap-3 ${
                  method.active
                    ? 'bg-[#FFFFFF] border-[#1A1A1A] shadow-[0_2px_12px_rgba(26,26,26,0.06)]'
                    : 'bg-[#F2EFE8]/60 border-[#1A1A1A]/10 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="text-[#1A1A1A]">
                      {method.active ? (
                        <CheckSquare className="w-5 h-5 text-[#1A1A1A]" />
                      ) : (
                        <Square className="w-5 h-5 text-[#66635B]" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-serif text-[#1A1A1A]">
                        {method.name}
                      </h4>
                      <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-[#A37B5C]">
                        {method.category}
                      </span>
                    </div>
                  </div>

                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#EAE6DC] px-2.5 py-1 border border-[#1A1A1A]/15">
                    -{method.reductionPercentage}% Skew
                  </span>
                </div>

                <p className="font-serif text-sm text-[#1A1A1A]/75 leading-relaxed">
                  {method.description}
                </p>

                {method.active && (
                  <div className="font-mono text-xs bg-[#F9F7F2] text-[#1A1A1A] p-2.5 border border-[#1A1A1A]/15 overflow-x-auto">
                    <code>{method.mathematicalFormula}</code>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Calibrator Gauge (Monograph Style) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#EAE6DC] p-8 border border-[#1A1A1A]/20 flex flex-col items-center justify-center text-center gap-6 relative shadow-[0_4px_20px_rgba(26,26,26,0.06)]">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#1A1A1A]" />
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#1A1A1A] font-bold">
                Synthesized Bias Index
              </span>
            </div>

            {/* Circular Gauge */}
            <div className="relative w-48 h-48 flex items-center justify-center my-2">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                {/* Track circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#D1CCBE"
                  strokeWidth="6"
                />
                {/* Indicator circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={currentBiasIndex > 50 ? '#9E382A' : currentBiasIndex > 25 ? '#A37B5C' : '#1A1A1A'}
                  strokeWidth="6"
                  strokeDasharray="314"
                  strokeDashoffset={314 - (314 * currentBiasIndex) / 100}
                  strokeLinecap="square"
                  className="transition-all duration-700 ease-out"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-5xl font-serif font-normal text-[#1A1A1A]">
                  {currentBiasIndex}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-[#66635B] mt-1">
                  Pessimism Metric
                </span>
              </div>
            </div>

            {/* Status explanation */}
            <div className="p-3.5 bg-[#F9F7F2] border border-[#1A1A1A]/15 text-xs text-[#1A1A1A] w-full">
              {currentBiasIndex <= 20 ? (
                <span className="font-serif italic text-[#1A1A1A] flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#A37B5C]" /> Neural Equilibrium Restored
                </span>
              ) : currentBiasIndex <= 50 ? (
                <span className="font-serif italic text-[#1A1A1A] flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#A37B5C]" /> Moderate Bias Dampened
                </span>
              ) : (
                <span className="font-serif italic text-[#9E382A] flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Systemic Pessimism Dominant
                </span>
              )}
            </div>

            {/* Stats summary */}
            <div className="grid grid-cols-2 gap-4 w-full border-t border-[#1A1A1A]/10 pt-4">
              <div className="flex flex-col items-center">
                <span className="text-[9px] uppercase font-sans tracking-widest text-[#66635B]">Attenuated Drift</span>
                <span className="text-lg font-serif font-bold text-[#1A1A1A]">
                  -{Math.round(totalReduction * 0.85)} pts
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9px] uppercase font-sans tracking-widest text-[#66635B]">Active Protocols</span>
                <span className="text-lg font-serif font-bold text-[#1A1A1A]">
                  {methods.filter((m) => m.active).length} / 4 Engaged
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
