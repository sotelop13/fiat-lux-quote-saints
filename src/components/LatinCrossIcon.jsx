export default function LatinCrossIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* vertical bar */}
      <rect x="10" y="2" width="4" height="20" rx="1" />
      {/* horizontal bar — positioned at upper third */}
      <rect x="4" y="7" width="16" height="4" rx="1" />
    </svg>
  );
}
