import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, StatusBar, Image
} from 'react-native';
import { MatchContext } from '../context/MatchContext';

import teamsData from '../db.json';

export default function TeamSelectScreen({ route, navigation }) {
  const { teamKey } = route.params;
  const { setTeamA, setTeamB } = useContext(MatchContext);

  const userGmail = 'user@example.com';  // your logged in user's email here
  const allTeams = teamsData.teams;

  const yourTeams = allTeams.filter(team => team.ownerGmail === userGmail);
  const globalTeams = allTeams.filter(team => team.ownerGmail !== userGmail);

  const [searchQuery, setSearchQuery] = useState('');
  const [showGlobal, setShowGlobal] = useState(false);
  const [filteredTeams, setFilteredTeams] = useState([]);

  useEffect(() => {
    const target = showGlobal ? globalTeams : yourTeams;
    const filtered = target.filter(team =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchQuery, showGlobal]);

  const selectTeam = (team) => {
    if (teamKey === 'teamA') setTeamA(team);
    else if (teamKey === 'teamB') setTeamB(team);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Text style={styles.heading}>Select {teamKey === 'teamA' ? 'Team A' : 'Team B'}</Text>

      <TextInput
        placeholder="Search Teams"
        placeholderTextColor="#666"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.search}
      />

      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton, !showGlobal && styles.activeTab]}
          onPress={() => setShowGlobal(false)}
        >
          <Text style={styles.switchText}>Your Teams</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, showGlobal && styles.activeTab]}
          onPress={() => setShowGlobal(true)}
        >
          <Text style={styles.switchText}>Global Teams</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTeams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.teamButton}
            onPress={() => selectTeam(item)}
          >
            <Image source={{ uri: item.logo }} style={styles.logo} />
            <Text style={styles.teamName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  heading: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  search: {
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 10,
    color: '#fff',
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  switchButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 6,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#00c853',
  },
  switchText: {
    color: '#fff',
    fontSize: 16,
  },
  teamButton: {
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    backgroundColor: '#333',
  },
  teamName: {
    color: '#fff',
    fontSize: 18,
  },
});
