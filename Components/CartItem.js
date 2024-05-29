import * as Native from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import * as regular from '@fortawesome/free-regular-svg-icons'
import Animated, { FadeOut, FadeInDown } from 'react-native-reanimated'
import Theme from '../Theme'

export default function CartItem() {
   return (
      <Animated.View entering={FadeInDown.delay(200)} exiting={FadeOut} className=' rounded-xl mb-4 items-center flex-row p-2 bg-[#ffffff]' style={{ elevation: 10 }}>
         <Native.TouchableOpacity className=' z-20 h-[25px] w-[25px] absolute top-1 right-1 items-center justify-center'>
            <FontAwesomeIcon icon={solid.faXmark} size={25} style={{ color: Theme.buttonColor }} />
         </Native.TouchableOpacity>

         <Native.View className='h-[80px] w-[80px] object-cover overflow-hidden'>
            <Native.Image className='h-full w-full' source={require('../assets/foods/pizza/pizza2.png')} />
         </Native.View>

         <Native.View className='w-[65%] h-full'>
            <Native.View className='ml-2'>
               <Native.Text className='text-[20px] font-semibold'>Chicken Pizza</Native.Text>
               <Native.Text className=' text-secondaryText mt-[-3px]'>Butt Karahi</Native.Text>
            </Native.View>
            <Native.Text className='ml-2 mt-3 text-[22px] font-bold text-buttonColor'>$12.46</Native.Text>
         </Native.View>

         <Native.View className='absolute bottom-3 right-3 flex-row items-center justify-center'>
            <Native.TouchableOpacity className='h-[25px] w-[25px] rounded-full items-center justify-center'>
               <FontAwesomeIcon icon={solid.faMinusCircle} size={25} style={{ color: '#000000' }} />
            </Native.TouchableOpacity>
            <Native.Text className='ml-1 text-[18px] font-semibold'>2</Native.Text>
            <Native.TouchableOpacity className='ml-1 h-[25px] w-[25px] rounded-full items-center justify-center'>
               <FontAwesomeIcon icon={solid.faPlusCircle} size={25} style={{ color: Theme.buttonColor }} />
            </Native.TouchableOpacity>
         </Native.View>

      </Animated.View>
   )
}