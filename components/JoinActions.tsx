import { JOIN_FORM_URL, TREK_APPLICATION_URL } from "@/lib/links";

export function JoinActions() {
  return <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
    <a href={JOIN_FORM_URL} target="_blank" rel="noopener noreferrer" className="join-action join-action-secondary">Join Us</a>
    <a href={TREK_APPLICATION_URL} target="_blank" rel="noopener noreferrer" className="join-action join-action-primary">Apply for Startup Trek 2027</a>
  </div>;
}
