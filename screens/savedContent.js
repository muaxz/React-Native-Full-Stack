import React,{useContext, useEffect,useLayoutEffect,useState} from 'react';

import {View,Text,StyleSheet} from 'react-native'
import PostList from "../components/screens/Home/postList"
import {getSavedPosts} from "../api/content"
import {UserContext} from "../store/user_context"


export default function SavedContents(){

    const [postData,setPostData] = useState([])
    const {userData} = useContext(UserContext)
    

    useEffect(()=>{

        async function getSavedPostHandler(){
            const posts = await getSavedPosts(userData._id);
            setPostData(posts)
        }

        getSavedPostHandler()

    },[])

    

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