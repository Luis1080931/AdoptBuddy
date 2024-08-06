import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IP } from '../services/Ip.js'
import axiosClient from '../services/axiosClient.js'
import AuthContext from '../../context/AuthContext.jsx'
import RNPickerSelect from 'react-native-picker-select';

const ProfileUser = () => {

    const [formData, setFormData] = useState({
        identificacion: '',
        nombre: '',
        imagen_user: '',
        correo: '',
        telefono: '',
        municipio: '',
        direccion: '',
        password: ''
    })

    const [municipios, setMunicipios] = useState([])
    const [user, setUser] = useState([])
    const { idUser } = useContext(AuthContext)

    useEffect(() => {
        axiosClient.get('/users/muni').then((response) => {
            console.log(response.data);
            setMunicipios(response.data.map(item => 
            ({
                label: item.nombre_municipio,
                value: item.id_municipio
            })));
            
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`${IP}/users/buscar/${idUser}`)
                if (response.data) {
                    setFormData(response.data[0])
                    console.log('Datos user', response.data[0]);
                    
                }
            } catch (error) {
                console.log('Error de fetching de data' + error);
            }
        }

        fetchData()
    }, [])

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const data = {
                identificacion: formData.identificacion,
                nombre: formData.nombre,
                correo: formData.correo,
                telefono: formData.telefono,
                municipio: formData.municipio,
                direccion: formData.direccion,
                password: formData.password
            }

            await axiosClient.put(`/users/actualizar/${idUser}`, data).then((response) => {
                if (response.status == 200) {
                    Alert.alert('Usuario actualizado con éxito');
                    
                } else {
                    Alert.alert('Error al actualizar el usuario');
                }
            })
            console.log('Datos a actualizar', data);
        } catch (error) {
            console.log('Error del servidor para actualizar perfil' + error);
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
                    <Text style={[styles.cardInfo, styles.textDataName]}> {formData.nombre} </Text>
                </View>
                <View style={styles.cardInfo}>
                    <View style={styles.cardPlus}>
                        <View style={styles.info}>
                            <Text style={styles.textInfo}> Identificación: </Text>
                            <Text style={styles.textInfo}> Correo: </Text>
                            <Text style={styles.textInfo}> Telefono: </Text>
                            <Text style={styles.textInfo}> Municipio: </Text>
                            <Text style={styles.textInfo}> Dirección: </Text>
                            <Text style={styles.textInfo}> Contraseña: </Text>

                        </View>
                        <View style={styles.data}>
                            <TextInput
                                style={styles.textData}
                                keyboardType='numeric'
                                value={formData.identificacion}
                                onChangeText={(text) => handleChange('identificacion', text)}
                            />
                            <TextInput
                                style={styles.textData}
                                value={formData.correo}
                                onChangeText={(text) => handleChange('correo', text)}
                            />
                            <TextInput
                                style={styles.textData}
                                value={formData.telefono}
                                onChangeText={(text) => handleChange('telefono', text)}
                                keyboardType='numeric'
                            />
                            {/* <TextInput
                                style={styles.textData}
                                value={formData.municipio}
                                onChangeText={(text) => handleChange('municipio', text)}
                            /> */}
                            {/* <Text style={styles.textData}> {formData.municipio} </Text> */}
                            <RNPickerSelect 
                                style={pickerSelectStyles}
                                value={formData.municipio}
                                placeholder={{ label: 'Seleccione el municipio', value: null }}
                                placeholderTextColor="#000"
                                onValueChange={(value) => handleChange('municipio', value)}
                                items={municipios}
                            />
                            <TextInput
                                style={styles.textData}
                                value={formData.direccion}
                                onChangeText={(text) => handleChange('direccion', text)}
                            />
                            <TextInput
                                style={styles.textData}
                                value={formData.password}
                                onChangeText={(text) => handleChange('password', text)}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.textButon}> Editar </Text>
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
        height: 52,
        width: 200
    },
    textDataName: {
        fontSize: 20,
        marginBottom: 20
    },
    cardPlus: {
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
    },
    data: {
        width: 200
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000',
        height: 52,
        marginBottom: 5
    },
    inputAndroid: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        color: 'black',
        backgroundColor:"#F3F3F3",
        height: 52,
        marginBottom: 10
    },
});

export default ProfileUser
