import { View, Text, Image } from 'react-native'
import React from 'react'

const IconVer = () => {
  return (
    <View>
      <Image 
        source={require('./../../../assets/ver.png')}
        style={{ width: 30, height: 30 }}
      />
    </View>
  )
}

export default IconVer