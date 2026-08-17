import React, { useState } from 'react';
import { X, Sliders, Bell } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [tab, setTab] = useState<'settings' | 'alerts'>('settings');
  const [tempScale, setTempScale] = useState<number>(0.7);
  const [lossLambda, setLossLambda] = useState<number>(0.25);
  const [pruneThreshold, setPruneThreshold] = useState<number>(0.85);

  const alerts = [
    {
      id: '1',
      time: '14:22 UTC',
      level: 'Critical Alert',
      title: 'Loss Gradient Surge Detected in Transformer Block 09',
      details: 'Negative token cluster in sentiment validation set caused +412% gradient magnitude spike.',
    },
    {
      id: '2',
      time: '11:05 UTC',
      level: 'Telemetry Advisory',
      title: 'Attention Head 7 Structured Pruning',
      details: 'Head 7 flagged for 91% activation correlation with sensationalist headlines.',
    },
    {
      id: '3',
      time: '08:40 UTC',
      level: 'Corpus Sync',
      title: 'Synthetic Counter-Corpus Synchronized',
      details: 'Ingested 250,000 constructive scientific dialogue pairs to maintain manifold equilibrium.',
    },
  ];

  if (!isOpen) return null;

  return (
    <div
      id="settings-modal-overlay"
      className="fixed inset-0 z-50 bg-[#1A1A1A]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#F9F7F2] w-full max-w-2xl border border-[#1A1A1A] shadow-2xl flex flex-col overflow-hidden text-[#1A1A1A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#1A1A1A]/15 bg-[#EAE6DC]">
          <div className="flex gap-6 items-center">
            <button
              onClick={() => setTab('settings')}
              className={`text-xs uppercase font-sans tracking-widest font-bold flex items-center gap-2 pb-1 border-b-2 transition-all cursor-pointer ${
                tab === 'settings'
                  ? 'border-[#1A1A1A] text-[#1A1A1A]'
                  : 'border-transparent text-[#66635B] hover:text-[#1A1A1A]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Hyperparameters</span>
            </button>

            <button
              onClick={() => setTab('alerts')}
              className={`text-xs uppercase font-sans tracking-widest font-bold flex items-center gap-2 pb-1 border-b-2 transition-all cursor-pointer ${
                tab === 'alerts'
                  ? 'border-[#9E382A] text-[#9E382A]'
                  : 'border-transparent text-[#66635B] hover:text-[#1A1A1A]'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>System Alerts ({alerts.length})</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh] bg-[#F9F7F2] flex flex-col gap-6">
          {tab === 'settings' ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 p-4 bg-[#FFFFFF] border border-[#1A1A1A]/15">
                <div className="flex justify-between text-xs font-sans font-semibold">
                  <span className="text-[#1A1A1A]">Attention Entropy Scaling (&lambda;):</span>
                  <span className="font-serif font-bold text-[#A37B5C] text-sm">{lossLambda}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.8"
                  step="0.05"
                  value={lossLambda}
                  onChange={(e) => setLossLambda(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#EAE6DC] rounded-none appearance-none cursor-pointer accent-[#1A1A1A]"
                />
                <span className="text-[11px] text-[#66635B] font-serif">
                  Controls the dampening penalty applied to high-variance negative attention scores during cross-attention layers.
                </span>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-[#FFFFFF] border border-[#1A1A1A]/15">
                <div className="flex justify-between text-xs font-sans font-semibold">
                  <span className="text-[#1A1A1A]">Softmax Temperature Scaling:</span>
                  <span className="font-serif font-bold text-[#A37B5C] text-sm">{tempScale}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.1"
                  value={tempScale}
                  onChange={(e) => setTempScale(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#EAE6DC] rounded-none appearance-none cursor-pointer accent-[#1A1A1A]"
                />
                <span className="text-[11px] text-[#66635B] font-serif">
                  Higher temperature flattens output probability spikes, attenuating extremist token selection.
                </span>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-[#FFFFFF] border border-[#1A1A1A]/15">
                <div className="flex justify-between text-xs font-sans font-semibold">
                  <span className="text-[#1A1A1A]">Neuron Pruning Sensitivity (&tau;):</span>
                  <span className="font-serif font-bold text-[#9E382A] text-sm">{pruneThreshold}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="0.99"
                  step="0.01"
                  value={pruneThreshold}
                  onChange={(e) => setPruneThreshold(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#EAE6DC] rounded-none appearance-none cursor-pointer accent-[#9E382A]"
                />
                <span className="text-[11px] text-[#66635B] font-serif">
                  Cutoff threshold for identifying and isolating adversarial outrage-specialized feedforward circuits.
                </span>
              </div>

              <div className="p-4 bg-[#EAE6DC] border border-[#1A1A1A]/15 flex items-center justify-between mt-2">
                <span className="text-xs font-serif text-[#1A1A1A]/80">
                  Parameters will calibrate the active browser tensor engine immediately.
                </span>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] text-xs font-sans uppercase tracking-widest font-bold cursor-pointer transition-all active:scale-95"
                >
                  Save &amp; Apply
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {alerts.map((a) => (
                <div
                  key={a.id}
                  className="p-5 bg-[#FFFFFF] border border-[#1A1A1A]/15 flex flex-col gap-1.5"
                >
                  <div className="flex justify-between items-center border-b border-[#1A1A1A]/10 pb-2">
                    <span className="font-serif font-bold text-sm text-[#1A1A1A]">{a.title}</span>
                    <span
                      className={`text-[9px] uppercase font-sans font-bold tracking-widest px-2 py-0.5 ${
                        a.level.includes('Critical')
                          ? 'bg-[#9E382A] text-[#F9F7F2]'
                          : a.level.includes('Advisory')
                          ? 'bg-[#A37B5C] text-[#F9F7F2]'
                          : 'bg-[#1A1A1A] text-[#F9F7F2]'
                      }`}
                    >
                      {a.level} &middot; {a.time}
                    </span>
                  </div>
                  <p className="text-xs text-[#1A1A1A]/75 font-serif mt-2 leading-relaxed">
                    {a.details}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
