import React from 'react';

import {View,StyleSheet,TouchableHighlight,Text} from 'react-native'
import {AntDesign,Ionicons,FontAwesome5,MaterialIcons,SimpleLineIcons,Entypo} from "@expo/vector-icons"

export default function Button({title,onPress,IconConfig,iconType,overrideStyle,textOverrideStyle}){

    let Icon = null;

    if(iconType === "Ant"){
        Icon = <AntDesign {...IconConfig}/>
    }else if(iconType === "ionic"){
        Icon = <Ionicons  {...IconConfig}/>
    }else if(iconType === "Awesome"){
        Icon = <FontAwesome5 {...IconConfig}/>
    }else if(iconType === "Meta"){
        Icon = <MaterialIcons {...IconConfig}/>
    }else if(iconType === "Simple"){
        Icon = <SimpleLineIcons {...IconConfig}/>
    }else if(iconType === "Ent"){
        Icon = <Entypo {...IconConfig}/>
    }   
    
    return(
        <TouchableHighlight hitSlop={{top:30,right:30,bottom:30,left:30}} underlayColor="lightgrey" style={[styles.button,overrideStyle]} onPress={onPress}>
            <>   
              <Text style={[styles.buttonText,textOverrideStyle]}>{title}</Text>
              {Icon}
            </>
        </TouchableHighlight>
    )

}


const styles = StyleSheet.create({
    button:{
        flexDirection:"row",
        backgroundColor:"#fb6107",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:25,
        padding:8
    },
    buttonText:{
        fontSize:23,
        color:"white",
        marginRight:10
    }
})