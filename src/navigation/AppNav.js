import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen'; // ~ protected screen
import DashboardScreen from '../screens/DashboardScreen'; // ~ protected screen
import ProfileScreen from '../screens/ProfileScreen'; // ~ protected screen
import EditProfileScreen from '../screens/EditProfileScreen'; // ~ protected screen
import SettingsScreen from '../screens/SettingsScreen'; // ~ protected screen
import MatchSetupScreen from '../screens/MatchSetupScreen'; // ~ protected screen
import TeamSelectScreen from '../screens/TeamSelectScreen'; // ~ protected screen
import PlayerSelectScreen from '../screens/PlayerSelectScreen'; // ~ protected screen
import MatchInfoScreen from '../screens/MatchInfoScreen'; // ~ protected screen
const Stack = createNativeStackNavigator();

export default function AppNav() {
  const { userToken } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="MatchSetup" component={MatchSetupScreen} />
          <Stack.Screen name="TeamSelectScreen" component={TeamSelectScreen} />
          <Stack.Screen name="PlayerSelectScreen" component={PlayerSelectScreen} />
          <Stack.Screen name="MatchInfo" component={MatchInfoScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>

  );
}
