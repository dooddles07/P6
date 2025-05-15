import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface HomeScreenProps {
  username: string
  setScreen: (screen: string) => void
}

export function HomeScreen({ username, setScreen }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EngCol</Text>
        <Text style={styles.subtitle}>English to Bicol Quiz Game</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.startButton]}
          onPress={() => setScreen('game')}
        >
          <MaterialCommunityIcons name="book-open" size={24} color="white" />
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.highScoresButton]}
          onPress={() => setScreen('highscores')}
        >
          <MaterialCommunityIcons name="trophy" size={24} color="white" />
          <Text style={styles.buttonText}>High Scores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.settingsButton]}
          onPress={() => setScreen('settings')}
        >
          <MaterialCommunityIcons name="cog" size={24} color="white" />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        {username ? (
          <Text style={styles.welcomeText}>
            Welcome, <Text style={styles.username}>{username}</Text>!
          </Text>
        ) : (
          <Text style={styles.welcomeText}>Set your username in Settings</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FCD34D', // yellow-300
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#FEF3C7', // yellow-100
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    marginVertical: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButton: {
    backgroundColor: '#16A34A', // green-600
  },
  highScoresButton: {
    backgroundColor: '#D97706', // yellow-600
  },
  settingsButton: {
    backgroundColor: '#2563EB', // blue-600
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 18,
    color: '#FEF3C7', // yellow-100
  },
  username: {
    fontWeight: 'bold',
    color: '#FCD34D', // yellow-300
  },
})
