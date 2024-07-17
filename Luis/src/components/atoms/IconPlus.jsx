import { View, Text, Image } from 'react-native'
import React from 'react'

const IconPlus = () => {
  return (
    <View>
      <Image 
        source={require('./../../../assets/iconPlus.png')}
        style={{ width: 30, height: 30 }}
      />
    </View>
  )
}

export default IconPlus