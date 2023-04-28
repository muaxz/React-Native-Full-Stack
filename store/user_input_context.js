import React,{createContext,useState} from 'react';
import {View} from 'react-native'

export const Context = createContext();


const defaultValues = {
    fullName:"",
    email:"",
    password:"",
    confirmPassword:""
}

export default function UserInputContext({children}){

    const [inputValues,setInputValues] = useState(defaultValues)

    function inputChangeHandler(type,value){
       
        setInputValues(prev=>({...prev,[type]:value}))
    }


    return(

        <Context.Provider 
            value={{
                inputChangeHandler,
                inputValues
            }}
        >
            {children}
        </Context.Provider>
    )

}