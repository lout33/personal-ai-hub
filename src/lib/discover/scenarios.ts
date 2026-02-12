export interface Choice {
  id: string;
  label: string;
  pattern?: string;
  followUp?: FollowUp;
}

export interface FollowUp {
  question: string;
  type: 'text' | 'choice';
  placeholder?: string;
  minChars?: number;
  choices?: Choice[];
}

export interface Scenario {
  id: string;
  title: string;
  question: string;
  choices: Choice[];
  insight?: (choiceId: string, followUpAnswer?: string) => string;
  bridge?: (choiceId: string) => string;
}

export const scenarios: Scenario[] = [
  {
    id: 'stuck_moment',
    title: 'The Stuck Moment',
    question: "It's 2pm. You planned to finish something important by noon. What are you most likely doing right now?",
    choices: [
      {
        id: 'researching',
        label: 'Researching or learning more about it',
        pattern: 'research_loops',
        followUp: {
          question: "What specifically are you researching? Be honest.",
          type: 'text',
          placeholder: 'e.g., "Looking at how others solved similar problems"',
          minChars: 10
        }
      },
      {
        id: 'other_task',
        label: 'Working on something else that feels urgent',
        pattern: 'avoidance',
        followUp: {
          question: "What's that other task? And why does it feel more urgent?",
          type: 'text',
          placeholder: 'Be specific...',
          minChars: 10
        }
      },
      {
        id: 'break',
        label: 'Taking a break (social media, news, snacks)',
        pattern: 'avoidance',
        followUp: {
          question: "How long have you been on this 'break'?",
          type: 'choice',
          choices: [
            { id: '15min', label: 'Less than 15 minutes' },
            { id: '30min', label: '15-30 minutes' },
            { id: '1hr', label: '30 min to 1 hour' },
            { id: 'more', label: 'More than an hour', pattern: 'avoidance' }
          ]
        }
      },
      {
        id: 'tweaking',
        label: 'Tweaking or polishing what I already have',
        pattern: 'perfectionism',
        followUp: {
          question: "What exactly are you tweaking? Be specific.",
          type: 'text',
          placeholder: 'e.g., "Adjusting the colors", "Rewriting the intro"',
          minChars: 10
        }
      },
      {
        id: 'working',
        label: "Still working on it, just slower than expected",
        followUp: {
          question: "What's slowing you down?",
          type: 'choice',
          choices: [
            { id: 'hard', label: "It's harder than I thought" },
            { id: 'unclear', label: "I'm not sure what 'done' looks like", pattern: 'analysis_paralysis' },
            { id: 'distracted', label: 'Keep getting distracted', pattern: 'avoidance' },
            { id: 'perfectionism', label: 'Want to get it right', pattern: 'perfectionism' }
          ]
        }
      }
    ],
    insight: (choiceId) => {
      const insights: Record<string, string> = {
        researching: "Research loops. You use learning as productive procrastination.",
        other_task: "Task switching. You escape to 'urgent' things when the real task is hard.",
        break: "Break drift. Short breaks expand when the task feels heavy.",
        tweaking: "Perfectionism. You polish instead of ship when you're unsure.",
        working: "Good sign you're still engaged, but something's creating friction."
      };
      return insights[choiceId] || '';
    },
    bridge: (choiceId) => {
      const bridges: Record<string, string> = {
        researching: "Your AI can notice when you've been 'researching' for hours and ask: 'Do you have enough to start? What's actually unclear?'",
        other_task: "Your AI can call this out: 'You switched tasks. What's hard about the original one?'",
        break: "Your AI can check in: 'Break started 45 min ago. Ready to re-engage, or do you need to talk about what's blocking you?'",
        tweaking: "Your AI can push: 'This was done yesterday. What are you afraid they'll say?'",
        working: "Your AI can help identify the friction and clear it."
      };
      return bridges[choiceId] || '';
    }
  },
  {
    id: 'feedback_moment',
    title: 'The Feedback Moment',
    question: "Someone gives you critical feedback on your work. What's your gut reaction?",
    choices: [
      {
        id: 'defend',
        label: 'Defend or explain why I did it that way',
        pattern: 'defensiveness',
        followUp: {
          question: "What do you usually say when defending?",
          type: 'text',
          placeholder: 'e.g., "Well, I did it this way because..."',
          minChars: 10
        }
      },
      {
        id: 'agree_bad',
        label: 'Immediately agree and feel bad about myself',
        pattern: 'harsh_self_critic',
        followUp: {
          question: "What does your inner voice say in that moment?",
          type: 'text',
          placeholder: "e.g., \"I knew this wasn't good enough\"",
          minChars: 10
        }
      },
      {
        id: 'quiet',
        label: 'Get quiet and process internally',
        followUp: {
          question: "Do you usually come back with a response later, or let it go?",
          type: 'choice',
          choices: [
            { id: 'comeback', label: 'Come back with thoughts later' },
            { id: 'letgo', label: 'Usually let it go' },
            { id: 'depends', label: 'Depends on who gave the feedback' }
          ]
        }
      },
      {
        id: 'clarify',
        label: 'Ask clarifying questions',
        followUp: {
          question: "What kind of questions do you ask?",
          type: 'text',
          placeholder: 'e.g., "Can you give me a specific example?"',
          minChars: 10
        }
      },
      {
        id: 'dismiss',
        label: "Dismiss it internally but say 'thanks'",
        pattern: 'dismissive',
        followUp: {
          question: "What makes you dismiss feedback?",
          type: 'choice',
          choices: [
            { id: 'source', label: "Don't trust the source" },
            { id: 'wrong', label: "I know they're wrong" },
            { id: 'protection', label: "It's easier than engaging", pattern: 'avoidance' }
          ]
        }
      }
    ],
    insight: (choiceId) => {
      const insights: Record<string, string> = {
        defend: "Defensive reflex. You protect your work before processing the feedback.",
        agree_bad: "Harsh inner critic. You absorb criticism deeply, sometimes too deeply.",
        quiet: "Internal processor. You need space before responding.",
        clarify: "Curious receiver. You want to understand before reacting.",
        dismiss: "Protective dismissal. Feedback feels threatening."
      };
      return insights[choiceId] || '';
    },
    bridge: (choiceId) => {
      const bridges: Record<string, string> = {
        defend: "Your AI will give feedback differently: facts first, then ask what you think, rather than leading with criticism.",
        agree_bad: "Your AI will balance challenges with recognition. It won't pile on.",
        quiet: "Your AI can give you space: share observations, then check in later.",
        clarify: "Your AI can lead with specifics and examples, matching your style.",
        dismiss: "Your AI will earn trust by being right more often than wrong."
      };
      return bridges[choiceId] || '';
    }
  },
  {
    id: 'delayed_task',
    title: 'The Delayed Task',
    question: "Think of something you've been meaning to do for over a month but haven't. What is it?",
    choices: [
      {
        id: 'text_input',
        label: '_text_',
        followUp: {
          question: "What's actually stopping you?",
          type: 'choice',
          choices: [
            { id: 'start', label: "Not sure where to start", pattern: 'analysis_paralysis' },
            { id: 'moment', label: 'Waiting for the right moment', pattern: 'perfectionism' },
            { id: 'priority', label: 'Other things keep taking priority', pattern: 'avoidance' },
            { id: 'afraid', label: "Afraid it won't turn out well", pattern: 'fear_of_failure' },
            { id: 'want', label: "Honestly, I don't really want to do it" }
          ]
        }
      }
    ],
    insight: (choiceId, followUpAnswer) => {
      const insights: Record<string, string> = {
        start: "Clarity blocker. The first step feels unclear, so you wait.",
        moment: "Perfect moment fallacy. The right time rarely comes on its own.",
        priority: "Priority shuffle. Important but not urgent keeps losing.",
        afraid: "Fear of outcome. You'd rather not try than try and fail.",
        want: "Honest clarity. Sometimes the answer is to drop it."
      };
      return insights[followUpAnswer || choiceId] || '';
    },
    bridge: (choiceId) => {
      const bridges: Record<string, string> = {
        start: "Your AI can break it down: 'What's the smallest first step you could do in 5 minutes?'",
        moment: "Your AI can push: 'The right moment is now. What would 'good enough' look like?'",
        priority: "Your AI can protect this task: 'This has been on your list for 6 weeks. Today?'",
        afraid: "Your AI can reframe: 'What's the worst realistic outcome? Can you survive that?'",
        want: "Your AI can help you drop things guilt-free: 'Is this actually important, or just lingering?'"
      };
      return bridges[choiceId] || '';
    }
  },
  {
    id: 'energy_moment',
    title: 'The Energy Moment',
    question: "When do you feel most alive and energized at work?",
    choices: [
      {
        id: 'starting',
        label: 'Starting something new',
        pattern: 'starter',
        followUp: {
          question: "What's exciting about the start?",
          type: 'text',
          placeholder: 'e.g., "The possibilities, no constraints yet"',
          minChars: 10
        }
      },
      {
        id: 'finishing',
        label: 'Finishing and shipping something',
        pattern: 'finisher',
        followUp: {
          question: "Describe how shipping feels.",
          type: 'text',
          placeholder: 'e.g., "Relief, pride, finally done"',
          minChars: 10
        }
      },
      {
        id: 'solving',
        label: 'Solving a hard problem',
        pattern: 'problem_solver',
        followUp: {
          question: "What kind of problems grab you?",
          type: 'text',
          placeholder: 'e.g., "Technical puzzles", "People problems"',
          minChars: 10
        }
      },
      {
        id: 'helping',
        label: 'Helping someone else succeed',
        pattern: 'helper',
        followUp: {
          question: "Who do you most like helping?",
          type: 'text',
          placeholder: 'e.g., "Junior devs", "Teammates stuck on problems"',
          minChars: 10
        }
      },
      {
        id: 'learning',
        label: 'Learning something new',
        pattern: 'learner',
        followUp: {
          question: "What are you learning right now?",
          type: 'text',
          placeholder: 'e.g., "Rust", "How to manage people"',
          minChars: 10
        }
      }
    ],
    insight: (choiceId) => {
      const insights: Record<string, string> = {
        starting: "Starter energy. You love the blank canvas and possibilities.",
        finishing: "Finisher energy. You live for the moment it's done and out.",
        solving: "Problem solver. The puzzle is the reward.",
        helping: "Helper energy. Impact through others energizes you.",
        learning: "Learner energy. Growth and novelty drive you."
      };
      return insights[choiceId] || '';
    },
    bridge: (choiceId) => {
      const bridges: Record<string, string> = {
        starting: "Your AI can help you finish what you start, since that's where you lose steam.",
        finishing: "Your AI can help you push through the messy middle to get to the finish line you love.",
        solving: "Your AI can frame tasks as puzzles and challenges to engage your problem-solving drive.",
        helping: "Your AI can remind you to help yourself too, not just others.",
        learning: "Your AI can balance learning with doing, so learning doesn't become avoidance."
      };
      return bridges[choiceId] || '';
    }
  },
  {
    id: 'challenge_style',
    title: 'The Challenge Style',
    question: "Imagine your AI notices you're avoiding the hard task. Which response would actually work on you?",
    choices: [
      {
        id: 'direct',
        label: "\"You're avoiding this. What's the real blocker?\"",
        followUp: {
          question: "What phrase would shut you down? (Your AI will avoid this)",
          type: 'text',
          placeholder: "e.g., \"Why haven't you done this yet?\"",
          minChars: 5
        }
      },
      {
        id: 'gentle',
        label: "\"I notice you've been on other tasks. Want to talk about it?\"",
        followUp: {
          question: "What phrase would shut you down?",
          type: 'text',
          placeholder: 'e.g., "You should just do it"',
          minChars: 5
        }
      },
      {
        id: 'deadline',
        label: '"The deadline is in 2 days. What needs to happen today?"',
        followUp: {
          question: "What phrase would shut you down?",
          type: 'text',
          placeholder: "e.g., \"You're running out of time\"",
          minChars: 5
        }
      },
      {
        id: 'reframe',
        label: "\"You've done harder things. What would good enough look like?\"",
        followUp: {
          question: "What phrase would shut you down?",
          type: 'text',
          placeholder: "e.g., \"It's not that hard\"",
          minChars: 5
        }
      }
    ],
    insight: (choiceId) => {
      const insights: Record<string, string> = {
        direct: "Direct accountability. You respond to clear, no-BS callouts.",
        gentle: "Gentle inquiry. You need space to process, not pressure.",
        deadline: "Deadline-driven. External constraints focus you.",
        reframe: "Perspective shifts. Reframing helps more than pushing."
      };
      return insights[choiceId] || '';
    },
    bridge: (choiceId) => {
      const bridges: Record<string, string> = {
        direct: "Your AI will be direct when it matters, cutting through avoidance.",
        gentle: "Your AI will invite reflection rather than demand action.",
        deadline: "Your AI will use time and deadlines to create helpful pressure.",
        reframe: "Your AI will help you see things differently when you're stuck."
      };
      return bridges[choiceId] || '';
    }
  }
];

