import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axiosClient from '../services/axiosClient'
import { IP } from '../services/Ip'
import axios from 'axios'
import IconVer from '../atoms/IconVer'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HistorialAdopciones = () => {

  const [solicitudes, setSolicitudes] = useState([])
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
        // Assuming rolUser and idUser are used somewhere else
        // const rolUser = response.rol
        // const idUser = response.id
      }
    }
    fetchUser()
  }, [])

  const getSolicitudes = async () => {
    try {
      const response = await axiosClient.get(`/adopciones/listar`)
      console.log('Solicitudes listadas', response.data)
      setSolicitudes(response.data)
    } catch (error) {
      console.log('Error del servidor para listar solicitudes: ' + error);
    }
  }

  useEffect(() => {
    getSolicitudes()
  }, [])

  const handleVer = (id) => {
    navigation.navigate('Pet', { petId: id })
  }

  const handleProfile = (id) => {
    navigation.navigate('ProfileUser', { userId: id })
  }

  return (
    <View style={styles.container}>
      {solicitudes.length > 0 ? (
        <>
          <Text style={styles.title}>Historial de adopciones</Text>
          <FlatList 
            data={solicitudes}
            keyExtractor={item => item.id_mascota.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 45 }}>
                    <Text style={styles.texto}>Mascota</Text>
                    <Image 
                      source={{ uri: `${IP}/img/${item.imagen}` }}
                      style={styles.mascotaImage}
                    />
                    <Text style={styles.texto}>{item.nombre_mascota}</Text>
                    <TouchableOpacity style={styles.iconButton} onPress={() => handleVer(item.id_mascota)}>
                      <IconVer />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.texto}>Adoptante</Text>
                    <Image 
                      source={{ uri: `${IP}/users/${item.imagen_user}` }}
                      style={styles.mascotaImage}
                    />
                    <Text style={styles.texto}>{item.nombre}</Text>
                    <TouchableOpacity style={styles.iconButton} onPress={() => handleProfile(item.id)}>
                      <IconVer />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.texto}>{item.fecha}</Text>
              </View>
            )}
          />
        </>
      ) : (
        <Text style={styles.noSolicitudes}>Sin historial de adopciones</Text>
      )}
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
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: 'black',
    margin: 10,
    borderRadius: 20,
    height: 300,
    justifyContent: 'space-between'
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  texto: {
    fontSize: 25,
    fontWeight: '700'
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
    textAlign: 'center'
  },
  iconButton: {
    marginTop: 15
  },
  noSolicitudes: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  }
})

export default HistorialAdopciones
