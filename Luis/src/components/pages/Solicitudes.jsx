import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axiosClient from '../services/axiosClient'
import { IP } from '../services/Ip'
import axios from 'axios'
import IconVer from '../atoms/IconVer'
import IconDelete from '../atoms/IconDelete'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IconEdit from '../atoms/IconEdit'
import IconPlus from '../atoms/IconPlus'
import ModalPet from '../modals/ModalPets'

const Solicitudes = () => {

  const [solicitudes, setSolicitudes] = useState([])
  const navigation = useNavigation()
  const [modalOpen, setModalOpen] = useState(false)
  const [petData, setPetData] = useState(null)
  const [petId, setPetId] = useState(null)
  const [title, setTitle] = useState('')

  useEffect(() => {

    const fetchUser = async () => {
      const userValue = await AsyncStorage.getItem('user')
      if(userValue !== null){
        const response = JSON.parse(userValue)
        rolUser = response.rol
        idUser = response.id
      }
      console.log('User async', rolUser);
    }
    fetchUser()
  }, [])
  
  const getSolicitudes = async () => {
    try {
      const response = await axiosClient.get(`/adopciones/listarSoli`)
      console.log('solicitudes listadas', response.data)
      setSolicitudes(response.data)
      
    } catch (error) {
      console.log('Error del servidor para listar solicitudes' + error);
    }
  }

  
  useEffect(() => {
    getSolicitudes()
  }, [])

  /* const vista = (accion, petData, petId) => {
    setTitle(accion)
    setModalOpen(!modalOpen)
    setPetData(petData)
    setPetId(petId)
  } */

  const handleVer = async (id) => {
    navigation.navigate('Pet', { petId: id })
  }

  const handleProfile = async (id) => {
    navigation.navigate('Profile', { userId: id })
  }

  const deleteSolicitud = async (id, idPet) => {
    try {
      await axiosClient.delete(`/adopciones/eliminar/${id}`).then((response) => {
        if(response.status === 200){
          console.log('Solicitud cancelada')
          Alert.alert('Solictud cancelada con éxito')
          handleCancelPet(idPet)
          getSolicitudes()
        }else{
          Alert.alert('Error al eliminar la solicitud')
        }
      })
    } catch (error) {
      console.log('Error del servidor al eliminar solicitud' + error);
    }
  }

  const hanleAccept = async (id, idPet) => {
    try {
        await axiosClient.put(`/adopciones/acept/${id}`).then((response) => {
            if(response.status === 200){
              console.log('Solicitud aceptada')
              Alert.alert('Solicitud aceptada con éxito')
              handleAdoptMascota(idPet)
              getSolicitudes()
            }else{
              Alert.alert('Error al aceptar la solicitud')
            }
        })
    } catch (error) {
        console.log('Error del servidor en funcion de aceptar' + error);
    }
  }

  const handleAdoptMascota = async (idPet) => {
    try {
      await axiosClient.put(`/mascotas/adoptar/${idPet}`).then((response) => {
        if(response.status == 200){
          console.log('Mascota adoptada');
        }else{
          console.log('Error al adoptar mascota');
        }
      })
    } catch (error) {
      console.log('Error del servidor para cambiar estado de mascota' + error);
    }
  }

  const handleCancelPet = async(idPet) => {
    try {
      await axiosClient.put(`/mascotas/cancel/${idPet}`).then((response) => {
        if(response.status == 200){
          console.log('Mascota disponible');
        }else{
          console.log('Error al poner en disponibilidad la mascota');
        }
      })
    } catch (error) {
      console.log('Error del servidor para poner en disponibilidad mascoga' + error);
    }
  }
  return (
    <>
        <ScrollView>
          <View>
          {solicitudes ? (
            <>
            <Text style={styles.title}> Solicitudes </Text>
            <FlatList 
              data={solicitudes}
              keyExtractor={item => item.id_mascota}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'column' }}>
                  <View style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 45  }}>
                        <Text style={styles.texto}> Mascota </Text>
                        <Image 
                          source={{ uri: `${IP}/img/${item.imagen}` }}
                          style={styles.mascotaImage}
                        />
                        <Text style={styles.texto}> {item.nombre_mascota} </Text>
                        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => handleVer(item.id_mascota)}>
                          <IconVer />
                        </TouchableOpacity>
                      </View>
                      <View style={{ flexDirection: 'column', alignItems: 'center'  }}>
                        <Text style={styles.texto}> Adoptante </Text>
                        <Image 
                          source={{ uri: `${IP}/users/${item.imagen_user}` }}
                          style={styles.mascotaImage}
                        />
                        <Text style={styles.texto}> {item.nombre} </Text>
                        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => handleVerAdoptante(item.id_mascota)}>
                          <IconVer />
                        </TouchableOpacity>
                      </View>
                    </View>
                  <View style={styles.buttonAcciones}>
                    <TouchableOpacity onPress={() => hanleAccept(item.id, item.mascota)} style={styles.buttonAcept}>
                      <Text style={styles.textoButton}> Aceptar </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteSolicitud(item.id, item.mascota)} style={styles.buttonCancel}>
                      <Text style={styles.textoButton}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                  </View>
                </View>
              )}
            />
            </>
          ): (
            <Text> Aun no tienes adopciones </Text>
          )}
          </View>
        </ScrollView>

        {/* <ModalPet 
          visible={modalOpen}
          onClose={vista}
          title={title}
          data={mascotas}
          petData={petData}
          petId={petId}
        /> */}
    </>
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
  iconMas: {
    color: 'white'
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
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#336699',
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImage: {
    width: 50,
    height: 50,
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
    backgroundColor: '#336699',
    color: 'black',
    padding: 10,
    borderRadius: 5,
    width: 130,
    margin: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  buttonCancel: {
    backgroundColor: 'red',
    color: 'black',
    padding: 10,
    borderRadius: 5,
    width: 130,
    margin: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  textoButton: {
    fontSize: 25,
    fontWeight: '700',
    color: 'white'
  },
})


export default Solicitudes