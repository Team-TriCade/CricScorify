import React, { useState } from 'react';
import { Settings, View } from 'react-native';
import config from '../config';
import { BottomTabBar } from '../components/UI';
import DashboardScreen from './DashboardScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

export default function HomeScreen({ navigation}) {
  const [tab, setTab] = useState('home');

  const tabs = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'profile', label: 'Profile', icon: 'account' },
    { key: 'settings', label: 'Settings', icon: 'cog' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: config.theme.colors.background }}>
      {tab === 'home' && <DashboardScreen navigation={navigation} />}
      {tab === 'profile' && <ProfileScreen />}
      {tab === 'settings' && <SettingsScreen />}
      <BottomTabBar tabs={tabs} selectedTab={tab} onSelectTab={setTab} />
    </View>
  );
}
