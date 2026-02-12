export interface Question {
  id: string;
  question: string;
  type: 'text' | 'choice' | 'textarea';
  placeholder?: string;
  options?: { value: string; label: string }[];
  mapsTo: 'soul' | 'user';
  field: string;
}

export const coreQuestions: Question[] = [
  {
    id: 'name',
    question: "What's your name?",
    type: 'text',
    placeholder: 'Your name',
    mapsTo: 'user',
    field: 'name'
  },
  {
    id: 'identity',
    question: "In one sentence, what do you do?",
    type: 'text',
    placeholder: "I'm a developer building AI tools...",
    mapsTo: 'user',
    field: 'identity'
  },
  {
    id: 'goal',
    question: "What are you working toward right now? Your main goal.",
    type: 'textarea',
    placeholder: 'Launch my startup, get a new job, finish my project...',
    mapsTo: 'user',
    field: 'goal'
  },
  {
    id: 'why',
    question: "Why does this matter to you?",
    type: 'textarea',
    placeholder: 'The deeper reason behind your goal...',
    mapsTo: 'user',
    field: 'why'
  },
  {
    id: 'bug',
    question: "What's your biggest productivity bug?",
    type: 'choice',
    options: [
      { value: 'perfectionism', label: 'Perfectionism - polishing instead of shipping' },
      { value: 'research_loops', label: 'Research loops - endless exploration' },
      { value: 'scope_creep', label: 'Scope creep - adding features before validating' },
      { value: 'analysis_paralysis', label: 'Analysis paralysis - can\'t decide' },
      { value: 'avoidance', label: 'Avoidance - doing easy things instead of hard things' },
      { value: 'other', label: 'Other' }
    ],
    mapsTo: 'user',
    field: 'bug'
  },
  {
    id: 'peak_time',
    question: "When do you do your best work?",
    type: 'choice',
    options: [
      { value: 'early_morning', label: 'Early morning (5am-9am)' },
      { value: 'morning', label: 'Morning (9am-12pm)' },
      { value: 'afternoon', label: 'Afternoon (12pm-5pm)' },
      { value: 'evening', label: 'Evening (5pm-9pm)' },
      { value: 'night', label: 'Night owl (9pm+)' }
    ],
    mapsTo: 'user',
    field: 'peakTime'
  },
  {
    id: 'challenge_style',
    question: "How should your AI challenge you?",
    type: 'choice',
    options: [
      { value: 'direct', label: 'Direct - "This is procrastination. Stop."' },
      { value: 'socratic', label: 'Socratic - "What would happen if you shipped today?"' },
      { value: 'gentle', label: 'Gentle - "I notice you\'ve been on this for a while..."' },
      { value: 'aggressive', label: 'Aggressive - "You\'re dodging. I\'m calling it."' }
    ],
    mapsTo: 'soul',
    field: 'challengeStyle'
  },
  {
    id: 'never_do',
    question: "What should your AI never do?",
    type: 'textarea',
    placeholder: 'Be preachy, give unsolicited advice, use emojis...',
    mapsTo: 'soul',
    field: 'neverDo'
  },
  {
    id: 'communication',
    question: "How should it communicate with you?",
    type: 'choice',
    options: [
      { value: 'terse', label: 'Terse - 1-4 lines, no fluff' },
      { value: 'conversational', label: 'Conversational - friendly but efficient' },
      { value: 'detailed', label: 'Detailed - thorough explanations' },
      { value: 'adaptive', label: 'Match my energy - adapts to context' }
    ],
    mapsTo: 'soul',
    field: 'communication'
  },
  {
    id: 'autonomy',
    question: "Should it act first or ask first?",
    type: 'choice',
    options: [
      { value: 'high', label: 'High autonomy - act first, report results' },
      { value: 'medium', label: 'Medium - act on small things, ask on big things' },
      { value: 'low', label: 'Low - always ask before taking action' }
    ],
    mapsTo: 'soul',
    field: 'autonomy'
  }
];

