import React,{useEffect, useState, useLayoutEffect,useContext} from 'react';

import {View,Text,FlatList,StyleSheet,SafeAreaView} from 'react-native'
import {getPosts,createPosts} from "../api/content"
import {useIsFocused,useNavigation} from "@react-navigation/native"
import PostList from "../components/screens/Home/postList"
import IconButton from "../components/UI/iconButton"
import {screens} from "../constants/screenNames"
import {UserContext} from "../store/user_context"
import {logoutHandler} from "../util/user"
import {shortenSentence} from "../util/common"


export default function HomeScreen({route}){

    const isFocused = useIsFocused();
    const [posts,setPosts] = useState([])
    const {userData,isLoggedIn} = useContext(UserContext)
    const navigation = useNavigation();
    const params = route.params;

    useEffect(()=>{
      //createPosts()  
      async function getPostHandler(){
          const posts = await getPosts() 
          setPosts(posts)
      }

      getPostHandler()

    },[isFocused])

    function logOutFunction(){
        logoutHandler();
        navigation.navigate("Login")
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>{
                return (
                <View style={styles.rightButtonContainer}>
                  <IconButton 
                    overrideStyle={{marginBottom:10,marginRight:10}} 
                    textOverrideStyle={{marginRight:0}}
                    iconType="Awesome" 
                    IconConfig={{name:"pencil-alt",color:"white",size:22}}
                    onPress={()=>{navigation.navigate(screens.POST_CREATOR)}}
                    />
                  <IconButton 
                    overrideStyle={{marginBottom:10}} 
                    textOverrideStyle={{marginRight:0}}
                    iconType="Ant" 
                    IconConfig={{name:"user",color:"white",size:22}}
                    onPress={()=>{navigation.navigate(screens.USER_PROFILE)}}
                    />
                   
                </View>
                )
            }
        })
        
    },[])


    return(
        <SafeAreaView style={styles.rootView}>
            <PostList
                postData={posts}
                setData={setPosts}
            />
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    rootView:{
        flex:1
    },
    rightButtonContainer:{
        flexDirection:"row",
        alignItems:"center",
        paddingRight:10
    },
    userNameText:{fontSize:15,
        marginLeft:10,
        backgroundColor:"#fb6107",
        color:"white",
        padding:5,
        borderRadius:5,
        bottom:4
    }
})