import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import axiosClient from '../services/axiosClient'
import { IP } from '../services/Ip'

const PagePetDetaills = () => {

    const route = useRoute()
    const { petId } = route.params
    const [mascota, setMascota] = useState(null)

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
                </View>
                <View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.textButon}> Adoptar </Text>
                    </TouchableOpacity>
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