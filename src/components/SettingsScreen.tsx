import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SettingsScreenProps {
  username: string;
  setUsername: (username: string) => void;
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  setScreen: (screen: string) => void;
}

export function SettingsScreen({
  username,
  setUsername,
  difficulty,
  setDifficulty,
  setScreen
}: SettingsScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setScreen('home')}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              placeholderTextColor="#9CA3AF"
              maxLength={15}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Difficulty</Text>
            <View style={styles.difficultyButtons}>
              {['easy', 'medium', 'hard'].map(level => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.difficultyButton,
                    difficulty === level && styles.difficultyButtonActive
                  ]}
                  onPress={() => setDifficulty(level)}
                >
                  <Text style={[
                    styles.difficultyButtonText,
                    difficulty === level && styles.difficultyButtonTextActive
                  ]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.difficultyInfo}>
            <Text style={styles.difficultyInfoTitle}>Difficulty Settings:</Text>
            <View style={styles.difficultyInfoContent}>
              <Text style={styles.difficultyInfoText}>
                <Text style={styles.difficultyInfoLabel}>Easy:</Text> 5 lives, 20 seconds per question, 10 questions
              </Text>
              <Text style={styles.difficultyInfoText}>
                <Text style={styles.difficultyInfoLabel}>Medium:</Text> 3 lives, 15 seconds per question, 15 questions
              </Text>
              <Text style={styles.difficultyInfoText}>
                <Text style={styles.difficultyInfoLabel}>Hard:</Text> 2 lives, 10 seconds per question, 20 questions
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setScreen('home')}
          >
            <Text style={styles.saveButtonText}>Save Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
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
    padding: 12,
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
  },
  form: {
    padding: 24,
    gap: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 20,
    color: 'white',
    marginBottom: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: 'rgba(107, 70, 193, 0.5)',
    borderRadius: 12,
    padding: 16,
    color: 'white',
    borderWidth: 2,
    borderColor: '#7C3AED',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  difficultyButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  difficultyButton: {
    flex: 1,
    backgroundColor: 'rgba(107, 70, 193, 0.5)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#7C3AED',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  difficultyButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#3B82F6',
  },
  difficultyButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
  difficultyButtonTextActive: {
    color: 'white',
  },
  difficultyInfo: {
    marginTop: 24,
    backgroundColor: 'rgba(252, 211, 77, 0.1)',
    borderRadius: 16,
    padding: 20,
  },
  difficultyInfoTitle: {
    fontSize: 20,
    color: '#FCD34D',
    marginBottom: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  difficultyInfoContent: {
    backgroundColor: 'rgba(107, 70, 193, 0.5)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#7C3AED',
  },
  difficultyInfoText: {
    color: 'white',
    marginBottom: 12,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  difficultyInfoLabel: {
    fontWeight: '700',
    color: '#FCD34D',
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: '#16A34A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    borderWidth: 2,
    borderColor: '#22C55E',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});