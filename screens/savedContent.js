import React,{useContext, useEffect,useLayoutEffect,useState} from 'react';

import {View,Text,StyleSheet} from 'react-native'
import PostList from "../components/screens/Home/postList"
import {getSavedPosts} from "../api/content"
import {UserContext} from "../store/user_context"
import {useIsFocused} from "@react-navigation/native"


export default function SavedContents(){

    const [postData,setPostData] = useState([])
    const {userData} = useContext(UserContext)
    const isFocused = useIsFocused()

    useEffect(()=>{

        async function getSavedPostHandler(){
            const posts = await getSavedPosts(userData._id);
            setPostData(posts)
        }

        getSavedPostHandler()

    },[isFocused])

    

    return(
        <View style={styles.rootView}>
            <PostList setData={setPostData} postData={postData}/>
        </View>
    )

}

const styles = StyleSheet.create({
    rootView:{
        flex:1
    }
})