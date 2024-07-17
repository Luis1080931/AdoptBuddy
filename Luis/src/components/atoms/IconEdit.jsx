import { View, Text, Image } from 'react-native'
import React from 'react'

const IconEdit = () => {
  return (
    <View>
      <Image 
        source={require('./../../../assets/iconEdit.png')}
        style={{ width: 30, height: 30 }}
      />
    </View>
  )
}

export default IconEdit