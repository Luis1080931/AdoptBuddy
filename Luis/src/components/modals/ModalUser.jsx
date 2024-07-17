import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import UserForm from '../pages/UserForm';

const ModalUsuario = ({visible, onClose, title, data, userData, userId}) => {
    const colors = {
        white: 'rgb(255, 255, 255)',
        teal: 'rgb(0, 128, 128)',
        tealGradient: ['rgb(255, 255, 255)', 'rgb(20,40,60)']
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
                marginTop: 50
            }}>
                {/* <LinearGradient
                    colors={colors.tealGradient}
                    style={{
                        height:680,
                        width:350,
                        borderRadius:5
                    }}
                > */}
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
                                    width:50,
                                    height:50,
                                    resizeMode:'contain',
                                    marginTop: 50
                                }}
                                source={require('./../../../assets/iconClose.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        margin:12
                    }} >
                        <UserForm closeModal={onClose} title={title} data={data} userData={userData} userId={userId}/>
                    </View>
                {/* </LinearGradient> */}
            </View>
        </Modal>
    );
};

export default ModalUsuario;
