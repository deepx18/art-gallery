"use client";

import { useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

const inquiryTypes = ["Commission", "Collaboration", "Exhibition", "General"];

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="bg-olive-tint p-8 md:p-10">
        <h3 className="font-display text-2xl font-medium text-ink mb-3">
          Thank you.
        </h3>
        <p className="text-[15px] text-ink-soft font-sans leading-relaxed">
          Your message has been received. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-[11px] uppercase tracking-[0.18em] text-ink-soft font-sans mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full bg-transparent border-b border-line py-3 text-[15px] text-ink font-sans focus:border-olive focus:outline-none transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-[11px] uppercase tracking-[0.18em] text-ink-soft font-sans mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full bg-transparent border-b border-line py-3 text-[15px] text-ink font-sans focus:border-olive focus:outline-none transition-colors"
        />
      </div>

      {/* Inquiry Type */}
      <div>
        <label
          htmlFor="inquiryType"
          className="block text-[11px] uppercase tracking-[0.18em] text-ink-soft font-sans mb-2"
        >
          Inquiry Type
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          className="w-full bg-transparent border-b border-line py-3 text-[15px] text-ink font-sans focus:border-olive focus:outline-none transition-colors appearance-none"
        >
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-[11px] uppercase tracking-[0.18em] text-ink-soft font-sans mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full bg-transparent border-b border-line py-3 text-[15px] text-ink font-sans focus:border-olive focus:outline-none transition-colors resize-none"
        />
      </div>

      {/* Error message */}
      {state === "error" && (
        <p className="text-[13px] text-red-600 font-sans">
          Something went wrong. Please try again.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "sending"}
        className="bg-olive text-cream text-[12px] uppercase tracking-[0.18em] font-medium font-sans px-8 py-4 hover:bg-olive-deep transition-colors disabled:opacity-50"
      >
        {state === "sending" ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
