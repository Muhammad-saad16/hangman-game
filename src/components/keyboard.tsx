"use client"

import { Button } from "@/components/ui/button"

interface KeyboardProps {
  guessedLetters: string[]
  word: string
  onGuess: (letter: string) => void
  disabled: boolean
}

type ButtonVariant = "outline" | "default" | "destructive" | "secondary"

export default function Keyboard({ guessedLetters, word, onGuess, disabled }: KeyboardProps) {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ]

  const getButtonVariant = (letter: string): ButtonVariant => {
    if (!guessedLetters.includes(letter)) return "outline"
    if (word.includes(letter)) return "secondary"
    return "destructive"
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-1 md:gap-2"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            animation: `fadeInUp 0.5s ${rowIndex * 0.1}s forwards`,
          }}
        >
          {rowIndex === 1 && <div className="w-2 md:w-6"></div>}
          {row.map((letter) => (
            <div key={letter} className="transition-transform hover:scale-105 active:scale-95">
              <Button
                variant={getButtonVariant(letter)}
                size="sm"
                className="w-8 h-8 md:w-10 md:h-10 font-bold text-center uppercase"
                onClick={() => onGuess(letter)}
                disabled={guessedLetters.includes(letter) || disabled}
              >
                {letter}
              </Button>
            </div>
          ))}
          {rowIndex === 1 && <div className="w-2 md:w-6"></div>}
        </div>
      ))}
    </div>
  )
}

