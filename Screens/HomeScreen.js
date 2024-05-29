import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import * as Native from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ItemsListingScreen from './ItemsListingScreen';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import Screen4 from './Screen4';
import Theme from "../Theme"
import { useNavigation } from '@react-navigation/native';
import Animated, { withTiming, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {

   // FUNCTIONS

   function handleCartButtonPress() {
      settabBarBadgeDisplay('none')
      IconDisplay.value = 'none'
      CartButtonScale.value = withTiming(30, { duration: 300 })
      setTimeout(() => {
         navigation.navigate('CartScreen')
      }, 300);
   }

   // VARIABLES

   const navigation = useNavigation()
   const CartButtonScale = useSharedValue(1)
   const IconDisplay = useSharedValue('block')
   const [tabBarBadgeDisplay, settabBarBadgeDisplay] = useState('flex')
   const CartButtonStyle = useAnimatedStyle(() => ({
      transform: [{ scale: CartButtonScale.value }],
   }))
   const IconDisplayStyle = useAnimatedStyle(() => ({
      display: IconDisplay.value
   }))

   // CODE

   useEffect(() => {

      // CLEAN UP AFTER UN-MOUNT

      return () => {
         setTimeout(() => {
            settabBarBadgeDisplay('flex')
            IconDisplay.value = 'block'
            CartButtonScale.value = 1
         }, 400);
      }
   })


   return (
      <>
         <Tab.Navigator
            screenOptions={{
               tabBarShowLabel: false,
               headerShown: false,
               tabBarActiveTintColor: Theme.buttonColor,
               tabBarInactiveTintColor: 'grey',
               tabBarHideOnKeyboard: true,
            }}
         >
            <Tab.Screen name="ItemsListingScreen" component={ItemsListingScreen}

               options={{
                  tabBarIcon: (focused) => {
                     return <Animated.View style={IconDisplayStyle}>
                        <FontAwesomeIcon icon={solid.faHouse} size={25} style={{ color: focused.color }} />
                     </Animated.View>
                  },
               }}
            />
            <Tab.Screen name="Screen2" component={Screen2}
               options={{
                  tabBarIcon: (focused) => {
                     return <Animated.View style={IconDisplayStyle}>
                        <FontAwesomeIcon icon={solid.faHeart} size={25} style={{ color: focused.color }} />
                     </Animated.View>
                  },
               }}
            />
            <Tab.Screen name={'null'} component={ItemsListingScreen}
               options={{
                  tabBarBadge: 1,
                  tabBarBadgeStyle: {
                     backgroundColor: 'white',
                     marginTop: -40,
                     marginLeft: 10,
                     borderWidth: 1,
                     display: tabBarBadgeDisplay
                  },
                  tabBarIcon: () => {
                     return <>
                        <Animated.View style={CartButtonStyle} className='h-[70px] w-[70px] mb-[50px] rounded-full'>
                           <Native.TouchableOpacity className='h-full w-full rounded-full justify-center items-center p-8 bg-buttonColor relative' style={{ elevation: 12 }} onPress={handleCartButtonPress}>
                              <Animated.View style={IconDisplayStyle}>
                                 <FontAwesomeIcon icon={solid.faShoppingCart} size={35} style={{ color: 'white' }} />
                              </Animated.View>
                              <Native.View className='h-10 w-10 absolute bottom-[-40px]'></Native.View>
                           </Native.TouchableOpacity>
                        </Animated.View>
                     </>
                  },
               }}
            />
            <Tab.Screen name="Screen3" component={Screen3}
               options={{
                  tabBarIcon: (focused) => {
                     return <Animated.View style={IconDisplayStyle}>
                        <FontAwesomeIcon icon={solid.faComment} size={25} style={{ color: focused.color }} />
                     </Animated.View>
                  },
               }}
            />
            <Tab.Screen name="Screen4" component={Screen4}
               options={{
                  tabBarIcon: (focused) => {
                     return <Animated.View style={IconDisplayStyle}>
                        <FontAwesomeIcon icon={solid.faUser} size={23} style={{ color: focused.color }} />
                     </Animated.View>
                  },
               }}
            />
         </Tab.Navigator>
      </>
   )
}