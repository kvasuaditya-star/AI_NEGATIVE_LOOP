import React, { useState, useEffect } from 'react';
import { Brain, Play, Pause, Cpu } from 'lucide-react';
import { AmplificationStage } from '../types';

export const AmplificationCycle: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<'friction' | 'bias' | 'optimization' | 'skew'>('bias');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const stages: AmplificationStage[] = [
    {
      id: 'friction',
      title: 'Human Friction',
      subtitle: 'Cognitive Arousal Trigger',
      description:
        'Users interact with adversarial or outrage-provoking content at 3.8x the rate of neutral content, creating an inflated engagement signal.',
      neuralMechanism:
        'Telemetry models interpret prolonged dwell-time and quote-shares as high-utility reward tokens.',
      metricLabel: 'Engagement Multiplier',
      metricValue: '+380%',
      status: 'active',
      color: '#A37B5C',
    },
    {
      id: 'bias',
      title: 'Bias Injection',
      subtitle: 'Dataset Contamination',
      description:
        'The uncurated user interactions are harvested into next-generation training corpora. Outrage-heavy discourse becomes the normative semantic baseline.',
      neuralMechanism:
        'Loss function penalizes predictions that underestimate negative emotional valence in subsequent dialogue turns.',
      metricLabel: 'Pessimistic Embedding Drift',
      metricValue: '+64.2%',
      status: 'critical',
      color: '#9E382A',
    },
    {
      id: 'optimization',
      title: 'AI Optimization',
      subtitle: 'Parameter Weight Alignment',
      description:
        'Reinforcement Learning from Human Feedback (RLHF) and cross-entropy loss optimize internal weights to maximize click-through and reaction probabilities.',
      neuralMechanism:
        'Attention heads in transformer layers allocate higher softmax attention scores to alarming keywords.',
      metricLabel: 'Attention Weight Skew',
      metricValue: '4.8x Baseline',
      status: 'active',
      color: '#1A1A1A',
    },
    {
      id: 'skew',
      title: 'Output Skew',
      subtitle: 'Algorithmic Amplification',
      description:
        'The deployed model preferentially generates and recommends cynical, alarmist, or high-conflict responses, validating human anxiety.',
      neuralMechanism:
        'Top-k sampling and temperature scaling favor high-probability negative cluster trajectories in latent space.',
      metricLabel: 'Downstream Exposure',
      metricValue: '82% Skew',
      status: 'evaluating',
      color: '#705A44',
    },
  ];

  const currentStage = stages.find((s) => s.id === activeStageId) || stages[0];

  // Auto-play loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStageId((prev) => {
        if (prev === 'friction') return 'skew';
        if (prev === 'skew') return 'optimization';
        if (prev === 'optimization') return 'bias';
        return 'friction';
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="feedback-loop" className="flex flex-col gap-10 py-8 scroll-mt-24 border-b border-[#1A1A1A]/10 pb-16">
      {/* Section Title */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-[#1A1A1A]/40"></div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#A37B5C]">
            Section 02 // Recursive Dynamics
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1A1A1A] tracking-tight">
          The Amplification <span className="italic font-normal">Cycle.</span>
        </h2>
        <p className="font-serif text-base sm:text-lg text-[#1A1A1A]/75 max-w-2xl leading-relaxed">
          Algorithms optimize for engagement. Negative stimuli provoke higher visceral arousal, teaching transformer attention layers to prioritize pessimistic vectors in a self-reinforcing loop.
        </p>
      </div>

      {/* Main Interactive Diagram Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left/Center Visual: Circular Orbital Diagram (Monograph Style) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-[500px] aspect-square bg-[#EAE6DC] border border-[#1A1A1A]/20 flex items-center justify-center overflow-hidden p-6 sm:p-10 shadow-[0_4px_24px_rgba(26,26,26,0.06)]">
            {/* Background subtle compass crosshairs */}
            <div className="absolute inset-x-8 top-1/2 h-[1px] bg-[#1A1A1A]/10 pointer-events-none" />
            <div className="absolute inset-y-8 left-1/2 w-[1px] bg-[#1A1A1A]/10 pointer-events-none" />

            {/* Orbit rings */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-[#1A1A1A]/20 flex items-center justify-center">
              {/* Thin dashed orbital track */}
              <div className="absolute w-full h-full rounded-full border border-dashed border-[#1A1A1A]/30 animate-[spin_60s_linear_infinite]" />
              <div className="absolute w-[80%] h-[80%] rounded-full border border-dotted border-[#A37B5C]/40 animate-[spin_40s_linear_infinite_reverse]" />

              {/* Top Node: Human Friction */}
              <button
                id="stage-node-friction"
                onClick={() => setActiveStageId('friction')}
                className={`absolute top-0 -translate-y-1/2 px-4 py-1.5 font-sans text-xs uppercase tracking-widest font-bold border transition-all cursor-pointer active:scale-95 ${
                  activeStageId === 'friction'
                    ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A] scale-105 shadow-md'
                    : 'bg-[#F9F7F2] text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
                }`}
              >
                1. Friction
              </button>

              {/* Right Node: Output Skew */}
              <button
                id="stage-node-skew"
                onClick={() => setActiveStageId('skew')}
                className={`absolute right-0 translate-x-1/2 px-4 py-1.5 font-sans text-xs uppercase tracking-widest font-bold border transition-all cursor-pointer active:scale-95 ${
                  activeStageId === 'skew'
                    ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A] scale-105 shadow-md'
                    : 'bg-[#F9F7F2] text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
                }`}
              >
                4. Skew
              </button>

              {/* Bottom Node: AI Optimization */}
              <button
                id="stage-node-optimization"
                onClick={() => setActiveStageId('optimization')}
                className={`absolute bottom-0 translate-y-1/2 px-4 py-1.5 font-sans text-xs uppercase tracking-widest font-bold border transition-all cursor-pointer active:scale-95 ${
                  activeStageId === 'optimization'
                    ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A] scale-105 shadow-md'
                    : 'bg-[#F9F7F2] text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
                }`}
              >
                3. Optimization
              </button>

              {/* Left Node: Bias Injection */}
              <button
                id="stage-node-bias"
                onClick={() => setActiveStageId('bias')}
                className={`absolute left-0 -translate-x-1/2 px-4 py-1.5 font-sans text-xs uppercase tracking-widest font-bold border transition-all cursor-pointer active:scale-95 ${
                  activeStageId === 'bias'
                    ? 'bg-[#9E382A] text-[#F9F7F2] border-[#9E382A] scale-105 shadow-md'
                    : 'bg-[#F9F7F2] text-[#9E382A] border-[#9E382A]/40 hover:border-[#9E382A]'
                }`}
              >
                2. Bias Injection
              </button>

              {/* Center Core: Monograph Hub */}
              <div className="w-24 h-24 rounded-full bg-[#F9F7F2] border border-[#1A1A1A] flex flex-col items-center justify-center z-10 shadow-[0_2px_12px_rgba(26,26,26,0.08)]">
                <Brain className="w-7 h-7 text-[#1A1A1A]" />
                <span className="text-[8px] font-sans text-[#A37B5C] mt-0.5 uppercase tracking-[0.2em] font-bold">
                  Loop Core
                </span>
              </div>
            </div>
          </div>

          {/* Loop Controls Bar */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-4 py-1.5 bg-[#F9F7F2] border border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-[#F9F7F2] text-xs font-sans uppercase tracking-wider font-bold transition-all cursor-pointer active:scale-95"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Cycle' : 'Resume Auto-Cycle'}</span>
            </button>

            <span className="text-xs font-serif italic text-[#66635B]">
              Active Phase: <strong className="font-sans not-italic text-[#1A1A1A] font-bold">{currentStage.title}</strong>
            </span>
          </div>
        </div>

        {/* Right Column: Stage Deep Dive Panel (Editorial Monograph Sheet) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#FFFFFF] border border-[#1A1A1A]/15 p-6 sm:p-8 flex flex-col gap-5 relative shadow-[0_2px_15px_rgba(26,26,26,0.03)]">
            {/* Header with color accent */}
            <div className="flex justify-between items-start border-b border-[#1A1A1A]/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-sans font-bold tracking-[0.2em] text-[#66635B]">
                  Phase Telemetry / 0{stages.findIndex((s) => s.id === currentStage.id) + 1}
                </span>
                <h3 className="text-3xl font-serif text-[#1A1A1A] mt-1">
                  {currentStage.title}
                </h3>
                <div className="text-xs text-[#A37B5C] font-sans uppercase tracking-wider font-semibold mt-0.5">
                  {currentStage.subtitle}
                </div>
              </div>

              <div
                className="px-3 py-1 font-sans text-[10px] uppercase tracking-widest font-bold border"
                style={{
                  backgroundColor: '#F9F7F2',
                  borderColor: currentStage.color,
                  color: currentStage.color,
                }}
              >
                {currentStage.status.toUpperCase()}
              </div>
            </div>

            {/* Description */}
            <div className="p-4 bg-[#F9F7F2] border-l-2 border-[#1A1A1A] font-serif text-sm text-[#1A1A1A]/80 leading-relaxed">
              “{currentStage.description}”
            </div>

            {/* Neural Pathway Breakdown */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#66635B] flex items-center gap-1.5 font-bold">
                <Cpu className="w-3.5 h-3.5 text-[#A37B5C]" />
                Transformer Layer Vector Action:
              </span>
              <p className="text-xs font-mono text-[#1A1A1A]/80 bg-[#F2EFE8] p-3 border border-[#1A1A1A]/10 leading-normal">
                {currentStage.neuralMechanism}
              </p>
            </div>

            {/* Metric rule */}
            <div className="flex justify-between items-center border-t border-[#1A1A1A]/10 pt-4 mt-2">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#66635B]">
                {currentStage.metricLabel}
              </span>
              <span
                className="font-serif text-xl font-bold"
                style={{ color: currentStage.color }}
              >
                {currentStage.metricValue}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
