import React, { useState } from 'react';
import { Switch, ScrollView } from 'react-native';
import { Container, Title, BodyText } from '../components/UI';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(false);

  return (
    <Container style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <Title style={{ textAlign: 'left', alignSelf: 'flex-start', marginTop: 10 }}>
          Settings
        </Title>

        <BodyText style={{ marginVertical: 12 }}>
          Dark Mode
        </BodyText>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: '#767577', true: '#4caf50' }}
          thumbColor={darkMode ? '#fff' : '#f4f3f4'}
        />

        <BodyText style={{ marginVertical: 12 }}>
          Notifications
        </BodyText>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: '#767577', true: '#4caf50' }}
          thumbColor={notifications ? '#fff' : '#f4f3f4'}
        />

        {/* Add more settings here */}
      </ScrollView>
    </Container>
  );
}
