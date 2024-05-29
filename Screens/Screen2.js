import * as Native from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import * as regular from '@fortawesome/free-regular-svg-icons'

export default function Screen2() {

  const [Like, setLike] = useState(false)

  return (
    <Native.View className=' flex-1 items-center justify-center'>
      <Native.Text>Screen2</Native.Text>
      <Native.TouchableOpacity
        onPress={() => { Like ? setLike(false) : setLike(true) }}
      >
        <FontAwesomeIcon icon={Like ? solid.faHeart : regular.faHeart} size={44} style={{ color: 'red' }} />
      </Native.TouchableOpacity>
    </Native.View>
  )
}