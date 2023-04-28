import AsyncStorage from '@react-native-async-storage/async-storage';
import * as EmailValidator from 'email-validator';

export function verifyUserInput(inputValues){
    for (const key in inputValues) {

        const valueTrim = inputValues[key].trim();

        if(valueTrim.length === 0){
            return false;
        }else{
            if(key === "password" && valueTrim.length < 6){
                return false;
            }else if(key === "email" && !EmailValidator.validate(valueTrim)){
                return false;
            }//else if(key === "confirmPassword" && valueTrim !== inputValues["password"].trim()){
                //return false;
            //}
        }
    }

    return true;
}

export function successLoginHandler({navigation,setIsLoggedIn,setUserData,userData,AsyncStorage}){
   
    setUserData(userData.userData)
    setIsLoggedIn(true)

    AsyncStorage.setItem("idToken",userData._tokenResponse.idToken)
    AsyncStorage.setItem("refreshToken",userData._tokenResponse.refreshToken)
    AsyncStorage.setItem("userId",userData.userData._id)
}

export function logoutHandler(){
    AsyncStorage.removeItem("idToken")
    AsyncStorage.removeItem("refreshToken")
    AsyncStorage.removeItem("userId")
}