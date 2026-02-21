export interface ModelProfile {
  id: 'claude' | 'gpt' | 'gemini';
  name: string;
  archetype: string;
  tagline: string;
  description: string;
  strengths: string[];
  bestFor: string;
  color: string;
  icon: string;
}

export const models: Record<string, ModelProfile> = {
  claude: {
    id: 'claude',
    name: 'Claude',
    archetype: 'The Challenger',
    tagline: 'Thinks with you, not for you',
    description: 'You want an AI that pushes back, explores nuance, and matches your creative intensity. Claude excels at understanding context, challenging assumptions, and helping you think through complex problems.',
    strengths: [
      'Pushes back on weak ideas',
      'Handles nuance and ambiguity',
      'Strong creative writing',
      'Deep reasoning',
      'Honest about limitations'
    ],
    bestFor: 'Creative thinkers, writers, builders who want a thought partner, not just an executor.',
    color: '#D97706',
    icon: '🧠'
  },
  gpt: {
    id: 'gpt',
    name: 'GPT-4',
    archetype: 'The Analyst',
    tagline: 'Structured, thorough, reliable',
    description: 'You value comprehensive, well-organized responses. GPT-4 excels at structured analysis, detailed explanations, and methodical problem-solving.',
    strengths: [
      'Comprehensive analysis',
      'Well-structured outputs',
      'Broad knowledge base',
      'Consistent quality',
      'Good at following formats'
    ],
    bestFor: 'Researchers, analysts, professionals who need thorough, well-organized outputs.',
    color: '#10B981',
    icon: '📊'
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    archetype: 'The Speedrunner',
    tagline: 'Fast, functional, gets it done',
    description: 'You want speed and efficiency over conversation. Gemini excels at quick execution, large context handling, and getting straight to the output.',
    strengths: [
      'Extremely fast responses',
      'Massive context window',
      'Strong at code',
      'Efficient and direct',
      'Great for technical tasks'
    ],
    bestFor: 'Developers, technical workers, anyone who values speed and can verify outputs themselves.',
    color: '#3B82F6',
    icon: '⚡'
  }
};

export function getModel(id: string): ModelProfile {
  return models[id] || models.claude;
}

export function getRunnerUp(scores: { claude: number; gpt: number; gemini: number }, winner: string): ModelProfile {
  const entries = Object.entries(scores) as [string, number][];
  entries.sort((a, b) => b[1] - a[1]);
  const runnerUpId = entries[1][0];
  return models[runnerUpId];
}
