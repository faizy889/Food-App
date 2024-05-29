import * as Native from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import CartItem from '../Components/CartItem'
import Animated, { FadeOut, FadeInDown } from 'react-native-reanimated'
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import Theme from '../Theme'

export default function CartScreen() {

   const navigation = useNavigation()
   const { initPaymentSheet, presentPaymentSheet } = useStripe();
   const [loading, setLoading] = useState(false);
   const customAppearance = {
      shapes: {
         borderRadius: 12,
         borderWidth: 0.5,
      },
      primaryButton: {
         shapes: {
            borderRadius: 10,
         },
      },
      colors: {
         primary: Theme.buttonColor,
         componentBorder: '#73757b',
      },
   };

   const fetchPaymentSheetParams = async () => {
      const response = await fetch(`https://food-delivery-app-stripe-server.vercel.app/payment-sheet`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
      });
      const { paymentIntent, ephemeralKey, customer } = await response.json();

      return {
         paymentIntent,
         ephemeralKey,
         customer,
      };
   };

   const initializePaymentSheet = async () => {
      const {
         paymentIntent,
         ephemeralKey,
         customer,
         publishableKey,
      } = await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
         appearance: customAppearance,
         merchantDisplayName: "Example, Inc.",
         customerId: customer,
         customerEphemeralKeySecret: ephemeralKey,
         paymentIntentClientSecret: paymentIntent,
         // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
         //methods that complete payment after a delay, like SEPA Debit and Sofort.
         allowsDelayedPaymentMethods: true,
         defaultBillingDetails: {
            name: 'Jane Doe',
         }
      });
      if (!error) {
         setLoading(true);
      }
   };

   const openPaymentSheet = async () => {
      const { error } = await presentPaymentSheet();
      if (error) {
         Native.Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
         Native.Alert.alert('Success', 'Your order is confirmed!');
         navigation.navigate('HomeScreen')
      }
   };

   useEffect(() => {
      initializePaymentSheet();
   }, []);

   return (
      <StripeProvider
         publishableKey="pk_test_51PIdKURqPEnHEvrpI4exIIwazjS3v26SGyZUBhph972cGuaeXTbohquMOAeC9dC0ay20XXrLQfsHjrlAke0dG3Nm00JZ9elFaz"
         urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
         merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
      >

         <Native.View className='flex-1 bg-buttonColor'>
            {/* header */}
            <Animated.View entering={FadeInDown} className=' w-screen h-10 mt-[50px] items-center justify-center relative'>
               <Native.TouchableOpacity onPress={() => { navigation.goBack() }} className='absolute left-4'>
                  <FontAwesomeIcon icon={solid.faChevronCircleLeft} size={35} style={{ color: 'white' }} />
               </Native.TouchableOpacity>
               <Native.Text className='text-[24px] font-semibold text-[#ffffff]'>My Cart</Native.Text>
            </Animated.View>

            {/* cart items scroll view */}

            <Native.View className='w-screen h-[45%] mt-2'>
               <Native.ScrollView
                  contentContainerStyle={{
                     paddingTop: 10,
                     paddingHorizontal: 16
                  }}
                  overScrollMode='never' // for android
                  bounces={false} // for ios 
               >
                  {/* cart item */}
                  <CartItem />
                  <CartItem />
                  {/* <CartItem />
               <CartItem />
               <CartItem /> */}
               </Native.ScrollView>
            </Native.View>

            <Native.View className='px-4 mt-3'>
               <Animated.View entering={FadeInDown.delay(400)} className=' border-b border-b-[#ffffff] w-full h-14 flex-row items-center  justify-between'>
                  <Native.Text className='text-[18px] font-medium text-[#ffffff]'>Subtotal</Native.Text>
                  <Native.Text className='text-[18px] font-medium text-[#ffffff]'>$70.00</Native.Text>
               </Animated.View>
               <Animated.View entering={FadeInDown.delay(400)} className=' border-b border-b-[#ffffff] w-full h-14 flex-row items-center  justify-between'>
                  <Native.Text className='text-[18px] font-medium text-[#ffffff]'>Delivery charges</Native.Text>
                  <Native.Text className='text-[18px] font-medium text-[#ffffff]'>$70.00</Native.Text>
               </Animated.View>
               <Animated.View entering={FadeInDown.delay(400)} className=' border-b border-b-[#ffffff] w-full h-14 flex-row items-center  justify-between'>
                  <Native.Text className='text-[22px] font-bold text-[#ffffff]'>Total</Native.Text>
                  <Native.Text className='text-[22px] font-bold text-[#ffffff]'>$70.00</Native.Text>
               </Animated.View>
            </Native.View>

            {/* Checkout button */}

            <Native.TouchableOpacity className='absolute z-30 bottom-4 h-[55px] w-[94%] self-center items-center justify-center rounded-xl border-[3px] border-[#ffffff] flex-row'
               onPress={() => {
                  openPaymentSheet()
               }}>
               <Native.Text className='text-[22px] font-bold text-[#ffffff]'>Proceed to Checkout</Native.Text>
               <FontAwesomeIcon icon={solid.faShoppingBag} size={22} style={{ color: 'white', marginLeft: 8 }} />
            </Native.TouchableOpacity>

         </Native.View >
      </StripeProvider>
   )
}