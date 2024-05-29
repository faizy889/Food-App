import * as Native from 'react-native'
import React, { useRef, useState } from 'react'
import Header from '../Components/Header';
import Category from '../Components/Category';
import ItemCard from '../Components/ItemCard';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function ItemsListingScreen() {
   // FUNCTIONS

   function handleScrollEnd(e) {
      if (e.nativeEvent.contentOffset.y == 0) {
         margin.value = withTiming('0%')
         headerOpacity.value = withTiming(1)
      }
   }
   function handleScrollBegin(e) {
      headerOpacity.value = withTiming(0)
      margin.value = withTiming('-35%', { duration: 400 })
   }

   // VARIABLES

   const pizzaData = [
      { id: 1, name: 'Veggie Delight Pizza', photoURI: '../assets/foods/pizza/pizza2.png', time: '20 min', rating: '4.5', price: 14.58 },
      { id: 2, name: 'BBQ Chicken Supreme Pizza', photoURI: '../assets/foods/pizza/pizza3.png', time: '20 min', rating: '4.5', price: 10.93 },
      { id: 3, name: 'Pepperoni Paradise Pizza', photoURI: '../assets/foods/pizza/pizza4.png', time: '20 min', rating: '4.5', price: 12.00 },
      { id: 4, name: 'Margherita Madness Pizza', photoURI: '../assets/foods/pizza/pizza5.png', time: '20 min', rating: '4.5', price: 12.09 },
      { id: 5, name: 'Hawaiian Luau Pizza', photoURI: '../assets/foods/pizza/pizza6.png', time: '20 min', rating: '4.5', price: 8.52 },
      { id: 6, name: 'Pesto Perfection Pizza', photoURI: '../assets/foods/pizza/pizza7.png', time: '20 min', rating: '4.5', price: 10.42 },
   ]
   const [Data, setData] = useState(pizzaData)
   const headerOpacity = useSharedValue(1)
   const margin = useSharedValue('0%')
   const animated_headerOpacity = useAnimatedStyle(() => (
      { opacity: headerOpacity.value }
   ))
   const animated_margin = useAnimatedStyle(() => (
      { marginTop: margin.value }
   ))

   // CODE


   // RETURN
   return (
      <Native.SafeAreaView className='flex-1'>
         <Native.View className='bg-[#ffffff] flex-1'>
            <Animated.View style={animated_headerOpacity}>
               <Header />
            </Animated.View>

            <Animated.View className='flex-1' style={animated_margin}>
               {/* INPUT FIELD */}

               <Native.View className='h-[55px] px-4'>
                  <Native.View className=' bg-GreyColor flex-row items-center px-1 pl-2 rounded-[15px]' style={{ flex: 0.95 }}>
                     <FontAwesomeIcon icon={solid.faMagnifyingGlass} size={26} style={{ color: 'grey' }} />
                     <Native.TextInput className='h-full ml-2' placeholder='Search for food' style={{ flex: 0.99 }} />
                     <Native.TouchableOpacity className='ml-1 w-[40px] h-[40px] bg-buttonColor rounded-[12px] justify-center items-center'>
                        <FontAwesomeIcon icon={solid.faPaperPlane} size={24} style={{ color: 'white' }} />
                     </Native.TouchableOpacity>
                  </Native.View>
               </Native.View>

               {/* CATEGORIES SCROLL VIEW */}

               <Native.View className='mt-2'>
                  <Native.ScrollView
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     contentContainerStyle={{
                        paddingLeft: 15,
                        paddingRight: 15,
                        gap: 8,
                     }}
                  >
                     <Category url={require('../assets/categories/icons8-bbq-100.png')} name='Pizza' active={true} />
                     <Category url={require('../assets/categories/icons8-biryani-100.png')} name='Biryani' active={false} />
                     <Category url={require('../assets/categories/icons8-burger-100.png')} name='Burger' active={false} />
                     <Category url={require('../assets/categories/icons8-coke-100.png')} name='Drinks' active={false} />
                     <Category url={require('../assets/categories/icons8-dessert-100.png')} name='Desserts' active={false} />
                  </Native.ScrollView>
               </Native.View>

               {/* ITEMS FLATLIST */}

               <Native.View className='flex-1 mt-3'>
                  {/* <Native.FlatList
                     onScrollBeginDrag={handleScrollBegin}
                     onScrollEndDrag={handleScrollEnd}
                     contentContainerStyle={{
                        gap: 20,
                        paddingHorizontal: 16,
                        paddingBottom: 50,
                        backgroundColor: 'white',
                     }}
                     columnWrapperStyle={{ justifyContent: 'space-between' }}
                     data={Data}
                     numColumns={2}
                     renderItem={({ item }) =>
                        <ItemCard key={item.id} data={item} />
                     }
                  /> */}
                  <Native.ScrollView
                     onScrollBeginDrag={handleScrollBegin}
                     onScrollEndDrag={handleScrollEnd}
                     contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 18,
                        paddingHorizontal: 16,
                        paddingBottom: 50,
                        backgroundColor: 'white',
                     }}
                  >
                     {Data.map((item) => (
                        <ItemCard key={item.id} data={item} />
                     ))}
                  </Native.ScrollView>
               </Native.View>
            </Animated.View>

         </Native.View>
      </Native.SafeAreaView>
   )
}
