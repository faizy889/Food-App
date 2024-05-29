import * as Native from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import * as regular from '@fortawesome/free-regular-svg-icons'

export default function Comment() {
   return (
      <Native.View className='flex-row mt-2 mb-2 p-2 bg-[#eeeeee] rounded-xl'>
         <Native.View className='h-[50px] w-[50px] rounded-full overflow-hidden object-cover'>
            <Native.Image className='h-full w-full' source={require('../assets/menu/BBQ.jpg')} />
         </Native.View>
         <Native.View className='w-[80%] ml-2'>
            <Native.View className='flex-row items-center'>
               <Native.Text className=' font-semibold'>Anonymous</Native.Text>
               <Native.View className='flex-row ml-1'>
                  <FontAwesomeIcon icon={solid.faStar} size={14} style={{ color: 'orange' }} />
                  <FontAwesomeIcon icon={solid.faStar} size={14} style={{ color: 'orange' }} />
                  <FontAwesomeIcon icon={solid.faStar} size={14} style={{ color: 'orange' }} />
                  <FontAwesomeIcon icon={solid.faStar} size={14} style={{ color: 'orange' }} />
                  <FontAwesomeIcon icon={regular.faStar} size={14} style={{ color: 'orange' }} />
               </Native.View>
            </Native.View>
            <Native.Text className=' text-secondaryText text-justify'>
               the quick bronw fox jumps over the lazy dog the quick bornw fox jumps over the lazy dog
               the quick bronw fox jumps over the lazy dog the quick bornw fox jumps over the lazy dog
            </Native.Text>
         </Native.View>
      </Native.View>
   )
}