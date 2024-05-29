import * as Native from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native';
import InputField from '../Components/InputField';
import * as solid from '@fortawesome/free-solid-svg-icons'
import * as regular from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import SecureInputField from '../Components/SecureInputField';
import { Context } from '../Context/GlobalContext';
import useFirebaseAuth from '../customHooks/useFirebaseAuth';

export default function LoginScreen() {
   // FUNCTIONS
   async function handleLogin() {
      try {
         const email = context.EmailTextField.current
         const password = context.PasswordField.current
         if (email == '' || password == '') {
            Native.Alert.alert("⚠ Empty Credentials!", "You need to enter fill your credentials in order to continue.")
            return
         }
         if (!email.includes('@gmail.com')) {
            Native.Alert.alert("⚠ Invalid email address!", "You need to enter valid your credentials in order to continue.")
            return
         }
         setLoading(true)
         await SigninUser(email, password)
         navigation.navigate('HomeScreen')
         setLoading(false)
      } catch (error) {
         setLoading(false)
         Native.Alert.alert("⚠ Warning!", error)
         return
      }
   }
   async function handleGoogleSignIn() {
      try {
         await GoogleSignIn()
         navigation.navigate('HomeScreen')
      } catch (error) {
         Native.Alert.alert("⚠ Warning!", `1rror during login. Please try again ${error}`)
         return
      }
   }
   async function handleFacebookSignIn() {
      try {
         await FacebookSignIn()
         navigation.navigate('HomeScreen')
      } catch (error) {
         Native.Alert.alert("⚠ Warning!", `1rror during login. Please try again ${error}`)
         return
      }
   }
   async function handleAppleSignIn() {
      Native.Alert.alert("Sorry!", "Apple authentication not available right now.")
   }


   // VARIABLES

   const navigation = useNavigation()
   const context = useContext(Context)
   const [Loading, setLoading] = useState(false)
   const { SigninUser, GoogleSignIn, FacebookSignIn } = useFirebaseAuth()

   // CODE


   // RETURN
   return (
      <Native.View className='flex-1 bg-[#ffffff]'>
         <Native.View className='self-center w-[200px] h-[30%] mt-5'>
            <LottieView style={{ flex: 1 }} source={require('../assets/LottieAnimations/AuthAnimation.json')} autoPlay loop />
         </Native.View>
         <Native.View className='
         h-[70%] px-[30px]'>
            <Native.Text className='text-[38px] font-bold text-buttonColor'>Login</Native.Text>
            <Native.Text className='text-[16px] text-secondaryText'>Please sign in to continue</Native.Text>
            <InputField label="Email Address" placeholder='example@gmail.com' inputMode='email' icon={regular.faEnvelope} TextFieldName='email' />
            <SecureInputField label="Password" placeholder='Enter your password' icon={solid.faLock} TextFieldName='password' />
            <Native.TouchableOpacity className=' mt-5 h-[55px] w-full bg-buttonColor flex-row self-center items-center justify-center rounded-xl'
               onPress={handleLogin}
               style={{ elevation: 10 }}
            >
               {
                  Loading ?
                     <Native.ActivityIndicator size={35} color='#ffffff' />
                     :
                     <Native.View className='flex-row items-center justify-center'>
                        <Native.Text className='text-[#ffffff] font-semibold text-[20px]'>LOGIN</Native.Text>
                        <FontAwesomeIcon icon={solid.faArrowRight} size={22} style={{ color: 'white', marginLeft: 5 }} />
                     </Native.View>
               }

            </Native.TouchableOpacity>
            <Native.Pressable className='self-center mt-3'>
               <Native.Text className='text-[16px] text-secondaryText font-semibold'>Forgot password?</Native.Text>
            </Native.Pressable>
            <Native.View className='w-full mt-[6%] h-[100px] border-t-[1px] border-t-buttonColor  self-center'>
               <Native.Text className='text-center mt-1'>Continue with</Native.Text>
               <Native.View className='self-center mt-2 flex-row items-center w-[190px] justify-between'>
                  <Native.TouchableOpacity className='h-[50px] w-[50px] overflow-hidden object-cover' onPress={handleGoogleSignIn}>
                     <Native.Image className='w-full h-full' source={require('../assets/Logos/google.png')} />
                  </Native.TouchableOpacity>
                  <Native.TouchableOpacity className='h-[46px] w-[46px] overflow-hidden object-cover' onPress={handleFacebookSignIn}>
                     <Native.Image className='w-full h-full' source={require('../assets/Logos/facebook.png')} />
                  </Native.TouchableOpacity>
                  <Native.TouchableOpacity className='h-[50px] w-[50px] overflow-hidden object-cover' onPress={handleAppleSignIn}>
                     <Native.Image className='w-full h-full' source={require('../assets/Logos/apple.png')} />
                  </Native.TouchableOpacity>
               </Native.View>
               <Native.TouchableOpacity onPress={() => { navigation.navigate('SignUpScreen') }}>
                  <Native.Text className='text-center mt-2'>
                     Don't have an account? <Native.Text className=' text-buttonColor font-extrabold' >Create One</Native.Text>
                  </Native.Text>
               </Native.TouchableOpacity>
            </Native.View>
         </Native.View>
      </Native.View>
   )
}