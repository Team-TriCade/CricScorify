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
    <Container style={{ flex: 1, paddingTop: 10, paddingBottom: 80, justifyContent: 'flex-start' }}>
      <Title style={{ textAlign: 'center', alignSelf: 'center', marginBottom: 20 }}>
        {user ? `Welcome, ${user.fullname}` : 'Loading...'}
      </Title>
      
    </Container>
  );
}
