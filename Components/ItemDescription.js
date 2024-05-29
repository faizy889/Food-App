import * as Native from 'react-native'
import React, { useState } from 'react'

export default function ItemDescription(props) {

   return (
      <Native.View className='pb-[80px]'>
         <Native.Text>
            {props.Readmore ?
               props.Details :
               props.Details.slice(0, 120) + '......'
            }
            {props.Readmore ? null :
               <Native.Text
                  className='font-bold text-buttonColor'
                  onPress={() => { props.setReadmore(true) }} >
                  Read more
               </Native.Text>
            }
         </Native.Text>
      </Native.View>
   )
}