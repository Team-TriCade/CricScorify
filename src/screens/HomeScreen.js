import React, { useEffect, useContext, useState } from 'react';
import { View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import config from '../config';
import { Container, Title, Button, ButtonText, BottomTabBar } from '../components/UI';

export default function HomeScreen() {
  const { logout, userToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('home');

  useEffect(() => {
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
    if (userToken) fetchUser();
  }, [userToken]);

  const tabs = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'profile', label: 'Profile', icon: 'account' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Container style={{ flex: 1, paddingBottom: 80 }}>
        {tab === 'home' && (
          <>
            <Title>{user ? `Welcome, ${user.fullname} 🎯` : 'Loading...'}</Title>
            <Button onPress={logout} style={{ backgroundColor: '#ff4d4d' }}>
              <ButtonText>Logout</ButtonText>
            </Button>
          </>
        )}
        {tab === 'profile' && user && (
          <>
            <Title>Profile</Title>
            <ButtonText>Full Name: {user.fullname}</ButtonText>
            <ButtonText>Email: {user.email}</ButtonText>
          </>
        )}
      </Container>
      <BottomTabBar tabs={tabs} selectedTab={tab} onSelectTab={setTab} />
    </View>
  );
}
