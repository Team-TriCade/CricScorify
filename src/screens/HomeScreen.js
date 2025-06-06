import React, { useState } from 'react';
import { View } from 'react-native';
import config from '../config';
import { BottomTabBar } from '../components/UI';
import DashboardScreen from './DashboardScreen';
import ProfileScreen from './ProfileScreen';

export default function HomeScreen() {
  const [tab, setTab] = useState('home');

  const tabs = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'profile', label: 'Profile', icon: 'account' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: config.theme.colors.background }}>
      {tab === 'home' && <DashboardScreen />}
      {tab === 'profile' && <ProfileScreen />}
      <BottomTabBar tabs={tabs} selectedTab={tab} onSelectTab={setTab} />
    </View>
  );
}
