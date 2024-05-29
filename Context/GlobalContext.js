import React, { createContext, useState, useRef } from 'react'

export const Context = createContext()

export default function GlobalContext(props) {
   // FUNCITONS



   // VARIABLES

   const [isActive, setisActive] = useState('Pizza')
   const [AddtoCart, setAddtoCart] = useState(false)
   const [Cart, setCart] = useState([])
   const [IsLoggedIn, setIsLoggedIn] = useState(false)
   const [LoggedInUser, setLoggedInUser] = useState(null)
   const EmailTextField = useRef(null)
   const PasswordField = useRef(null)
   const FullNameTextField = useRef(null)
   const SignupEmailTextField = useRef(null)
   const SignupPasswordField = useRef(null)
   const ConfirmPasswordField = useRef(null)

   // CODE

   const contextObject = {
      // states
      isActive, setisActive,
      AddtoCart, setAddtoCart,
      Cart, setCart,
      IsLoggedIn, setIsLoggedIn,
      LoggedInUser, setLoggedInUser,
      EmailTextField,
      PasswordField,
      FullNameTextField,
      SignupEmailTextField,
      SignupPasswordField,
      ConfirmPasswordField
   }


   // RETURN
   return (
      <Context.Provider value={contextObject}>
         {props.children}
      </Context.Provider>
   )
}
