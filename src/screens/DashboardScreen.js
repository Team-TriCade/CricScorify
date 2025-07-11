import React, { useEffect, useContext, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import config from '../config';
import { Container, Title, Subtitle, Button, ButtonText } from '../components/UI';

export default function DashboardScreen({ navigation }) {
  const { logout, userToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userToken) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`${config.BACKEND_URL}/me`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const data = await res.json();
        if (data.success) setUser(data.user);
      } catch (err) {
        console.log('Fetch user error:', err);
      }
    };
    fetchUser();
  }, [userToken]);

  return (
    <Container style={{ flex: 1, paddingTop: 20, paddingBottom: 80 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title style={{ fontSize: 22 }}>
          {user ? `Welcome ${user.fullname}!` : 'Loading...'}
        </Title>

        <Button onPress={() => navigation.navigate('MatchSetup')}>
          <ButtonText>Start Match</ButtonText>
        </Button>
      </View>

      <ScrollView style={{ marginTop: 20 }}>
        <Subtitle style={{ marginBottom: 10 }}>Sample Match Preview</Subtitle>

        <View
          style={{
            backgroundColor: '#2a2a2a',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 4,
          }}
        >
          <Title style={{ fontSize: 18, marginBottom: 5, color: '#fff' }}>
            Team A vs Team B
          </Title>
          <Subtitle style={{ fontSize: 14, color: '#bbb' }}>
            Limited Overs - 10 Overs Match
          </Subtitle>
          <Subtitle style={{ fontSize: 14, color: '#bbb' }}>
            Status: Not Started
          </Subtitle>
        </View>

        <Subtitle style={{ marginBottom: 10 }}>Your Matches</Subtitle>

        <View
          style={{
            backgroundColor: '#2a2a2a',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 4,
          }}
        >
          <Subtitle style={{ color: '#888' }}>No matches yet</Subtitle>
        </View>
      </ScrollView>
    </Container>
  );
}
