import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import axiosClient from '../services/axiosClient'
import { IP } from '../services/Ip'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContext from '../../context/AuthContext'

const PagePetDetaills = () => {

    const route = useRoute()
    const { petId } = route.params
    const [mascota, setMascota] = useState(null)
    const navigation = useNavigation()
    const {rol} = useContext(AuthContext)

    const datosMascota = async () => {
        try {
            console.log('Datos de la mascota que tiene por id', petId);
            await axiosClient.get(`${IP}/mascotas/buscar/${petId}`).then((response) => {
                if(response.status === 200){
                    if(response.data[0]){
                        console.log('Datos busqueda mascota', response.data[0]);
                        setMascota(response.data[0])
                        console.log('Nombre mascota' , response.data[0].nombre_mascota);
                    }
                }else{
                    console.log('Error al obtener los datos de la mascota' + response.data.message)
                }
            })
        } catch (error) {
            console.log('Error de servidor en busqueda de mascota' + error);
        }
    }

    useEffect(() => {
        datosMascota()
    }, [])

    useEffect(() => {

        const fetchUser = async () => {
          const userValue = await AsyncStorage.getItem('user')
          if(userValue !== null){
            const response = JSON.parse(userValue)
            idUser = response.id
          }
          console.log('User async adopt', idUser);
        }
        fetchUser()
      }, [])

    const handleEstadoMascota = async() => {
        try {
            await axiosClient.put(`/mascotas/solicitar/${petId}`).then((response) => {
                if(response.status === 200){
                    console.log('Solicitud enviada correctamente');
                    datosMascota()
                }else{
                    Alert.alert('Vaya ocurrió un error al enviar la solicitud para cambiar estado de mascota')
                }
            })
        } catch (error) {
            console.log('ERROR DEL SERVIDOR PARA SOLICITAR MASCOTA' + error);
        }
    }

    const handleAdoptar = async () => {
        try {
            const data = {
                persona: idUser,
                mascota: petId
            }

            await axiosClient.post(`/adopciones/registrar`, data).then((response) => {
                if(response.status === 200){
                    console.log('Mascota adoptada con exito');
                    Alert.alert('Tu solicitud de adopción entró en proceso')
                    handleEstadoMascota()
                    datosMascota()
                    navigation.navigate('Pets')
                }else{
                    Alert.alert('Vaya ocurrió un error en el proceso')
                }
            })
        } catch (error) {
            console.log('Error al adoptar la mascota' + error);
        }
    }

  return (
    <ScrollView>
        <View>
        {mascota ? (
            <View style={styles.container}>
                <Text style={styles.titleMascota}> {mascota.nombre_mascota} </Text>
                <View>
                    <Image 
                        source={{ uri: `${IP}/img/${mascota.imagen}` }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.title}> Datos basicos: </Text>
                    <Text style={styles.textInfo}> Edad: {mascota.edad} meses </Text>
                    <Text style={styles.textInfo}> Genero: {mascota.genero} </Text>
                    <Text style={styles.textInfo}> Categoria: {mascota.categoria} </Text>
                    <Text style={styles.textInfo}> Esterilidad: {mascota.esteril} </Text>
                    <Text style={styles.textInfo}> Dueño: {mascota.dueno} </Text>
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.title}> Descripción: </Text>
                    <Text style={styles.textInfo}> Vacunas: {mascota.vacunas}</Text>
                    <Text style={styles.textInfo}> Hábitos: {mascota.habitos}</Text>
                    <Text style={styles.textInfo}> Estado actual: {mascota.estado}</Text>
                    <Text style={styles.textInfo}> Fecha registro: {mascota.fecha}</Text>
                </View>
                {rol === 'usuario' && (
                    <View>
                        {mascota.estado === 'sin adoptar' ? (
                            <TouchableOpacity style={styles.button} onPress={handleAdoptar}>
                                <Text style={styles.textButon}> Adoptar </Text>
                            </TouchableOpacity>
                        ): ''}
                    </View>
                )}
            </View>
        ) : (
            <Text> Sin detalles </Text>
        )}
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        margin: 10
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 150,
        margin: 20
    },
    title: {
        fontSize: 25,
        fontWeight: '600',
        marginBottom: 15
    },
    textInfo: {
        fontSize: 20,
        margin: 5
    },
    titleMascota: {
        fontSize: 30,
         fontWeight: '700',
         color: 'black'
    },
    cardInfo: {
        justifyContent: 'center',
        width: 300,
        margin: 20
    },
    button: {
        backgroundColor: '#FFC107',
        padding: 15,
        width: 200,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        margin: 20
    },
    textButon: {
        color: 'black',
        fontSize: 25,
        fontWeight: '700'
    }
})

export default PagePetDetaills