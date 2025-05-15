import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface HighScore {
  username: string
  score: number
  difficulty: string
  date: string
}

interface HighScoreScreenProps {
  highScores: HighScore[]
  setScreen: (screen: string) => void
}

export function HighScoreScreen({ highScores, setScreen }: HighScoreScreenProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  // Get badge style based on position
  const getBadgeStyle = (index: number) => {
    switch (index) {
      case 0:
        return styles.badgeGold
      case 1:
        return styles.badgeSilver
      case 2:
        return styles.badgeBronze
      default:
        return styles.badgeDefault
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setScreen('home')}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>High Scores</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.trophyContainer}>
          <MaterialCommunityIcons name="trophy" size={40} color="#FCD34D" />
        </View>

        {highScores.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No high scores yet.</Text>
            <Text style={styles.emptyStateSubtext}>Play the game to set a record!</Text>
          </View>
        ) : (
          <ScrollView style={styles.scoreList}>
            <View style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.rankCell]}>#</Text>
              <Text style={[styles.headerCell, styles.nameCell]}>Name</Text>
              <Text style={[styles.headerCell, styles.scoreCell]}>Score</Text>
              <Text style={[styles.headerCell, styles.difficultyCell]}>Difficulty</Text>
              <Text style={[styles.headerCell, styles.dateCell]}>Date</Text>
            </View>

            {highScores.map((score, index) => (
              <View
                key={index}
                style={[
                  styles.scoreRow,
                  index % 2 === 0 ? styles.evenRow : styles.oddRow
                ]}
              >
                <View style={[styles.rankCell, styles.cell]}>
                  <View style={[styles.badge, getBadgeStyle(index)]}>
                    <Text style={styles.badgeText}>{index + 1}</Text>
                  </View>
                </View>
                <Text style={[styles.nameCell, styles.cell]} numberOfLines={1}>
                  {score.username}
                </Text>
                <Text style={[styles.scoreCell, styles.cell, styles.scoreText]}>
                  {score.score}
                </Text>
                <Text style={[styles.difficultyCell, styles.cell]}>
                  {score.difficulty}
                </Text>
                <Text style={[styles.dateCell, styles.cell, styles.dateText]}>
                  {formatDate(score.date)}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C1D95',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4C1D95',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#7C3AED',
  },
  backButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginLeft: 20,
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  trophyContainer: {
    alignItems: 'center',
    marginBottom: 32,
    padding: 20,
    backgroundColor: 'rgba(252, 211, 77, 0.1)',
    borderRadius: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginTop: 20,
  },
  emptyStateText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  emptyStateSubtext: {
    marginTop: 12,
    color: '#FEF3C7',
    fontSize: 16,
  },
  scoreList: {
    backgroundColor: 'rgba(107, 70, 193, 0.5)',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#4C1D95',
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#7C3AED',
  },
  headerCell: {
    color: '#FCD34D',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  scoreRow: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(124, 58, 237, 0.3)',
  },
  evenRow: {
    backgroundColor: 'rgba(107, 70, 193, 0.5)',
  },
  oddRow: {
    backgroundColor: 'rgba(91, 33, 182, 0.5)',
  },
  cell: {
    color: 'white',
    fontSize: 15,
  },
  rankCell: {
    width: '10%',
    alignItems: 'center',
  },
  nameCell: {
    width: '35%',
    paddingRight: 8,
  },
  scoreCell: {
    width: '15%',
    textAlign: 'right',
  },
  difficultyCell: {
    width: '20%',
  },
  dateCell: {
    width: '20%',
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  badgeGold: {
    backgroundColor: '#EAB308',
  },
  badgeSilver: {
    backgroundColor: '#94A3B8',
  },
  badgeBronze: {
    backgroundColor: '#B45309',
  },
  badgeDefault: {
    backgroundColor: '#6B46C1',
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  scoreText: {
    color: '#FCD34D',
    fontWeight: '700',
    fontSize: 16,
  },
  dateText: {
    fontSize: 13,
    color: '#FEF3C7',
  },
})
