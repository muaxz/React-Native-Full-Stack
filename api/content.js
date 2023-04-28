import { async } from "@firebase/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


axios.defaults.baseURL = "http://192.168.2.18:3000/"

axios.interceptors.request.use(async function (config) {

    const idToken = await AsyncStorage.getItem("idToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken")

    config.headers = {
        Authorization : idToken,
        refreshToken: refreshToken
    }

    return config;

  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


axios.interceptors.response.use(async function (response) {
    const headers = response.headers;
    console.log(headers)
    if(headers.idtoken){
        await AsyncStorage.setItem("idToken",headers.idtoken)
    }
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export async function getPosts(){
    
    try {

        const {data} = await axios.get("/content/getPosts")
        
        return data;

    } catch (error) {
        console.log(error)
    }

}

export async function getUserPosts(userId){
    
    try {

        const {data} = await axios.get(`/content/getUserPosts/${userId}`)
    
        return data;

    } catch (error) {
        console.log(error)
    }

}

export async function createPosts({text,titleImage,creator}){

    try {

        const {data} = await axios.post("/content/createPost",{
            text,
            titleImage,
            creator
        })

    } catch (error) {
        
        console.log(error)
    }

}

export async function getSinglePost(postId){
    
    try {

        const {data} = await axios.get(`/content/getSinglePost/${postId}`)
        console.log(data)
        return data;

    } catch (error) {
        console.log(error)
    }
}

export async function deletePost(postId){

    try {

        const {data} = await axios.post("/content/deletePost",{
            postId
        }) 
        
        console.log(data)

    } catch (error) {
        
        console.log(error)
    }
}

export async function getSavedPosts(userId){

    try {
        
        const {data} = await axios.get(`/content/getSavedPosts/${userId}`)
        console.log(data)
        return data;

    } catch (error){

        console.log(error)
    }

}

export async function saveThePost(userId,postId,saveType){

    try {

        await axios.post("/content/saveThePost",{
            userId,
            postId,
            saveType:saveType ? "REMOVE" : "PUSH"
        })

    } catch (error) {
        console.log(error)
    }

}



