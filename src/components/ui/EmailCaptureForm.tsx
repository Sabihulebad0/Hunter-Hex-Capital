"use client";

import { useId, useState } from "react";
import { submitEmailCapture } from "@/lib/forms";
import { cn } from "@/lib/utils";

/**
 * Shared by the "Request Your Free Investment Guide" card (Figma 45:412) and the
 * footer newsletter (Figma 45:450). Both are an input plus a gold submit button.
 */
export function EmailCaptureForm({
  source,
  label,
  placeholder,
  buttonLabel,
  inputType = "email",
  size = "md",
}: {
  source: "newsletter" | "investment-guide";
  label: string;
  placeholder: string;
  buttonLabel: string;
  inputType?: "email" | "text";
  size?: "sm" | "md";
}) {
  const id = useId();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "sent">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!value.trim()) {
      setStatus("error");
      setMessage(`Please enter your ${inputType === "email" ? "email" : "zip code"}.`);
      return;
    }

    if (inputType === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    const result = await submitEmailCapture(value, source);

    if (result.ok) {
      setStatus("sent");
      setMessage("Thank you — check your inbox shortly.");
      setValue("");
    } else {
      setStatus("error");
      setMessage(result.error);
    }
  }

  const isSmall = size === "sm";

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex gap-2">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          id={id}
          type={inputType}
          inputMode={inputType === "text" ? "numeric" : "email"}
          autoComplete={inputType === "text" ? "postal-code" : "email"}
          placeholder={placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className={cn(
            "min-w-0 flex-1 border border-[var(--hh-hairline)] bg-hh-green text-hh-cream placeholder:text-[var(--hh-dim)] focus:border-hh-gold focus:outline-none",
            isSmall
              ? "rounded-[6px] p-3 text-[12px]"
              : "rounded-[8px] p-[14px] text-[14px] placeholder:text-hh-muted",
          )}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "shrink-0 bg-hh-gold font-bold text-hh-green transition-colors hover:bg-[#e3c88a] disabled:opacity-70",
            isSmall
              ? "rounded-[6px] px-4 text-[12px]"
              : "rounded-[8px] px-5 text-[14px]",
          )}
        >
          {buttonLabel}
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "mt-2 text-[12px]",
          !message && "sr-only",
          status === "error" ? "text-hh-danger" : "text-hh-gold",
        )}
      >
        {message}
      </p>
    </form>
  );
}
