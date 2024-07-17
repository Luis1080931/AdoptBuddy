import { View, Text, Image } from 'react-native'
import React from 'react'

const IconDelete = () => {
  return (
    <View>
      <Image 
        source={require('./../../../assets/iconDelete.png')}
        style={{ width: 40, height: 40, marginLeft: 10 }}
      />
    </View>
  )
}

export default IconDelete