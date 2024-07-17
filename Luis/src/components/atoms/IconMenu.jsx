import { View, Text, Image } from 'react-native'
import React from 'react'

const IconMenu = () => {
  return (
    <View>
      <Image
        source={require('./../../../assets/iconMenu.png')}
        style={{ width: 30, height: 30 }}
      />
    </View>
  )
}

export default IconMenu