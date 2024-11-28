import React from 'react';
import { View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

const ios = Platform.OS === 'ios';

export default function CustomeKeyboardView({ children }) {
  return (
    <KeyboardAvoidingView
      behavior={ios ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1 }}>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
