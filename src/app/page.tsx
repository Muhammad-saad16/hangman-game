"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { RefreshCw, Volume2, VolumeX, Moon, Sun } from "lucide-react"
import HangmanDrawing from "@/components/hangman-drawing"
import WordDisplay from "@/components/word-display"
import Keyboard from "@/components/keyboard"

// Word list with categories
const WORD_LISTS = {
  programming: ["javascript", "python", "typescript", "react", "nextjs", "tailwind", "vercel", "developer", "coding"],
  fruits: ["apple", "banana", "orange", "strawberry", "watermelon", "pineapple", "mango", "grape"],
  animals: ["elephant", "giraffe", "penguin", "dolphin", "tiger", "lion", "zebra", "kangaroo"],
  countries: ["canada", "japan", "australia", "brazil", "france", "germany", "india", "mexico"],
}

export default function HangmanGame() {
  const [darkMode, setDarkMode] = useState(false)
  const [category, setCategory] = useState<keyof typeof WORD_LISTS>("programming")
  const [word, setWord] = useState("")
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [wrongGuesses, setWrongGuesses] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const { toast } = useToast()

  const MAX_ATTEMPTS = 6

  // Play sound effect
  const playSound = useCallback(
    (soundType: "correct" | "wrong" | "win" | "lose") => {
      if (!soundEnabled) return

      // Sound effects would be implemented here in a real app
      console.log(`Playing ${soundType} sound`)
    },
    [soundEnabled],
  )

  // Start a new game
  const startNewGame = useCallback(() => {
    const wordList = WORD_LISTS[category]
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase()
    setWord(randomWord)
    setGuessedLetters([])
    setWrongGuesses(0)
    setGameOver(false)
    setVictory(false)
    setShowConfetti(false)
  }, [category])

  // Check if game is over
  const checkGameStatus = useCallback(() => {
    // Check for victory
    if (word.split("").every((letter) => guessedLetters.includes(letter))) {
      setVictory(true)
      setGameOver(true)
      setShowConfetti(true)
      playSound("win")
      toast({
        title: "Congratulations!",
        description: "You've guessed the word correctly!",
        variant: "default",
      })
    }

    // Check for loss
    if (wrongGuesses >= MAX_ATTEMPTS) {
      setGameOver(true)
      playSound("lose")
      toast({
        title: "Game Over",
        description: `The word was "${word}". Better luck next time!`,
        variant: "destructive",
      })
    }
  }, [word, guessedLetters, wrongGuesses, MAX_ATTEMPTS, playSound, toast])

  // Initialize game
  useEffect(() => {
    startNewGame()
  }, [startNewGame])

  // Check game status after each guess
  useEffect(() => {
    if (word) {
      checkGameStatus()
    }
  }, [guessedLetters, word, checkGameStatus])

  // Handle letter guess
  const handleGuess = (letter: string) => {
    if (gameOver || guessedLetters.includes(letter)) return

    setGuessedLetters((prev) => [...prev, letter])

    if (!word.includes(letter)) {
      setWrongGuesses((prev) => prev + 1)
      playSound("wrong")
    } else {
      playSound("correct")
    }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-900 min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-300">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {/* Confetti effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              {Array.from({ length: 100 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    borderRadius: "50%",
                    animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setSoundEnabled(!soundEnabled)} className="rounded-full">
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </Button>
          <Button variant="outline" size="icon" onClick={toggleDarkMode} className="rounded-full">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>

        <div
          className="text-center mb-8 opacity-0 transform -translate-y-4"
          style={{ animation: "fadeInDown 0.5s forwards" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-2">
            Hangman Game
          </h1>
          <p className="text-muted-foreground">Guess the word before the hangman is complete!</p>
        </div>

        <Card className="w-full max-w-3xl p-6 shadow-lg dark:bg-gray-800">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <HangmanDrawing wrongGuesses={wrongGuesses} maxAttempts={MAX_ATTEMPTS} />
              <div className="mt-4 text-center">
                <p className="text-muted-foreground">
                  Wrong guesses: <span className="font-bold text-primary">{wrongGuesses}</span> / {MAX_ATTEMPTS}
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-center">
                  Category: <span className="text-primary capitalize">{category}</span>
                </h2>
                <div className="flex gap-2 flex-wrap justify-center">
                  {Object.keys(WORD_LISTS).map((cat) => (
                    <Button
                      key={cat}
                      variant={category === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategory(cat as keyof typeof WORD_LISTS)}
                      disabled={gameOver}
                      className="capitalize"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              <WordDisplay word={word} guessedLetters={guessedLetters} gameOver={gameOver} />

              {gameOver && (
                <div className="my-4 text-center opacity-0 scale-90" style={{ animation: "fadeInScale 0.3s forwards" }}>
                  <h3 className={`text-2xl font-bold ${victory ? "text-green-500" : "text-red-500"}`}>
                    {victory ? "Congratulations! 🎉" : "Game Over! 😞"}
                  </h3>
                  {!victory && (
                    <p className="mt-2">
                      The word was: <span className="font-bold text-primary">{word}</span>
                    </p>
                  )}
                  <Button className="mt-4" onClick={startNewGame}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Play Again
                  </Button>
                </div>
              )}
            </div>
          </div>

          {!gameOver && (
            <div
              className="mt-8 opacity-0 transform translate-y-4"
              style={{ animation: "fadeInUp 0.5s 0.3s forwards" }}
            >
              <Keyboard guessedLetters={guessedLetters} word={word} onGuess={handleGuess} disabled={gameOver} />
            </div>
          )}
        </Card>

        <footer className="mt-8 text-center text-muted-foreground">
          <p>Created with Next.js and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}

