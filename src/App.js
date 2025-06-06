// App.js
import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import AppNav from './navigation/AppNav';

function RootApp() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#111' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AlertNotificationRoot>
        <AppNav />
      </AlertNotificationRoot>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootApp />
    </AuthProvider>
  );
}
