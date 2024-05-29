import React, { useEffect } from 'react'
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated'

export default function CarouselDot(props) {

   const { ActiveDot, id } = props
   const DotWidth = useSharedValue(12)
   const AnimatedDotWidth = useAnimatedStyle(() => ({
      width: DotWidth.value
   }))

   useEffect(() => {
      if (ActiveDot.carouselActiveIndex == id) {
         DotWidth.value = withTiming(ActiveDot.width, { duration: 100 })
      } else {
         DotWidth.value = 12
      }
   },)

   return (
      <Animated.View className='h-[12px] mr-2 rounded-lg bg-[#ffffff]' style={AnimatedDotWidth}></Animated.View>
   )
}