import React, { useEffect, useContext, useState } from 'react';
import { Container, Title, Subtitle, Button, ButtonText } from '../components/UI';
import { AuthContext } from '../context/AuthContext';
import config from '../config';

export default function DashboardScreen() {
  const { logout, userToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);

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

  return (
    <Container style={{ flex: 1, paddingBottom: 80 }}>
      <Title style={{ marginBottom: 20 }}>
        {user ? `Welcome, ${user.fullname} 🎯` : 'Loading...'}
      </Title>
      <Subtitle style={{ textAlign: 'center', marginBottom: 40, color: config.theme.colors.text2 }}>
        Your personalized dashboard is ready.
      </Subtitle>
      <Button
        onPress={logout}
        style={{ backgroundColor: config.theme.colors.danger, alignSelf: 'center', width: '50%' }}
      >
        <ButtonText>Logout</ButtonText>
      </Button>
    </Container>
  );
}
