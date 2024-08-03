import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
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
import AuthContext from '../../context/AuthContext'

const ListPets = () => {
  const [mascotas, setMascotas] = useState([])
  const navigation = useNavigation()
  const [petData, setPetData] = useState(null)
  const [petId, setPetId] = useState(null)
  const [title, setTitle] = useState('')
  const { rol, estadoModal, setEstadoModal } = useContext(AuthContext)

  const getMascotas = async () => {
    try {
      const response = await axios.get(`${IP}/mascotas/listar`)
      setMascotas(response.data)
    } catch (error) {
      console.log('Error del servidor para listar mascotas' + error)
    }
  }

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

  useEffect(() => {
    getMascotas()
  }, [])

  const vista = (accion, petData, petId) => {
    setTitle(accion)
    setEstadoModal(!estadoModal)
    setPetData(petData)
    setPetId(petId)
  }

  const handleVer = async (id) => {
    navigation.navigate('Pet', { petId: id })
  }

  const deletePet = async (id) => {
    try {
      await axiosClient.delete(`/mascotas/eliminar/${id}`).then((response) => {
        if (response.status === 200) {
          console.log('Mascota eliminada')
          getMascotas()
          Alert.alert('Mascota eliminada con éxito')
        } else {
          Alert.alert('Error al eliminar la mascota')
        }
      })
    } catch (error) {
      console.log('Error al eliminar mascota' + error)
    }
  }

  return (
    <>
      <FlatList
        data={mascotas}
        keyExtractor={item => item.id_mascota}
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
              {rol && rol === 'admin' ? (
                <>
                  <TouchableOpacity onPress={() => vista('Actualizar', item, item.id_mascota)}>
                    <IconEdit />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deletePet(item.id_mascota)}>
                    <IconDelete />
                  </TouchableOpacity>
                </>
              ) : null}
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <View>
            <Text style={styles.title}>Mascotas disponibles</Text>
          </View>
        )}
      />
      {rol === 'admin' && (
        <View style={styles.addButton}>
          <TouchableOpacity onPress={() => vista('Registrar')}>
            <IconPlus style={styles.iconMas} />
          </TouchableOpacity>
        </View>
      )}
      <ModalPet
        visible={estadoModal}
        onClose={vista}
        title={title}
        datos={getMascotas}
        petData={petData}
        petId={petId}
      />
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
    fontWeight: '700',
    color: 'black'
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
    backgroundColor: 'rgb(255, 165, 0)',
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
  }
})

export default ListPets
