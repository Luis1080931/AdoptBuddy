import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IP } from '../services/Ip.jsx'

const ProfileUser = () => {

    const [datosUser, setDatosUser ] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userValue = await AsyncStorage.getItem('user')
            
                if(userValue !== null){
                    const response = JSON.parse(userValue)
                    IdUser = response.id
                    setDatosUser(response)
                }else{
                    console.log('No hay datos del usuario en almacenamiento local');
                }
                
            } catch (error) {
                console.log('Error de fetching de data' + error);
            }
        }

        fetchData()
    }, [])


  return (
    <View style={styles.container}>
        <Text style={styles.title}> Perfil de usuario </Text>
        <View style={styles.cardInfo}>
            <Image 
                source={{ uri: `${IP}/users/${datosUser.imagen_user}` }}
                style={{ width: 300, height: 300, marginBottom: 20 }}
            /> 
            <Text style={[ styles.cardInfo, styles.textDataName]}> {datosUser.nombre} </Text>
        </View>
        <View style={styles.cardInfo}>
            <View style={styles.cardPlus}>
                <View style={styles.info}>
                    <Text style={styles.textInfo}> Identificación: </Text>
                    <Text style={styles.textInfo}> Correo: </Text>
                    <Text style={styles.textInfo}> Telefono: </Text>
                    <Text style={styles.textInfo}> Dirección: </Text>

                </View>
                <View style={styles.data}>
                    <Text style={styles.textData}> {datosUser.identificacion} </Text>
                    <Text style={styles.textData}> {datosUser.correo} </Text>
                    <Text style={styles.textData}> {datosUser.telefono} </Text> 
                    <Text style={styles.textData}> {datosUser.municipio} - {datosUser.direccion} </Text>

                </View>
            </View>
            <View style={styles.cardData}>
            </View>
            <View style={styles.cardData}>
            </View>
            <View style={styles.cardData}>
            </View>
            <View style={styles.cardData}>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    cardInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
    },
    cardData: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textInfo: {
        fontSize: 20,
        fontWeight: '800',
        borderWidth: 2,
        borderColor: 'black',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        padding: 10,
        marginBottom: 10
    },
    textData: {
        fontSize: 20,
        fontWeight: '500',
        borderWidth: 2,
        borderColor: 'black',
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        padding: 10,
        marginBottom: 10
    },
    textDataName: {
        fontSize: 20,
        marginBottom: 20
    },
    cardPlus:{
        flexDirection: 'row'
    },
    title: {
        fontSize: 30,
        marginTop: 15,
        fontWeight: '700'
    }
})

export default ProfileUser