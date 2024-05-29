import * as Native from 'react-native'
import React, { useState, useRef, useCallback } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import CarouselDot from '../Components/CarouselDot'
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'

export default function GetStartedScreen() {

   // FUNCTIONS

   function DisableInterval() {
      // CLEAN-UP
      clearInterval(scrollInterval.current)
      flatListRef.current.scrollToIndex({ animated: false, index: 0 });
      currentindex.current = 0
      scrollInterval.current = null
      Heading = images[0].heading
      Subtitle = images[0].subtitle
   }

   function InitiateInterval() {
      setActiveDot({
         width: 24,
         carouselActiveIndex: 0
      })
      scrollInterval.current = setInterval(() => {
         TextOpacity.value = 0
         currentindex.current += 1
         if (currentindex.current == images.length) {
            currentindex.current = 0
         }
         setActiveDot({
            width: 24,
            carouselActiveIndex: currentindex.current
         })
         flatListRef.current.scrollToIndex({ animated: true, index: currentindex.current });
         TextOpacity.value = withTiming(1)
      }, 1500);
   }

   // VARIABLES

   const images = [
      { id: 0, src: require('../assets/menu/BBQ.jpg'), heading: 'Discover Delicious Meals', subtitle: 'Explore a variety of cuisines and dishes from the best local restaurants. Find new favorites and enjoy your classics delivered right to your door' },
      { id: 1, src: require('../assets/menu/Biryani.jpg'), heading: 'Personalized Food Recommendations', subtitle: `Get meal suggestions tailored to your tastes and dietary preferences. Whether you're craving vegan, keto, or comfort food, we've got you covered` },
      { id: 2, src: require('../assets/menu/Burger.jpg'), heading: 'Fresh Ingredients to Your Door', subtitle: 'Order fresh ingredients and groceries along with your meals. Enjoy the convenience of having everything you need delivered together' },
      { id: 3, src: require('../assets/menu/Dessert.jpg'), heading: 'Easy Ordering Experience', subtitle: 'Browse menus, customize your orders, and track your delivery in real-time. Enjoy a seamless and hassle-free ordering process every time' },
      { id: 4, src: require('../assets/menu/Drinks.jpg'), heading: 'Track Your Orders', subtitle: 'Stay updated with real-time tracking. Know exactly when your meal will arrive and get updates from the moment you order until it’s at your door' },
   ]

   const [ActiveDot, setActiveDot] = useState({
      width: 12,
      carouselActiveIndex: 0
   })
   const currentindex = useRef(0)
   const flatListRef = useRef(null)
   const scrollInterval = useRef(null)
   const navigation = useNavigation()
   let Heading = images[currentindex.current].heading
   let Subtitle = images[currentindex.current].subtitle

   const TextOpacity = useSharedValue(1)
   const TextOpacityStyle = useAnimatedStyle(() => ({
      opacity: TextOpacity.value
   }))

   // CODE

   useFocusEffect(
      useCallback(() => {
         InitiateInterval()
         return () => {
            DisableInterval()
         };
      }, [])
   )

   // RETURN
   return (
      <Native.View className='flex-1'>
         <Native.View className='h-[55vh]'>
            {/* Carousel Flatlist */}
            <Native.View className='w-screen'>
               <Native.FlatList
                  ref={flatListRef}
                  data={images}
                  horizontal
                  pagingEnabled
                  scrollEnabled={false}
                  snapToAlignment="center"
                  decelerationRate='normal'
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                     <Native.View className='w-screen bg-[#000000] object-cover'>
                        <Native.Image source={item.src} className='h-full w-full opacity-80' />
                     </Native.View>
                  )}
               />
               {/* Carousel dots */}
               <Native.View className='absolute flex-row self-center' style={{ bottom: 65 }} >
                  {
                     images.map(item => {
                        return <CarouselDot key={item.id} id={item.id} ActiveDot={ActiveDot} />
                     })
                  }
               </Native.View>
            </Native.View>
         </Native.View>

         <Native.View className=' bg-[#ffffff] h-[55vh] w-screen absolute bottom-0 rounded-t-[45px]'>

            <Animated.View className='w-screen mt-[50px] px-4' style={TextOpacityStyle}>
               <Native.Text className='self-center text-[28px] font-extrabold text-center'>{Heading}</Native.Text>
               <Native.Text className='self-center text-[18px] text-center text-secondaryText mt-5 '>{Subtitle}</Native.Text>
            </Animated.View>

            {/* GET STARTED BUTTON */}
            <Native.TouchableOpacity className='absolute z-30 bottom-4 h-[55px] w-[92%] bg-buttonColor flex-row self-center items-center justify-center rounded-xl'
               onPress={() => {
                  navigation.navigate('LoginScreen')
               }}
               style={{ elevation: 10 }}
            >
               <Native.Text className='text-[#ffffff] font-semibold text-[20px]'>GET STARTED</Native.Text>
               <FontAwesomeIcon icon={solid.faArrowRight} size={22} style={{ color: 'white', marginLeft: 5 }} />
            </Native.TouchableOpacity>
         </Native.View>
      </Native.View>
   )
}