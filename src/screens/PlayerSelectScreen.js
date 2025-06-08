import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput,
  StyleSheet, ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import config from '../config';

export default function PlayerSelectScreen({ navigation, route }) {
  const { teamKey, teamA, teamB, onTeamASelected } = route.params;
  const { userToken } = useContext(AuthContext);

  const team = teamKey === 'teamA' ? teamA : teamB;
  const [players, setPlayers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${config.BACKEND_URL}/teams/${team._id}/players`, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then(res => res.json())
      .then(data => {
        setPlayers(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Fetch error:', err);
        setLoading(false);
      });
  }, [team._id, userToken]);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(players.filter(p => p.name.toLowerCase().includes(lower)));
  }, [search, players]);

  const toggle = (player) => {
    const count = Object.keys(selected).length;
    if (selected[player.id]) {
      const copy = { ...selected };
      delete copy[player.id];
      setSelected(copy);
    } else {
      if (count >= 11) return;
      setSelected({ ...selected, [player.id]: player });
    }
  };

  const handleNext = () => {
    const picked = Object.values(selected);
    if (picked.length === 0) return;

    if (teamKey === 'teamA') {
      navigation.replace('PlayerSelectScreen', {
        teamKey: 'teamB',
        teamA,
        teamB,
        onTeamASelected: picked,
      });
    } else {
      navigation.navigate('MatchInfoScreen', {
        teamAPlayers: onTeamASelected,
        teamBPlayers: picked,
        teamA,
        teamB,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00c853" />
        <Text style={{ color: '#aaa', marginTop: 10 }}>Loading players...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{team.name} - Select Players</Text>

      <TextInput
        placeholder="Search players..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const isSelected = selected[item.id];
          return (
            <TouchableOpacity
              onPress={() => toggle(item)}
              style={[styles.item, isSelected && styles.selectedItem]}
            >
              <Text style={[styles.itemText, isSelected && styles.selectedText]}>
                {item.name} {item.role ? `(${item.role})` : ''}
              </Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={<Text style={styles.empty}>No players found</Text>}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next ({Object.keys(selected).length}/11)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  centered: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  search: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  item: {
    padding: 14,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedItem: {
    backgroundColor: '#00c853',
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedText: {
    color: '#121212',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00c853',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  empty: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
