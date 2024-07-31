import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IP } from '../services/Ip.jsx'
import ModalUsuario from '../modals/ModalUser.jsx'
import axiosClient from '../services/axiosClient.jsx'

const ProfileUser = () => {

    const [formData, setFormData] = useState({
        identificacion: '',
        nombre: '',
        imagen_user: '',
        correo: '',
        telefono: '',
        municipio: '',
        direccion: '',
    })

    const [user, setUser] = useState([])
    const [idUser, setIdUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');

                if (storedUser !== null) {
                const response = JSON.parse(storedUser);
                setIdUser(response.id)
                setFormData(response);
                console.log('Response', response);
                }else{
                    console.log('No hay datos del usuario en almacenamiento local');
                }

                /* if (storedUser !== null) {
                    const response = JSON.parse(storedUser);
                    IdUser = response.id
                } */
                    console.log('User async', idUser);

                const response = await axiosClient.get(`${IP}/users/buscar/${idUser}`)
                if(response.data){
                    setUser(response.data[0])
                    console.log('Usuario:' , response.data[0]);
                }
                
            } catch (error) {
                console.log('Error de fetching de data' + error);
            }
            console.log('Form data' , formData);
        }

        fetchData()
    }, [])

      const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async () => {
        try {
            await axiosClient.put(`/users/actualizar/${IdUser}`).then((response) => {
                if(response.status == 200){
                    console.log('Usuario actualizado');
                    Alert.alert('Usuario actualizado con éxito');
                }else{
                    Alert.alert('Error al actualizar el usuario');
                }
            })
        } catch (error) {
            console.log('Error del servidor para actualizar perfil'+ error);
        }
      }
  return (
    <ScrollView>
    <View style={styles.container}>
        <Text style={styles.title}> Perfil de usuario </Text>
        <View style={styles.cardInfo}>
            <Image 
                source={{ uri: `${IP}/users/${formData.imagen_user}` }}
                style={{ width: 300, height: 300, marginBottom: 20 }}
            /> 
            <Text style={[ styles.cardInfo, styles.textDataName]}> {formData.nombre} </Text>
        </View>
        <View style={styles.cardInfo}>
            <View style={styles.cardPlus}>
                <View style={styles.info}>
                    <Text style={styles.textInfo}> Identificación: </Text>
                    <Text style={styles.textInfo}> Correo: </Text>
                    <Text style={styles.textInfo}> Telefono: </Text>
                    <Text style={styles.textInfo}> Municipio: </Text>
                    <Text style={styles.textInfo}> Dirección: </Text>

                </View>
                <View style={styles.data}>
                    <TextInput 
                        style={styles.textData} 
                        keyboardType='numeric'
                        value={formData.identificacion.toString()}
                        onChange={(text) => handleChange('identificacion', text)}
                    />
                    <TextInput 
                        style={styles.textData} 
                        value={formData.correo}
                        onChange={(text) => handleChange('correo', text)}    
                    />
                    <TextInput 
                        style={styles.textData}
                        value={formData.telefono}
                        onChange={(text) => handleChange('telefono', text)}
                    /> 
                    {/* <TextInput 
                        style={styles.textData} 
                        value={formData.municipio}
                        onChange={(text) => handleChange('municipio', text)}
                    /> */}
                    <Text style={styles.textData}> {user.municipio} </Text>
                    <TextInput 
                        style={styles.textData} 
                        value={formData.direccion}
                        onChange={(text) => handleChange('direccion', text)}
                    />

                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.textButon} onPress={handleSubmit}> Editar </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    </ScrollView>
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
        marginBottom: 10,
        height: 52
    },
    textData: {
        fontSize: 20,
        fontWeight: '500',
        borderWidth: 2,
        borderColor: 'black',
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        padding: 10,
        marginBottom: 10,
        height: 52
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
    },
    button: {
        backgroundColor: 'rgb(255, 165, 0)',
        padding: 15,
        width: 100,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 20
    },
    textButon: {
        color: 'black',
        fontSize: 20,
        fontWeight: '700'
    }
})

export default ProfileUser