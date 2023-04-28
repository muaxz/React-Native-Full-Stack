import React from 'react';

import {View,StyleSheet,Text} from 'react-native'
import {DrawerContentScrollView,DrawerItemList,DrawerItem} from "@react-navigation/drawer"
import {useNavigation} from "@react-navigation/native"
import {screens} from "../../constants/screenNames"
import {FontAwesome,MaterialIcons} from "@expo/vector-icons"


export default function CustomDrawer(props){

    const {navigation} = props

    return(
      <View style={styles.rootView}>
        <DrawerContentScrollView contentContainerStyle={{flex:1}} style={styles.rootView} {...props}>
           <DrawerItemList {...props} />
           <DrawerItem
            labelStyle={{fontSize:22}}
            icon={()=>(<FontAwesome name='user' size={22} color="black"/>)}
            label={"Profile"}
            onPress={()=>{navigation.navigate(screens.USER_PROFILE)}} 
           />
           <DrawerItem
            style={{marginTop:"auto",backgroundColor:"lightgrey",marginBottom:50}}
            labelStyle={{fontSize:22}}
            icon={()=>(<MaterialIcons name='logout' size={22} color="black"/>)}
            label={"Logout"}
            onPress={()=>{navigation.navigate(screens.USER_PROFILE)}} 
           />
        </DrawerContentScrollView>
      </View>
    )

}


const styles = StyleSheet.create({
   rootView:{
     flex:1,
   }
})