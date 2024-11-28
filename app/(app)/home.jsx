import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Import hp
import { useAuth } from '../../context/authContext';
import ChatList from '../../assets/components/ChatList';

export default function Home() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([1, 2, 3]); // Fixing useState destructuring
  useEffect (()=>{
    if(user?.uid)
      getUsers();
  },[])

const getUsers = async () => {
}
  

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ChatList users ={users}/>
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <ActivityIndicator size="large" color="#0000ff" />
          
        </View>
      )}
      {/* <View className="p-4">
        <Button title="Logout" onPress={handleLogout} />
      </View> */}
    </View>
  );
}
