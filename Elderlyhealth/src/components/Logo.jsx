export default function Logo({ className }) {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="w-full h-full"
      >
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
        />
        <path
          d="M100 140 C60 100 40 82 40 65 C40 45 55 35 75 35 C85 35 95 40 100 50 C105 40 115 35 125 35 C145 35 160 45 160 65 C160 82 140 100 100 140Z"
          fill="currentColor"
        />
        <path d="M95 140 L105 140 L105 165 L95 165 Z" fill="currentColor" />
        <path
          d="M70 80 Q100 60 130 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M70 95 Q100 75 130 95"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M70 110 Q100 90 130 110"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
