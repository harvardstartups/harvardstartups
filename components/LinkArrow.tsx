import { ArrowUpRight } from "lucide-react";

/** SVG keeps external-link arrows consistent across browsers and platforms. */
export function LinkArrow() {
  return <ArrowUpRight className="link-arrow" strokeWidth={1.7} aria-hidden="true" />;
}
