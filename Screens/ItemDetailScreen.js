import * as Native from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import * as regular from '@fortawesome/free-regular-svg-icons'
import ItemDescription from '../Components/ItemDescription';
import ReviewsComponent from '../Components/ReviewsComponent';
import Animated, { withTiming, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import AddtoCartButton from '../Components/AddtoCartButton';
import ContinueShoppingBtn from '../Components/ContinueShoppingBtn';
import Carousel from '../Components/Carousel';

export default function ItemDetailScreen() {

   // FUNCTIONS

   // VARIABLES

   const navigation = useNavigation()
   const [Like, setLike] = useState(false)
   const [tab, settab] = useState('Details')
   const [Readmore, setReadmore] = useState(false)
   const [AddtoCart, setAddtoCart] = useState(false)
   const featherDisplay = useSharedValue('none')
   const featherOpacity = useSharedValue(0)
   const ViewCartRotate = useSharedValue('360deg')
   const ViewCartRight = useSharedValue(-100)

   // const 

   const ViewCartStyles = useAnimatedStyle(() => ({
      transform: [{ rotate: ViewCartRotate.value }],
      right: ViewCartRight.value
   }))
   const FeatherStyles = useAnimatedStyle(() => ({
      display: featherDisplay.value,
      opacity: featherOpacity.value,
   }))
   const Details = 'The quick bronw fox jumps over the lazy dog quick bronw fox jumps over the lazy dog quick bronw fox jumps over the lazy dog quick bronw fox jumps over the lazy dog The quick bronw fox jumps over the lazy dog quick bronw fox jumps over the lazy dog quick bronw fox jumps over the lazy dog quick bronw fox jumps over the lazy dog The quick bronw fox jumps over the lazy dog quick bronw fox jumps over the lazy dog quick bronw fox jumps over the lazy dog quick bronw fox jumps over the lazy dog The quick bronw fox jumps over the lazy dog quick bronw fox jumps over the lazy dog quick bronw fox jumps over the lazy dog quick bronw fox jumps over the lazy dog'
   const images = [
      { id: 0, src: require('../assets/menu/BBQ.jpg') },
      { id: 1, src: require('../assets/menu/Biryani.jpg') },
      { id: 2, src: require('../assets/menu/Burger.jpg') },
      { id: 3, src: require('../assets/menu/Dessert.jpg') },
      { id: 4, src: require('../assets/menu/Drinks.jpg') },
   ]

   // RETURN
   return (
      // MAIN CONTAINER
      <Native.View className='flex-1 bg-buttonColor'>

         {/* HEADER */}
         <Native.View className='flex-row items-center justify-between w-screen absolute z-10 top-10 px-5'>

            <Native.TouchableOpacity onPress={() => { navigation.goBack() }}>
               <FontAwesomeIcon icon={solid.faChevronCircleLeft} size={35} style={{ color: 'white' }} />
            </Native.TouchableOpacity>

            <Native.Text className='text-[24px] font-semibold text-[#ffffff]'>Details</Native.Text>

            <Native.TouchableOpacity onPress={() => { Like ? setLike(false) : setLike(true) }}>
               <FontAwesomeIcon icon={Like ? solid.faHeart : regular.faHeart} size={35} style={{ color: 'white' }} />
            </Native.TouchableOpacity>

         </Native.View>

         <Native.View className='h-[50%]'>
            <Carousel height={350} images={images} scrollEnabled={true} animationInterval={2000} DotsBottomMargin={65} />
         </Native.View>

         <Native.View className=' absolute bottom-0 h-[60%] bg-[#ffffff] rounded-t-[50px] overflow-hidden'>

            {/* Feather */}
            {/* <Animated.Image className='absolute z-40 mt-[50px] border w-screen' source={require('../assets/featherLight.png')} style={FeatherStyles} /> */}

            <Native.ScrollView
               className='mt-[40px] px-3 overflow-hidden'
               overScrollMode='never' // for android
               bounces={false} // for ios
               onScrollBeginDrag={() => {
                  // featherDisplay.value = 'block'
                  // featherOpacity.value = 1
               }}
               onScroll={(e) => {
                  // if (e.nativeEvent.contentOffset.y == 0) {
                  //    featherOpacity.value = 0
                  //    featherDisplay.value = 'none'
                  // }
               }}
            >

               <Native.View className='justify-between flex-row'>
                  <Native.View className='max-w-[70%]'>
                     <Native.Text className='text-[28px] font-bold'>Chicken Pizza</Native.Text>
                  </Native.View>
                  <Native.Text className='text-[28px] font-extrabold text-buttonColor'>$12.40</Native.Text>
               </Native.View>

               <Native.View className='flex-row justify-between'>
                  <Native.TouchableOpacity className='flex-row p-1 rounded-md items-center'>
                     <Native.View className='rounded-full w-[30px] h-[30px] object-cover overflow-hidden'>
                        <Native.Image className='w-full h-full' source={require('../assets/menu/Biryani.jpg')} />
                     </Native.View>
                     <Native.Text className=' text-secondaryText text-[20px] font-medium ml-2 mt-[-2px]'>Butt Karahi</Native.Text>
                  </Native.TouchableOpacity>
                  <Native.View></Native.View>
               </Native.View>

               <Native.View className='mt-3 flex-row items-center justify-between'>

                  <Native.View className='flex-row items-center'>
                     <FontAwesomeIcon icon={solid.faStar} size={18} style={{ color: 'orange' }} />
                     <Native.Text className='text-[16px] ml-1'>4.5 <Native.Text className='font-bold'>{'(164)'}</Native.Text></Native.Text>
                  </Native.View>
                  <Native.View className='flex-row items-center'>
                     <FontAwesomeIcon icon={solid.faMapLocationDot} size={18} style={{ color: 'green' }} />
                     <Native.Text className='text-[16px] ml-1 font-bold'>2.6 km</Native.Text>
                  </Native.View>
                  <Native.View className='flex-row items-center'>
                     <FontAwesomeIcon icon={regular.faClock} size={18} style={{ color: 'grey' }} />
                     <Native.Text className='text-[16px] ml-1 font-bold'>32 min</Native.Text>
                  </Native.View>

               </Native.View>

               <Native.View className='mt-3'>
                  <Native.Text className='text-[18px] font-extrabold mb-2'>Ingredients</Native.Text>
                  <Native.ScrollView
                     horizontal={true}
                     contentContainerStyle={{
                        gap: 15,
                        paddingBottom: 10
                     }}
                     showsHorizontalScrollIndicator={false}
                  >
                     <Native.View className='h-[60px] w-[60px] border rounded-xl bg-[#ffffff] object-cover overflow-hidden' style={{ elevation: 6 }} >
                        <Native.Image className='h-full w-full' source={require('../assets/menu/BBQ.jpg')} />
                     </Native.View>
                     <Native.View className='h-[60px] w-[60px] border rounded-xl bg-[#ffffff] object-cover overflow-hidden' style={{ elevation: 6 }} >
                        <Native.Image className='h-full w-full' source={require('../assets/menu/Biryani.jpg')} />
                     </Native.View>
                     <Native.View className='h-[60px] w-[60px] border rounded-xl bg-[#ffffff] object-cover overflow-hidden' style={{ elevation: 6 }} >
                        <Native.Image className='h-full w-full' source={require('../assets/menu/Burger.jpg')} />
                     </Native.View>
                     <Native.View className='h-[60px] w-[60px] border rounded-xl bg-[#ffffff] object-cover overflow-hidden' style={{ elevation: 6 }} >
                        <Native.Image className='h-full w-full' source={require('../assets/menu/Dessert.jpg')} />
                     </Native.View>
                     <Native.View className='h-[60px] w-[60px] border rounded-xl bg-[#ffffff] object-cover overflow-hidden' style={{ elevation: 6 }} >
                        <Native.Image className='h-full w-full' source={require('../assets/menu/Drinks.jpg')} />
                     </Native.View>
                     <Native.View className='h-[60px] w-[60px] border rounded-xl bg-[#ffffff] object-cover overflow-hidden' style={{ elevation: 6 }} >
                        <Native.Image className='h-full w-full' source={require('../assets/menu/BBQ.jpg')} />
                     </Native.View>
                     <Native.View className='h-[60px] w-[60px] border rounded-xl bg-[#ffffff] object-cover overflow-hidden' style={{ elevation: 6 }} >
                        <Native.Image className='h-full w-full' source={require('../assets/menu/Biryani.jpg')} />
                     </Native.View>
                     <Native.View className='h-[60px] w-[60px] border rounded-xl bg-[#ffffff] object-cover overflow-hidden' style={{ elevation: 6 }} >
                        <Native.Image className='h-full w-full' source={require('../assets/menu/Burger.jpg')} />
                     </Native.View>
                     <Native.View className='h-[60px] w-[60px] border rounded-xl bg-[#ffffff] object-cover overflow-hidden' style={{ elevation: 6 }} >
                        <Native.Image className='h-full w-full' source={require('../assets/menu/Dessert.jpg')} />
                     </Native.View>
                     <Native.View className='h-[60px] w-[60px] border rounded-xl bg-[#ffffff] object-cover overflow-hidden' style={{ elevation: 6 }} >
                        <Native.Image className='h-full w-full' source={require('../assets/menu/Drinks.jpg')} />
                     </Native.View>
                  </Native.ScrollView>
               </Native.View>

               <Native.View>

                  {/* tabs */}
                  <Native.View className='flex-row mt-1'>
                     <Native.Pressable
                        className={`pb-1 ${tab == "Details" ? 'border-b-buttonColor' : 'border-b-[transparent]'} border-b-4`}
                        onPress={() => { settab('Details') }}>
                        <Native.Text className={`text-[18px] font-extrabold ${tab == "Details" ? '' : 'text-[#a0a0a0]'}`}>Description</Native.Text>
                     </Native.Pressable>
                     <Native.Pressable
                        className={`pb-1 ml-3 ${tab == "Reviews" ? 'border-b-buttonColor' : 'border-b-[transparent]'} border-b-4`}
                        onPress={() => { settab('Reviews') }}>
                        <Native.Text className={`text-[18px] font-extrabold ${tab == "Reviews" ? '' : 'text-[#a0a0a0]'}`}>Reviews</Native.Text>
                     </Native.Pressable>
                  </Native.View>

                  <Native.View className='mt-2'>
                     {
                        // CONDITION RENDER
                        tab == 'Details' ?
                           <ItemDescription Details={Details} Readmore={Readmore} setReadmore={setReadmore} />
                           : <ReviewsComponent />
                     }
                  </Native.View>

               </Native.View>

            </Native.ScrollView>

         </Native.View>

         {
            // CONDITIONAL RENDERING
            AddtoCart ?
               <ContinueShoppingBtn />
               :
               <AddtoCartButton AddtoCart={AddtoCart} setAddtoCart={setAddtoCart} ViewCartRotate={ViewCartRotate} ViewCartRight={ViewCartRight} />
         }

         {/* View cart button */}
         <Animated.View className='absolute h-[65px] w-[65px] items-center justify-center rounded-full bottom-[90px] z-50 right-[15px] bg-buttonColor' style={[{ elevation: 10 }, ViewCartStyles]}>
            <Native.TouchableOpacity className='h-full w-full items-center justify-center'
               onPress={() => { navigation.navigate('CartScreen') }}>
               <FontAwesomeIcon icon={solid.faShoppingCart} size={35} style={{ color: 'white' }} />
            </Native.TouchableOpacity>
         </Animated.View>

      </Native.View>
   )
}