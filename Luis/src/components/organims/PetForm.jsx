import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axiosClient from '../services/axiosClient';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import { IP } from '../services/Ip';
import AuthContext from '../../context/AuthContext';

const PetForm = ({ onClose, title, datos, petData, petId }) => {
    const navigation = useNavigation();
    const [generos, setGeneros] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [idUser, setIdUser] = useState(null);

    const {setEstadoModal} = useContext(AuthContext)

    const [formData, setFormData] = useState({
        nombre: petData ? petData.nombre_mascota : '',
        fk_genero: petData ? petData.id_genero : '',
        fk_categoria: petData ? petData.id_categoria : '',
        esteril: petData ? petData.esteril : '',
        vacunas: petData ? petData.vacunas : '',
        habitos: petData ? petData.habitos : '',
        edad: petData ? petData.edad.toString() : '',
        image: petData ? petData.imagen : '',
        imageName: '',  
    });

    useEffect(() => {
        const fetchGenerosCategorias = async () => {
            try {
                const generosResponse = await axiosClient.get('/utils/generos');
                const categoriasResponse = await axiosClient.get('/utils/categorias');

                setGeneros(generosResponse.data.map(item => ({
                    label: item.nombre_genero,
                    value: item.id_genero 
                })));

                setCategorias(categoriasResponse.data.map(item => ({
                    label: item.nombre_categoria, 
                    value: item.id_categoria 
                })));
            } catch (error) {
                console.error('Error fetching generos and categorias:', error);
            }
        };

        const fetchUser = async () => {
            try {
                const userValue = await AsyncStorage.getItem('user');
                if (userValue !== null) {
                    const response = JSON.parse(userValue);
                    setIdUser(response.id);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchGenerosCategorias();
        fetchUser();
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
                const fileName = response.assets[0].fileName; 
                setFormData({ ...formData, image: source, imageName: fileName });
            }
        });
    };

    const validateForm = () => {
        const { nombre, fk_genero, fk_categoria, esteril, vacunas, habitos, edad, image, imageName  } = formData;
        if (!nombre || !fk_genero || !fk_categoria || !esteril || !vacunas || !habitos || !edad || !image || !imageName) {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {

        if (!validateForm()) return

        try {
            const data = new FormData();
            data.append('nombre', formData.nombre);
            data.append('fk_genero', formData.fk_genero);
            data.append('fk_categoria', formData.fk_categoria); 
            data.append('esteril', formData.esteril);
            data.append('vacunas', formData.vacunas);
            data.append('habitos', formData.habitos);
            data.append('edad', formData.edad);
            data.append('fk_dueno', idUser);

            if (formData.image && formData.image.uri) {
                data.append('image', {
                    uri: formData.image.uri,
                    type: 'image/jpeg',
                    name: formData.imageName,  // Usar el nombre del archivo original
                });
            }

            const response = await axiosClient.post('/mascotas/registrar', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 201) {
                Alert.alert('Mascota registrada correctamente');
                navigation.navigate('Bienvenido');
                datos();
                setEstadoModal(false)
            } else {
                Alert.alert('Error al registrar la mascota');
            }
        } catch (error) {
            console.log('Error en el servidor en la vista de registro', error);
        }
    };

    const handleActualizar = async () => {

        try {
            const data = new FormData();
            data.append('nombre', formData.nombre);
            data.append('fk_genero', formData.fk_genero);
            data.append('fk_categoria', formData.fk_categoria); 
            data.append('esteril', formData.esteril);
            data.append('vacunas', formData.vacunas);
            data.append('habitos', formData.habitos);
            data.append('edad', formData.edad);
            data.append('fk_dueno', idUser);

            if (formData.image && formData.image.uri) {
                data.append('image', {
                    uri: formData.image.uri,
                    type: 'image/jpeg',
                    name: formData.imageName,  
                });
            }

            const response = await axiosClient.put(`/mascotas/actualizar/${petId}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 201) {
                Alert.alert('Mascota actualizada correctamente');
                navigation.navigate('Bienvenido');
                datos();
                setEstadoModal(false)
                console.log('Datos actualizados', data);
                
            } else {
                Alert.alert('Error al actualizar la mascota');
            }
        } catch (error) {
            console.log('Error en el servidor en la vista de actualización' + error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.title}> {title} mascota </Text>
                {formData.image ? (
                    title === 'Registrar' ? (
                        <Image source={{ uri: formData.image.uri }} style={styles.image} />
                    ) : (
                        <Image source={{ uri: formData.image.uri ? formData.image.uri : `${IP}/img/${formData.image}` }} style={styles.image} />
                    )
                ) : (
                    <Text>No hay imágenes</Text>
                )}

                <View style={styles.containerInput}>
                    <Text style={styles.texts}>Nombre: </Text>
                    <TextInput style={styles.inputs} value={formData.nombre} onChangeText={(text) => handleChange('nombre', text)} />
                </View>
                <View style={styles.containerInput}>
                    <Text style={styles.texts}>Género: </Text>
                    <RNPickerSelect 
                        style={pickerSelectStyles}
                        value={formData.fk_genero}
                        placeholder={{ label: 'Seleccione el genero', value: null }}
                        placeholderTextColor="#000"
                        onValueChange={(value) => handleChange('fk_genero', value)}
                        items={generos}
                    />
                </View>
                <View style={styles.containerInput}>
                    <Text style={styles.texts}>Categoría: </Text>
                    <RNPickerSelect 
                        style={pickerSelectStyles}
                        value={formData.fk_categoria}
                        placeholder={{ label: 'Seleccione la categoria', value: null }}
                        placeholderTextColor="#000"
                        onValueChange={(value) => handleChange('fk_categoria', value)}
                        items={categorias}
                    />
                </View>
                <View style={styles.containerInput}>
                    <Text style={styles.texts}>Esterilización: </Text>
                    <RNPickerSelect 
                        style={pickerSelectStyles}
                        value={formData.esteril}
                        placeholder={{ label: 'Seleccione la esterilidad', value: null }}
                        placeholderTextColor="#000"
                        onValueChange={(value) => handleChange('esteril', value)}
                        items={[
                            { label: 'Sí', value: '1' },
                            { label: 'No', value: '2' }
                        ]}
                    />
                </View>
                <View style={styles.containerInput}>
                    <Text style={styles.texts}>Vacunas: </Text>
                    <TextInput style={styles.inputs} value={formData.vacunas} onChangeText={(text) => handleChange('vacunas', text)} />
                </View>
                <View style={styles.containerInput}>
                    <Text style={styles.texts}>Hábitos: </Text>
                    <TextInput style={styles.inputs} value={formData.habitos} onChangeText={(value) => handleChange('habitos', value)} />
                </View>
                <View style={styles.containerInput}>
                    <Text style={styles.texts}>Edad: </Text>
                    <TextInput style={styles.inputs} value={formData.edad} onChangeText={(value) => handleChange('edad', value)} />
                </View>
                <View style={styles.containerInput}>
                    <Text style={styles.texts}>Imagen de la mascota: </Text>
                    <TouchableOpacity onPress={handleImagePicker} style={styles.buttonImagePicker}>
                        <Text style={styles.textButton}>Seleccionar Imagen</Text>
                    </TouchableOpacity>
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
        margin: 20,
        color: 'black'
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000',
    },
    inputAndroid: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        color: 'black',
        backgroundColor:"#F3F3F3"
    },
});

export default PetForm;