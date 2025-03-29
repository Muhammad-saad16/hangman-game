interface WordDisplayProps {
    word: string
    guessedLetters: string[]
    gameOver: boolean
  }
  
  export default function WordDisplay({ word, guessedLetters, gameOver }: WordDisplayProps) {
    return (
      <div className="flex justify-center gap-2 flex-wrap">
        {word.split("").map((letter, index) => {
          const isGuessed = guessedLetters.includes(letter)
          const shouldReveal = isGuessed || gameOver
  
          return (
            <div
              key={index}
              className="relative"
              style={{
                opacity: 0,
                transform: "scale(0.8)",
                animation: `fadeInScale 0.3s ${index * 0.05}s forwards`,
              }}
            >
              <div className="w-10 h-12 md:w-12 md:h-14 border-b-2 border-primary flex items-end justify-center pb-1">
                <span
                  style={{
                    opacity: shouldReveal ? 1 : 0,
                    transform: shouldReveal ? "translateY(0)" : "translateY(-10px)",
                    transition: "opacity 0.3s, transform 0.3s",
                  }}
                  className={`text-2xl md:text-3xl font-bold ${!isGuessed && gameOver ? "text-red-500" : "text-primary"}`}
                >
                  {shouldReveal ? letter : ""}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  
  