"use client";

import { useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const inquiryTypes = ["Commission", "Collaboration", "Exhibition", "General"];

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(data: Record<string, unknown>): FieldErrors {
    const e: FieldErrors = {};
    if (!data.name || String(data.name).trim().length < 2) {
      e.name = "Please enter your name";
    }
    if (!data.email || !String(data.email).includes("@")) {
      e.email = "Please enter a valid email";
    }
    if (!data.message || String(data.message).trim().length < 10) {
      e.message = "Please enter a message (at least 10 characters)";
    }
    return e;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setState("sending");

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
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`w-full bg-transparent border-b py-3 text-[15px] text-ink font-sans focus:outline-none transition-colors ${
            errors.name
              ? "border-red-400 focus:border-red-500"
              : "border-line focus:border-olive"
          }`}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-[12px] text-red-500 font-sans" role="alert">
            {errors.name}
          </p>
        )}
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
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`w-full bg-transparent border-b py-3 text-[15px] text-ink font-sans focus:outline-none transition-colors ${
            errors.email
              ? "border-red-400 focus:border-red-500"
              : "border-line focus:border-olive"
          }`}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-[12px] text-red-500 font-sans" role="alert">
            {errors.email}
          </p>
        )}
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
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full bg-transparent border-b py-3 text-[15px] text-ink font-sans focus:outline-none transition-colors resize-none ${
            errors.message
              ? "border-red-400 focus:border-red-500"
              : "border-line focus:border-olive"
          }`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-[12px] text-red-500 font-sans" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Error message */}
      {state === "error" && (
        <p className="text-[13px] text-red-600 font-sans" role="alert">
          Something went wrong. Please try again.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex items-center gap-3 bg-olive text-cream text-[12px] uppercase tracking-[0.18em] font-medium font-sans px-8 py-4 hover:bg-olive-deep hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
      >
        {state === "sending" ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending…
          </>
        ) : (
          "Send inquiry"
        )}
      </button>
    </form>
  );
}
