import * as Native from 'react-native'
// import * as Icon from "react-native-feather";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import * as regular from '@fortawesome/free-regular-svg-icons'
import React from 'react'

export default function Header() {
   return (
      <Native.View className='mt-[50px] px-4 pb-1 bg-[#ffffff]'>
         <Native.View className='flex-row justify-between items-center'>
            <Native.View className='flex-row items-center'>
               <Native.View className='w-[40px] h-[40px] bg-[#000000] rounded-full justify-center items-center'>
                  <FontAwesomeIcon icon={solid.faUser} size={20} style={{ color: 'white' }} />
               </Native.View>
               <Native.Text className='ml-2 text-[24px] font-medium'>Hi, Shan</Native.Text>
            </Native.View>
            <Native.View className='flex-row items-center'>
               <Native.TouchableOpacity>
                  <FontAwesomeIcon icon={regular.faBell} size={28} style={{ color: 'black' }} />
               </Native.TouchableOpacity>
               <Native.TouchableOpacity className='ml-4 w-10 h-10 rounded-xl justify-center items-center bg-buttonColor'>
                  <FontAwesomeIcon icon={solid.faBars} size={22} style={{ color: 'white' }} />
               </Native.TouchableOpacity>
            </Native.View>
         </Native.View>
         <Native.View className='mt-3 flex-row items-center'>
            <FontAwesomeIcon icon={solid.faLocationDot} size={20} style={{ color: 'black' }} />
            <Native.Text className='text-[16px] ml-1'>Lahore City</Native.Text>
         </Native.View>
         <Native.View className='mt-2'>
            <Native.Text className='text-[20px]'>Find the <Native.Text className='font-extrabold'>Best Food</Native.Text> Here</Native.Text>
         </Native.View>
      </Native.View>
   )
}