import React,{useEffect, useLayoutEffect,useRef, useState, useContext} from 'react';

import {View,StyleSheet,Text,Button,KeyboardAvoidingView,Image,TextInput} from 'react-native'
import {useHeaderHeight} from "@react-navigation/elements"
import {PermissionStatus,launchImageLibraryAsync,useMediaLibraryPermissions,MediaTypeOptions} from "expo-image-picker"
import IconButton from "../components/UI/iconButton"
import {createPosts} from "../api/content"
import ActivityLoading from "../components/UI/activityIndicator"
import firebase from "../util/firebaseConfig"
import {ref,getStorage,uploadBytes,getDownloadURL} from "firebase/storage"
import {getAuth,getIdToken} from "firebase/auth"
import { Alert } from 'react-native';
import ImageRequestModal from "../components/screens/postCreator/imageRequestModal"
import {UserContext} from "../store/user_context"
import {v4} from "uuid"

export default function PostCreator({navigation}){

    const richText = useRef()
    const [isLoading,setIsLoading] = useState(false)
    const {userData} = useContext(UserContext)
    const [modalIsVisible,setModalIsVisible] = useState(false);
    const [contentValues,setContentValues] = useState({
        text:"",
        titleImage:""
    });
    const headerHeight = useHeaderHeight();
    const [cameraPermissionInformation,requestPermission] = useMediaLibraryPermissions();

    richText.current?.focus()
    
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

        setModalIsVisible(false)

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
            
            const imageUri = image.assets[0].uri
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const storage = getStorage()    
            const refObject = ref(storage,v4())
            await uploadBytes(refObject,blob)
            const downlandUrl = await getDownloadURL(refObject);
            setContentValues((prev)=>({...prev,titleImage:downlandUrl}))

        } catch (error) {

        }
      
    }

    async function publishPostHandler(){

        setModalIsVisible(false)
        
        try {

            const isValid = contentValues.text.trim().length < 30

            if(isValid){
                Alert.alert("Invalid Input","Your content at least should be at length of 30 character")
                return;
            }

            setIsLoading(true)
            await createPosts({...contentValues,creator:userData._id})
            navigation.goBack();
            

        } catch (error) {

            console.log(error)
        }
       
    }

    function inputChangeHandler(valueKey,value){
           
         setContentValues(prev=>({...prev,[valueKey]:value}))
    }

    useLayoutEffect(()=>{
          navigation.setOptions({
            headerLeft:()=>{
                return (
                <Button 
                   onPress={()=>navigation.goBack()}    
                   title="Cancel"
                />)
            },
            headerRight:()=>{
                return (
                    <View style={styles.rightButtonContainer}>
                         <IconButton
                            onPress={selectImageHandler}
                            overrideStyle={{marginRight:10,backgroundColor:"#3cdbd3"}}
                            textOverrideStyle={{marginRight:0}}
                            IconConfig={{
                                name:"images",
                                size:28,
                                color:"white"
                            }}
                            iconType="Ent"
                        />
                        <IconButton
                            onPress={()=>setModalIsVisible(true)}
                            overrideStyle={{paddingHorizontal:20}}
                            title="share"
                            textOverrideStyle={{marginRight:0,fontSize:17}}
                        />
                    </View>
                )
            }
          })
    },[contentValues])

    if(isLoading){
        return <ActivityLoading/>
    }

    return(
        <View style={{flex:1}}>
           <KeyboardAvoidingView keyboardVerticalOffset={headerHeight} behavior='padding' style={styles.rootView}>
                    {contentValues.titleImage && (<Image style={{height:200}} source={{uri:contentValues.titleImage}}/>)}
                    <View style={{flex:1}}>
                        <TextInput
                            onChangeText={(e)=>inputChangeHandler("text",e)}
                            ref={(ref)=>richText.current = ref}
                            style={styles.contentInput}
                            placeholder='Write Something...'
                            multiline
                            value={contentValues.text}
                        />
                    </View>
                    <ImageRequestModal 
                     continueHandler={publishPostHandler}
                     uploadHandler={selectImageHandler}    
                     visible={modalIsVisible}/>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    rootView:{  
        flex:1,
    },  
    contentInput:{
        backgroundColor:"white",
        height:"100%",
        padding:10,
        paddingTop:10,
        fontSize:22
    },
    rightButtonContainer:{
        flexDirection:"row"
    }
})