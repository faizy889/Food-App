import * as Native from 'react-native'
import React from 'react'
import Comment from './Comment'

export default function ReviewsComponent() {
   return (
      // reviews container
      <Native.View className='pb-[150px]'>
         <Comment />
         <Comment />
         <Comment />
         <Comment />
      </Native.View>
   )
}