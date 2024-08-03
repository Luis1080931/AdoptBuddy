import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axiosClient from '../services/axiosClient'
import { IP } from '../services/Ip'
import axios from 'axios'
import IconVer from '../atoms/IconVer'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const MisAdopciones = () => {

  const [mascotas, setMascotas] = useState([])
  const navigation = useNavigation()
  const [modalOpen, setModalOpen] = useState(false)
  const [petData, setPetData] = useState(null)
  const [petId, setPetId] = useState(null)
  const [title, setTitle] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const userValue = await AsyncStorage.getItem('user')
      if (userValue !== null) {
        const response = JSON.parse(userValue)
        rolUser = response.rol
        idUser = response.id
      }
      console.log('User async', rolUser)
      console.log('User async id', idUser)
    }
    fetchUser()
  }, [])

  const getMascotasAdopUser = async () => {
    try {
      const response = await axiosClient.get(`/adopciones/adoptsUser/${idUser}`)
      console.log('Mascotas listadas', response.data)
      setMascotas(response.data)
    } catch (error) {
      console.log('Error del servidor para listar ADOPCIONES' + error)
    }
  }

  useEffect(() => {
    getMascotasAdopUser()
  }, [])

  const handleVer = async (id) => {
    navigation.navigate('Pet', { petId: id })
  }

  return (
    <>
      <SafeAreaProvider>
        <FlatList
          data={mascotas}
          keyExtractor={item => item.id_mascota}
          ListHeaderComponent={() => (
            <View>
              <Text style={styles.title}>Mis adopciones</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{ uri: `${IP}/img/${item.imagen}` }}
                  style={styles.mascotaImage}
                />
                <Text style={styles.texto}>{item.nombre_mascota}</Text>
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
              <Text style={styles.emptyText}>Aún no tienes adopciones</Text>
            </View>
          )}
        />
      </SafeAreaProvider>
    </>
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
    justifyContent: 'space-between'
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
  mascotaImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    margin: 10
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
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

export default MisAdopciones
