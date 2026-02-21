export interface BenchmarkOption {
  id: string;
  label: string;
  scores: {
    claude: number;
    gpt: number;
    gemini: number;
  };
}

export interface BenchmarkQuestion {
  id: string;
  question: string;
  subtext?: string;
  options: BenchmarkOption[];
}

export const questions: BenchmarkQuestion[] = [
  {
    id: "response_style",
    question: "How do you prefer AI responses?",
    subtext: "Think about what actually helps you, not what sounds good.",
    options: [
      {
        id: "concise",
        label: "Short and direct. Get to the point.",
        scores: { claude: 1, gpt: 0, gemini: 3 }
      },
      {
        id: "balanced",
        label: "Balanced. Enough detail without overwhelming.",
        scores: { claude: 3, gpt: 2, gemini: 1 }
      },
      {
        id: "detailed",
        label: "Thorough and comprehensive. I want depth.",
        scores: { claude: 2, gpt: 3, gemini: 0 }
      }
    ]
  },
  {
    id: "pushback",
    question: "When you share an idea, what do you want?",
    options: [
      {
        id: "challenge",
        label: "Challenge it. Poke holes. Make it stronger.",
        scores: { claude: 3, gpt: 1, gemini: 1 }
      },
      {
        id: "build",
        label: "Build on it. Help me develop it further.",
        scores: { claude: 2, gpt: 3, gemini: 1 }
      },
      {
        id: "execute",
        label: "Just help me execute. Less talk, more code.",
        scores: { claude: 1, gpt: 1, gemini: 3 }
      }
    ]
  },
  {
    id: "thinking_style",
    question: "How do you approach problems?",
    options: [
      {
        id: "explore",
        label: "Explore all angles before deciding.",
        scores: { claude: 3, gpt: 2, gemini: 0 }
      },
      {
        id: "structured",
        label: "Structured breakdown. Step by step.",
        scores: { claude: 1, gpt: 3, gemini: 2 }
      },
      {
        id: "fast",
        label: "Move fast. Iterate based on results.",
        scores: { claude: 1, gpt: 1, gemini: 3 }
      }
    ]
  },
  {
    id: "work_type",
    question: "What do you mostly use AI for?",
    options: [
      {
        id: "coding",
        label: "Writing and debugging code.",
        scores: { claude: 2, gpt: 1, gemini: 3 }
      },
      {
        id: "writing",
        label: "Writing, editing, and content.",
        scores: { claude: 3, gpt: 2, gemini: 0 }
      },
      {
        id: "research",
        label: "Research and analysis.",
        scores: { claude: 2, gpt: 3, gemini: 2 }
      },
      {
        id: "mixed",
        label: "Everything. I need a generalist.",
        scores: { claude: 3, gpt: 2, gemini: 1 }
      }
    ]
  },
  {
    id: "personality",
    question: "What kind of AI personality do you prefer?",
    options: [
      {
        id: "warm",
        label: "Has personality. Feels like a collaborator.",
        scores: { claude: 3, gpt: 2, gemini: 0 }
      },
      {
        id: "neutral",
        label: "Professional and neutral. Just the facts.",
        scores: { claude: 1, gpt: 3, gemini: 2 }
      },
      {
        id: "functional",
        label: "Don't care. Just be fast and accurate.",
        scores: { claude: 0, gpt: 1, gemini: 3 }
      }
    ]
  },
  {
    id: "context_needs",
    question: "How much context do you typically give?",
    subtext: "Think about your average conversation, not the ideal.",
    options: [
      {
        id: "minimal",
        label: "Minimal. I expect it to figure things out.",
        scores: { claude: 2, gpt: 3, gemini: 1 }
      },
      {
        id: "moderate",
        label: "Moderate. I give enough to be clear.",
        scores: { claude: 3, gpt: 2, gemini: 2 }
      },
      {
        id: "extensive",
        label: "Extensive. I dump entire files and docs.",
        scores: { claude: 1, gpt: 0, gemini: 3 }
      }
    ]
  },
  {
    id: "error_handling",
    question: "When the AI makes a mistake, you want it to:",
    options: [
      {
        id: "acknowledge",
        label: "Acknowledge it clearly and explain why.",
        scores: { claude: 3, gpt: 2, gemini: 1 }
      },
      {
        id: "fix",
        label: "Just fix it quickly. No need to explain.",
        scores: { claude: 1, gpt: 1, gemini: 3 }
      },
      {
        id: "prevent",
        label: "Be more careful in the first place.",
        scores: { claude: 2, gpt: 3, gemini: 1 }
      }
    ]
  },
  {
    id: "creative_vs_accurate",
    question: "What matters more?",
    options: [
      {
        id: "creative",
        label: "Creativity and novel approaches.",
        scores: { claude: 3, gpt: 2, gemini: 1 }
      },
      {
        id: "accurate",
        label: "Accuracy and reliability.",
        scores: { claude: 2, gpt: 3, gemini: 2 }
      },
      {
        id: "speed",
        label: "Speed. I'll verify myself.",
        scores: { claude: 0, gpt: 1, gemini: 3 }
      }
    ]
  }
];

export function calculateScores(answers: Record<string, string>): { claude: number; gpt: number; gemini: number } {
  const scores = { claude: 0, gpt: 0, gemini: 0 };
  
  for (const question of questions) {
    const answerId = answers[question.id];
    if (answerId) {
      const option = question.options.find(o => o.id === answerId);
      if (option) {
        scores.claude += option.scores.claude;
        scores.gpt += option.scores.gpt;
        scores.gemini += option.scores.gemini;
      }
    }
  }
  
  return scores;
}

export function getWinner(scores: { claude: number; gpt: number; gemini: number }): 'claude' | 'gpt' | 'gemini' {
  const entries = Object.entries(scores) as [('claude' | 'gpt' | 'gemini'), number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

export function getMatchPercentage(scores: { claude: number; gpt: number; gemini: number }, winner: string): number {
  const total = scores.claude + scores.gpt + scores.gemini;
  if (total === 0) return 0;
  const winnerScore = scores[winner as keyof typeof scores];
  // Scale to 60-98% range for more realistic feeling
  const rawPercentage = (winnerScore / total) * 100;
  return Math.round(60 + (rawPercentage * 0.38));
}
