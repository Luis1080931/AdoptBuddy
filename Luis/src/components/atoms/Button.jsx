import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const Button = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={props.press}
      >
        {props.style}
        <Text style={styles.texto}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: 200,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
},
  boton: {
    width: 220,
    height: "auto",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#E89551',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  texto: {
    color: '#001528',
    fontSize: 25,
    fontWeight: '500',
    textAlign: "center"
  }
});