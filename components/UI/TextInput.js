import React,{useState} from 'react';

import {View,TextInput,StyleSheet,Text} from 'react-native'
import {Ionicons} from "@expo/vector-icons"
import IconButton from "./iconButton"

export default function CustomInput({placeHolder,onChange,overrideInputHolderStyle,overrideInputStyle,value,label,labelOverrideStyle,secureTextEntry}){

    const [canSee,setCanSee] = useState(false);

    return(
        <View style={[styles.InputHolder,overrideInputHolderStyle]}>
            <Text style={[styles.label,labelOverrideStyle]}>{label}</Text>
            <TextInput 
                secureTextEntry={secureTextEntry ? !canSee : false}
                value={value} 
                placeholderTextColor="#474A56"  
                onChangeText={onChange} 
                placeholder={placeHolder} 
                style={[styles.input,overrideInputStyle]}
            />
            {secureTextEntry && 
            (<IconButton
                onPress={()=>setCanSee(!canSee)}
                overrideStyle={{position:"absolute",right:5,top:30,backgroundColor:"transparent"}}
                iconType={"Ent"}
                IconConfig={{
                    name:canSee ? "eye" : "eye-with-line",
                    size:25,
                    color:"black",
                }}
            />)}
        </View>
    )

}

const styles = StyleSheet.create({
    InputHolder:{
        marginTop:15,
    },
    input:{
        backgroundColor:"lightgrey",
        padding:16,
        fontSize:16,
        borderRadius:8
    },
    label:{
        fontSize:25,
        marginBottom:10,
    }
})