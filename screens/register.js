import React,{useContext, useState} from 'react';

import {View,Text,StyleSheet,ImageBackground,ActivityIndicator,Alert} from 'react-native'
import UserForm from "../components/Auth/form"
import IconButton from "../components/UI/iconButton"
import {Context} from "../store/user_input_context"
import {SignUpRequest} from "../api/auth"
import {verifyUserInput} from "../util/user"
import {useNavigation} from "@react-navigation/native"
import {successLoginHandler} from "../util/user"
import {UserContext} from "../store/user_context"
import AsyncStorage from "@react-native-async-storage/async-storage"



export default function RegisterRoot(){

    const {inputValues} = useContext(Context);
    const {setUserData,setIsLoggedIn,userData} = useContext(UserContext);
    const [isInProgress,setIsInProgress] = useState(false)
    const navigation = useNavigation();

    async function signUpHandler(){

        const isInputsValid = verifyUserInput(inputValues)
        
        if(isInputsValid){
            
            setIsInProgress(true);

            const userData = await SignUpRequest(inputValues);

            if(userData === "email-exist"){
                setIsInProgress(false)
                return Alert.alert("Invalid field","This email already exist")
            }

            successLoginHandler({setIsLoggedIn,setUserData,userData,AsyncStorage,navigation})

            navigation.goBack();
            navigation.navigate("Home",{
                isFromLogin:true
            })         

            setIsInProgress(false);

        }else{
            Alert.alert("Invalid Field","Please fill out the fields properly")
        }
    }

    let registerContent = (<>
        <UserForm isLoginScreen={false}/>
        <IconButton 
         onPress={signUpHandler}
         iconType="ionic"
         IconConfig={{name:"person",color:"white",size:25}}
         title={"Sign Up"}
         overrideStyle={{marginTop:20}}/>
     </>)

     if(isInProgress){
        registerContent = (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="white"/>
            </View>
        )
    }

    return(

        <ImageBackground source={require("../assets/signup.jpg")} style={styles.rootView}>
            {registerContent}
       </ImageBackground>

    )

}



const styles = StyleSheet.create({
    rootView:{
        flex:1,
        padding:20
    },
    loadingContainer:{
        flex:1,
        justifyContent:"flex-start",
        paddingTop:70,
        alignItems:"center"
    }
})