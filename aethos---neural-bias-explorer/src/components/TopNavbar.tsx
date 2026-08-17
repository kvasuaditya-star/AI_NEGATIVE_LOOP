import React from 'react';
import { Network, Bell, Sliders, Activity, Sparkles, BookOpen } from 'lucide-react';

interface TopNavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenTopology: () => void;
  onOpenDiagnostic: () => void;
  onOpenSettings: () => void;
  unreadAlertCount?: number;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenTopology,
  onOpenDiagnostic,
  onOpenSettings,
  unreadAlertCount = 2,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'human-bias', label: 'Human Bias' },
    { id: 'ai-learning', label: 'AI Learning' },
    { id: 'feedback-loop', label: 'Feedback Loop' },
    { id: 'risks', label: 'Risks' },
    { id: 'solutions', label: 'Mitigations' },
  ];

  return (
    <nav
      id="top-navigation-bar"
      className="w-full top-0 sticky z-50 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#1A1A1A]/10 shadow-[0_2px_15px_rgba(26,26,26,0.03)]"
    >
      <div className="flex justify-between items-center px-6 sm:px-12 py-4 max-w-[1440px] mx-auto">
        {/* Brand Logo & Issue Marker */}
        <div
          id="brand-logo-container"
          onClick={() => onNavigate('overview')}
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-[#F9F7F2] transition-all duration-300">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-xl tracking-tight text-[#1A1A1A]">
                AETHOS
              </span>
              <span className="text-[10px] uppercase font-sans font-bold tracking-[0.25em] text-[#A37B5C] hidden sm:inline">
                / Issue 04
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-[#66635B] hidden md:inline">
              Neural Epistemology & Asymmetry
            </span>
          </div>
        </div>

        {/* Center Nav Links in Editorial Typography */}
        <div id="nav-links-menu" className="hidden lg:flex gap-6 items-center">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`text-xs uppercase tracking-[0.2em] font-sans font-medium transition-all duration-200 cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-[#1A1A1A] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#1A1A1A]'
                    : 'text-[#66635B] hover:text-[#1A1A1A]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div id="nav-actions-container" className="flex gap-2.5 items-center">
          <button
            id="btn-diagnostic-trigger"
            onClick={onOpenDiagnostic}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider font-semibold text-[#1A1A1A] bg-[#EAE6DC] border border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-[#F9F7F2] transition-all cursor-pointer active:scale-95"
            title="Open Live Neural Diagnostic"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#A37B5C]" />
            <span>Diagnostic Lab</span>
          </button>

          <button
            id="btn-topology-trigger"
            onClick={onOpenTopology}
            className="p-2 rounded-full border border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] transition-all duration-200 cursor-pointer relative active:scale-95"
            title="Inspect 3D Neural Topology"
          >
            <Activity className="w-4 h-4" />
          </button>

          <button
            id="btn-notifications-trigger"
            onClick={onOpenSettings}
            className="p-2 rounded-full border border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] transition-all duration-200 cursor-pointer relative active:scale-95"
            title="System Alerts & Bias Logs"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#9E382A] editorial-glow-rust" />
            )}
          </button>

          <button
            id="btn-settings-trigger"
            onClick={onOpenSettings}
            className="p-2 rounded-full border border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F7F2] transition-all duration-200 cursor-pointer active:scale-95"
            title="Neural Hyperparameters & Settings"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};