export interface PatternCount {
  [key: string]: number;
}

export const patternDescriptions: Record<string, { name: string; description: string }> = {
  research_loops: {
    name: 'Research Loops',
    description: 'You use learning as productive procrastination. When unsure, you research instead of starting.'
  },
  perfectionism: {
    name: 'Perfectionism',
    description: 'You polish instead of ship. "Almost ready" can last for days.'
  },
  avoidance: {
    name: 'Avoidance',
    description: 'You escape to easier tasks when the real task feels hard or uncertain.'
  },
  analysis_paralysis: {
    name: 'Analysis Paralysis',
    description: "You wait for clarity that won't come. The first step feels impossible."
  },
  fear_of_failure: {
    name: 'Fear of Failure',
    description: "You'd rather not try than try and fail. The stakes feel too high."
  },
  defensiveness: {
    name: 'Defensiveness',
    description: 'You protect your work before processing feedback. Explanation before reflection.'
  },
  harsh_self_critic: {
    name: 'Harsh Self-Critic',
    description: 'You absorb criticism deeply, sometimes too deeply. Your inner voice is tough.'
  },
  starter: {
    name: 'Starter Energy',
    description: 'You love beginnings and possibilities. Finishing is where you lose steam.'
  },
  finisher: {
    name: 'Finisher Energy',
    description: 'You live for completion. The messy middle is the challenge.'
  },
  problem_solver: {
    name: 'Problem Solver',
    description: 'The puzzle is the reward. You engage deeply with hard problems.'
  },
  learner: {
    name: 'Learner',
    description: "Growth and novelty drive you. Watch that learning doesn't become avoidance."
  }
};
