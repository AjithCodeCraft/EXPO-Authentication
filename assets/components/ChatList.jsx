import React from 'react';
import { View, FlatList } from 'react-native';
import ChatItem from './ChatItem';
import { useRouter } from 'expo-router';

export default function ChatList({ users }) {
  const router = useRouter();
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item, index) => index.toString()} // Use index if `id` is not available
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            noBorder={index + 1 === users.length} // Fixed typo in prop name
            item={item}
            index={index}
            router={router}
          />
        )}
      />
    </View>
  );
}
