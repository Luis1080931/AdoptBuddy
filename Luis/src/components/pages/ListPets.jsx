import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axiosClient from '../services/axiosClient'
import { IP } from '../services/Ip'
import axios from 'axios'
import IconVer from '../atoms/IconVer'
import IconDelete from '../atoms/IconDelete'
import { useNavigation } from '@react-navigation/native'

const ListPets = () => {

  const [mascotas, setMascotas] = useState([])
  const navigation = useNavigation()

  
  const getMascotas = async () => {
    try {
      const response = await axios.get(`${IP}/mascotas/listar`)
      console.log('Mascotas listadas', response.data)
      setMascotas(response.data)
      
    } catch (error) {
      console.log('Error del servidor para listar mascotas' + error);
    }
  }
  
  useEffect(() => {
    getMascotas()
  }, [])

  const handleVer = async (id) => {
    navigation.navigate('Pet', { petId: id })
  }

  return (
    <View>
      <FlatList 
        data={mascotas}
        keyExtractor={item => item.id_mascota}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Image 
                source={{ uri: `${IP}/img/${item.imagen}` }}
                style={styles.mascotaImage}
              />
            </View>
            <View style={styles.texto}>
              <Text style={styles.texto}> {item.nombre_mascota} </Text>
            </View>
            <View style={styles.mascotaDescription}>
              <TouchableOpacity onPress={() => handleVer(item.id_mascota)}>
                <IconVer />
              </TouchableOpacity>
              <IconDelete />
            </View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'black',
    margin: 10,
    borderRadius: 20,
    height: 100,
  },
  icon: {
    fontSize: 20,
    marginLeft: 80
  },
  mascota: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  texto: {
    fontSize: 25,
    fontWeight: '700'
  },
  mascotaName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mascotaDescription: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  mascotaImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    margin: 10
  }
})


export default ListPets