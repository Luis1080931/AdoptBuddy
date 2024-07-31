import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import axiosClient from '../services/axiosClient'
import { IP } from '../services/Ip'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PageUserDetails = () => {

    const route = useRoute()
    const { userId } = route.params
    const [user, setUser] = useState(null)
    const navigation = useNavigation()

    const datosUser = async () => {
        try {
            console.log('Datos de la user que tiene por id', userId);
            await axiosClient.get(`${IP}/users/buscar/${userId}`).then((response) => {
                if(response.status === 200){
                    if(response.data[0]){
                        console.log('Datos busqueda user', response.data[0]);
                        setUser(response.data[0])
                        console.log('Nombre user' , response.data[0].nombre_user);
                    }
                }else{
                    console.log('Error al obtener los datos de la user' + response.data.message)
                }
            })
        } catch (error) {
            console.log('Error de servidor en busqueda de user' + error);
        }
    }

    useEffect(() => {
        datosUser()
    }, [])

  return (
    <ScrollView>
        <View>
        {user ? (
            <View style={styles.container}>
                <Text style={styles.titleuser}> {user.nombre_user} </Text>
                <View>
                    <Image 
                        source={{ uri: `${IP}/users/${user.imagen_user}` }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.title}> Datos de usuario: </Text>
                    <Text style={styles.textInfo}> Nombre: {user.nombre} </Text>
                    <Text style={styles.textInfo}> Identificación: {user.identificacion} </Text>
                    <Text style={styles.textInfo}> Correo: {user.correo} </Text>
                    <Text style={styles.textInfo}> Teléfono: {user.telefono} </Text>
                    <Text style={styles.textInfo}> Dirección: {user.municipio} - {user.direccion} </Text>
                </View>
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
    titleuser: {
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

export default PageUserDetails