import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Title, Button, ButtonText, Subtitle } from '../components/UI';
import config from '../config';

export default function TeamSetupScreen({ route, navigation }) {
  const { matchDetails } = route.params;
  const { teamA, teamB } = matchDetails;

  const [selectedTeamAPlayers, setSelectedTeamAPlayers] = useState([]);
  const [selectedTeamBPlayers, setSelectedTeamBPlayers] = useState([]);

  useEffect(() => {
    // Ideally fetch players from DB
    if (teamA?.players) setSelectedTeamAPlayers(teamA.players);
    if (teamB?.players) setSelectedTeamBPlayers(teamB.players);
  }, [teamA, teamB]);

  const handleNext = () => {
    navigation.navigate('TossScreen', {
      matchDetails,
      teamAPlayers: selectedTeamAPlayers,
      teamBPlayers: selectedTeamBPlayers,
    });
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Title style={{ marginBottom: 10 }}>👥 Team Setup</Title>

        <Subtitle style={{ marginTop: 20 }}>🅰️ Team A: {teamA?.name}</Subtitle>
        {/* Replace below with your custom player picker UI */}
        <Subtitle style={styles.playerList}>
          {selectedTeamAPlayers.map(p => p.name).join(', ') || 'No players selected'}
        </Subtitle>

        <Subtitle style={{ marginTop: 20 }}>🅱️ Team B: {teamB?.name}</Subtitle>
        <Subtitle style={styles.playerList}>
          {selectedTeamBPlayers.map(p => p.name).join(', ') || 'No players selected'}
        </Subtitle>

        <Button onPress={handleNext} style={{ marginTop: 30, backgroundColor: config.theme.colors.accent }}>
          <ButtonText>🪙 Next: Toss</ButtonText>
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: config.theme.colors.background,
    padding: 20,
  },
  playerList: {
    color: config.theme.colors.text2,
    marginTop: 10,
  }
});
