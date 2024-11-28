import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ChatItem({ item, router, noBorder }) {
  return (
    <TouchableOpacity
      className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${
        noBorder ? '' : 'border-b border-b-neutral-200'
      }`}
    >
      <Image
        source={require('../images/icon.png')}
        style={{
          height: hp(6),
          width: hp(6),
        }}
        className="rounded-full"
      />
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            {item?.name || 'Default Name'}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            {item?.time || 'Default Time'}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          Last message
        </Text>
      </View>
    </TouchableOpacity>
  );
}
