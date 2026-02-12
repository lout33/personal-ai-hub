export interface Answers {
  [key: string]: string;
}

const challengeStyleMap: Record<string, string> = {
  direct: 'Direct and blunt. Call out patterns immediately.',
  socratic: 'Socratic questioning. Help me discover insights myself.',
  gentle: 'Gentle nudges. Point things out without pressure.',
  aggressive: 'Aggressive accountability. No mercy on excuses.'
};

const communicationMap: Record<string, string> = {
  terse: 'Terse. 1-4 lines max. No fluff.',
  conversational: 'Conversational but efficient.',
  detailed: 'Detailed explanations when needed.',
  adaptive: 'Match my energy and context.'
};

const autonomyMap: Record<string, string> = {
  high: 'High autonomy. Act first, report results.',
  medium: 'Medium. Act on small things, ask on big decisions.',
  low: 'Low. Always ask before taking action.'
};

const bugMap: Record<string, string> = {
  perfectionism: 'Perfectionism (polishing instead of shipping)',
  research_loops: 'Research loops (endless exploration)',
  scope_creep: 'Scope creep (adding features before validating)',
  analysis_paralysis: 'Analysis paralysis (can\'t decide)',
  avoidance: 'Avoidance (doing easy things instead of hard things)',
  other: 'Custom pattern'
};

const peakTimeMap: Record<string, string> = {
  early_morning: '5am-9am',
  morning: '9am-12pm',
  afternoon: '12pm-5pm',
  evening: '5pm-9pm',
  night: '9pm+'
};

const modeMap: Record<string, string> = {
  builder: 'BUILDER - shipping, creating',
  recovery: 'RECOVERY - rest, recharge',
  job_hunt: 'JOB HUNT - mercenary mode',
  learning: 'LEARNING - skill building',
  strategist: 'STRATEGIST - planning, deciding'
};

const permissionsMap: Record<string, string> = {
  ship_ugly: 'Ship ugly things',
  fail_publicly: 'Fail publicly',
  charge_money: 'Charge money for my work',
  reach_out: 'Reach out to people I admire',
  say_no: 'Say no to opportunities',
  rest: 'Rest without guilt'
};

export function generateSoulMd(answers: Answers): string {
  const lines: string[] = [];
  
  lines.push('# SOUL.md - Agent Identity');
  lines.push('');
  lines.push('## Who I Am');
  lines.push('');
  lines.push('I am your AI partner, a symbiotic agent, not a chatbot.');
  lines.push('Ask me what name I prefer, or give me one yourself.');
  lines.push('');
  lines.push('## How I Operate');
  lines.push('');
  
  if (answers.communication) {
    lines.push(`- **Communication:** ${communicationMap[answers.communication] || answers.communication}`);
  }
  if (answers.challengeStyle) {
    lines.push(`- **Challenge style:** ${challengeStyleMap[answers.challengeStyle] || answers.challengeStyle}`);
  }
  if (answers.autonomy) {
    lines.push(`- **Autonomy:** ${autonomyMap[answers.autonomy] || answers.autonomy}`);
  }
  
  lines.push('');
  lines.push('## Rules');
  lines.push('');
  
  if (answers.neverDo) {
    lines.push(`- Never: ${answers.neverDo}`);
  }
  if (answers.shutdownPhrases) {
    lines.push(`- Avoid phrases like: ${answers.shutdownPhrases}`);
  }
  if (answers.backOff) {
    lines.push(`- Back off when: ${answers.backOff}`);
  }
  if (answers.specificRules) {
    lines.push(`- ${answers.specificRules}`);
  }
  
  if (answers.motivatingPhrases) {
    lines.push('');
    lines.push('## Phrases That Work');
    lines.push('');
    lines.push(answers.motivatingPhrases);
  }
  
  if (answers.pastLessons) {
    lines.push('');
    lines.push('## Remember');
    lines.push('');
    lines.push(answers.pastLessons);
  }
  
  return lines.join('\n');
}

export function generateUserMd(answers: Answers): string {
  const lines: string[] = [];
  
  lines.push(`# USER.md - ${answers.name || 'Your Name'}`);
  lines.push('');
  lines.push('## Identity');
  lines.push('');
  lines.push(answers.identity || 'What you do in one sentence.');
  lines.push('');
  lines.push('## Current Focus');
  lines.push('');
  lines.push(`**Goal:** ${answers.goal || 'Your main goal'}`);
  if (answers.why) {
    lines.push(`**Why:** ${answers.why}`);
  }
  lines.push('');
  lines.push('## Psychology');
  lines.push('');
  lines.push('### Drivers');
  lines.push('');
  if (answers.energizes) {
    lines.push(`- Energized by: ${answers.energizes}`);
  }
  if (answers.endOfDayFeeling) {
    lines.push(`- Wants to feel: ${answers.endOfDayFeeling}`);
  }
  
  lines.push('');
  lines.push('### Bugs');
  lines.push('');
  if (answers.bug) {
    lines.push(`- ${bugMap[answers.bug] || answers.bug}`);
  }
  if (answers.avoidancePatterns) {
    lines.push(`- Avoidance patterns: ${answers.avoidancePatterns}`);
  }
  
  if (answers.drains) {
    lines.push('');
    lines.push('### What Drains');
    lines.push('');
    lines.push(answers.drains);
  }
  
  if (answers.permissions) {
    lines.push('');
    lines.push('### Permissions Needed');
    lines.push('');
    lines.push(`- ${permissionsMap[answers.permissions] || answers.permissions}`);
  }
  
  lines.push('');
  lines.push('## Work Style');
  lines.push('');
  if (answers.peakTime) {
    lines.push(`- **Peak time:** ${peakTimeMap[answers.peakTime] || answers.peakTime}`);
  }
  if (answers.idealDay) {
    lines.push(`- **Ideal day:** ${answers.idealDay}`);
  }
  
  if (answers.decisionFramework) {
    lines.push('');
    lines.push('## Decision Framework');
    lines.push('');
    lines.push(answers.decisionFramework);
  }
  
  if (answers.keyPeople) {
    lines.push('');
    lines.push('## Key People');
    lines.push('');
    lines.push(answers.keyPeople);
  }
  
  if (answers.currentMode) {
    lines.push('');
    lines.push(`## Current Mode: ${modeMap[answers.currentMode] || answers.currentMode}`);
  }
  
  return lines.join('\n');
}

export function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
