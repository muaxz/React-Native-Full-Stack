import React from 'react';

import {View,StyleSheet,TouchableOpacity,Text} from 'react-native'

export default function Button({title,onPress,overrideButton,overrideButtonText}){
    
    return(
        <TouchableOpacity style={[styles.button,overrideButton]} onPress={onPress}>
            <Text style={[styles.buttonText,overrideButtonText]}>{title}</Text>
        </TouchableOpacity>
    )

}


const styles = StyleSheet.create({
    button:{
        backgroundColor:"#5adbb5",
        padding:10,
        width:100,
        alignItems:"center",
        borderRadius:10
    },
    buttonText:{
        color:"white"
    }
})