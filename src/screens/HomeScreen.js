import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import config from '../config';
import { Container, Title, Button } from '../components/UI';

export default function HomeScreen() {
  const { logout, userToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${config.BACKEND_URL}/me`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        } else {
          console.log('Fetch failed:', data.message);
        }
      } catch (err) {
        console.log('Failed to fetch user:', err);
      }
    };

    if (userToken) fetchUser();
  }, [userToken]);

  return (
    <Container>
      <Title>{user ? `Welcome, ${user.fullname} 🎯` : 'Loading...'}</Title>
      <Button title="Logout" onPress={logout} style={{ backgroundColor: '#ff4d4d' }} />
    </Container>
  );
}
