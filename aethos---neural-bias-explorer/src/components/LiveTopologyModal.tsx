import React, { useState } from 'react';
import { X, Layers, Activity, Info } from 'lucide-react';
import { ThreeNeuralBrain } from './ThreeNeuralBrain';

interface LiveTopologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveTopologyModal: React.FC<LiveTopologyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeLayer, setActiveLayer] = useState<string>('all');
  const [biasFilter, setBiasFilter] = useState<number>(0.7);

  if (!isOpen) return null;

  return (
    <div
      id="live-topology-modal-overlay"
      className="fixed inset-0 z-50 bg-[#1A1A1A]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#F9F7F2] w-full max-w-6xl h-[88vh] border border-[#1A1A1A] shadow-2xl flex flex-col overflow-hidden relative text-[#1A1A1A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#1A1A1A]/15 bg-[#EAE6DC]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#1A1A1A] text-[#F9F7F2]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-serif text-[#1A1A1A]">
                Neural Topology &amp; Synaptic Weight Monograph
              </h3>
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#66635B]">
                Real-Time Manifold Visualization &middot; 784 Tensor Nodes &middot; 12 Attention Heads
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 3D Stage & Control Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-grow overflow-hidden relative">
          {/* 3D Canvas Area */}
          <div className="lg:col-span-8 relative h-[360px] lg:h-full w-full bg-[#1A1A1A] flex items-center justify-center">
            <div className="absolute inset-0">
              <ThreeNeuralBrain biasIntensity={biasFilter} interactive={true} />
            </div>

            {/* Overlaid HUD status */}
            <div className="absolute top-4 left-4 bg-[#F9F7F2]/90 px-3 py-1.5 border border-[#1A1A1A]/20 text-[10px] font-sans font-bold tracking-wider text-[#1A1A1A] uppercase flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#9E382A]" />
              <span>Negative Synaptic Paths: Active ({Math.round(biasFilter * 100)}%)</span>
            </div>

            <div className="absolute bottom-4 left-4 bg-[#1A1A1A]/80 p-2.5 border border-[#F9F7F2]/20 text-[10px] font-mono text-[#F9F7F2]/80 pointer-events-none max-w-xs">
              💡 Left-click &amp; drag on the 3D neural core to rotate perspective in 360°.
            </div>
          </div>

          {/* Right Rail: Real-time Controls and Node telemetry */}
          <div className="lg:col-span-4 p-6 border-t lg:border-t-0 lg:border-l border-[#1A1A1A]/15 overflow-y-auto flex flex-col gap-6 bg-[#F9F7F2]">
            <div>
              <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#66635B] block mb-2">
                Layer Inspection Filter
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'all', label: 'All Layers' },
                  { id: 'attn', label: 'Attn Heads 0-5' },
                  { id: 'ffn', label: 'FFN Latent' },
                  { id: 'outrage', label: 'Outrage Nodes' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveLayer(item.id)}
                    className={`py-2 px-3 text-[11px] font-sans uppercase tracking-wider font-bold border transition-all cursor-pointer ${
                      activeLayer === item.id
                        ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                        : 'bg-[#FFFFFF] text-[#1A1A1A] border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bias Distortion Threshold */}
            <div className="flex flex-col gap-2 p-4 bg-[#FFFFFF] border border-[#1A1A1A]/15">
              <div className="flex justify-between items-center text-xs font-sans font-semibold">
                <span className="text-[#1A1A1A]">Negative Weight Salience</span>
                <span className="font-serif font-bold text-[#9E382A] text-sm">{Math.round(biasFilter * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={biasFilter}
                onChange={(e) => setBiasFilter(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#EAE6DC] rounded-none appearance-none cursor-pointer accent-[#9E382A]"
              />
            </div>

            {/* Live Metrics stream */}
            <div className="p-5 bg-[#EAE6DC] border border-[#1A1A1A]/15 flex flex-col gap-3">
              <div className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#66635B]">
                Active Node Diagnostics
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#1A1A1A]/70">Topological Entropy:</span>
                <span className="text-[#1A1A1A] font-bold">1.482 nats</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#1A1A1A]/70">Asymmetric Gradient Norm:</span>
                <span className="text-[#9E382A] font-bold">4.92 ||g||</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#1A1A1A]/70">Convergence Stability:</span>
                <span className="text-[#1A1A1A] font-bold">Nominal</span>
              </div>
            </div>

            {/* Explanatory Note */}
            <div className="mt-auto p-4 bg-[#FFFFFF] border border-[#1A1A1A]/15 text-xs text-[#1A1A1A]/80 font-serif leading-relaxed flex items-start gap-3">
              <Info className="w-4 h-4 text-[#A37B5C] shrink-0 mt-0.5" />
              <span>
                Rust-hued synaptic filaments indicate attention heads that prioritize high cross-entropy variance from negative polarity token pairs.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
