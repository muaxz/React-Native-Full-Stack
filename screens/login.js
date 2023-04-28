import React,{useContext, useEffect, useState} from 'react';
import {View,ImageBackground,Text,StyleSheet,TextInput,Alert, Pressable} from 'react-native'
import IconButton from "../components/UI/iconButton"
import CustomInput from "../components/UI/TextInput"
import UserForm from "../components/Auth/form"
import {Context} from "../store/user_input_context"
import {LoginRequest} from "../api/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {useNavigation} from "@react-navigation/native"
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri} from 'expo-auth-session';
import axios from 'axios';
import {successLoginHandler} from "../util/user"
import {UserContext} from "../store/user_context"
import LoadingIndicator from "../components/UI/activityIndicator"


WebBrowser.maybeCompleteAuthSession();

export default function LoginRoot(){

    const {inputValues} = useContext(Context);
    const [isLoading,setIsLoading] = useState(false)
    const {setUserData,setIsLoggedIn,isLoggedIn} = useContext(UserContext);
    const [accessToken,setAccessToken] = useState();
    const navigation = useNavigation();
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        iosClientId: '948716760649-oa40abi6i236h4fr0cpia8735aqq7hmc.apps.googleusercontent.com',
        expoClientId:"948716760649-fuel47knnl06le8srhqcled3geosjfo7.apps.googleusercontent.com",
        webClientId:"948716760649-fuel47knnl06le8srhqcled3geosjfo7.apps.googleusercontent.com",
        redirectUri:"http://localhost:19000"
    });

    useEffect(()=>{
        console.log(makeRedirectUri({scheme:"socialapp"}))
        if(response?.type === "success"){
            setAccessToken(response.authentication.accessToken)
            console.log(response.authentication.accessToken)
            fetchUser(response.authentication.accessToken)
        }
    },[response])

    async function logInHandler(){


        if(inputValues.email.trim().length > 0 && inputValues.email.trim().length > 0){
            setIsLoading(true)
            const userData = await LoginRequest(inputValues,Alert)
            setIsLoading(false)
            if(userData === "Invalid") return;
            
            successLoginHandler({setIsLoggedIn,setUserData,userData,AsyncStorage,navigation})
    
            navigation.navigate("Home",{
                isFromLogin:true
            })
    
            return;
        }

        Alert.alert("Wrong password or email","Please fill out the fields properly")

    }

    async function fetchUser(token){
        const {data} = await axios.get("https://www.googleapis.com/userinfo/v2/me",{
            headers: {Authorization: `Bearer ${token}`}
        })

        console.log(data)
    }

    async function googleAuthHandler(){
        promptAsync({useProxy:false,showInRecents:true})
    }

    if(isLoading){
        return <LoadingIndicator />
    }

    return(
        <ImageBackground imageStyle={{opacity:0.8,resizeMode:"cover"}} source={require("../assets/lines.jpg")} style={styles.rootView}>
            <View>
                <Text style={styles.title}>Hello</Text>
            </View>
            <View style={styles.InputContainer}>
                <View style={styles.loginContainer}>
                    <UserForm isLoginScreen={true}/>
                    <View>
                        <Text style={{textAlign:"center",fontWeight:"600",color:"#fb6107",marginTop:30,marginBottom:20}}>Forget Password ?</Text>
                    </View>
                    <View style={styles.InputHolder}>
                        <IconButton onPress={logInHandler} iconType={"Ant"} IconConfig={{name:"login",color:"white",size:25}} title="Login" />
                    </View>
                    <View style={styles.orLineContainer}>
                        <View style={styles.orLine}/>
                        <View><Text style={{color:"white"}}>or</Text></View>
                        <View style={styles.orLine}></View>
                    </View>
                    <View style={styles.IconButtonHolder}>
                        <IconButton 
                        overrideStyle={{flexDirection:"row-reverse",width:160}} 
                        textOverrideStyle={{marginLeft:10}} 
                        title={"Google"} iconType={"Ant"} 
                        onPress={googleAuthHandler}
                        IconConfig={{name:"google",color:"white",size:25}}/>
                    </View>
                    <View style={{marginTop:20,alignItems:"center"}}>
                        <Text style={{textAlign:"center",color:"white"}}>Dont have an account ?</Text>
                        <Pressable>
                            <Text style={{marginTop:10,color:"#fb6107"}}>Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )

}


const styles = StyleSheet.create({
    rootView:{
        flex:1,
        paddingVertical:16,
    },
    loginContainer:{
        paddingHorizontal:20
    },
    InputContainer:{
        marginTop:60,
    },
    InputHolder:{
        marginTop:15,
    },
    input:{
        backgroundColor:"lightgrey",
        padding:16,
        fontSize:16,
        borderRadius:8
    },
    title:{
        fontSize:25,
        fontFamily:"Pattaya",
        textAlign:"center",
        top:20,
        color:"white"
    },
    orLine:{
        width:170,
        height:2,
        backgroundColor:"lightgrey",
    },
    orLineContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        marginTop:30
    },
    IconButtonHolder:{
        marginTop:20,
        flexDirection:"row",
        justifyContent:"space-around"
    }
})