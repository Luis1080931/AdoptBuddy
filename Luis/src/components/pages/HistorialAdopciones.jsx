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
      const response = await axiosClient.get(`/adopciones/listar`)
      console.log('solicitudes listadas', response.data)
      setSolicitudes(response.data)
      
    } catch (error) {
      console.log('Error del servidor para listar solicitudes' + error);
    }
  }

  
  useEffect(() => {
    getSolicitudes()
  }, [])

  const handleVer = async (id) => {
    navigation.navigate('Pet', { petId: id })
  }

  const handleProfile = async (id) => {
    navigation.navigate('ProfileUser', { userId: id })
  }

  return (
    <>
        <ScrollView>
          <View>
          {solicitudes ? (
            <>
            <Text style={styles.title}> Historial de adopciones </Text>
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
                        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => handleProfile(item.id)}>
                          <IconVer />
                        </TouchableOpacity>
                      </View>
                    </View>
                      <Text style={styles.texto}> {item.fecha} </Text>
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


export default HistorialAdopciones