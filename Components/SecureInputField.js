import * as Native from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import * as regular from '@fortawesome/free-regular-svg-icons'
import Theme from '../Theme';
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Context } from '../Context/GlobalContext'

export default function SecureInputField(props) {

   // VARIABLES
   const context = useContext(Context)
   const { label, placeholder, icon, TextFieldName } = props
   const [showPassword, setshowPassword] = useState(false)
   const [text, settext] = useState('')
   const EmailField = useRef(null)
   const AnimatedHeight = useSharedValue(50)
   const AnimatedDisplay = useSharedValue('none')
   const AnimatedDisplayStyle = useAnimatedStyle(() => ({
      display: AnimatedDisplay.value
   }))
   const AnimatedHeightStyle = useAnimatedStyle(() => ({
      height: AnimatedHeight.value
   }))

   // CODE

   useEffect(() => {
      switch (TextFieldName) {
         case 'password':
            context.PasswordField.current = text
            break;
         case 'confirmpassword':
            context.ConfirmPasswordField.current = text
            break;
         case 'signuppassword':
            context.SignupPasswordField.current = text
            break;
         default:
            break;
      }
   })



   // RETURN
   return (
      <Native.Pressable
         onPress={() => {
            AnimatedHeight.value = withTiming(68)
            AnimatedDisplay.value = withTiming('flex')
            setTimeout(() => {
               EmailField.current.focus()
            }, 300);
         }}>

         <Animated.View className='mt-4 w-full py-2 rounded-xl flex-row items-center bg-[#E5E4E2]' style={[AnimatedHeightStyle, { elevation: 5 }]}>
            <Native.View className='w-[15%] justify-center items-center h-full flex-row'>
               <FontAwesomeIcon icon={icon} size={28} style={{ color: Theme.secondaryText }} />
            </Native.View>
            <Native.View className='w-[70%]'>
               <Native.Text className='text-[16px] font-bold text-secondaryText'>{label}</Native.Text>
               <Animated.View className='w-full' style={AnimatedDisplayStyle}>
                  <Native.TextInput ref={EmailField} className='w-full text-[16px] text-[#000000]'
                     placeholder={placeholder}
                     value={text}
                     cursorColor={Theme.secondaryText}
                     secureTextEntry={showPassword ? false : true}
                     onChangeText={(newtext) => {
                        settext(newtext)
                     }}
                     onBlur={() => {
                        if (text == '') {
                           AnimatedDisplay.value = 'none'
                           AnimatedHeight.value = withTiming(50)
                        }
                     }}
                  />
               </Animated.View>
            </Native.View>
            <Native.Pressable className='w-[15%] justify-center items-center h-full flex-row'
               onPress={() => { showPassword ? setshowPassword(false) : setshowPassword(true) }}>
               {
                  showPassword ?
                     <FontAwesomeIcon icon={regular.faEyeSlash} size={27} style={{ color: Theme.secondaryText }} />
                     :
                     <FontAwesomeIcon icon={regular.faEye} size={27} style={{ color: Theme.secondaryText }} />
               }
            </Native.Pressable>
         </Animated.View>
      </Native.Pressable>
   )
}