import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, StatusBar, Image
} from 'react-native';
import { MatchContext } from '../context/MatchContext';
import { AuthContext } from '../context/AuthContext';
import config from '../config';

export default function TeamSelectScreen({ route, navigation }) {
  const { teamKey } = route.params;
  const { setTeamA, setTeamB } = useContext(MatchContext);
  const { userToken } = useContext(AuthContext);

  const [userEmail, setUserEmail] = useState('');
  const [allTeams, setAllTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showGlobal, setShowGlobal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${config.BACKEND_URL}/me`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const data = await res.json();
        if (data.success) setUserEmail(data.user.email);
      } catch (err) {
        console.log('Fetch user email error:', err);
      }
    };

    const fetchTeams = async () => {
      try {
        const res = await fetch(`${config.BACKEND_URL}/teams/getTeams`);
        const data = await res.json();
        setAllTeams(data);
      } catch (err) {
        console.log('Fetch teams error:', err);
      }
    };

    fetchUser();
    fetchTeams();
  }, [userToken]);

  useEffect(() => {
    if (!userEmail) return;

    const filtered = allTeams
      .filter(team =>
        showGlobal ? team.ownerEmail !== userEmail : team.ownerEmail === userEmail
      )
      .filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    setFilteredTeams(filtered);
  }, [allTeams, searchQuery, showGlobal, userEmail]);

  const selectTeam = (team) => {
    if (teamKey === 'teamA') setTeamA(team);
    else setTeamB(team);
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
        keyExtractor={(item) => item._id}
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
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  heading: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  search: {
    backgroundColor: '#1E1E1E', padding: 12, borderRadius: 10,
    color: '#fff', marginBottom: 15
  },
  switchContainer: { flexDirection: 'row', marginBottom: 20 },
  switchButton: {
    flex: 1, padding: 10, backgroundColor: '#1E1E1E',
    borderRadius: 6, marginHorizontal: 5, alignItems: 'center'
  },
  activeTab: { backgroundColor: '#00c853' },
  switchText: { color: '#fff', fontSize: 16 },
  teamButton: {
    backgroundColor: '#1E1E1E', flexDirection: 'row',
    alignItems: 'center', padding: 14, borderRadius: 10,
    marginBottom: 15, borderWidth: 1, borderColor: '#333',
  },
  logo: {
    width: 40, height: 40, borderRadius: 20,
    marginRight: 15, backgroundColor: '#333',
  },
  teamName: { color: '#fff', fontSize: 18 },
});
