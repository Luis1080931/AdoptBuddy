import { View, Text, Image } from 'react-native'
import React from 'react'

const IconProfile = () => {
  return (
    <View>
      <Image 
        source={require('./../../../assets/iconProfile.png')}
        style={{ width: 30, height: 30 }}
      />
    </View>
  )
}

export default IconProfile