interface BotanicalMotifProps {
  className?: string;
  flip?: boolean;
}

export default function BotanicalMotif({
  className = "",
  flip = false,
}: BotanicalMotifProps) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      {/* Main stem */}
      <path
        d="M200 580 C200 500, 195 400, 200 300 C205 200, 200 100, 200 20"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.15"
      />
      {/* Left leaves */}
      <path
        d="M200 480 C160 460, 100 440, 60 420 C80 430, 140 445, 200 460"
        fill="currentColor"
        opacity="0.06"
      />
      <path
        d="M200 480 C160 460, 100 440, 60 420"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.1"
      />
      <path
        d="M200 380 C150 350, 80 330, 30 320 C60 335, 130 350, 200 365"
        fill="currentColor"
        opacity="0.05"
      />
      <path
        d="M200 380 C150 350, 80 330, 30 320"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.08"
      />
      <path
        d="M200 260 C170 240, 120 220, 80 210 C110 225, 160 240, 200 250"
        fill="currentColor"
        opacity="0.04"
      />
      <path
        d="M200 260 C170 240, 120 220, 80 210"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.07"
      />
      {/* Right leaves */}
      <path
        d="M200 440 C240 420, 300 400, 340 385 C310 395, 250 415, 200 430"
        fill="currentColor"
        opacity="0.05"
      />
      <path
        d="M200 440 C240 420, 300 400, 340 385"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.09"
      />
      <path
        d="M200 340 C250 315, 320 290, 370 280 C340 295, 270 310, 200 325"
        fill="currentColor"
        opacity="0.04"
      />
      <path
        d="M200 340 C250 315, 320 290, 370 280"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.08"
      />
      <path
        d="M200 220 C230 200, 280 185, 320 178 C290 190, 240 205, 200 215"
        fill="currentColor"
        opacity="0.035"
      />
      <path
        d="M200 220 C230 200, 280 185, 320 178"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.06"
      />
      {/* Small berries / buds */}
      <circle cx="55" cy="415" r="3" fill="currentColor" opacity="0.08" />
      <circle cx="345" cy="380" r="3" fill="currentColor" opacity="0.07" />
      <circle cx="375" cy="275" r="2.5" fill="currentColor" opacity="0.06" />
      <circle cx="25" cy="315" r="2.5" fill="currentColor" opacity="0.05" />
    </svg>
  );
}
