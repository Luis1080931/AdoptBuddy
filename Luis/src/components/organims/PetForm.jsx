import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axiosClient from '../services/axiosClient';
import { SelectList } from 'react-native-dropdown-select-list';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PetForm = ({ closeModal, title, datos, petData, petId }) => {

    /* const route = useRoute();
    const { mode } = route.params; */
    const navigation = useNavigation();
    const [generos, setGeneros] = useState([])
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        axiosClient.get('/utils/generos').then((response) => {
            console.log(response.data);
            let atemp = response.data.map((item) => {
                return {key: item.id, value: item.nombre_genero};
            });
            setGeneros(atemp);
        });

        axiosClient.get('/utils/categorias').then((response) => {
            console.log(response.data);
            let atemp = response.data.map((item) => {
                return {key: item.id, value: item.nombre_categoria};
            });
            setCategorias(atemp);
        })
    }, []);
 
    const [formData, setFormData] = useState({
        nombre: petData ? petData.nombre_mascota : '',
        fk_genero: petData ? petData.genero : '',
        fk_categoria: petData ? petData.categoria : '',
        esteril: petData ? petData.esteril : '',
        vacunas: petData ? petData.vacunas : '',
        habitos: petData ? petData.habitos : '',
        ezdad: petData ? petData.edad : '',
        image: petData ? petData.image : null,
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {

        const fetchUser = async () => {
          const userValue = await AsyncStorage.getItem('user')
          if(userValue !== null){
            const response = JSON.parse(userValue)
            idUser = response.id
          }
          console.log('User async', idUser);
        }
        fetchUser()
      }, [])

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
            data.append('nombre', formData.nombre);
            data.append('fk_genero', formData.fk_genero);
            data.append('fk_categoria', formData.fk_categoria); 
            data.append('esteril', formData.esteril);
            data.append('vacunas', formData.vacunas);
            data.append('habitos', formData.habitos);
            data.append('edad', formData.edad);
            data.append('fk_dueno', idUser);

            if (formData.image) {
                data.append('image', {
                    uri: formData.image.uri,
                    type: 'image/jpeg',
                    name: 'profile.jpg',
                });
            }
            
            await axiosClient.post('/mascotas/registrar', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((response) => {
                if(response.status == 201){
                    Alert.alert('Mascota registrada correctamente');
                    navigation.navigate('Pets');
                    datos()
                    closeModal()
                }else{
                    Alert.alert('Error al registrar la mascota');
                }
            });
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

            if (formData.image) {
                data.append('image', {
                    uri: formData.image.uri,
                    type: 'image/jpeg',
                    name: 'profile.jpg',
                });
            }

            await axiosClient.put(`/mascotas/actualizar/${petId}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((response) => {
                if(response.status == 201){
                    Alert.alert('Mascota actualizada correctamente');
                    navigation.navigate('Pets');
                    datos()
                    closeModal()
                }else{
                    Alert.alert('Error al actualizar la mascota');
                }
            });
        } catch (error) {
            
        }
    }

    const dataSelect = [
        {key: 'si', value: 'si'},
        {key: 'no', value: 'no'}
    ]

    return (
        /* <ScrollView style={{ width: 300 }}> */
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}> {title} mascota </Text>
                    <View style={styles.containerInput}>
                        <Text style={styles.texts}>Nombre: </Text>
                        <TextInput style={styles.inputs} value={formData.nombre} onChangeText={(text) => handleChange('nombre', text)} />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.texts}>Genero: </Text>
                        <SelectList 
                            setSelected={(value) => handleChange('fk_genero', value)}
                            data={generos}
                            defaultOption={{ key: formData.fk_genero, value: generos.find(m => m.key === formData.fk_genero)?.value }}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.texts}>Categoria: </Text>
                        <SelectList 
                            setSelected={(value) => handleChange('fk_categoria', value)}
                            data={categorias}
                            defaultOption={{ key: formData.fk_categoria, value: categorias.find(m => m.key === formData.fk_categoria)?.value }}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.texts}>Esterilidad: </Text>
                        <SelectList 
                            setSelected={(value) => handleChange('esteril', value)}
                            data={dataSelect}
                            save='key'
                            defaultOption={{ key: formData.esteril, value: dataSelect.find(m => m.key === formData.esteril)?.value }}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.texts}>Vacunas: </Text>
                        <TextInput style={styles.inputs} value={formData.vacunas} onChangeText={(text) => handleChange('vacunas', text)} />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.texts}>Habitos: </Text>
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
                        {formData.image && <Image source={formData.image} style={styles.image} />}
                    </View>
                    <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.button} onPress={title === 'Registrar' ? handleSubmit : handleActualizar}>
                            <Text style={styles.textButton}> {title} </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        /* </ScrollView> */
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

export default PetForm;
