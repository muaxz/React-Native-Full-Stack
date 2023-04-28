import React,{useEffect, useState} from 'react';

import {View,StyleSheet,Text,Image} from 'react-native'
import {useNavigation,useRoute} from "@react-navigation/native"
import {getSinglePost} from "../api/content"
import {WebView} from "react-native-webview"

export default function PostDetail(){

    const route = useRoute();
    const [isLoading,setIsLoading] = useState(true)
    const postId = route.params?.postId
    const [post,setPost] = useState({})

    useEffect(()=>{

        async function fetchSingleHandler(){
            const post = await getSinglePost(postId);
            setPost(post)
        }

        fetchSingleHandler()

    },[])

    return(
        <View style={styles.rootView}>
            {post.titleImage?.length ?
            (<View style={styles.imageContainer}>
                <Image 
                   onLoadEnd={()=>setIsLoading(false)}
                   style={styles.image}
                   source={{uri:post.titleImage}}
                />
            </View>) : null}
            <View style={styles.contentHolder}>
                <Text style={styles.contentText}>{post.text}</Text>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    rootView:{
        flex:1,
    },
    imageContainer:{
        height:200,
        marginBottom:20
    },
    image:{
        width:"100%",
        height:"100%"
    },
    contentHolder:{
        padding:20
    },
    contentText:{
        fontSize:18,
        fontWeight:"400"
    }
})