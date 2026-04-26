"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

const buildPillars = [
  {
    title: "Built around your workflow",
    description:
      "We scope the system around the process you actually need improved, not around a generic tool template.",
  },
  {
    title: "Hosted and maintained",
    description:
      "We keep the system running after delivery so your team is not left managing the technical side alone.",
  },
  {
    title: "Outcome-focused delivery",
    description:
      "The goal is a working business result, whether that means smoother intake, faster follow-up, or less manual admin.",
  },
];

const useCases = [
  "Inbox handling and response workflows",
  "Scheduling and calendar automation",
  "Lead intake and triage systems",
  "Recurring reporting and analytics support",
  "Internal process automation for repetitive tasks",
  "Customer follow-up and handoff workflows",
];

const whyTeamsChooseIt = [
  "No need to learn or manage another system yourself",
  "Designed around your specific workflow, not a generic platform",
  "Hosting and maintenance stay covered after launch",
  "Focused on the business outcome rather than the tooling",
];

const processSteps = [
  {
    step: "01",
    title: "Tell us what process is breaking down",
    description:
      "Share the workflow, bottleneck, or repetitive task you want improved. We start with the business problem first.",
  },
  {
    step: "02",
    title: "We scope and build the system",
    description:
      "We design the right AI-enabled workflow around that problem, then handle the implementation, setup, and delivery.",
  },
  {
    step: "03",
    title: "We host and maintain it",
    description:
      "You get the result without owning the technical upkeep. We keep the system running so it keeps doing the work.",
  },
];

const faqs = [
  {
    question: "What kinds of systems can you build?",
    answer:
      "We focus on practical workflow systems such as lead intake, inbox handling, follow-up, scheduling, reporting, and internal process automation.",
  },
  {
    question: "Do I need to use the software directly?",
    answer:
      "Not necessarily. This service is designed for businesses that want the result without having to manage the underlying technical system themselves.",
  },
  {
    question: "Is this customized to my business?",
    answer:
      "Yes. The system is scoped around your workflow, your bottlenecks, and the result you want, rather than a one-size-fits-all template.",
  },
  {
    question: "Do you host and maintain it?",
    answer:
      "Yes. Hosting and ongoing maintenance are part of the offer so you are not left carrying the technical burden after launch.",
  },
  {
    question: "What happens after I reach out?",
    answer:
      "We follow up by email to learn what your business does, what process you want improved, how you handle it now, and what result matters most.",
  },
  {
    question: "Can this work for non-technical teams?",
    answer:
      "Yes. This service is specifically intended for teams that want a better system in place without becoming technical operators themselves.",
  },
];

type ContactFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
};

type ContactFormState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

function ContactField({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = false,
}: ContactFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[var(--ink)]">
      <span className="flex items-center gap-2">
        {label}
        {required ? <span className="text-[var(--accent)]">*</span> : null}
      </span>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className="h-12 rounded-[1.1rem] border border-[var(--line)] bg-[var(--surface)] px-4 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[rgba(31,111,99,0.12)]"
      />
    </label>
  );
}

