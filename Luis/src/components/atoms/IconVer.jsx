import { View, Text, Image } from 'react-native'
import React from 'react'

const IconVer = () => {
  return (
    <View>
      <Image 
        source={require('./../../../assets/ver.png')}
        style={{ width: 40, height: 40, marginLeft: 120 }}
      />
    </View>
  )
}

export default IconVer