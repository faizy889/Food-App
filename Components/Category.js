import * as Native from 'react-native'
import React, { useContext, useState } from 'react'
import { Context } from '../Context/GlobalContext'

export default function Category(props) {

  const { isActive, setisActive } = useContext(Context)

  return (
    <Native.Pressable onPress={() => { setisActive(props.name) }}>
      <Native.View className={`bg-buttonColor flex-row items-center p-[5px] rounded-[100px] h-[40px] ${isActive == props.name ? 'bg-[#000000]' : ''}`}>
        <Native.View className='bg-[#ffffff] h-[30px] w-[30px] rounded-full overflow-hidden'>
          <Native.Image source={props.url} className='w-full h-full object-contain scale-90' />
        </Native.View>
        <Native.Text className='text-[#ffffff] font-medium text-base ml-2 mr-2' >{props.name}</Native.Text>
      </Native.View>
    </Native.Pressable>
  )
}