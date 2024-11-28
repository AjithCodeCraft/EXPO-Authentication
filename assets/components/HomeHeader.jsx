import React from 'react';
import { Platform, View, Text } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';  // No need to import wp if not used
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { blurhash } from '../../utils/commom';
import { useAuth } from '../../context/authContext';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuitems';
import { AntDesign, Feather } from '@expo/vector-icons';
const ios = Platform.OS === 'ios';

export default function HomeHeader() {
  const { top } = useSafeAreaInsets();
  const { user,logout} = useAuth();
  const handleProfile =()=>{

  }
  const handleLogout=async()=>{
    await logout ();

  }

  return (
    <View
      style={{
        paddingTop: ios ? top : top + 30,  // Add 30px extra padding for Android
        backgroundColor: '#4F46E5',  // Indigo-500 color (You can replace with bg-indigo-500 if Tailwind is set up)
      }}
      className="flex-row justify-between px-5 pb-6 rounded-b-3xl shadow"
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
          Chats
        </Text>
      </View>
      <View>
            <Menu>
            <MenuTrigger customStyles={
              {
                triggerWrapper:{
                  // trigger wrapper styles
                }
              }
            }>
              <Image
                style={{height:hp(4.3),aspectRatio:1,borderRadius:100}}
                source={{ uri: user?.profileUrl }}
                placeholder={blurhash }
                transition={500}
              />
            </MenuTrigger>
            <MenuOptions customStyles={{
              optionsContainer:{
                borderRadius:10,
                borderCurve :'continuous',
                marginTop :40,
                marginLeft:-40,
                backgroundColor :'white',
                shadowOpacity:0.1,
                shadowOffset:{width:0,height:0},
                width :160
              }
            }}>
                
               <MenuItem text="Profile"
               action={ handleProfile}
               value={null}
               icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
               />
            <Diveder/>
            <MenuItem text="Sighn Out"
               action={ handleLogout}
               value={null}
               icon={<AntDesign name="logout" size={hp(2.5)} color="#737373" />}
               />

              
            </MenuOptions>
          </Menu>
    
      </View>
    </View>
  );
}
const Diveder = ()=>{
    return (
      <View className='p-[1px] w-full bg-neutral-200'/>
    )
  }

