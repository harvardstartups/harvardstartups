import { JOIN_FORM_URL, TREK_APPLICATION_URL } from "@/lib/links";
import { ArrowUpRight } from "lucide-react";

export function JoinActions({ variant = "default" }: { variant?: "default" | "hero" }) {
  return <div className={variant === "hero" ? "join-actions-hero" : "flex flex-col sm:flex-row justify-center gap-3 mt-6"}>
    <a href={JOIN_FORM_URL} target="_blank" rel="noopener noreferrer" className="join-action join-action-secondary">Join Us</a>
    <a href={TREK_APPLICATION_URL} target="_blank" rel="noopener noreferrer" className="join-action join-action-primary">
      <span>Apply for Startup Trek 2027</span>
      {variant === "hero" && <ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" />}
    </a>
  </div>;
}
