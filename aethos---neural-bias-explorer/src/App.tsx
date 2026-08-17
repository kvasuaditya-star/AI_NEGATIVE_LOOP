import React, { useState, useEffect } from 'react';
import { NeuralShaderBackground } from './components/NeuralShaderBackground';
import { TopNavbar } from './components/TopNavbar';
import { HeroSection } from './components/HeroSection';
import { AsymmetrySection } from './components/AsymmetrySection';
import { AmplificationCycle } from './components/AmplificationCycle';
import { RiskTopology } from './components/RiskTopology';
import { MitigationSolutions } from './components/MitigationSolutions';
import { ResearchQuestionCallout } from './components/ResearchQuestionCallout';
import { Footer } from './components/Footer';
import { LiveTopologyModal } from './components/LiveTopologyModal';
import { NeuralDiagnosticModal } from './components/NeuralDiagnosticModal';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [biasIntensity, setBiasIntensity] = useState<number>(0.65);
  
  // Modals state
  const [isTopologyOpen, setIsTopologyOpen] = useState<boolean>(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Smooth scroll to sections
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Scroll listener to update active navigation tab dynamically
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['solutions', 'risks', 'feedback-loop', 'ai-learning', 'human-bias', 'overview'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section === 'overview') {
          if (window.scrollY < 400) {
            setActiveSection('overview');
            break;
          }
        } else {
          const el = document.getElementById(section);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0c1324] text-[#dce1fb] font-sans antialiased overflow-x-hidden relative flex flex-col selection:bg-[#2d6bff] selection:text-white">
      {/* Global Background Neural WebGL Canvas Shader */}
      <NeuralShaderBackground />

      {/* Sticky Top Navigation Bar */}
      <TopNavbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenTopology={() => setIsTopologyOpen(true)}
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-20 sm:gap-28 relative z-10">
        {/* 1. Hero Overview Section with 3D Interactive Brain */}
        <HeroSection
          biasIntensity={biasIntensity}
          onBiasChange={setBiasIntensity}
          onExploreFeedback={() => handleNavigate('feedback-loop')}
          onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
          onOpenTopology={() => setIsTopologyOpen(true)}
        />

        {/* 2. Asymmetry of Attention (Human Bias vs AI Weighting) */}
        <AsymmetrySection />

        {/* 3. The Amplification Cycle (Recursive Feedback Loop Diagram) */}
        <AmplificationCycle />

        {/* 4. Systemic Risk Topology (Failure Modes & Impact Cards) */}
        <RiskTopology />

        {/* 5. Algorithmic Countermeasures & Calibration (Mitigation Sandbox) */}
        <MitigationSolutions />

        {/* 6. Thesis Callout Question */}
        <ResearchQuestionCallout
          onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <LiveTopologyModal
        isOpen={isTopologyOpen}
        onClose={() => setIsTopologyOpen(false)}
      />

      <NeuralDiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
