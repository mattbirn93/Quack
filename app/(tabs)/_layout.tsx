import { Tabs } from 'expo-router';
import React from 'react';

import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { TabBarIcon } from '../../frontend/src/components/navigation/TabBarIcon';
import { Colors } from '../../frontend/src/constants/Colors';
import { useColorScheme } from '../../frontend/src/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'home' : 'home-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'code-slash' : 'code-slash-outline'}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
