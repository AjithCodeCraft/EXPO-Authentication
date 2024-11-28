import { Stack } from 'expo-router';
import React from 'react';
import HomeHeader from '../../assets/components/HomeHeader';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="home" // Correct usage for Expo Router
        options={{
          header: () => <HomeHeader />,
        }}
      />
    </Stack>
  );
}
