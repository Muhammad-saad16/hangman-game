interface HangmanDrawingProps {
    wrongGuesses: number
    maxAttempts: number
  }
  
  export default function HangmanDrawing({ wrongGuesses, maxAttempts }: HangmanDrawingProps) {
    const parts = [
      { name: "head", show: wrongGuesses >= 1 },
      { name: "body", show: wrongGuesses >= 2 },
      { name: "leftArm", show: wrongGuesses >= 3 },
      { name: "rightArm", show: wrongGuesses >= 4 },
      { name: "leftLeg", show: wrongGuesses >= 5 },
      { name: "rightLeg", show: wrongGuesses >= 6 },
    ]
  
    return (
      <div className="w-full max-w-[300px] mx-auto h-[250px] relative">
        {/* Gallows */}
        <svg viewBox="0 0 200 200" className="w-full h-full" style={{ opacity: 0, animation: "fadeIn 0.5s forwards" }}>
          {/* Base */}
          <line
            x1="20"
            y1="180"
            x2="100"
            y2="180"
            stroke="currentColor"
            strokeWidth="4"
            style={{
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
              animation: "drawLine 0.5s 0.1s forwards",
            }}
          />
  
          {/* Vertical pole */}
          <line
            x1="60"
            y1="20"
            x2="60"
            y2="180"
            stroke="currentColor"
            strokeWidth="4"
            style={{
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
              animation: "drawLine 0.5s 0.2s forwards",
            }}
          />
  
          {/* Horizontal beam */}
          <line
            x1="60"
            y1="20"
            x2="140"
            y2="20"
            stroke="currentColor"
            strokeWidth="4"
            style={{
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
              animation: "drawLine 0.5s 0.3s forwards",
            }}
          />
  
          {/* Rope */}
          <line
            x1="140"
            y1="20"
            x2="140"
            y2="40"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
              animation: "drawLine 0.5s 0.4s forwards",
            }}
          />
  
          {/* Head */}
          {parts[0].show && (
            <circle
              cx="140"
              cy="55"
              r="15"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              style={{
                opacity: 0,
                transform: "scale(0)",
                transformOrigin: "center",
                animation: "fadeInScale 0.3s forwards",
              }}
            />
          )}
  
          {/* Body */}
          {parts[1].show && (
            <line
              x1="140"
              y1="70"
              x2="140"
              y2="120"
              stroke="currentColor"
              strokeWidth="3"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
                animation: "drawLine 0.3s forwards",
              }}
            />
          )}
  
          {/* Left Arm */}
          {parts[2].show && (
            <line
              x1="140"
              y1="80"
              x2="120"
              y2="100"
              stroke="currentColor"
              strokeWidth="3"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
                animation: "drawLine 0.3s forwards",
              }}
            />
          )}
  
          {/* Right Arm */}
          {parts[3].show && (
            <line
              x1="140"
              y1="80"
              x2="160"
              y2="100"
              stroke="currentColor"
              strokeWidth="3"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
                animation: "drawLine 0.3s forwards",
              }}
            />
          )}
  
          {/* Left Leg */}
          {parts[4].show && (
            <line
              x1="140"
              y1="120"
              x2="120"
              y2="150"
              stroke="currentColor"
              strokeWidth="3"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
                animation: "drawLine 0.3s forwards",
              }}
            />
          )}
  
          {/* Right Leg */}
          {parts[5].show && (
            <line
              x1="140"
              y1="120"
              x2="160"
              y2="150"
              stroke="currentColor"
              strokeWidth="3"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
                animation: "drawLine 0.3s forwards",
              }}
            />
          )}
        </svg>
  
        {/* Progress indicator */}
        <div className="w-full bg-muted rounded-full h-2 mt-4">
          <div
            className={`h-full rounded-full ${wrongGuesses >= maxAttempts - 1 ? "bg-red-500" : "bg-primary"}`}
            style={{ width: `${(wrongGuesses / maxAttempts) * 100}%`, transition: "width 0.5s ease-in-out" }}
          />
        </div>
      </div>
    )
  }
  
  