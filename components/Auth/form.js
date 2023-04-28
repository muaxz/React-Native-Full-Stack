import React, { useState, useContext} from 'react';

import {View} from 'react-native'
import TextInput from "../UI/TextInput"
import {Context} from "../../store/user_input_context"
//
export default function UserForm({isLoginScreen}){

    const {inputChangeHandler,inputValues} = useContext(Context);


    return(
        <View>
            <TextInput 
                onChange={(e)=>inputChangeHandler("email",e)}
                value={inputValues.email}
                placeHolder="Email" 
            />
            <TextInput 
                secureTextEntry={true}
                onChange={(e)=>inputChangeHandler("password",e)} 
                value={inputValues.password}
                placeHolder='Password'
            />
            {!isLoginScreen && 
            (<>
               <TextInput 
                    onChange={(e)=>inputChangeHandler("confirmPassword",e)} 
                    value={inputValues.confirmPassword}
                    placeHolder='Confirm Password'
                    secureTextEntry={true}
                />
                <TextInput 
                    onChange={(e)=>inputChangeHandler("fullName",e)} 
                    value={inputValues.fullName}
                    placeHolder='Name'
                />
            </>)}
        </View>

    )

}