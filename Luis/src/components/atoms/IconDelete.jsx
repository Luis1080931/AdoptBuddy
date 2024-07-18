import { View, Text, Image } from 'react-native'
import React from 'react'

const IconDelete = () => {
  return (
    <View>
      <Image 
        source={require('./../../../assets/iconDelete.png')}
        style={{ width: 30, height: 30, marginLeft: 10 }}
      />
    </View>
  )
}

export default IconDelete