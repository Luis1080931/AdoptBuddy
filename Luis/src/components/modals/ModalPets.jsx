import { View, Text, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import UserForm from '../pages/UserForm';
import PetForm from '../organims/PetForm';
import LinearGradient from 'react-native-linear-gradient';

const ModalPet = ({visible, onClose, title, datos, petData, petId}) => {
    const colors = {
        white: 'rgb(255, 255, 255)',
        teal: 'rgb(0, 128, 128)',
        tealGradient: ['rgb(255, 220, 200)', 'rgb(255,165,0)']
    };

    return (
        <Modal
            animationType="slide"
            onDismiss={() => console.log("hola modal")}
            onShow={() => console.log("hola mundo")}
            transparent
            visible={visible}
        >
            <View style={{
                flex:1,
                backgroundColor:'white',
                justifyContent:'center',
                alignItems:'center',
                marginTop: 50,
            }}>
                <LinearGradient
                    colors={colors.tealGradient}
                    style={{
                        height:680,
                        width: '98%',
                        borderRadius:5
                    }}
                >
                    <View
                        style={{
                            height:45,
                            width:"100%",
                            flexDirection:"row",
                            justifyContent:"flex-end",
                            alignItems:'center',
                        }}
                    >
                        <TouchableOpacity onPress={onClose}>
                            <Image
                                style={{
                                    margin:15,
                                    width:40,
                                    height:40,
                                    marginTop: 50,
                                    borderRadius: 100
                                }}
                                source={require('./../../../assets/iconClose.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View
                        style={{
                            margin: 12,
                        }}
                        >
                            <PetForm closeModal={onClose} title={title} datos={datos} petData={petData} petId={petId}/>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </View>
        </Modal>
    );
};

export default ModalPet;
