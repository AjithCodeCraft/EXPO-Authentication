import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

export default function loading({size}) {
  return (
    <View style={{height:size,aspectRatio:1}}> 
      <LottieView style={{flex:1}} source={require('../images/Animation - 1731664596438.json')} autoPlay loop/>
    </View>
  )
}