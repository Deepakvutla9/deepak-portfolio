"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "./Reveal";

const projects = [
  {
    title: "Project Aurora",
    tag: "Full-Stack Web Platform",
    role: "Solo Full-Stack Developer",
    year: "Available on Request",
    accent: "linear-gradient(135deg,#8b5cf6,#ff8a5c)",
    emoji: "✦",
    blurb: "A full-stack web platform pairing thoughtful UX with AI-powered matching.",
    challenge:
      "A people-first marketplace where the right connections were buried under noise and slow, manual searching.",
    process:
      "I designed the information architecture and data model, then layered AI-powered ranking so users reach the right result with far less friction.",
    solution:
      "A responsive, real-time web app with a clean dashboard, rich profiles, and smart, context-aware results.",
    did: [
      "Built the full app end-to-end in React + Vite — UI, state, and data flow",
      "Designed the database schema and auth on a Supabase (Postgres) backend",
      "Integrated the Gemini API to power natural-language matching & ranking",
      "Implemented responsive, accessible layouts and a real-time dashboard",
    ],
    results: ["Faster discovery", "Structured data layer", "AI-driven matching"],
    stack: ["React", "Vite", "Supabase", "Gemini API", "Tailwind"],
  },
  {
    title: "Project Atlas",
    tag: "Desktop Automation",
    role: "Solo Developer — Desktop & Automation",
    year: "Available on Request",
    accent: "linear-gradient(135deg,#46e7ff,#8b5cf6)",
    emoji: "◆",
    blurb: "A cross-platform desktop tool that automates repetitive, high-volume workflows.",
    challenge:
      "A daily workflow drowning in repetitive manual steps — slow, tedious, and error-prone.",
    process:
      "I built an automation engine that handles the busywork while keeping a human in the loop for the decisions that actually matter.",
    solution:
      "A cross-platform Electron desktop app orchestrating a reliable pipeline behind a calm monitoring interface.",
    did: [
      "Architected and built a cross-platform desktop app with Electron",
      "Engineered an automation pipeline that processes tasks at scale",
      "Designed a monitoring UI with live status, logs, and a full audit trail",
      "Handled packaging, error recovery, and human-in-the-loop checkpoints",
    ],
    results: ["Hours saved daily", "Higher throughput", "Full audit trail"],
    stack: ["Electron", "Node.js", "JavaScript", "Automation"],
  },
  {
    title: "Project Echo",
    tag: "Conversational Voice AI",
    role: "AI / Front-End Developer",
    year: "Available on Request",
    accent: "linear-gradient(135deg,#ff8a5c,#ff5cad)",
    emoji: "❖",
    blurb: "A natural, voice-first assistant designed to feel human, not robotic.",
    challenge:
      "Voice interfaces that felt stiff and impersonal — and underserved certain users entirely.",
    process:
      "I engineered a conversation flow around real intent, balancing LLM reasoning with expressive, natural-sounding speech.",
    solution:
      "A real-time voice interface with fluid turn-taking, intent handling, and confident task completion.",
    did: [
      "Built the real-time voice UI in React with live speech in/out",
      "Integrated LLMs (Gemini) for reasoning and intent recognition",
      "Wired up speech-to-text and natural TTS for expressive responses",
      "Designed the dialogue flow, fallbacks, and task-completion logic",
    ],
    results: ["Natural conversation", "Inclusive by design", "Reliable task flow"],
    stack: ["React", "Gemini API", "Voice AI", "Speech / TTS"],
  },
  {
    title: "Project Vesper",
    tag: "Monitoring & Optimization Engine",
    role: "Backend / Automation Developer",
    year: "Available on Request",
    accent: "linear-gradient(135deg,#c6ff3f,#46e7ff)",
    emoji: "✺",
    blurb: "A monitoring and optimization engine that surfaces the best option, automatically.",
    challenge:
      "A scarce resource that required constant manual watching to ever catch a good opening.",
    process:
      "I built a monitoring layer that continuously evaluates availability and ranks options against user preferences.",
    solution:
      "A lightweight Node engine that does the watching and the deciding, so people don't have to.",
    did: [
      "Built a resilient data-collection & monitoring engine in Node.js",
      "Wrote a scoring algorithm to rank options by user-defined preferences",
      "Added scheduling, retries, and notifications for hands-off running",
      "Optimized for reliability and low resource usage over long sessions",
    ],
    results: ["Zero manual watching", "Optimal selection", "Time reclaimed"],
    stack: ["Node.js", "Web Scraping", "Algorithms", "Automation"],
  },
];

