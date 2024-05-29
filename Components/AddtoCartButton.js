import * as Native from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'
import { withSpring } from 'react-native-reanimated'

export default function AddtoCartButton(props) {

   const { setAddtoCart, ViewCartRotate, ViewCartRight } = props

   useEffect(() => {
      console.log(props)
   }, [])


   return (
      <Native.TouchableOpacity className='absolute z-30 bottom-4 h-[55px] w-[94%] bg-buttonColor self-center items-center justify-center rounded-xl ' style={{ elevation: 7 }}
         onPress={() => {
            setAddtoCart(true)
            ViewCartRotate.value = withSpring('0deg')
            ViewCartRight.value = withSpring(15)
         }}
      >
         <Native.View className='flex-row items-center'>
            <Native.Text className='text-[22px] font-bold text-[#ffffff]'>Add to Cart</Native.Text>
            <FontAwesomeIcon icon={solid.faCartPlus} size={22} style={{ color: 'white', marginLeft: 8 }} />
         </Native.View>
      </Native.TouchableOpacity>
   )
}