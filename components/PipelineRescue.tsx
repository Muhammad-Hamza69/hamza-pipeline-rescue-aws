"use client";

import { useState } from "react";
import { ArrowRight, Check, Database, Lightbulb, Play, RotateCcw, ShieldCheck, Terminal, Zap } from "lucide-react";
import { missions, runPipeline, type MissionId, type Patch, type PipelineEvent } from "@/data/pipeline-rescue";

const money = (cents: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

function EventTable({ events, caption }: { events: PipelineEvent[]; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/30">
      <table className="w-full text-left font-mono text-xs sm:text-sm">
        <caption className="px-4 py-3 text-left text-xs font-sans text-zinc-400">{caption}</caption>
        <thead className="border-y border-white/10 text-zinc-400">
          <tr><th scope="col" className="px-4 py-2 font-normal">event_id</th><th scope="col" className="px-4 py-2 font-normal">amount</th><th scope="col" className="px-4 py-2 font-normal">event_time</th></tr>
        </thead>
        <tbody>
          {events.map((item, i) => (
            <tr key={`${item.id}-${i}`} className="border-b border-white/5 last:border-0 text-zinc-300">
              <td className="px-4 py-2.5">{item.id}</td>
              <td className={`px-4 py-2.5 ${item.amountCents === null ? "text-amber-300" : ""}`}>{item.amountCents === null ? "null" : money(item.amountCents)}</td>
              <td className="px-4 py-2.5">{item.eventTime.slice(11, 16)} UTC</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PipelineRescue() {
  const [missionIndex, setMissionIndex] = useState(0);
  const [patch, setPatch] = useState<Patch | null>(null);
  const [result, setResult] = useState<ReturnType<typeof runPipeline> | null>(null);
  const [completed, setCompleted] = useState<MissionId[]>([]);
  const [showHint, setShowHint] = useState(false);
  const mission = missions[missionIndex];

  function selectMission(index: number) {
    setMissionIndex(index);
    setPatch(null);
    setResult(null);
    setShowHint(false);
  }

  function run() {
    if (!patch) return;
    const output = runPipeline(mission, patch);
    setResult(output);
    if (output.passed) setCompleted((previous) => previous.includes(mission.id) ? previous : [...previous, mission.id]);
  }

  return (
    <section id="pipeline-rescue" aria-labelledby="rescue-heading" className="relative border-y border-blue-400/15 bg-[#080d18] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-blue-300"><Zap size={16} aria-hidden="true" /> A little of how my brain works</p>
            <h2 id="rescue-heading" className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Your turn. Rescue the pipeline.</h2>
            <p className="leading-relaxed text-zinc-400">Three tiny incidents. You pick the patch, the data actually changes, and a little more of my story unlocks. No engineering experience needed.</p>
          </div>
          <a href="#work" className="flex shrink-0 items-center gap-2 text-sm text-zinc-300 underline decoration-zinc-600 underline-offset-4 hover:text-white">Go straight to my projects <ArrowRight size={15} aria-hidden="true" /></a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1422] shadow-2xl shadow-blue-950/20">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-8">
            <span className="flex items-center gap-2 font-mono text-xs text-blue-200"><Terminal size={16} aria-hidden="true" /> hamza / pipeline-rescue</span>
            <span className="text-xs text-zinc-400">{completed.length} / 3 rescues complete · Browser simulation</span>
          </div>

          <div className="grid gap-2 border-b border-white/10 p-3 sm:grid-cols-3" role="group" aria-label="Choose a pipeline incident">
            {missions.map((item, index) => (
              <button key={item.id} type="button" aria-pressed={missionIndex === index} onClick={() => selectMission(index)} className={`flex min-h-11 items-center justify-between gap-2 rounded-lg px-4 py-3 text-left text-sm transition-colors ${missionIndex === index ? "bg-blue-500/15 text-blue-200 ring-1 ring-blue-400/40" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}>
                {item.label}{completed.includes(item.id) && <Check size={16} className="text-emerald-300" aria-label="Completed" />}
              </button>
            ))}
          </div>

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber-300">Incoming incident / {String(missionIndex + 1).padStart(2, "0")}</p>
              <h3 className="mb-3 text-2xl font-semibold text-white">{mission.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-zinc-400">{mission.incident}</p>
              <EventTable events={mission.events} caption="Incoming demo events, in arrival order" />
              <button type="button" aria-expanded={showHint} aria-controls="rescue-hint" onClick={() => setShowHint(!showHint)} className="mt-4 flex min-h-11 items-center gap-2 text-sm text-blue-300 hover:text-blue-200"><Lightbulb size={16} aria-hidden="true" />{showHint ? "Hide the clue" : "Need a clue?"}</button>
              {showHint && <p id="rescue-hint" className="rounded-lg border border-blue-400/20 bg-blue-400/5 p-4 text-sm leading-relaxed text-blue-100">{mission.hint}</p>}
            </div>

            <div>
              <fieldset>
                <legend className="mb-4 text-sm font-medium text-zinc-200">Choose your patch</legend>
                <div className="space-y-3">
                  {mission.choices.map((choice) => (
                    <label key={choice.patch} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${patch === choice.patch ? "border-blue-400/70 bg-blue-500/10" : "border-white/10 bg-black/10 hover:border-white/30"}`}>
                      <input type="radio" name="pipeline-patch" value={choice.patch} checked={patch === choice.patch} onChange={() => { setPatch(choice.patch); setResult(null); }} className="mt-1 h-4 w-4 shrink-0 accent-blue-400" />
                      <span><span className="block text-sm font-medium text-white">{choice.label}</span><span className="mt-1 block text-xs leading-relaxed text-zinc-400">{choice.detail}</span></span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="my-5 flex flex-wrap gap-3">
                <button type="button" onClick={run} disabled={!patch} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"><Play size={15} aria-hidden="true" /> Run pipeline</button>
                <button type="button" onClick={() => selectMission(missionIndex)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm text-zinc-300 hover:bg-white/5"><RotateCcw size={14} aria-hidden="true" /> Reset incident</button>
              </div>

              <div className="mb-5 grid grid-cols-3 items-center gap-2 rounded-xl border border-white/10 px-3 py-4 text-center text-xs text-zinc-400" aria-label="Pipeline: ingest, transform, dashboard">
                <span className="flex flex-col items-center gap-2"><Database size={19} className="text-blue-300" aria-hidden="true" /> Ingest</span>
                <span className="flex flex-col items-center gap-2"><Zap size={19} className={result ? "text-blue-300" : "text-zinc-600"} aria-hidden="true" /> Transform</span>
                <span className="flex flex-col items-center gap-2"><ShieldCheck size={19} className={result?.passed ? "text-emerald-300" : "text-zinc-600"} aria-hidden="true" /> Dashboard</span>
              </div>

              <div role="status" aria-live="polite" aria-atomic="true">
                {result ? <div className={`rounded-xl border p-4 text-sm leading-relaxed ${result.passed ? "border-emerald-400/25 bg-emerald-400/5 text-emerald-200" : "border-amber-400/25 bg-amber-400/5 text-amber-200"}`}><p className="mb-2 font-semibold">{result.passed ? "Pipeline recovered." : "Not quite. You can try again."}</p><p>{result.message}</p><p className="mt-3 font-mono text-xs">{result.accepted.length} delivered · {result.duplicates} duplicates removed · {result.quarantined.length} quarantined</p><p className="mt-2 font-mono text-xs">Demo revenue: {money(result.revenueCents)}</p></div> : <p className="rounded-xl border border-dashed border-white/15 p-4 text-sm leading-relaxed text-zinc-500">Select a patch and run the pipeline to inspect the result.</p>}
              </div>
            </div>
          </div>

          {result && <div className="border-t border-white/10 p-5 sm:p-8"><EventTable events={result.accepted} caption="Output after your patch" />{result.quarantined.length > 0 && <div className="mt-4"><EventTable events={result.quarantined} caption="Quarantine: held for investigation, excluded from the dashboard" /></div>}</div>}

          {result?.passed && <div className="border-t border-emerald-400/20 bg-emerald-400/5 p-5 sm:p-8" data-testid="personal-reveal"><p className="mb-2 text-xs font-medium uppercase tracking-widest text-emerald-300">Story unlocked / {completed.length === 3 ? "All systems understood" : "Meet the builder"}</p><h3 className="mb-3 text-xl font-semibold text-white">{mission.reveal.title}</h3><p className="max-w-3xl text-sm leading-relaxed text-zinc-300">{mission.reveal.story}</p><div className="mt-5 flex flex-wrap gap-5"><button type="button" onClick={() => selectMission((missionIndex + 1) % missions.length)} className="flex min-h-11 items-center gap-2 text-sm text-emerald-200 hover:text-white">{completed.length === 3 ? "Explore another incident" : "Try the next incident"}<ArrowRight size={15} aria-hidden="true" /></button><a href="#about" className="flex min-h-11 items-center text-sm text-zinc-300 underline underline-offset-4 hover:text-white">More about me</a></div></div>}
        </div>
        <p className="mt-5 text-xs leading-relaxed text-zinc-500">Illustrative data, calculated in your browser. No AWS API calls, real customer data or production performance claims. My real projects are just below.</p>
      </div>
    </section>
  );
}
