import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';  // No need to import wp if not used

import { View ,Text} from 'react-native';



export const MenuItem = ({text,action,value,icon})=>{
    return(
        <MenuOption onSelect={()=> action(value)}>
            <View className ="px-4 py-1 flex-row justify-between items-center">
                <Text style ={{ fontSize :hp(1.7)}} className='font-semibold text-neutral-600'>
                    {text}
                </Text>
                {icon}
            </View>

            


        </MenuOption>
    )
    
}