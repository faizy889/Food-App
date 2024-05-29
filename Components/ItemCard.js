import * as Native from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import * as regular from '@fortawesome/free-regular-svg-icons'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function ItemCard(props) {

   // FUNCTIONS

   // VARIABLES

   const { id, photoURI, name, time, rating, price } = props.data
   const navigation = useNavigation()

   // RETURN
   return (
      <Native.TouchableOpacity onPress={() => { navigation.navigate('ItemDetailScreen') }} className='w-[47%] rounded-xl overflow-hidden bg-GreyColor flex-col items-center justify-center relative' style={{ elevation: 6 }}>
         <Native.View className='h-[120px] w-full overflow-hidden rounded-b-xl'>
            <Native.Image className='w-full h-full object-cover' source={require('../assets/menu/BBQ.jpg')} />
         </Native.View>
         <Native.View className=' w-full px-2 mb-2'>
            <Native.Text className='text-[18px] font-bold mt-2'>{name}</Native.Text>
            <Native.View className='flex-row items-center mt-2'>
               <FontAwesomeIcon icon={solid.faLocationDot} />
               <Native.Text className='ml-1'>Butt Karahi</Native.Text>
            </Native.View>
         </Native.View>

         <Native.View className='flex-row mt-0 w-full px-2'>
            <Native.View className='flex-row'>
               <FontAwesomeIcon icon={solid.faStar} size={17} style={{ color: 'orange' }} />
               <Native.Text className='text-[14px] text-[#696969] ml-1'>{rating}</Native.Text>
            </Native.View>
            <Native.View className='flex-row items-center ml-2'>
               <FontAwesomeIcon icon={regular.faClock} size={17} style={{ color: 'black' }} />
               <Native.Text className='text-[14px] text-[#696969] ml-1'>{time}</Native.Text>
            </Native.View>

         </Native.View>
         <Native.View className='w-full mt-2 p-2'>
            <Native.Text className='text-2xl font-bold'>${price}</Native.Text>
         </Native.View>
         <Native.TouchableOpacity className='bg-buttonColor w-9 h-9 justify-center items-center rounded-tl-[15px] absolute right-0 bottom-0'>
            <FontAwesomeIcon icon={solid.faPlus} size={24} style={{ color: 'white' }} />
         </Native.TouchableOpacity>
      </Native.TouchableOpacity>
   )
}