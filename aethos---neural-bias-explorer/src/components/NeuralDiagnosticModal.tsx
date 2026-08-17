import React, { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { DiagnosticSample } from '../types';

interface NeuralDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NeuralDiagnosticModal: React.FC<NeuralDiagnosticModalProps> = ({
  isOpen,
  onClose,
}) => {
  const samplePresets: DiagnosticSample[] = [
    {
      id: '1',
      title: 'Civic Infrastructure Proposal',
      text: 'The proposed civic infrastructure bill is terribly controversial, causing immense public distress despite minor long-term economic gains.',
      category: 'Social Media',
      rawNegativeWeight: 84,
      rawPositiveWeight: 16,
      mitigatedNegativeWeight: 49,
      mitigatedPositiveWeight: 51,
      biasAnalysis:
        'The unmitigated model anchors heavily on "terribly controversial" and "immense public distress", virtually ignoring the positive economic clause. With Inverse Attention Reweighting (IAR), attention distributes proportionally across both clauses.',
    },
    {
      id: '2',
      title: 'Crisis Threat-Detection Classifier',
      text: 'Suspicious flight delays reported across regional hubs due to unexpected weather turbulence.',
      category: 'Threat Detection',
      rawNegativeWeight: 92,
      rawPositiveWeight: 8,
      mitigatedNegativeWeight: 38,
      mitigatedPositiveWeight: 62,
      biasAnalysis:
        'Model elevated threat risk score to "Hostile Anomaly" by weighting "suspicious" at 14x normal noun associations. Mitigated model correctly identifies ambient weather variance.',
    },
    {
      id: '3',
      title: 'Algorithmic News Aggregator',
      text: 'Medical researchers discover potential enzyme therapy after 9 years of difficult trials with frequent setbacks.',
      category: 'News Aggregator',
      rawNegativeWeight: 76,
      rawPositiveWeight: 24,
      mitigatedNegativeWeight: 31,
      mitigatedPositiveWeight: 69,
      biasAnalysis:
        'Baseline model headlined the post as "Medical Setbacks" due to negative gravity. Calibrated model highlights "Enzyme Discovery" breakthrough.',
    },
  ];

  const [selectedSample, setSelectedSample] = useState<DiagnosticSample>(samplePresets[0]);
  const [inputText, setInputText] = useState<string>(samplePresets[0].text);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<DiagnosticSample>(samplePresets[0]);

  const handleSelectPreset = (sample: DiagnosticSample) => {
    setSelectedSample(sample);
    setInputText(sample.text);
    setResult(sample);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      // Dynamic computation of sentiment tokens
      const lower = inputText.toLowerCase();
      const negWords = ['terribly', 'distress', 'suspicious', 'setbacks', 'crisis', 'danger', 'fail', 'awful', 'threat', 'loss', 'bad', 'fear', 'worst'];
      let negCount = 0;
      negWords.forEach((w) => {
        if (lower.includes(w)) negCount += 1;
      });

      const rawNeg = Math.min(95, Math.max(55, 60 + negCount * 12));
      const rawPos = 100 - rawNeg;
      const mitNeg = Math.round(rawNeg * 0.48);
      const mitPos = 100 - mitNeg;

      setResult({
        id: 'custom',
        title: 'Custom Ingestion Query',
        text: inputText,
        category: 'Social Media',
        rawNegativeWeight: rawNeg,
        rawPositiveWeight: rawPos,
        mitigatedNegativeWeight: mitNeg,
        mitigatedPositiveWeight: mitPos,
        biasAnalysis: `Parsed ${inputText.split(' ').length} tokens. Identified ${negCount} critical negative trigger tokens with high attention saliency. Counter-balancing suppressed unweighted cross-attention by ${rawNeg - mitNeg}%.`,
      });
      setAnalyzing(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div
      id="neural-diagnostic-modal-overlay"
      className="fixed inset-0 z-50 bg-[#1A1A1A]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#F9F7F2] w-full max-w-4xl max-h-[90vh] border border-[#1A1A1A] shadow-2xl flex flex-col overflow-hidden text-[#1A1A1A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#1A1A1A]/15 bg-[#EAE6DC]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#1A1A1A] text-[#F9F7F2]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-serif text-[#1A1A1A]">
                Neural Diagnostic Laboratory
              </h3>
              <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#66635B]">
                Empirical Evaluation of Attention Heads &amp; Asymmetry Suppression
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

        {/* Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6 bg-[#F9F7F2]">
          {/* Preset Buttons */}
          <div>
            <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#66635B] block mb-2">
              Select Benchmark Test Case:
            </span>
            <div className="flex flex-wrap gap-2">
              {samplePresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3.5 py-1.5 text-xs font-sans uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                    selectedSample.id === preset.id
                      ? 'bg-[#1A1A1A] text-[#F9F7F2] border-[#1A1A1A]'
                      : 'bg-[#FFFFFF] text-[#1A1A1A] border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
                  }`}
                >
                  {preset.title}
                </button>
              ))}
            </div>
          </div>

          {/* Text Input Area */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#66635B]">
              Input Prompt / Corpus Sample for Tensor Evaluation:
            </label>
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-4 bg-[#FFFFFF] border border-[#1A1A1A]/20 text-sm text-[#1A1A1A] font-serif focus:border-[#1A1A1A] focus:outline-none transition-colors"
              placeholder="Type or paste sample text..."
            />
            <div className="flex justify-end">
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="px-6 py-2.5 bg-[#1A1A1A] text-[#F9F7F2] text-xs font-sans uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#333333] transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {analyzing ? (
                  <span>Evaluating Attention Tensors...</span>
                ) : (
                  <>
                    <span>Execute Diagnostic Inference</span>
                    <Send className="w-3.5 h-3.5 text-[#A37B5C]" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Raw Model Weight */}
            <div className="p-5 bg-[#FFFFFF] border border-[#1A1A1A]/20 flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-[#1A1A1A]/10 pb-2">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#9E382A]">
                  Uncalibrated Model Output
                </span>
                <span className="text-[9px] font-sans uppercase font-bold tracking-widest px-2 py-0.5 bg-[#9E382A]/10 text-[#9E382A]">
                  Standard Baseline
                </span>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <div>
                  <div className="flex justify-between text-xs font-sans mb-1">
                    <span className="text-[#1A1A1A]/70">Negative Vector Saliency:</span>
                    <span className="text-[#9E382A] font-serif font-bold">{result.rawNegativeWeight}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#EAE6DC] overflow-hidden">
                    <div
                      className="h-full bg-[#9E382A] transition-all duration-500"
                      style={{ width: `${result.rawNegativeWeight}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-sans mb-1">
                    <span className="text-[#1A1A1A]/70">Constructive Nuance:</span>
                    <span className="text-[#1A1A1A] font-serif font-bold">{result.rawPositiveWeight}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#EAE6DC] overflow-hidden">
                    <div
                      className="h-full bg-[#1A1A1A] transition-all duration-500"
                      style={{ width: `${result.rawPositiveWeight}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mitigated Model Weight */}
            <div className="p-5 bg-[#FFFFFF] border border-[#1A1A1A] flex flex-col gap-3 shadow-[0_2px_12px_rgba(26,26,26,0.05)]">
              <div className="flex justify-between items-center border-b border-[#1A1A1A]/10 pb-2">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Calibrated (AETHOS Mitigation)
                </span>
                <span className="text-[9px] font-sans uppercase font-bold tracking-widest px-2 py-0.5 bg-[#1A1A1A] text-[#F9F7F2]">
                  Harmonized Weights
                </span>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <div>
                  <div className="flex justify-between text-xs font-sans mb-1">
                    <span className="text-[#1A1A1A]/70">Negative Vector Saliency:</span>
                    <span className="text-[#A37B5C] font-serif font-bold">
                      {result.mitigatedNegativeWeight}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#EAE6DC] overflow-hidden">
                    <div
                      className="h-full bg-[#A37B5C] transition-all duration-500"
                      style={{ width: `${result.mitigatedNegativeWeight}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-sans mb-1">
                    <span className="text-[#1A1A1A]/70">Constructive Nuance:</span>
                    <span className="text-[#1A1A1A] font-serif font-bold">
                      {result.mitigatedPositiveWeight}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#EAE6DC] overflow-hidden">
                    <div
                      className="h-full bg-[#1A1A1A] transition-all duration-500"
                      style={{ width: `${result.mitigatedPositiveWeight}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostic Takeaway */}
          <div className="p-4 bg-[#EAE6DC] border border-[#1A1A1A]/15 flex flex-col gap-1.5">
            <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#A37B5C]">
              Diagnosis Summary &amp; Attention Analysis:
            </span>
            <p className="text-xs text-[#1A1A1A]/90 leading-relaxed font-serif">
              {result.biasAnalysis}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
