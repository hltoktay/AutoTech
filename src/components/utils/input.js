import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
    TextInput
} from 'react-native';


const input = (props) => {
    let template = null;
    switch(props.type){
        case 'textinput':
       return tempalate = 
        <TextInput
            underlineColorAndroid="transparent"
            {...props}
            style={[styles.input, props.overRideStyle]}
        />
            break;
        default: 
   
    }
     return  template;
} 

const styles = StyleSheet.create({
    input: {
         width: '80%',
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 15,
        fontSize: 16,
        padding: 7,
        marginTop: 10,
        color: '#2d2d2d'
    }
  });

export default input;