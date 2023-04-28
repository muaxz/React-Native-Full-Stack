import React,{useContext, useLayoutEffect, useState} from 'react';

import {UserContext} from "../store/user_context"
import {View,Text,TextInput,Image,StyleSheet,ImageBackground,Button, Pressable} from 'react-native'
import IconButton from "../components/UI/iconButton"
import {useNavigation} from "@react-navigation/native"
import {useMediaLibraryPermissions,launchImageLibraryAsync,MediaTypeOptions,PermissionStatus} from "expo-image-picker"
import {updateUserProfile} from "../api/user"
import LoadingIndicator from "../components/UI/activityIndicator"
import firebase from "../util/firebaseConfig"
import {ref,getStorage,uploadBytes,getDownloadURL} from "firebase/storage"
import 'react-native-get-random-values';
import {v4} from "uuid"
import {manipulateAsync,FlipType,SaveFormat} from "expo-image-manipulator"


export default function EditProfile(){

    const {userData,setUserData} = useContext(UserContext)
    const navigation = useNavigation()
    const [isLoading,setIsLoading] = useState(false)
    const [selectedImgeUrl,setSelectedImageUrl] = useState(null)
    const [newName,setNewName] = useState(null)
    
    const [cameraPermissionInformation,requestPermission] = useMediaLibraryPermissions();
    
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerLeft:()=>{
                return (
                    <Button 
                      onPress={()=>{navigation.goBack()}}
                      title='Cancel'
                    />)
            },
            headerRight:()=>{
                return (
                <Button 
                    onPress={saveUserProfile}
                    title='Save'
                />)
            }
        })
    },[newName,selectedImgeUrl])

    async function saveUserProfile(){
        
        try {

            setIsLoading(true);
         
            const manipResult = await manipulateAsync(
                selectedImgeUrl,
                [{resize:{width:300}}],
                { compress: 0.5, format: SaveFormat.PNG}
            );

            if(selectedImgeUrl){
    
                const imageUri = manipResult.uri
                const response = await fetch(imageUri);
                const blob = await response.blob();
                const storage = getStorage()    
                const refObject = ref(storage,v4())
                await uploadBytes(refObject,blob)
                var downlandUrl = await getDownloadURL(refObject);
            }

        
            const currentNameData = newName ?? userData.fullName
            const currentImageData = selectedImgeUrl ? downlandUrl : userData.profileImage
    
            await updateUserProfile(userData._id,{
                fullName:currentNameData,
                profileImage:currentImageData
            })
    
            setUserData((prev)=>({...prev,fullName:currentNameData,profileImage:currentImageData}))
            navigation.goBack()

        } catch (error){
            console.log(error)
        }
       
    }
    
    async function verifyPermission(){

        if(cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED){

            const permissionRequest = await requestPermission()

            return permissionRequest.granted;

        }else if(cameraPermissionInformation?.status === PermissionStatus.DENIED){

            Alert.alert("Permission Denied","You need to grant the permission to use this feature")

            return false;
        }   

        return true;
    }

    async function selectImageHandler(){
     
        try {

            const isAllowed = await verifyPermission();

            if(!isAllowed){
                return;
            }
    
            const image = await launchImageLibraryAsync({
                mediaTypes: MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [2, 1],
                quality: 1,
            })
            

            setSelectedImageUrl(image.assets[0].uri)

        } catch (error) {

        }
      
    }

    
    var ppImageSource = userData.profileImage?.length ? {uri:userData.profileImage} : require("../assets/signup.jpg")

    if(selectedImgeUrl){
        ppImageSource = {uri:selectedImgeUrl};
    }

    if(isLoading){
        return <LoadingIndicator/>
    }

    return(
        <View style={styles.rootView}>
            <Pressable onPress={selectImageHandler} style={styles.userInfoContainer}>
                 <ImageBackground  imageStyle={{opacity:0.8,resizeMode:"cover"}} source={ppImageSource} style={styles.userImageContainer}>
                    <IconButton
                        overrideStyle={styles.overrideStyle}
                        iconType={"Awesome"}
                        IconConfig={{
                            name:"camera",
                            size:25,
                            color:"white"
                        }}
                    />
                 </ImageBackground>
             </Pressable>
             <View style={styles.inputContainer}>
                <TextInput
                   onChangeText={(e)=>setNewName(e)} 
                   style={styles.input} 
                   value={newName ?? userData.fullName}
                />
             </View>
        </View>
    )

}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        padding:20
    },
    userInfoContainer:{
        alignItems:"center",
        paddingVertical:20
    },
    userContentContainer:{
        flex:1
    },
    userImageContainer:{
        position:"relative",
        width:150,
        height:150,
        borderRadius:"100%",
        overflow:"hidden"
    },
    userImage:{
        width:"100%",
        height:"100%"
    },
    textName:{
        fontSize:25,
        marginTop:20,
        fontWeight:"400"
    },
    editButtonContainer:{
        alignItems:"flex-end",
        marginTop:10,
        paddingHorizontal:15
    },
    overrideStyle:{
        position:"absolute",
        top:10,
        zIndex:1,
        left:"35%",
        top:"35%",
        backgroundColor:"transparent",
    },
    input:{
        fontSize:20,
        padding:10,
        borderBottomWidth:1
    },
    inputContainer:{
        marginTop:20
    }
})