import React from 'react';
import { StyleSheet, View, Image, Text, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Screens
import { TextsScreen } from './src/screens/TextsScreen';
import { ViewsScreen } from './src/screens/ViewsScreen';
import { BackgroundsScreen } from './src/screens/BackgroundsScreen';
import { TransitionsScreen } from './src/screens/TransitionsScreen';
import { GesturesScreen } from './src/screens/GesturesScreen';
import { DecorationsScreen } from './src/screens/DecorationsScreen';
import { ChartsScreen } from './src/screens/ChartsScreen';
import ActiveRecording from './src/screens/ActiveRecording';

const Tab = createMaterialTopTabNavigator();

const RECORDING_MODE = false;

export default function App() {
  if (RECORDING_MODE) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <ActiveRecording />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        
        {/* Header with App Logo */}
        <View style={styles.header}>
          <Image 
            source={require('./assets/logo.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerTitle}>Magic Animations</Text>
            <Text style={styles.headerSubtitle}>React Native Showcase</Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarScrollEnabled: true,
              tabBarActiveTintColor: '#1B5E20',
              tabBarInactiveTintColor: '#81C784',
              tabBarIndicatorStyle: { 
                backgroundColor: '#4CAF50', 
                height: 3,
                borderRadius: 3,
              }
            }}
          >
            <Tab.Screen name="Charts" component={ChartsScreen} options={{ title: 'Charts 📊' }} />
            <Tab.Screen name="Decorations" component={DecorationsScreen} options={{ title: 'Decorations ✨' }} />
            <Tab.Screen name="Gestures" component={GesturesScreen} options={{ title: 'Gestures 👆' }} />
            <Tab.Screen name="Transitions" component={TransitionsScreen} options={{ title: 'Transitions 🔄' }} />
            <Tab.Screen name="Backgrounds" component={BackgroundsScreen} options={{ title: 'Backgrounds 🌌' }} />
            <Tab.Screen name="Views" component={ViewsScreen} options={{ title: 'Views 📦' }} />
            <Tab.Screen name="Texts" component={TextsScreen} options={{ title: 'Texts 🔤' }} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: RNStatusBar.currentHeight ? 0 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8F5E9',
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  headerTextWrapper: {
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1B5E20',
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#66BB6A',
    fontWeight: '600',
    marginTop: 1,
  },
});
