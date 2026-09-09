import Image from "next/image";
import Link from "next/link";
import { EmailCaptureForm } from "@/components/ui/EmailCaptureForm";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/ui/SocialIcons";
import { footerNavLinks, legalLinks } from "@/data/navigation";
import { site } from "@/data/site";

const socials = [
  { key: "facebook", label: "Facebook", icon: FacebookIcon },
  { key: "twitter", label: "X (Twitter)", icon: TwitterIcon },
  { key: "linkedin", label: "LinkedIn", icon: LinkedinIcon },
  { key: "instagram", label: "Instagram", icon: InstagramIcon },
] as const;

/** Figma node 45:417 — darker ground (#06150f), three columns, rule, bottom bar. */
export function Footer() {
  return (
    <footer className="bg-hh-deep pb-10 pt-16 lg:pt-[80px]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-[80px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* footer-brand (45:419) */}
          <div className="flex flex-col gap-6 lg:w-[320px] lg:shrink-0">
            <Image
              src="/images/logo.webp"
              alt={site.legalName}
              width={194}
              height={71}
              // self-start: this is a direct child of a column flex container,
              // whose default align-items:stretch would otherwise override
              // w-auto and stretch the logo to the full column width.
              className="h-[56px] w-auto self-start lg:h-[71px]"
            />

            <p className="text-[14px] leading-[1.5] text-hh-muted">
              Hunter Hex Capital LLC offers boutique physical metals brokerage and
              custody coordination. Our focus is ensuring wealth continuity for
              prospective generations.
            </p>

            <ul className="flex gap-4">
              {socials.map(({ key, label, icon: Icon }) => {
                const href = site.socials[key];

                return (
                  <li key={key}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${site.name} on ${label}`}
                        className="flex size-9 items-center justify-center rounded-full bg-white/8 text-hh-cream transition-colors hover:bg-hh-gold hover:text-hh-green"
                      >
                        <Icon size={16} />
                      </a>
                    ) : (
                      // No profile URL supplied yet — render the designed shape
                      // without an inert link for assistive tech to announce.
                      <span
                        className="flex size-9 items-center justify-center rounded-full bg-white/8 text-hh-muted"
                        aria-hidden
                      >
                        <Icon size={16} />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* footer-nav (45:438) */}
          <nav aria-label="Footer" className="lg:w-[200px] lg:shrink-0">
            <h2 className="mb-4 text-[16px] font-bold uppercase text-hh-gold">
              Navigation
            </h2>
            <ul className="flex flex-col gap-4">
              {footerNavLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-hh-muted hover:text-hh-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* newsletter (45:447) */}
          <div className="flex min-w-0 flex-col gap-4 lg:flex-1">
            <h2 className="text-[16px] font-bold uppercase text-hh-gold">
              Subscribe to Market Spreads
            </h2>
            <p className="text-[14px] text-hh-muted">
              Get physical premium reports and market advisory notes directly to
              your inbox.
            </p>

            <EmailCaptureForm
              source="newsletter"
              label="Email address"
              placeholder="Enter your email"
              buttonLabel="Subscribe"
            />
          </div>
        </div>

        <hr className="my-10 border-0 border-t border-[var(--hh-hairline)] lg:my-12" />

        {/*
          Disclosure required by the client's live site. Figma has no visual
          treatment for it, so it sits above the bottom bar in the same muted
          12px the rest of the footer meta uses. Build spec §16.
        */}
        <p className="mb-6 max-w-[900px] text-[12px] leading-[1.6] text-hh-muted">
          {site.disclaimer} {site.marketDataNotice}
        </p>

        {/* footer-bottom (45:456) */}
        <div className="flex flex-col items-start justify-between gap-4 text-[12px] text-hh-muted sm:flex-row sm:items-center">
          <p>Design &amp; developed by Premium Web Agency.</p>

          <ul className="flex gap-6">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-hh-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
