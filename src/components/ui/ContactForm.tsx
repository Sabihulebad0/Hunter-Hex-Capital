"use client";

import { useId, useState } from "react";
import { submitContactRequest, type ContactPayload } from "@/lib/forms";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<keyof ContactPayload, string>>;

const fieldClass =
  "w-full rounded-[8px] border bg-hh-green p-[14px] text-[14px] text-hh-cream placeholder:text-[var(--hh-dim)] focus:border-hh-gold focus:outline-none";

function validate(values: ContactPayload): Errors {
  const errors: Errors = {};

  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.phone.trim() && !/^[\d\s()+.-]{7,}$/.test(values.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!values.message.trim()) errors.message = "Please tell us how we can help.";

  return errors;
}

/** Figma node 45:368 — the "Speak with an Investment Specialist" card. */
export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<ContactPayload>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "sent">(
    "idle",
  );
  const [formMessage, setFormMessage] = useState("");

  const update =
    (field: keyof ContactPayload) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setFormMessage("");
      return;
    }

    setStatus("sending");
    const result = await submitContactRequest(values);

    if (result.ok) {
      setStatus("sent");
      setFormMessage("Thank you — a specialist will be in touch shortly.");
      setValues({ fullName: "", email: "", phone: "", message: "" });
    } else {
      setStatus("error");
      setFormMessage(result.error);
    }
  }

  const fields = [
    {
      key: "fullName" as const,
      label: "Full Name",
      type: "text",
      placeholder: "e.g. John Doe",
      autoComplete: "name",
    },
    {
      key: "email" as const,
      label: "Email Address",
      type: "email",
      placeholder: "e.g. john@example.com",
      autoComplete: "email",
    },
    {
      key: "phone" as const,
      label: "Phone Number",
      type: "tel",
      placeholder: "e.g. (555) 000-0000",
      autoComplete: "tel",
    },
  ];

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-[20px] border border-hh-gold-dark bg-hh-deep p-6 shadow-[0px_8px_12px_rgba(184,146,90,0.25)] lg:min-w-0 lg:flex-1 lg:p-10"
    >
      <h2 className="text-[20px] font-bold text-hh-cream lg:text-[24px]">
        Speak with an Investment Specialist
      </h2>

      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.key} className="flex flex-col gap-2">
            <label
              htmlFor={`${id}-${field.key}`}
              className="text-[14px] font-bold text-hh-cream"
            >
              {field.label}
            </label>
            <input
              id={`${id}-${field.key}`}
              name={field.key}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              value={values[field.key]}
              onChange={update(field.key)}
              aria-invalid={Boolean(errors[field.key])}
              aria-describedby={
                errors[field.key] ? `${id}-${field.key}-error` : undefined
              }
              className={cn(
                fieldClass,
                errors[field.key]
                  ? "border-hh-danger"
                  : "border-[var(--hh-hairline)]",
              )}
            />
            {errors[field.key] && (
              <p
                id={`${id}-${field.key}-error`}
                className="text-[13px] text-hh-danger"
              >
                {errors[field.key]}
              </p>
            )}
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <label
            htmlFor={`${id}-message`}
            className="text-[14px] font-bold text-hh-cream"
          >
            Message / Inquiry Detail
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            placeholder="How can we assist you with physical metals allocation?"
            value={values.message}
            onChange={update("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${id}-message-error` : undefined}
            className={cn(
              fieldClass,
              "h-[100px] resize-y",
              errors.message ? "border-hh-danger" : "border-[var(--hh-hairline)]",
            )}
          />
          {errors.message && (
            <p id={`${id}-message-error`} className="text-[13px] text-hh-danger">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-[8px] border border-hh-gold-dark bg-hh-gold px-[28px] py-[14px] text-[16px] font-bold text-hh-green hh-glow transition-colors hover:bg-[#e3c88a] disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Submit Secure Request"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "text-[13px]",
          !formMessage && "sr-only",
          status === "error" ? "text-hh-danger" : "text-hh-gold",
        )}
      >
        {formMessage}
      </p>
    </form>
  );
}
