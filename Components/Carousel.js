import * as Native from 'react-native'
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import CarouselDot from '../Components/CarouselDot'
import { useFocusEffect } from '@react-navigation/native';

export default function Carousel(props) {

   const { images, height, animationInterval, scrollEnabled, DotsBottomMargin } = props

   // FUNCTIONS

   function DisableAutoScroll() {
      clearInterval(scrollInterval.current);
      AutoScrollEnabled.current = false
   }

   function InitiateAutoScroll() {
      AutoScrollEnabled.current = true
      scrollInterval.current = setInterval(() => {
         currentindex.current += 1
         if (currentindex.current == images.length) {
            currentindex.current = 0
         }
         setActiveDot({
            width: 24,
            carouselActiveIndex: currentindex.current
         })
         flatListRef.current.scrollToIndex({ animated: true, index: currentindex.current });
      }, animationInterval);
   }

   // VARIABLES

   let width = useMemo(() => {
      return Native.Dimensions.get('window')
   }, [])
   const currentindex = useRef(0)
   const tempScrollValue = useRef(0)
   const AutoScrollEnabled = useRef(false)
   const [ActiveDot, setActiveDot] = useState({
      width: 12,
      carouselActiveIndex: 0
   })
   const flatListRef = useRef()
   const scrollInterval = useRef(null)

   // CODE

   useFocusEffect(
      useCallback(() => {
         setActiveDot({
            width: 24,
            carouselActiveIndex: 0
         })
         InitiateAutoScroll()
         return () => {
            DisableAutoScroll()
            // flatListRef.current.scrollToIndex({ animated: false, index: 0 });
            currentindex.current = 0
            scrollInterval.current = null
         };
      }, [])
   )

   return (
      <Native.View className='w-screen'>
         <Native.FlatList
            contentContainerStyle={{
               height: height,
            }}
            ref={flatListRef}
            data={images}
            horizontal
            pagingEnabled
            scrollEnabled={scrollEnabled}
            snapToAlignment="center"
            decelerationRate='normal'
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
               <Native.View className='w-screen bg-[#000000] object-cover'>
                  <Native.Image source={item.src} className='h-full w-full opacity-80' />
               </Native.View>
            )}
            onScroll={(event) => {
               const contentOffset = event.nativeEvent.contentOffset.x;
               const index = Math.floor(contentOffset / width.width);
               // Re-rendering Optimization
               if (index != tempScrollValue.current) { // condition to avoid repetitions
                  tempScrollValue.current = index
                  if (AutoScrollEnabled.current) {
                     // AUTO-SCROLL
                  } else {
                     // MANUAL-SCROLL
                     if (index >= 0) {
                        setActiveDot({
                           width: 24,
                           carouselActiveIndex: index
                        })
                     }
                  }
               }
            }}

            onTouchStart={() => {
               if (scrollEnabled) {
                  DisableAutoScroll()
               }
            }}
         />
         {/* DOTS */}
         <Native.View className='absolute flex-row self-center' style={{ bottom: DotsBottomMargin }} >
            {
               images.map(item => {
                  return <CarouselDot key={item.id} id={item.id} ActiveDot={ActiveDot} />
               })
            }
         </Native.View>
      </Native.View>
   )
}