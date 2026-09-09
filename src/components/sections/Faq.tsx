"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";

/**
 * Figma node 45:329.
 *
 * The open item carries a solid gold border and a minus glyph; closed items use
 * the hairline border and a plus. The design opens the first item by default.
 */
export function Faq() {
  const [openId, setOpenId] = useState<string | null>(
    faqItems.find((item) => item.defaultOpen)?.id ?? null,
  );

  return (
    <section id="faq" className="scroll-mt-[88px] bg-hh-green py-16 lg:py-[100px]">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <SectionHeading
          badge="Compliance & FAQs"
          title="Frequently Answered Questions"
        />

        <ul className="flex w-full flex-col gap-4">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;

            return (
              <li
                key={item.id}
                className={cn(
                  "rounded-[12px] border bg-hh-deep p-6 transition-colors",
                  isOpen ? "border-hh-gold-dark" : "border-[var(--hh-hairline)]",
                )}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-trigger-${item.id}`}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-[16px] font-bold text-hh-cream lg:text-[18px]">
                      {item.question}
                    </span>

                    <span className="flex size-6 shrink-0 items-center justify-center text-hh-gold">
                      {isOpen ? (
                        <Minus size={18} aria-hidden />
                      ) : (
                        <Plus size={18} aria-hidden />
                      )}
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  hidden={!isOpen}
                  className="pt-4"
                >
                  <p className="text-[15px] leading-[1.6] text-[var(--hh-dim)]">
                    {item.answer}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
