import React from 'react';

import {View,ActivityIndicator,StyleSheet} from 'react-native'

export default function LoadingScreen(){

    return(

        <View style={styles.rootView}>
            <ActivityIndicator size={25} color="red"/>
        </View>

    )

}


const styles = StyleSheet.create({
    rootView:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})