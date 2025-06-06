import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Container, Input, Button, ButtonText, Title, Subtitle } from '../components/UI';
import { Picker } from '@react-native-picker/picker';

export default function MatchSetupScreen({ navigation }) {
  const [matchName, setMatchName] = useState('');
  const [matchType, setMatchType] = useState('limited');
  const [overs, setOvers] = useState('');
  const [playersPerSide, setPlayersPerSide] = useState('11');
  const [lastManBatting, setLastManBatting] = useState(true);
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');

  const handleNext = () => {
    navigation.navigate('TeamSetup', {
      matchDetails: {
        matchName,
        matchType,
        overs: matchType === 'limited' ? overs : 'Unlimited',
        playersPerSide,
        lastManBatting,
        teamA,
        teamB,
      },
    });
  };

  return (
    <ScrollView>
      <Container style={{ paddingBottom: 80 }}>
        <Title>Match Setup</Title>

        <Input placeholder="Match Name" value={matchName} onChangeText={setMatchName} />

        <Subtitle>Match Type</Subtitle>
        <Picker selectedValue={matchType} onValueChange={setMatchType}>
          <Picker.Item label="Limited Overs" value="limited" />
          <Picker.Item label="Test Match" value="test" />
        </Picker>

        {matchType === 'limited' && (
          <Input placeholder="Number of Overs" keyboardType="numeric" value={overs} onChangeText={setOvers} />
        )}

        <Subtitle>Players Per Side</Subtitle>
        <Picker selectedValue={playersPerSide} onValueChange={setPlayersPerSide}>
          <Picker.Item label="6" value="6" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="11" value="11" />
        </Picker>

        <Subtitle>Allow Last Man Batting</Subtitle>
        <Picker selectedValue={lastManBatting} onValueChange={val => setLastManBatting(val)}>
          <Picker.Item label="Yes" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>

        <Input placeholder="Team A Name" value={teamA} onChangeText={setTeamA} />
        <Input placeholder="Team B Name" value={teamB} onChangeText={setTeamB} />

        <Button onPress={handleNext}>
          <ButtonText>Next: Add Players</ButtonText>
        </Button>
      </Container>
    </ScrollView>
  );
}
