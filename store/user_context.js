import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{createContext,useState,useEffect} from 'react';
import {View} from 'react-native'
import {getUserContext, getUserProfile} from "../api/user"
import jwtDecode from "jwt-decode";
import * as SplashScreen from 'expo-splash-screen';
import {useNavigation} from "@react-navigation/native"


export const UserContext = createContext();

//SplashScreen.preventAutoHideAsync();
//finish

export default function UserContextRoot({children}){

    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [userData,setUserData] = useState({})
    const navigation = useNavigation();

    useEffect(()=>{    

        async function userStateHandler(){

           const idToken = await AsyncStorage.getItem("idToken")
           
           if(idToken){
            
               const user_id = await AsyncStorage.getItem("userId") 
    
               const {profileImage,fullName,_id} = await getUserProfile(user_id,idToken);
            
               setUserData({
                 profileImage,
                 fullName,
                 _id:_id
               });

               setIsLoggedIn(true);
               navigation.navigate("Home",{
                isFromLogin:true
               })
           }
           

           SplashScreen.hideAsync()
        }

        userStateHandler();
   
    },[])

    return(

        <UserContext.Provider 
            value={{
                setIsLoggedIn,
                setUserData,
                userData,
                isLoggedIn
            }}
        >
            {children}
        </UserContext.Provider>
    )

}