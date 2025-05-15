import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface Question {
  english: string
  correctAnswer: string
  options: string[]
}

interface GameScreenProps {
  difficulty: string
  wordData: any[]
  onGameEnd: (score: number) => void
  setScreen: (screen: string) => void
}

export function GameScreen({ difficulty, wordData, onGameEnd, setScreen }: GameScreenProps) {
  // Game state
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(
    difficulty === 'easy' ? 5 : difficulty === 'medium' ? 3 : 2,
  )
  const [questions, setQuestions] = useState<Question[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(
    difficulty === 'easy' ? 20 : difficulty === 'medium' ? 15 : 10,
  )
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  // Generate questions based on difficulty
  useEffect(() => {
    const shuffledWords = [...wordData].sort(() => 0.5 - Math.random())
    const numQuestions =
      difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20
    const generatedQuestions = shuffledWords
      .slice(0, numQuestions)
      .map((word) => {
        // Generate 3 random wrong answers
        const wrongOptions = shuffledWords
          .filter((w) => w.bicol !== word.bicol)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((w) => w.bicol)
        // Add correct answer and shuffle options
        const options = [...wrongOptions, word.bicol].sort(
          () => 0.5 - Math.random(),
        )
        return {
          english: word.english,
          correctAnswer: word.bicol,
          options,
        }
      })
    setQuestions(generatedQuestions)
  }, [difficulty, wordData])

  // Timer countdown
  useEffect(() => {
    if (gameOver || questions.length === 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up for this question
          handleAnswer(null)
          return difficulty === 'easy' ? 20 : difficulty === 'medium' ? 15 : 10
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [currentQuestion, gameOver, questions])

  // Handle answer selection
  const handleAnswer = (selectedOption: string | null) => {
    setSelectedAnswer(selectedOption)
    // Short delay to show the correct/incorrect answer
    setTimeout(() => {
      const currentQ = questions[currentQuestion]
      const isCorrect = selectedOption === currentQ?.correctAnswer
      if (isCorrect) {
        // Add points based on difficulty and time left
        const timeBonus = Math.floor(timeLeft / 2)
        const difficultyMultiplier =
          difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3
        setScore((prev) => prev + (10 + timeBonus) * difficultyMultiplier)
      } else {
        // Lose a life
        setLives((prev) => {
          if (prev <= 1) {
            setGameOver(true)
            return 0
          }
          return prev - 1
        })
      }
      // Move to next question or end game
      setSelectedAnswer(null)
      if (currentQuestion + 1 >= questions.length) {
        setGameOver(true)
      } else {
        setCurrentQuestion((prev) => prev + 1)
        setTimeLeft(
          difficulty === 'easy' ? 20 : difficulty === 'medium' ? 15 : 10,
        )
      }
    }, 1000)
  }

  // End the game and return to home
  const endGame = () => {
    if (score > 0) {
      onGameEnd(score)
    }
    setScreen('home')
  }

  // If no questions loaded yet
  if (questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading questions...</Text>
      </View>
    )
  }

  // Game over screen
  if (gameOver) {
    return (
      <View style={styles.gameOverContainer}>
        <Text style={styles.gameOverTitle}>Game Over!</Text>
        <Text style={styles.scoreLabel}>Your Score:</Text>
        <Text style={styles.scoreValue}>{score}</Text>
        <Text style={styles.feedbackText}>
          {score > 200
            ? "Amazing! You're a Bicol language master!"
            : score > 100
              ? "Great job! You're getting good at this!"
              : 'Good effort! Keep practicing!'}
        </Text>
        <TouchableOpacity style={styles.homeButton} onPress={endGame}>
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // Current question
  const currentQ = questions[currentQuestion]

  return (
    <View style={styles.container}>
      {/* Game header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setScreen('home')}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.livesContainer}>
          {Array(lives)
            .fill(0)
            .map((_, i) => (
              <MaterialCommunityIcons
                key={i}
                name="heart"
                size={20}
                color="#EF4444"
                style={styles.heartIcon}
              />
            ))}
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{score}</Text>
        </View>
      </View>

      {/* Question counter and timer */}
      <View style={styles.infoBar}>
        <Text style={styles.questionCounter}>
          Question {currentQuestion + 1}/{questions.length}
        </Text>
        <Text style={[
          styles.timer,
          timeLeft < 5 && styles.timerWarning
        ]}>
          {timeLeft}s
        </Text>
      </View>

      {/* Question area */}
      <ScrollView style={styles.content}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionLabel}>
            What is the Bicol translation of:
          </Text>
          <Text style={styles.questionText}>
            {currentQ.english}
          </Text>
        </View>

        {/* Answer options */}
        <View style={styles.optionsContainer}>
          {currentQ.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              style={[
                styles.optionButton,
                selectedAnswer === null && styles.optionButtonEnabled,
                selectedAnswer !== null && option === currentQ.correctAnswer && styles.optionButtonCorrect,
                selectedAnswer === option && option !== currentQ.correctAnswer && styles.optionButtonIncorrect,
                selectedAnswer !== null && option !== currentQ.correctAnswer && option !== selectedAnswer && styles.optionButtonDisabled
              ]}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C1D95', // purple-900
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    fontSize: 24,
    color: 'white',
  },
  gameOverContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  gameOverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FCD34D', // yellow-300
    marginBottom: 32,
  },
  scoreLabel: {
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4ADE80', // green-400
    marginBottom: 32,
  },
  feedbackText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 32,
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#2563EB', // blue-600
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4C1D95', // purple-900
    padding: 24,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    marginRight: 4,
  },
  scoreContainer: {
    backgroundColor: '#6B46C1', // purple-700
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  scoreText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6B46C1', // purple-800
    padding: 12,
  },
  questionCounter: {
    color: 'white',
    fontSize: 22,
  },
  timer: {
    fontWeight: 'bold',
    color: '#FCD34D', // yellow-300
    fontSize: 24,
  },
  timerWarning: {
    color: '#F87171', // red-400
  },
  content: {
    flex: 1,
    padding: 24,
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  questionLabel: {
    fontSize: 26,
    color: 'white',
    marginBottom: 16,
  },
  questionText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#FCD34D', // yellow-300
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 20,
    marginBottom: 40,
  },
  optionButton: {
    padding: 22,
    borderRadius: 16,
    alignItems: 'center',
    minHeight: 75,
    justifyContent: 'center',
  },
  optionButtonEnabled: {
    backgroundColor: '#2563EB', // blue-600
  },
  optionButtonCorrect: {
    backgroundColor: '#16A34A', // green-600
  },
  optionButtonIncorrect: {
    backgroundColor: '#DC2626', // red-600
  },
  optionButtonDisabled: {
    backgroundColor: '#2563EB', // blue-600
    opacity: 0.7,
  },
  optionText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
})