export default function Home() {
  const [formState, setFormState] = useState<ContactFormState>({
    status: "idle",
    message: "",
  });

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const businessName = String(formData.get("businessName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const topic = businessName ? `Inquiry from ${businessName}` : "General inquiry";

    setFormState({
      status: "submitting",
      message: "Sending your message...",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          topic,
          message:
            message ||
            `Business name: ${businessName}\n\nThe visitor requested follow-up without adding extra details.`,
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setFormState({
          status: "error",
          message: result.error || "We could not send your message. Please try again.",
        });
        return;
      }

      form.reset();
      setFormState({
        status: "success",
        message: "Thanks. Your message was sent successfully.",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      setFormState({
        status: "error",
        message: "We could not send your message. Please try again.",
      });
    }
  }

  return (
    <main className="bg-[var(--page)] text-[var(--ink)]">
      <section className="relative overflow-hidden border-b border-black/5 bg-[linear-gradient(180deg,#fbfcfa_0%,#f4f6f3_100%)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top_right,_rgba(31,111,99,0.12),_transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,transparent_0%,rgba(15,23,42,0.02)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-20 pt-6 sm:px-8 lg:px-10">
          <header className="grid grid-cols-[1fr_auto] items-center gap-4 py-4">
            <a
              href="#top"
              className="inline-flex min-w-0 items-center gap-3 text-sm font-semibold tracking-[0.16em] text-[var(--ink)] uppercase"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--line)] bg-white shadow-sm">
                <Image
                  src="/node-harbor-logo-40x40.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                  priority
                />
              </span>
              <span className="truncate">Node Harbor</span>
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center justify-center self-start rounded-full border border-[var(--line)] bg-white px-5 text-sm font-medium text-[var(--ink)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Tell Us What You Need
            </a>
          </header>

          <div
            id="top"
            className="relative grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24"
          >
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex rounded-full border border-[var(--line)] bg-white/90 px-4 py-2 text-sm font-medium text-[var(--muted)] shadow-sm backdrop-blur">
                Done-for-you AI systems built around real business workflows
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-[var(--ink)] sm:text-6xl lg:text-[4.5rem] lg:leading-[1.02]">
                Done-for-you AI systems for real business workflows.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
                Node Harbor designs, builds, hosts, and maintains AI-powered systems around the work your business actually needs done, from intake and scheduling to follow-up and internal operations.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-base font-semibold text-white shadow-lg shadow-[rgba(31,111,99,0.18)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]"
                >
                  Tell Us What You Need
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-[var(--line)] bg-white px-7 text-base font-medium text-[var(--ink)] transition hover:bg-[rgba(15,23,42,0.03)]"
                >
                  See how it works
                </a>
              </div>
              <div className="mt-8 grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-3">
                {[
                  "Built around your workflow",
                  "Hosted and maintained for you",
                  "No technical burden on your team",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-[0_26px_90px_rgba(15,23,42,0.08)] sm:p-7">
                <div className="flex items-center justify-between border-b border-black/6 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink)]">Custom implementation service</p>
                    <p className="text-sm text-[var(--muted)]">Workflow-first, outcome-focused, maintained after launch</p>
                  </div>
                  <span className="rounded-full bg-[rgba(31,111,99,0.12)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                    Option 2
                  </span>
                </div>
                <div className="mt-6 grid gap-4">
                  {[
                    {
                      label: "Lead intake",
                      value: "Capture, route, and qualify requests automatically",
                    },
                    {
                      label: "Scheduling",
                      value: "Reduce back-and-forth and manual calendar handling",
                    },
                    {
                      label: "Follow-up",
                      value: "Keep customer conversations moving without manual chasing",
                    },
                    {
                      label: "Internal operations",
                      value: "Automate repetitive process work behind the scenes",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] px-4 py-4"
                    >
                      <p className="text-sm font-semibold text-[var(--ink)]">{item.label}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-[1.5rem] bg-[var(--ink)] px-5 py-5 text-white">
                  <p className="text-sm font-medium text-white/70">Best for businesses that want</p>
                  <p className="mt-2 text-lg font-semibold">
                    a finished system built around a real workflow problem, not another tool to manage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <p className="section-label">What we build</p>
            <h2 className="section-title mt-4">Custom systems built around the workflow, not around a template.</h2>
            <p className="section-copy mt-5">
              Node Harbor is for businesses that want the result, not the technical burden. You describe the process problem, we build the right system around it, and we keep it running after launch.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {buildPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-[1.5rem] border border-[var(--line)] bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-[var(--ink)]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-[var(--surface-strong)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="section-label">Example use cases</p>
            <h2 className="section-title mt-4">Practical systems for the work that slows teams down.</h2>
            <p className="section-copy mt-5">
              The strongest fit is a business with a known workflow problem, repetitive admin burden, or operational bottleneck that needs a working system around it.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {useCases.map((item) => (
              <div
                key={item}
                className="rounded-[1.4rem] border border-[var(--line)] bg-white px-5 py-5 text-sm font-medium text-[var(--ink)] shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="section-label">Why businesses choose done-for-you systems</p>
            <h2 className="section-title mt-4">A better fit for teams that want the outcome, not another platform.</h2>
            <p className="section-copy mt-5">
              This offer is designed for businesses that know something in the workflow needs to improve, but do not want to become system owners just to fix it.
            </p>
          </div>
          <div className="space-y-4">
            {whyTeamsChooseIt.map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-[var(--line)] bg-white px-5 py-4 text-[0.98rem] leading-7 text-[var(--ink)] shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-black/5 bg-[var(--surface)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="section-label">How it works</p>
            <h2 className="section-title mt-4">A simple path from workflow problem to working system.</h2>
            <p className="section-copy mt-5">
              The process stays straightforward. You explain the operational problem, we build the right system around it, then we keep it maintained after delivery.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {processSteps.map((item) => (
              <article
                key={item.step}
                className="rounded-[1.5rem] border border-[var(--line)] bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">{item.step}</p>
                <h3 className="mt-4 text-xl font-semibold text-[var(--ink)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="section-label">Contact</p>
            <h2 className="section-title mt-4">Tell us what workflow you need improved.</h2>
            <p className="section-copy mt-5">
              Send your details and we will follow up by email to learn what your business does, what process you want improved, how you handle it now, and what result matters most.
            </p>
            <div className="mt-8 rounded-[1.5rem] border border-[var(--line)] bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-[var(--ink)]">What we ask for here</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                <li>Name and email</li>
                <li>Business name</li>
                <li>Optional note about the process you want improved</li>
              </ul>
            </div>
          </div>

          <form
            id="contact-form"
            className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-8"
            method="post"
            onSubmit={handleContactSubmit}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <ContactField
                label="Name"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                required
              />
              <ContactField
                label="Business name"
                name="businessName"
                placeholder="Your business"
                autoComplete="organization"
                required
              />
            </div>
            <div className="mt-5">
              <ContactField
                label="Email"
                name="email"
                type="email"
                placeholder="you@email.com"
                autoComplete="email"
                required
              />
            </div>
            <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-[var(--ink)]">
              <span>Optional message</span>
              <textarea
                name="message"
                rows={5}
                placeholder="What process or workflow would you want improved?"
                className="rounded-[1.1rem] border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[rgba(31,111,99,0.12)]"
              />
            </label>
            <button
              type="submit"
              disabled={formState.status === "submitting"}
              className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-full bg-[var(--accent)] px-7 text-base font-semibold text-white shadow-lg shadow-[rgba(31,111,99,0.18)] transition hover:bg-[var(--accent-strong)] focus:outline-none focus:ring-4 focus:ring-[rgba(31,111,99,0.18)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {formState.status === "submitting" ? "Sending..." : "Tell Us What You Need"}
            </button>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              The first step stays simple. After you reach out, we follow up by email with a few questions about the workflow, the current process, and the result you want.
            </p>
            {formState.message ? (
              <div
                className={`mt-5 rounded-xl px-5 py-4 text-sm font-medium shadow-sm transition-all duration-300 ease-in-out ${
                  formState.status === "error"
                    ? "bg-[rgba(185,28,28,0.1)] border border-[rgba(185,28,28,0.2)] text-[#b91c1c]"
                    : formState.status === "success"
                    ? "bg-[rgba(31,111,99,0.08)] border border-[rgba(31,111,99,0.15)] text-[var(--accent)]"
                    : "bg-[rgba(82,96,109,0.08)] border border-[rgba(82,96,109,0.12)] text-[var(--muted)]"
                }`}
                role="status"
              >
                {formState.status === "submitting" && (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    {formState.message}
                  </span>
                )}
                {formState.status === "success" && (
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {formState.message}
                  </span>
                )}
                {formState.status === "error" && (
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formState.message}
                  </span>
                )}
              </div>
            ) : null}
          </form>
        </div>
      </section>

      <section className="border-t border-black/5 bg-[var(--surface-strong)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="section-label">FAQ</p>
            <h2 className="section-title mt-4">Common questions.</h2>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[1.5rem] border border-[var(--line)] bg-white p-6"
              >
                <h3 className="text-base font-semibold text-[var(--ink)]">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
