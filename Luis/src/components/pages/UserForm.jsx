import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axiosClient from '../services/axiosClient';
import { SelectList } from 'react-native-dropdown-select-list';
import { launchImageLibrary } from 'react-native-image-picker';

const UserForm = ({ closeModal, title, datos, userData, userId }) => {

    /* const route = useRoute();
    const { mode } = route.params; */
    const navigation = useNavigation();
 
    const [formData, setFormData] = useState({
        identificacion: userData ? userData.identificacion.toString() : '',
        nombre: userData ? userData.nombre : '',
        correo: userData ? userData.correo : '',
        telefono: userData ? userData.telefono : '',
        municipio: userData ? userData.municipio : '',
        direccion: userData ? userData.direccion : '',
        password: userData ? userData.password :'',
        image: userData ? userData.image : null,
    });

    const [municipios, setMunicipios] = useState([]);

    useEffect(() => {
        axiosClient.get('/users/muni').then((response) => {
            console.log(response.data);
            let atemp = response.data.map((item) => {
                return {key: item.id_municipio, value: item.nombre_municipio};
            });
            setMunicipios(atemp);
        });
    }, []);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImagePicker = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const source = { uri: response.assets[0].uri };
                setFormData({ ...formData, image: source });
            }
        });
    };

    const handleSubmit = async () => {
        try {
            const data = new FormData();
            data.append('identificacion', formData.identificacion);
            data.append('nombre', formData.nombre);
            data.append('correo', formData.correo);
            data.append('telefono', formData.telefono);
            data.append('municipio', formData.municipio);
            data.append('direccion', formData.direccion);
            data.append('password', formData.password);

            if (formData.image) {
                data.append('image', {
                    uri: formData.image.uri,
                    type: 'image/jpeg',
                    name: 'profile.jpg',
                });
            }
            
            await axiosClient.post('/users/registrar', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((response) => {
                if(response.status == 201){
                    Alert.alert('Usuario registrado correctamente');
                    navigation.navigate('Login');
                    datos()
                    closeModal()
                }else{
                    Alert.alert('Error al registrar el usuario');
                }
            });
        } catch (error) {
            console.log('Error en el servidor en la vista de registro', error);
        }
    };

    const handleActualizar = async () => {
        try {

            const data = new FormData();
            data.append('identificacion', formData.identificacion);
            data.append('nombre', formData.nombre);
            data.append('correo', formData.correo);
            data.append('telefono', formData.telefono);
            data.append('municipio', formData.municipio);
            data.append('direccion', formData.direccion);
            data.append('password', formData.password);

            if (formData.image) {
                data.append('image', {
                    uri: formData.image.uri,
                    type: 'image/jpeg',
                    name: 'profile.jpg',
                });
            }

            await axiosClient.put(`/users/actualizar/${userId}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((response) => {
                if(response.status == 201){
                    Alert.alert('Usuario registrado correctamente');
                    navigation.navigate('Login');
                    datos()
                    closeModal()
                }else{
                    Alert.alert('Error al registrar el usuario');
                }
            });
        } catch (error) {
            
        }
    }

    return (
        
            <View style={styles.container}>
                <Text style={styles.texts}> Bienvenido, registrate y se uno de los muchos usuarios que cambian la vida de estas mascotas </Text>
                <View>
                    <Text style={styles.title}> {title} Usuario </Text>
                    <View style={styles.containerInput}>
                        <Text style={styles.texts}>Identificación: </Text>
                        <TextInput style={styles.inputs} value={formData.identificacion} onChangeText={(value) => handleChange('identificacion', value)} />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.texts}>Nombre: </Text>
                        <TextInput style={styles.inputs} value={formData.nombre} onChangeText={(value) => handleChange('nombre', value)} />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.texts}>Correo electrónico: </Text>
                        <TextInput style={styles.inputs} value={formData.correo} onChangeText={(value) => handleChange('correo', value)} />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.texts}>Teléfono: </Text>
                        <TextInput style={styles.inputs} value={formData.telefono} onChangeText={(value) => handleChange('telefono', value)} />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.texts}>Municipio: </Text>
                        <SelectList 
                            setSelected={(value) => handleChange('municipio', value)}
                            data={municipios}
                            defaultOption={{ key: formData.municipio, value: municipios.find(m => m.key === formData.municipio)?.value }}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.texts}>Dirección: </Text>
                        <TextInput style={styles.inputs} value={formData.direccion} onChangeText={(value) => handleChange('direccion', value)} />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.texts}>Contraseña: </Text>
                        <TextInput style={styles.inputs} value={formData.password} onChangeText={(value) => handleChange('password', value)} secureTextEntry={true} />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.texts}>Imagen de perfil: </Text>
                        <TouchableOpacity onPress={handleImagePicker} style={styles.buttonImagePicker}>
                            <Text style={styles.textButton}>Seleccionar Imagen</Text>
                        </TouchableOpacity>
                        {formData.image && <Image source={formData.image} style={styles.image} />}
                    </View>
                    <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.button} onPress={title === 'Registrar' ? handleSubmit : handleActualizar}>
                            <Text style={styles.textButton}> {title} </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        textAlign: 'center'
    },
    containerInput: {
        width: 300,
        marginBottom: 10
    },
    inputs: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        color: '#333',
        padding: 10
    },
    texts: {
        fontSize: 20,
        margin: 5,
        fontWeight: '600'
    },
    title: {
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        margin: 20
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        color: 'black'
    },
    buttonImagePicker: {
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
    textButton: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000'
    },
    containerButton: {
        width: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10
    }
});

export default UserForm;
