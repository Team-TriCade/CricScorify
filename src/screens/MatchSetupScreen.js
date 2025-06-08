import React, { useContext, useRef, useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, KeyboardAvoidingView, Platform,
  TouchableWithoutFeedback, Keyboard, StatusBar
} from 'react-native';
import { MatchContext } from '../context/MatchContext';

export default function MatchSetupScreen({ navigation }) {
  const {
    matchType, setMatchType,
    overs, setOvers,
    savedOvers, setSavedOvers,
    teamA, setTeamA,
    teamB, setTeamB,
    tossWinner, setTossWinner,
    tossDecision, setTossDecision
  } = useContext(MatchContext);

  const inputRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (matchType === 'Test') {
      setSavedOvers(overs);
      setOvers('');
    } else if (matchType === 'Limited Overs' && overs === '') {
      setOvers(savedOvers || '');
    }
  }, [matchType]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      setTeamA(null);
      setTeamB(null);
    });
    return unsubscribe;
  }, [navigation, setTeamA, setTeamB]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    inputRef.current?.blur();
  };

  const handleTypeSwitch = (type) => {
    setMatchType(type);
  };

  const chooseTeam = (teamKey) => {
    dismissKeyboard();
    navigation.navigate('TeamSelectScreen', { teamKey });
  };

  const handleNext = () => {
    if (!teamA || !teamB) {
      setError('Please select both teams');
      return;
    }
    if (matchType === 'Limited Overs' && !overs) {
      setError('Please enter number of overs');
      return;
    }
    if (!tossWinner || !tossDecision) {
      setError('Please complete toss selection');
      return;
    }
    setError('');
    navigation.navigate('PlayerSelectScreen', {
      teamA,
      teamB,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1, backgroundColor: '#121212' }}>
        <StatusBar barStyle="light-content" backgroundColor="#121212" />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >

          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >

            <Text style={styles.heading}>Match Setup</Text>

            <Text style={styles.label}>Select Match Type</Text>
            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[styles.typeButton, matchType === 'Limited Overs' && styles.typeSelected]}
                onPress={() => handleTypeSwitch('Limited Overs')}
              >
                <Text style={styles.typeText}>Limited Overs</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeButton, matchType === 'Test' && styles.typeSelected]}
                onPress={() => handleTypeSwitch('Test')}
              >
                <Text style={styles.typeText}>Test</Text>
              </TouchableOpacity>
            </View>

            {matchType === 'Limited Overs' && (
              <>
                <Text style={styles.label}>Enter Overs</Text>
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  value={overs}
                  onChangeText={setOvers}
                  placeholder="e.g. 20"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  returnKeyType="done"
                  onSubmitEditing={dismissKeyboard}
                  blurOnSubmit
                />
              </>
            )}

            <Text style={styles.label}>Select Team A</Text>
            <TouchableOpacity
              style={styles.selector}
              onPress={() => chooseTeam('teamA')}
            >
              <Text style={styles.selectorText}>
                {teamA ? teamA.name : 'Choose Team A'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Select Team B</Text>
            <TouchableOpacity
              style={styles.selector}
              onPress={() => chooseTeam('teamB')}
            >
              <Text style={styles.selectorText}>
                {teamB ? teamB.name : 'Choose Team B'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Toss Winner</Text>
            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[styles.typeButton, tossWinner === 'A' && styles.typeSelected]}
                onPress={() => setTossWinner('A')}
              >
                <Text style={styles.typeText}>{teamA?.name || 'Team A'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeButton, tossWinner === 'B' && styles.typeSelected]}
                onPress={() => setTossWinner('B')}
              >
                <Text style={styles.typeText}>{teamB?.name || 'Team B'}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Toss Decision</Text>
            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[styles.typeButton, tossDecision === 'bat' && styles.typeSelected]}
                onPress={() => setTossDecision('bat')}
              >
                <Text style={styles.typeText}>Bat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeButton, tossDecision === 'bowl' && styles.typeSelected]}
                onPress={() => setTossDecision('bowl')}
              >
                <Text style={styles.typeText}>Bowl</Text>
              </TouchableOpacity>
            </View>

            {error !== '' && (
              <Text style={styles.error}>{error}</Text>
            )}

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
            >
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmall = width < 360;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: width * 0.05,
    backgroundColor: '#121212',
  },
  heading: {
    color: '#fff',
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  label: {
    color: '#ccc',
    fontSize: width * 0.045,
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: height * 0.02,
  },
  typeButton: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingVertical: height * 0.015,
    borderRadius: 8,
    alignItems: 'center',
  },
  typeSelected: {
    backgroundColor: '#00c853',
  },
  typeText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
    borderRadius: 8,
    fontSize: width * 0.045,
    marginBottom: height * 0.025,
  },
  selector: {
    backgroundColor: '#222',
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.04,
    borderRadius: 8,
    marginBottom: height * 0.025,
  },
  selectorText: {
    color: '#fff',
    fontSize: width * 0.045,
  },
  nextButton: {
    backgroundColor: '#00c853',
    paddingVertical: height * 0.02,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: height * 0.025,
  },
  nextText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: height * 0.015,
    textAlign: 'center',
    fontSize: width * 0.04,
  },
});
