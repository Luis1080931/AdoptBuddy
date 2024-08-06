import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axiosClient from '../services/axiosClient'
import { IP } from '../services/Ip'
import axios from 'axios'
import IconVer from '../atoms/IconVer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const HistorialPets = () => {

  const [mascotas, setMascotas] = useState([])
  const navigation = useNavigation()
  const [petData, setPetData] = useState(null)
  const [petId, setPetId] = useState(null)

  const getMascotas = async () => {
    try {
      const response = await axios.get(`${IP}/mascotas/listarHistorial`)
      setMascotas(response.data)
    } catch (error) {
      console.log('Error del servidor para listar mascotas' + error);
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userValue = await AsyncStorage.getItem('user')
      if (userValue !== null) {
        const response = JSON.parse(userValue)
        // Assuming rolUser and idUser are used somewhere else
        // const rolUser = response.rol
        // const idUser = response.id
      }
    }
    fetchUser()
  }, [])
  
  useEffect(() => {
    getMascotas()
  }, [])

  const handleVer = async (id) => {
    navigation.navigate('Pet', { petId: id })
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={mascotas}
        keyExtractor={item => item.id_mascota.toString()}
        ListHeaderComponent={() => (
          <View>
            <Text style={styles.title}> Historial de mascotas </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image 
                source={{ uri: `${IP}/img/${item.imagen}` }}
                style={styles.mascotaImage}
              />
              <View>
                <Text style={styles.texto}> {item.nombre_mascota} </Text>
                <Text style={styles.texto}> {item.estado} </Text>
              </View>
            </View>
            <View style={styles.mascotaDescription}>
              <TouchableOpacity onPress={() => handleVer(item.id_mascota)}>
                <IconVer />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay mascotas disponibles</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  card: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'black',
    margin: 10,
    borderRadius: 20,
    height: 100,
    justifyContent: 'space-between'
  },
  iconMas: {
    color: 'white'
  },
  icon: {
    fontSize: 20,
    marginLeft: 80
  },
  mascotaImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    margin: 10
  },
  texto: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black'
  },
  mascotaDescription: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    color: 'black',
    textAlign: 'center'
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  emptyText: {
    fontSize: 20,
    color: 'gray'
  }
})

export default HistorialPets
