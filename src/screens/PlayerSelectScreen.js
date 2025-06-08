import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  TextInput, StyleSheet, StatusBar
} from 'react-native';
import db from '../db.json';

export default function PlayerSelectScreen({ navigation, route }) {
  const { teamKey, teamAId, teamBId, onPlayersSelected } = route.params;

  const [search, setSearch] = useState('');
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState({});

  useEffect(() => {
    const teams = db.teams || [];
    const a = teams.find(t => t.id === teamAId);
    const b = teams.find(t => t.id === teamBId);
    setTeamA(a);
    setTeamB(b);

    // Default to teamA's players to pick from
    if (teamKey === 'teamA' && a) {
      setPlayers(a.players);
      setFilteredPlayers(a.players);
    } else if (teamKey === 'teamB' && b) {
      setPlayers(b.players);
      setFilteredPlayers(b.players);
    }
  }, [teamAId, teamBId, teamKey]);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredPlayers(players);
    } else {
      const lower = search.toLowerCase();
      setFilteredPlayers(players.filter(p => p.name.toLowerCase().includes(lower)));
    }
  }, [search, players]);

  const toggleSelect = (player) => {
    const currentCount = Object.keys(selectedPlayers).length;

    if (selectedPlayers[player.id]) {
      const newSelected = { ...selectedPlayers };
      delete newSelected[player.id];
      setSelectedPlayers(newSelected);
    } else {
      if (currentCount >= 11) return;
      setSelectedPlayers({ ...selectedPlayers, [player.id]: player });
    }
  };

  const renderItem = ({ item }) => {
    const selected = !!selectedPlayers[item.id];
    return (
      <TouchableOpacity
        onPress={() => toggleSelect(item)}
        style={[styles.playerItem, selected && styles.playerItemSelected]}
      >
        <Text style={[styles.playerText, selected && styles.playerTextSelected]}>
          {item.name} {item.role ? `(${item.role})` : ''}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleDone = () => {
    if (Object.keys(selectedPlayers).length === 0) return;
    if (onPlayersSelected) {
      onPlayersSelected(teamKey, Object.values(selectedPlayers));
    }
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#121212" />
          <Text style={styles.title}>Select Players</Text>

          <View style={styles.teamNames}>
            <Text style={styles.teamName}>{teamA?.name || 'Team A'}</Text>
            <Text style={styles.vs}>|</Text>
            <Text style={styles.teamName}>{teamB?.name || 'Team B'}</Text>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search players"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />

          <FlatList
            data={filteredPlayers}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={<Text style={styles.emptyText}>No players found</Text>}
          />

          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneText}>Done ({Object.keys(selectedPlayers).length}/11)</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  teamNames: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  teamName: {
    color: '#00c853',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  vs: {
    color: '#888',
    fontSize: 18,
    fontWeight: '600',
  },
  searchInput: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  playerItem: {
    padding: 14,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    marginBottom: 10,
  },
  playerItemSelected: {
    backgroundColor: '#00c853',
  },
  playerText: {
    color: '#fff',
    fontSize: 16,
  },
  playerTextSelected: {
    color: '#121212',
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: '#00c853',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  doneText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
