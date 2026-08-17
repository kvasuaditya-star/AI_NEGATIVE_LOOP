export interface BiasMetric {
  positiveVolume: number;
  negativeVolume: number;
  positiveWeight: number;
  negativeWeight: number;
  amplificationFactor: number;
}

export interface AmplificationStage {
  id: 'friction' | 'bias' | 'optimization' | 'skew';
  title: string;
  subtitle: string;
  description: string;
  neuralMechanism: string;
  metricLabel: string;
  metricValue: string;
  status: 'critical' | 'active' | 'evaluating';
  color: string;
}

export interface RiskCardData {
  id: string;
  title: string;
  severity: string;
  severityClass: string;
  badgeClass: string;
  icon: string;
  description: string;
  technicalDetails: string;
  impactScore: number;
  realWorldExample: string;
}

export interface MitigationMethod {
  id: string;
  name: string;
  category: string;
  reductionPercentage: number;
  description: string;
  mathematicalFormula: string;
  active: boolean;
}

export interface DiagnosticSample {
  id: string;
  title: string;
  text: string;
  category: 'Social Media' | 'Threat Detection' | 'Recommendation' | 'News Aggregator';
  rawNegativeWeight: number;
  rawPositiveWeight: number;
  mitigatedNegativeWeight: number;
  mitigatedPositiveWeight: number;
  biasAnalysis: string;
}
