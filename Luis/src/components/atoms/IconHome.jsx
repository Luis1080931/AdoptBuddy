import { View, Text, Image } from 'react-native'
import React from 'react'

const IconHome = () => {
  return (
    <View>
      <Image
        source={require('./../../../assets/iconHome.png')}
        style={{ width: 30, height: 30 }}
      />
    </View>
  )
}

export default IconHome