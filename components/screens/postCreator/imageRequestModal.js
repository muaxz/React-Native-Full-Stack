import React from 'react';

import {View,Modal,StyleSheet,Text} from 'react-native'
import IconButton from "../../UI/iconButton"
import Button from "../../UI/Button"

export default function ImageRequestModal({visible,continueHandler,uploadHandler}){

    return(
        <Modal 
         visible={visible}
         transparent 
         animationType='slide' 
         style={styles.modal}>
          <View style={styles.rootView}>
             <View style={styles.centeredContainer}>
                 <IconButton
                    overrideStyle={{marginRight:10,backgroundColor:"#3cdbd3"}}
                    textOverrideStyle={{marginRight:0}}
                    IconConfig={{
                        name:"images",
                        size:28,
                        color:"white"
                    }}
                    iconType="Ent"
                  />
                  <Text style={styles.uploadText}>Upload a title image (optional)</Text>
                  <View style={styles.buttonContainer}>
                    <Button 
                    onPress={uploadHandler}
                    title="Upload"/>
                    <Button 
                    onPress={continueHandler}
                    title="Continue"/>
                  </View>
             </View>
          </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    modal:{
        backgroundColor:"red",
    },
    rootView:{
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        alignItems:"center",
        justifyContent:"center",
        flex:1
    },
    centeredContainer:{
        backgroundColor:"white",
        width:300,
        height:200,
        borderRadius:8,
        justifyContent:"space-around",
        shadowColor:"black",
        shadowOpacity:0.5,
        shadowRadius:5,
        padding:10
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent:"space-around"
    },
    uploadText:{
        textAlign:"center",
        fontSize:18,
    }
})