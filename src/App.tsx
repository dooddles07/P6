import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { HomeScreen } from './components/HomeScreen'
import { GameScreen } from './components/GameScreen'
import { SettingsScreen } from './components/SettingsScreen'
import { HighScoreScreen } from './components/HighScoreScreen'
import { wordData } from './data/wordData'

interface HighScore {
  username: string
  score: number
  difficulty: string
  date: string
}

export function App() {
  // App state
  const [screen, setScreen] = useState('home')
  const [username, setUsername] = useState('')
  const [difficulty, setDifficulty] = useState('easy')
  const [highScores, setHighScores] = useState<HighScore[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load saved data on app start
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const [savedUsername, savedDifficulty, savedScores] = await Promise.all([
          AsyncStorage.getItem('engcol_username'),
          AsyncStorage.getItem('engcol_difficulty'),
          AsyncStorage.getItem('engcol_highscores'),
        ])

        if (savedUsername) setUsername(savedUsername)
        if (savedDifficulty) setDifficulty(savedDifficulty)
        if (savedScores) setHighScores(JSON.parse(savedScores))
      } catch (error) {
        console.error('Error loading saved data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSavedData()
  }, [])

  // Save settings to AsyncStorage whenever they change
  useEffect(() => {
    const saveData = async () => {
      try {
        if (username) await AsyncStorage.setItem('engcol_username', username)
        await AsyncStorage.setItem('engcol_difficulty', difficulty)
        await AsyncStorage.setItem('engcol_highscores', JSON.stringify(highScores))
      } catch (error) {
        console.error('Error saving data:', error)
      }
    }

    if (!isLoading) {
      saveData()
    }
  }, [username, difficulty, highScores, isLoading])

  // Add a new high score
  const addHighScore = (score: number) => {
    if (!username) return
    const newScore = {
      username,
      score,
      difficulty,
      date: new Date().toISOString(),
    }
    const newHighScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10) // Keep only top 10
    setHighScores(newHighScores)
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {/* You might want to add a loading spinner here */}
        </View>
      </View>
    )
  }

  // Render the current screen
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        {screen === 'home' && (
          <HomeScreen username={username} setScreen={setScreen} />
        )}
        {screen === 'game' && (
          <GameScreen
            difficulty={difficulty}
            wordData={wordData}
            onGameEnd={addHighScore}
            setScreen={setScreen}
          />
        )}
        {screen === 'settings' && (
          <SettingsScreen
            username={username}
            setUsername={setUsername}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            setScreen={setScreen}
          />
        )}
        {screen === 'highscores' && (
          <HighScoreScreen highScores={highScores} setScreen={setScreen} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C1D95', // purple-900
  },
  content: {
    flex: 1,
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#6B46C1', // purple-800
  },
})
