import * as Native from 'react-native';
import React, { Component, createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Theme from '../Theme';
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Context } from '../Context/GlobalContext';

class InputField extends Component {
   static contextType = Context;

   constructor(props) {
      super(props);
      this.state = {
         text: '',
      };

      this.EmailField = createRef();
      this.AnimatedHeight = useSharedValue(50);
      this.AnimatedDisplay = useSharedValue('none');

      this.AnimatedHeightStyle = useAnimatedStyle(() => ({
         height: this.AnimatedHeight.value,
      }));

      this.AnimatedDisplayStyle = useAnimatedStyle(() => ({
         display: this.AnimatedDisplay.value,
      }));
   }

   componentDidUpdate() {
      const { text } = this.state;
      const { TextFieldName } = this.props;
      const context = this.context;

      switch (TextFieldName) {
         case 'email':
            context.EmailTextField.current = text;
            break;
         case 'signupemail':
            context.SignupEmailTextField.current = text;
            break;
         case 'fullname':
            context.FullNameTextField.current = text;
            break;
         default:
            break;
      }
   }

   handlePress = () => {
      this.AnimatedHeight.value = withTiming(68);
      this.AnimatedDisplay.value = withTiming('flex');
      setTimeout(() => {
         this.EmailField.current.focus();
      }, 300);
   };

   handleBlur = () => {
      if (this.state.text === '') {
         this.AnimatedDisplay.value = 'none';
         this.AnimatedHeight.value = withTiming(50);
      }
   };

   handleChangeText = (newText) => {
      this.setState({ text: newText });
   };

   render() {
      const { label, placeholder, inputMode, icon } = this.props;

      return (
         <Native.Pressable onPress={this.handlePress}>
            <Animated.View className="mt-4 w-full py-2 rounded-xl flex-row items-center bg-[#E5E4E2]" style={[this.AnimatedHeightStyle, { elevation: 5 }]}>
               <Native.View className="w-[15%] justify-center items-center h-full flex-row">
                  <FontAwesomeIcon icon={icon} size={30} style={{ color: Theme.secondaryText }} />
               </Native.View>
               <Native.View className="w-[80%]">
                  <Native.Text className="text-[16px] font-bold text-secondaryText">{label}</Native.Text>
                  <Animated.View className="w-full" style={this.AnimatedDisplayStyle}>
                     <Native.TextInput
                        ref={this.EmailField}
                        className="w-full text-[16px] text-[#000000]"
                        placeholder={placeholder}
                        value={this.state.text}
                        cursorColor={Theme.secondaryText}
                        inputMode={inputMode}
                        onChangeText={this.handleChangeText}
                        onBlur={this.handleBlur}
                     />
                  </Animated.View>
               </Native.View>
            </Animated.View>
         </Native.Pressable>
      );
   }
}

export default InputField;
