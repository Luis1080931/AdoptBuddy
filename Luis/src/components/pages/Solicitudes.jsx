import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axiosClient from '../services/axiosClient'
import { IP } from '../services/Ip'
import IconVer from '../atoms/IconVer'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([])
  const navigation = useNavigation()
  const [rolUser, setRolUser] = useState('')
  const [idUser, setIdUser] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const userValue = await AsyncStorage.getItem('user')
      if (userValue !== null) {
        const response = JSON.parse(userValue)
        setRolUser(response.rol)
        setIdUser(response.id)
      }
      console.log('User async', rolUser)
    }
    fetchUser()
  }, [rolUser])

  const getSolicitudes = async () => {
    try {
      const response = await axiosClient.get(`/adopciones/listarSoli`)
      console.log('Solicitudes listadas', response.data)
      setSolicitudes(response.data)
    } catch (error) {
      console.log('Error del servidor para listar solicitudes: ' + error)
    }
  }

  useEffect(() => {
    getSolicitudes()
  }, [idUser])

  const handleVer = (id) => {
    navigation.navigate('Pet', { petId: id })
  }

  const handleProfile = (id) => {
    navigation.navigate('Profile', { userId: id })
  }

  const deleteSolicitud = async (id, idPet) => {
    try {
      await axiosClient.delete(`/adopciones/eliminar/${id}`).then((response) => {
        if (response.status === 200) {
          console.log('Solicitud cancelada')
          Alert.alert('Solicitud cancelada con éxito')
          handleCancelPet(idPet)
          getSolicitudes()
        } else {
          Alert.alert('Error al eliminar la solicitud')
        }
      })
    } catch (error) {
      console.log('Error del servidor al eliminar solicitud: ' + error)
    }
  }

  const handleAccept = async (id, idPet) => {
    try {
      await axiosClient.put(`/adopciones/acept/${id}`).then((response) => {
        if (response.status === 200) {
          console.log('Solicitud aceptada')
          Alert.alert('Solicitud aceptada con éxito')
          handleAdoptMascota(idPet)
          getSolicitudes()
        } else {
          Alert.alert('Error al aceptar la solicitud')
        }
      })
    } catch (error) {
      console.log('Error del servidor en función de aceptar: ' + error)
    }
  }

  const handleAdoptMascota = async (idPet) => {
    try {
      await axiosClient.put(`/mascotas/adoptar/${idPet}`).then((response) => {
        if (response.status === 200) {
          console.log('Mascota adoptada')
        } else {
          console.log('Error al adoptar mascota')
        }
      })
    } catch (error) {
      console.log('Error del servidor para cambiar estado de mascota: ' + error)
    }
  }

  const handleCancelPet = async (idPet) => {
    try {
      await axiosClient.put(`/mascotas/cancel/${idPet}`).then((response) => {
        if (response.status === 200) {
          console.log('Mascota disponible')
        } else {
          console.log('Error al poner en disponibilidad la mascota')
        }
      })
    } catch (error) {
      console.log('Error del servidor para poner en disponibilidad mascota: ' + error)
    }
  }

  return (
    <FlatList
      data={solicitudes}
      keyExtractor={(item) => item.id_mascota}
      ListHeaderComponent={() => (
        <View>
          <Text style={styles.title}>Solicitudes</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={{ flexDirection: 'column' }}>
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 45 }}>
                <Text style={styles.texto}>Mascota</Text>
                <Image
                  source={{ uri: `${IP}/img/${item.imagen}` }}
                  style={styles.mascotaImage}
                />
                <Text style={styles.texto}>{item.nombre_mascota}</Text>
                <TouchableOpacity style={{ marginTop: 15 }} onPress={() => handleVer(item.id_mascota)}>
                  <IconVer />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={styles.texto}>Adoptante</Text>
                <Image
                  source={{ uri: `${IP}/users/${item.imagen_user}` }}
                  style={styles.mascotaImage}
                />
                <Text style={styles.texto}>{item.nombre}</Text>
                <TouchableOpacity style={{ marginTop: 15 }} onPress={() => handleProfile(item.id_mascota)}>
                  <IconVer />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonAcciones}>
              <TouchableOpacity onPress={() => handleAccept(item.id, item.mascota)} style={styles.buttonAcept}>
                <Text style={styles.textoButton}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteSolicitud(item.id, item.mascota)} style={styles.buttonCancel}>
                <Text style={styles.textoButton}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay solicitudes</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
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
  texto: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black'
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
  buttonAcciones: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonAcept: {
    backgroundColor: 'rgb(255, 165, 0)',
    padding: 10,
    borderRadius: 5,
    width: 130,
    margin: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  buttonCancel: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: 130,
    margin: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  textoButton: {
    fontSize: 25,
    fontWeight: '700',
    color: 'white'
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

export default Solicitudes
