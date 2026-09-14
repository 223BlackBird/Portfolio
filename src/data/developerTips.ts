// ---------------------------------------------------------------------------
// Predefined Developer & Debugging Tips
// Practical, concise, debugging-oriented Easter egg tips
// ---------------------------------------------------------------------------

export const DEVELOPER_TIPS: string[] = [
  "Check the logs before changing the code.",
  "Reproduce the bug before trying to fix it.",
  "Read the full error message.",
  "Check the network request first.",
  "Verify your assumptions with a quick test.",
  "Isolate the smallest failing case.",
  "Check what changed recently.",
  "Add a breakpoint before adding more logs.",
  "Test the API independently.",
  "Check the response status and body.",
  "Don't debug five things at once.",
  "Confirm the input before blaming the output.",
  "Check environment variables.",
  "Restarting isn't a diagnosis.",
  "Compare working vs failing cases.",
  "Check the database query directly.",
  "Read the stack trace from the bottom up.",
  "Log the value, not just the fact that it exists.",
  "Check types at the boundary.",
  "Make the bug reproducible.",
  "Fix the cause, not the symptom.",
  "Check whether the code path actually runs.",
  "Use git diff before guessing.",
  "Check the browser console.",
  "Check the server logs.",
  "Verify the deployed version.",
  "Question the first assumption.",
  "Small experiments beat big guesses.",
  "Rollback is also a debugging tool.",
  "Check timing when behavior seems random.",
  "Add observability before adding complexity.",
  "Clear the cache before questioning sanity.",
  "Check CORS and preflight headers.",
  "Inspect the payload before sending.",
  "One hypothesis at a time.",
  "Check for off-by-one errors.",
];

// Shuffle-bag system so tips don't repeat until all have been seen
let tipBag: string[] = [];

export function getNextDeveloperTip(): string {
  if (tipBag.length === 0) {
    tipBag = [...DEVELOPER_TIPS];
    // Fisher-Yates shuffle
    for (let i = tipBag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tipBag[i], tipBag[j]] = [tipBag[j], tipBag[i]];
    }
  }
  return tipBag.pop() || DEVELOPER_TIPS[0];
}
