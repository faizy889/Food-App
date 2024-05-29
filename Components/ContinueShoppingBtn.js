import * as Native from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Theme from '../Theme'
import { useNavigation } from '@react-navigation/native'

export default function ContinueShoppingBtn() {

   const navigation = useNavigation()

   return (
      <Native.TouchableOpacity className='absolute z-30 bottom-4 h-[55px] w-[94%] border-[3px] border-buttonColor bg-[#ffffff] self-center items-center justify-center rounded-xl ' style={{ elevation: 7 }}
         onPress={() => navigation.goBack()}
      >
         <Native.View className='flex-row items-center'>
            <FontAwesomeIcon icon={solid.faArrowLeft} size={22} style={{ color: Theme.buttonColor }} />
            <Native.Text className='text-[22px] font-bold text-buttonColor ml-2'>Continue Shopping</Native.Text>
         </Native.View>
      </Native.TouchableOpacity>
   )
}