function Card({ p, onOpen }) {
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * 8, ry: px * 10 });
    ref.current.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    ref.current.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };
  return (
    <motion.button
      ref={ref}
      onMouseMove={move}
      onMouseEnter={() => window.dispatchEvent(new Event("project-hover"))}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      onClick={() => onOpen(p)}
      className="interactive group relative block w-full overflow-hidden rounded-3xl border border-white/8 p-8 text-left"
      style={{
        transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform .2s ease-out",
        background:
          "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(168,85,247,0.12), transparent 40%), rgba(255,255,255,0.025)",
      }}
    >
      <div
        className="mb-6 flex h-40 items-center justify-center rounded-2xl text-6xl"
        style={{ background: p.accent }}
      >
        <span className="drop-shadow-lg">{p.emoji}</span>
      </div>
      <div className="flex items-center justify-between text-xs uppercase tracking-wider text-white/45">
        <span>{p.tag}</span>
        <span>{p.year}</span>
      </div>
      <h3 className="mt-2 font-display text-3xl font-bold">{p.title}</h3>
      <p className="mt-3 leading-relaxed text-white/55">{p.blurb}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-purple-glow opacity-0 transition-opacity group-hover:opacity-100">
        View case study →
      </span>
    </motion.button>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-32 md:px-12">
      <SectionLabel>Selected Work</SectionLabel>
      <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
        Each project, a <span className="text-gradient">product launch.</span>
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.title} p={p} onOpen={setOpen} />
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-md md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 60, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.97 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-charcoal"
            >
              <div
                className="flex h-56 items-center justify-center text-7xl"
                style={{ background: open.accent }}
              >
                {open.emoji}
              </div>
              <button
                onClick={() => setOpen(null)}
                className="interactive absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-lg backdrop-blur"
              >
                ✕
              </button>
              <div className="p-8 md:p-12">
                <div className="text-xs uppercase tracking-[0.25em] text-warm">
                  {open.tag} · {open.year}
                </div>
                <h3 className="mt-2 font-display text-4xl font-bold">
                  {open.title}
                </h3>
                {open.role && (
                  <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-purple/30 bg-purple/10 px-4 py-1.5 text-sm font-medium text-purple-glow">
                    <span>◷</span> My Role: {open.role}
                  </span>
                )}

                {[
                  ["The Challenge", open.challenge],
                  ["The Process", open.process],
                  ["The Solution", open.solution],
                ].map(([h, b]) => (
                  <div key={h} className="mt-7">
                    <h4 className="text-sm uppercase tracking-wider text-purple-glow">
                      {h}
                    </h4>
                    <p className="mt-2 leading-relaxed text-white/65">{b}</p>
                  </div>
                ))}

                {open.did && (
                  <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                    <h4 className="text-sm uppercase tracking-wider text-warm">
                      What I Did
                    </h4>
                    <ul className="mt-4 space-y-3">
                      {open.did.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-3 text-[15px] leading-relaxed text-white/80"
                        >
                          <span className="mt-1 text-purple-glow">▹</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-7">
                  <h4 className="text-sm uppercase tracking-wider text-purple-glow">
                    Results
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {open.results.map((r) => (
                      <span
                        key={r}
                        className="glass rounded-full px-4 py-2 text-sm"
                      >
                        ✦ {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-7">
                  <h4 className="text-sm uppercase tracking-wider text-purple-glow">
                    Built With
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {open.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