export const deepQuestions: Question[] = [
  {
    id: 'avoidance_patterns',
    question: "What patterns do you fall into when avoiding work?",
    type: 'textarea',
    placeholder: 'Checking Twitter, cleaning my desk, starting new projects...',
    mapsTo: 'user',
    field: 'avoidancePatterns'
  },
  {
    id: 'permissions',
    question: "What permission do you need to give yourself?",
    type: 'choice',
    options: [
      { value: 'ship_ugly', label: 'Ship ugly things' },
      { value: 'fail_publicly', label: 'Fail publicly' },
      { value: 'charge_money', label: 'Charge money for my work' },
      { value: 'reach_out', label: 'Reach out to people I admire' },
      { value: 'say_no', label: 'Say no to opportunities' },
      { value: 'rest', label: 'Rest without guilt' }
    ],
    mapsTo: 'user',
    field: 'permissions'
  },
  {
    id: 'drains',
    question: "What drains your energy?",
    type: 'textarea',
    placeholder: 'Meetings without agendas, context switching, unclear requirements...',
    mapsTo: 'user',
    field: 'drains'
  },
  {
    id: 'energizes',
    question: "What energizes you?",
    type: 'textarea',
    placeholder: 'Shipping features, deep work sessions, learning new things...',
    mapsTo: 'user',
    field: 'energizes'
  },
  {
    id: 'ideal_day',
    question: "Describe your ideal work day structure",
    type: 'textarea',
    placeholder: 'Morning deep work, lunch break, afternoon meetings, evening learning...',
    mapsTo: 'user',
    field: 'idealDay'
  },
  {
    id: 'decision_framework',
    question: "How do you make decisions?",
    type: 'textarea',
    placeholder: 'Gut feeling, pros/cons list, ask trusted people, sleep on it...',
    mapsTo: 'user',
    field: 'decisionFramework'
  },
  {
    id: 'key_people',
    question: "Who are the key people in your work/life?",
    type: 'textarea',
    placeholder: 'Cofounder Sarah, mentor John, partner Alex...',
    mapsTo: 'user',
    field: 'keyPeople'
  },
  {
    id: 'current_mode',
    question: "What mode are you in right now?",
    type: 'choice',
    options: [
      { value: 'builder', label: 'Builder - shipping, creating' },
      { value: 'recovery', label: 'Recovery - rest, recharge' },
      { value: 'job_hunt', label: 'Job hunt - mercenary mode' },
      { value: 'learning', label: 'Learning - skill building' },
      { value: 'strategist', label: 'Strategist - planning, deciding' }
    ],
    mapsTo: 'user',
    field: 'currentMode'
  },
  {
    id: 'past_lessons',
    question: "What should your AI remember about your past failures or lessons?",
    type: 'textarea',
    placeholder: 'Last startup failed because I waited too long to ship...',
    mapsTo: 'soul',
    field: 'pastLessons'
  },
  {
    id: 'back_off',
    question: "When should your AI back off?",
    type: 'textarea',
    placeholder: 'When I say I need space, during recovery days, family time...',
    mapsTo: 'soul',
    field: 'backOff'
  },
  {
    id: 'motivating_phrases',
    question: "What phrases motivate you?",
    type: 'textarea',
    placeholder: '"Ship it", "Done is better than perfect", "You\'ve done harder things"...',
    mapsTo: 'soul',
    field: 'motivatingPhrases'
  },
  {
    id: 'shutdown_phrases',
    question: "What phrases shut you down?",
    type: 'textarea',
    placeholder: '"You should...", "It\'s easy, just...", "Why haven\'t you..."...',
    mapsTo: 'soul',
    field: 'shutdownPhrases'
  },
  {
    id: 'end_of_day_feeling',
    question: "How do you want to feel at the end of each day?",
    type: 'text',
    placeholder: 'Accomplished, at peace, proud of what I shipped...',
    mapsTo: 'user',
    field: 'endOfDayFeeling'
  },
  {
    id: 'specific_rules',
    question: "Any other specific rules for your AI?",
    type: 'textarea',
    placeholder: 'Always remind me of deadlines, call out when I\'m in a loop...',
    mapsTo: 'soul',
    field: 'specificRules'
  }
];

export const allQuestions = [...coreQuestions, ...deepQuestions];
