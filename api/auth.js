import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,AuthErrorCodes} from "firebase/auth"


const API_KEY = "AIzaSyDRJYqiyKWEWm0Uf9lGf2oLaBIEmXLqtps"
axios.defaults.baseURL = "http://192.168.2.18:3000/"

const auth = getAuth();

export async function SignUpRequest({email,password,fullName}){

    try {
        
        const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
        //yukarida zaten checkliyoruz asagidaki uniqe email olacak
        const {data} = await axios.post(`/user/createUser`,{
            fullName:fullName,
            profileImage:"",
            email:email,
        })
        
        const returnData = {...userCredentials,userData:{
            fullName,
            profileImageUrl:"",
            _id:data.userId
        }}

    
        return returnData;

    } catch (e){

        if(e.code === "auth/email-already-in-use"){
            return "email-exist"
        }
    }
  
}

export async function LoginRequest({email,password},Alert){

    try {
        
        const userCredentials = await signInWithEmailAndPassword(auth,email,password)
        
        const {data} = await axios.get(`/user/Login/${email}`)

        const returnData = {...userCredentials,userData:{
            fullName:data.fullName,
            _id:data._id,
            profileImage:data.profileImage
        }}
    
        return returnData;

    } catch (e){

        if(e.code === "auth/wrong-password"){
            Alert.alert("wrong password or email","Please fill out the fields properly")
            return "Invalid"
        }
    }
 
}

export async function Logout(){
    AsyncStorage.removeItem("idToken")
    AsyncStorage.removeItem("refreshToken")
    AsyncStorage.removeItem("userId")
}
