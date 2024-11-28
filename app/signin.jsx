import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomeKeyboardView from '../assets/components/CustomeKeyboardView';
import { useAuth } from '../context/authContext';

export default function SignIn() {
  const router = useRouter();

  const [loading, setLoading] = useState(false); // Set loading to false initially
  const {login} =useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign In', 'Please fill all the fields');
      return;
    }
    setLoading(true);
    try {
      const response = await login(emailRef.current, passwordRef.current);
      setLoading(false);
 
      console.log('sign in response', response);
      if (!response.success) {
        Alert.alert('Sign In', response.msg);
      } else {
        router.push('/home');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Sign In Error', 'An unexpected error occurred.');
      console.error(error);
    }
 };
 
  return (
    <CustomeKeyboardView>
    <View className="flex-1">
      <StatusBar style="dark" />
      <View className="flex-1 pt-[9%] px-[5%] gap-12">
        <View className="items-center">
          <Image
            style={{ height: hp(25) }}
            resizeMode="contain"
            source={require('../assets/images/splash-icon.png')}
          />
        </View>

        <View className="gap-10">
          <Text className="text-center text-neutral-800 font-bold tracking-wider" style={{ fontSize: hp(4) }}>
            Sign In
          </Text>

          {/* Email Input */}
          <View className="flex-row items-center gap-4 px-5 bg-neutral-100 rounded-xl self-center" style={{ height: hp(6), width: wp(90) }}>
            <Octicons name="mail" size={hp(2.5)} color="gray" />
            <TextInput
              onChangeText={value => emailRef.current = value}
              className="flex-1 text-neutral-700 font-semibold"
              style={{ fontSize: hp(2) }}
              placeholder="Email"
              placeholderTextColor="gray"
            />
          </View>

          {/* Password Input */}
          <View className="flex-row items-center gap-4 px-5 bg-neutral-100 rounded-xl self-center" style={{ height: hp(6), width: wp(90) }}>
            <MaterialIcons name="wifi-password" size={hp(2.5)} color="gray" />
            <TextInput
              onChangeText={value => passwordRef.current = value}
              className="flex-1 text-neutral-700 font-semibold"
              style={{ fontSize: hp(2) }}
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry={true}
            />
          </View>

          {/* Forgot Password */}
          <Text className="text-right text-neutral-500 font-semibold" style={{ fontSize: hp(1.8) }}>
            Forgot password?
          </Text>

          {/* Submit Button */}
          <View>
            {loading ? (
              <View className="flex-row justify-center mt-4">
                <ActivityIndicator size={hp(6)} color="blue" />
              </View>
            ) : (
              <TouchableOpacity onPress={handleLogin} className="mt-4 bg-indigo-600 rounded-xl justify-center items-center" style={{ height: hp(6.5) }}>
                <Text className="text-center text-white font-bold -tracking-wider" style={{ fontSize: hp(2.2), lineHeight: hp(7) }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center">
            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">
              Don't have an account?
            </Text>
            <Pressable onPress={() => router.push('/signUp')}>
              <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-indigo-500">
                Sign Up
              </Text>
            </Pressable>
          </View>

        </View>
      </View>
    </View>
    </CustomeKeyboardView>
  );
}
