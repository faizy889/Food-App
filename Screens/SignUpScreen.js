import * as Native from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import InputField from '../Components/InputField';
import * as solid from '@fortawesome/free-solid-svg-icons'
import * as regular from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import SecureInputField from '../Components/SecureInputField';
import Theme from '../Theme';
import { Context } from '../Context/GlobalContext';
import useFirebaseAuth from '../customHooks/useFirebaseAuth';


export default function SignUpScreen() {
   // FUNCTIONS
   async function handleSignup() {
      // navigation.navigate('HomeScreen')
      // console.log("FullName: " + context.FullNameTextField.current)
      // console.log("Email: " + context.SignupEmailTextField.current)
      // console.log("Password: " + context.SignupPasswordField.current)
      // console.log("Password: " + context.ConfirmPasswordField.current)

      try {
         const fullname = context.FullNameTextField.current
         const email = context.SignupEmailTextField.current
         const password = context.SignupPasswordField.current
         const confirmpassword = context.ConfirmPasswordField.current
         // VALIDATIONS
         if (fullname == '' || email == '' || password == '' || confirmpassword == '') {
            Native.Alert.alert("⚠ Empty Credentials!", "You need to enter fill your credentials in order to continue.")
            return
         } if (!email.includes('@gmail.com')) {
            Native.Alert.alert("⚠ Invalid email address!", "You need to enter valid your credentials in order to continue.")
            return
         } if (password.length < 8) {
            Native.Alert.alert("⚠ Invalid password!", "Your password should contain atleast 8 characters.")
            return
         } if (password != confirmpassword) {
            Native.Alert.alert("⚠ Warning!", "Password confirmation does not match. Confirm your password again.")
            return
         }
         setLoading(true)
         await SignupUser(email, password)
         setLoading(false)
         Native.Alert.alert("Account created successfully! 🎉", `Now Login with your email address "${email}" .`)
         navigation.navigate("LoginScreen")
      } catch (error) {
         setLoading(false)
         Native.Alert.alert("⚠ Warning!", error)
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

   // VARIABLE(
   const navigation = useNavigation()
   const context = useContext(Context)
   const [Loading, setLoading] = useState(false)
   const { SignupUser, FacebookSignIn, GoogleSignIn } = useFirebaseAuth()
   // CODE

   // RETURN
   return (
      <Native.View className='flex-1'>

         <Native.View className='mt-[20%] px-[30px]'>
            <Native.TouchableOpacity onPress={() => { navigation.goBack() }} className=''>
               <FontAwesomeIcon icon={solid.faChevronCircleLeft} size={35} style={{ color: Theme.buttonColor }} />
            </Native.TouchableOpacity>
            <Native.Text className='text-[38px] font-bold text-buttonColor mt-2'>Create Account</Native.Text>
            <Native.Text className='text-[16px] text-secondaryText'>Fill the information correctly</Native.Text>
            <InputField label="Full Name" placeholder='eg: John Doe' inputMode='text' icon={regular.faUser} TextFieldName='fullname' />
            <InputField label="Email Address" placeholder='example@gmail.com' inputMode='email' icon={regular.faEnvelope} TextFieldName='signupemail' />
            <SecureInputField label="Password" placeholder='Enter a secure password' icon={solid.faLock} TextFieldName='signuppassword' />
            <SecureInputField label="Confirm Password" placeholder='Enter your password again' icon={solid.faLock} TextFieldName='confirmpassword' />
            <Native.TouchableOpacity className=' mt-5 h-[55px] w-full bg-buttonColor flex-row self-center items-center justify-center rounded-xl'
               onPress={handleSignup}
               style={{ elevation: 10 }}
            >

               {
                  Loading ?
                     <Native.ActivityIndicator size={35} color='#ffffff' />
                     :
                     <Native.View className='flex-row items-center justify-center'>
                        <Native.Text className='text-[#ffffff] font-semibold text-[20px]'>SIGN UP</Native.Text>
                        <FontAwesomeIcon icon={solid.faArrowRight} size={22} style={{ color: 'white', marginLeft: 5 }} />
                     </Native.View>
               }
            </Native.TouchableOpacity>
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

               <Native.TouchableOpacity onPress={() => { navigation.navigate('LoginScreen') }}>
                  <Native.Text className='text-center mt-2'>
                     Already have an account? <Native.Text className=' text-buttonColor font-extrabold'>Login</Native.Text>
                  </Native.Text>
               </Native.TouchableOpacity>
            </Native.View>
         </Native.View>

      </Native.View>
   )
}