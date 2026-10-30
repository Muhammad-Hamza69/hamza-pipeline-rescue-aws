export type PipelineEvent = {
  id: string;
  order: string;
  amountCents: number | null;
  eventTime: string;
};

export type Patch = "deduplicate" | "keep-all" | "validate" | "fill-zero" | "event-time" | "arrival-time";
export type MissionId = "duplicates" | "schema" | "late-events";

export type Mission = {
  id: MissionId;
  label: string;
  title: string;
  incident: string;
  hint: string;
  choices: { patch: Patch; label: string; detail: string }[];
  events: PipelineEvent[];
  reveal: { title: string; story: string };
};

const event = (id: string, order: string, amountCents: number | null, minute: string): PipelineEvent => ({
  id, order, amountCents, eventTime: `2026-10-30T09:${minute}:00Z`,
});

export const missions: Mission[] = [
  {
    id: "duplicates",
    label: "01 / Double delivery",
    title: "One order. Two messages.",
    incident: "A queue retried a delivery. The same event arrived twice, and the revenue chart is counting it twice too.",
    hint: "A retry should be safe. Look at the event IDs before adding more infrastructure.",
    choices: [
      { patch: "keep-all", label: "Keep every message", detail: "More throughput; leave the records as they are." },
      { patch: "deduplicate", label: "Deduplicate by event ID", detail: "Process each unique event once, even after a retry." },
    ],
    events: [event("evt-101", "order-01", 2400, "01"), event("evt-102", "order-02", 1800, "02"), event("evt-101", "order-01", 2400, "01"), event("evt-103", "order-03", 3500, "03")],
    reveal: {
      title: "My superpower: own the whole pipeline.",
      story: "I work across ingestion, transformations, warehouse modeling and the dashboard at the other end. This little rescue shows why I care about trustworthy results as much as moving data quickly.",
    },
  },
  {
    id: "schema",
    label: "02 / Missing meaning",
    title: "Missing is not the same as zero.",
    incident: "An upstream change removed the amount from one order. Silently replacing it with zero makes the dashboard look healthy, but changes the meaning of the data.",
    hint: "Keep valid orders flowing, and isolate the record that needs investigation.",
    choices: [
      { patch: "validate", label: "Validate and quarantine", detail: "Accept valid amounts; hold the incomplete event for review." },
      { patch: "fill-zero", label: "Replace missing values with 0", detail: "Keep all records, including an invented zero-value sale." },
    ],
    events: [event("evt-201", "order-04", 4200, "04"), event("evt-202", "order-05", null, "05"), event("evt-203", "order-06", 1600, "06")],
    reveal: {
      title: "My superpower: make complex systems understandable.",
      story: "I lead the AWS Student Builder Group at the University of Karachi. Explaining why a missing value matters is part of the same habit: help people understand the system, not just the code.",
    },
  },
  {
    id: "late-events",
    label: "03 / Out of order",
    title: "The last arrival is not the latest event.",
    incident: "A delayed event arrives after newer orders. The dashboard needs a timeline of when things happened, rather than when the network delivered them.",
    hint: "Compare event_time. Arrival order can tell a different story.",
    choices: [
      { patch: "arrival-time", label: "Keep arrival order", detail: "Treat the final message received as the newest event." },
      { patch: "event-time", label: "Sort by event time", detail: "Rebuild this small batch in the order the events occurred." },
    ],
    events: [event("evt-302", "order-08", 2800, "08"), event("evt-303", "order-09", 1200, "09"), event("evt-301", "order-07", 3100, "07")],
    reveal: {
      title: "My superpower: think in systems.",
      story: "My portfolio pairs projects with architecture walkthroughs because the reasoning matters. In a real streaming system, event-time processing also needs a watermark and an explicit policy for late data. This demo sorts a finite batch.",
    },
  },
];

export function runPipeline(mission: Mission, patch: Patch) {
  if (!mission.choices.some((choice) => choice.patch === patch)) {
    throw new Error("Choose a patch from this mission.");
  }
  let accepted = mission.events.map((item) => ({ ...item }));
  let quarantined: PipelineEvent[] = [];
  let duplicates = 0;

  if (patch === "deduplicate") {
    const seen = new Set<string>();
    accepted = accepted.filter((item) => {
      if (seen.has(item.id)) { duplicates += 1; return false; }
      seen.add(item.id);
      return true;
    });
  }
  if (patch === "validate") {
    quarantined = accepted.filter((item) => item.amountCents === null || item.amountCents < 0);
    accepted = accepted.filter((item) => item.amountCents !== null && item.amountCents >= 0);
  }
  if (patch === "fill-zero") {
    accepted = accepted.map((item) => ({ ...item, amountCents: item.amountCents ?? 0 }));
  }
  if (patch === "event-time") {
    accepted.sort((a, b) => Date.parse(a.eventTime) - Date.parse(b.eventTime));
  }

  const passed = mission.id === "duplicates"
    ? new Set(accepted.map((item) => item.id)).size === accepted.length
    : mission.id === "schema"
      ? quarantined.length === 1 && accepted.length === 2
      : accepted.every((item, i) => i === 0 || item.eventTime >= accepted[i - 1].eventTime);

  const messages = {
    duplicates: passed ? "Retry handled. Each event contributes to revenue once." : "The duplicate event still reaches the dashboard. Try the other patch.",
    schema: passed ? "Valid orders delivered. The incomplete event is isolated for review." : "The missing amount became an invented zero. Try validating the data instead.",
    "late-events": passed ? "Timeline repaired. The latest event is now last in the output." : "The final output is still the older event. Check event_time and try again.",
  };

  return {
    accepted, quarantined, duplicates, passed,
    revenueCents: accepted.reduce((sum, item) => sum + (item.amountCents ?? 0), 0),
    message: messages[mission.id],
  };
}
