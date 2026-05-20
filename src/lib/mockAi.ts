// Lightweight mock generation for the first version of the UI.
// Replace these with real Lovable AI calls when wiring the backend.

export async function fakeDelay(ms = 700) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function mockEmail(opts: {
  recipient: string;
  tone: string;
  goal: string;
  context: string;
}) {
  await fakeDelay();
  const greet = opts.recipient ? `Hi ${opts.recipient},` : "Hi there,";
  return `Subject: ${opts.goal || "Quick follow-up"}

${greet}

I hope you're doing well. ${opts.context || "I wanted to follow up on our recent conversation."} 

The goal here is to ${opts.goal?.toLowerCase() || "align on next steps"}. Given the ${opts.tone.toLowerCase()} tone you'd like, here is a proposed path forward:

  • Confirm the scope and deliverables for this week
  • Identify any blockers we need to unblock together
  • Lock in a 20-minute sync to review progress

Let me know what works on your end and I'll send a calendar invite.

Best regards,
Alex`;
}

export async function mockSummary(transcript: string) {
  await fakeDelay();
  return `Key Takeaways
  • The team aligned on the primary goal and committed to delivery this week.
  • Engineering owns the technical estimates; design follows once scope is locked.
  • A follow-up sync is scheduled to review progress and unblock dependencies.

Action Items
  1. Owner: Sarah — Finalize budget draft by Friday.
  2. Owner: Mark — Share engineering estimates by EOD Wednesday.
  3. Owner: Team — Review final summary in Monday sync.

Decisions
  • Proceed with Q3 plan as proposed, pending estimate review.

(Source length: ${transcript.length} characters)`;
}

export async function mockTasks(goal: string) {
  await fakeDelay();
  return `Prioritized Plan — ${goal || "Today"}

P0 — Critical (do first)
  1. Review the highest-impact blocker and assign an owner.
  2. Send the morning status update to stakeholders.

P1 — Important (do today)
  3. Draft the proposal section due this week.
  4. Review and approve pending PRs / documents.

P2 — Useful (if time allows)
  5. Catch up on async threads, archive resolved items.
  6. Plan tomorrow's top 3 priorities before EOD.

Estimated focus time: 3h 45m`;
}

export async function mockResearch(topic: string) {
  await fakeDelay();
  return `Research Brief: ${topic || "Untitled topic"}

Overview
  A concise primer covering the current landscape, key players, and the
  forces shaping near-term direction. This summary is structured to help
  you make a decision quickly.

Key Findings
  1. The market is shifting toward AI-native workflows; adoption in enterprise
     teams grew meaningfully in the last 12 months.
  2. Differentiation increasingly comes from data quality and integration
     depth rather than raw model capability.
  3. Buyer concerns center on security, auditability, and human review.

Opportunities
  • Tighten the integration story with existing collaboration tools.
  • Offer transparent review and edit paths on every AI output.

Risks
  • Vendor consolidation may compress pricing for general-purpose tools.

Sources
  • Synthesized from public web overviews. Verify before citing.`;
}

export async function mockChat(message: string) {
  await fakeDelay(500);
  return `Here's a quick take on "${message}":

  • This is a first-version chatbot scaffold — wire it to Lovable AI to get real responses.
  • Each module on the left also runs on the same AI layer when connected.
  • Ask me to draft an email, summarize a meeting, or plan your day and I'll walk you through it.

What would you like to tackle next?`;
}
