import React, {useEffect, useState, useContext, useLayoutEffect} from 'react';

import {View,StyleSheet,Image,Text,FlatList} from 'react-native'
import PostList from "../components/screens/Home/postList"
import {getUserPosts} from "../api/content"
import {UserContext} from "../store/user_context"
import {useRoute,useNavigation} from "@react-navigation/native"
import LoadingIndicator from "../components/UI/activityIndicator"
import IconButton from "../components/UI/iconButton"
import {screens} from "../constants/screenNames"


export default function UserProfile(){

    const [posts,setPosts] = useState([])
    const [user,setUser] = useState({})
    const [isLoading,setIsLoading] = useState(true);
    const {userData} = useContext(UserContext)
    const route = useRoute();
    const navigation = useNavigation();
    const creator = route.params?.user;
    
    async function getPostHandler(){

        const userPosts = await getUserPosts(creator ? creator._id : userData._id);

        setIsLoading(false);
        setPosts(userPosts);

    }

    function editButtonHandler(){
        navigation.navigate(screens.USER_EDIT)
    }

    useEffect(()=>{

        if(userData._id){
            getPostHandler();
        }
       
    },[userData])

    useEffect(()=>{

        if(!creator){
            setUser(userData)
        }else{
            setUser(creator)
        }
        
    },[userData])

    if(isLoading){
       return <LoadingIndicator/>
    }

    return(
        <View style={styles.rootView}>
             <View style={styles.userInfoContainer}>
                 <View style={styles.userImageContainer}>
                    <Image 
                     style={styles.userImage} 
                     source={user?.profileImage?.length ? {uri:user.profileImage} : require("../assets/signup.jpg")}
                    />
                 </View>
                 <Text style={styles.textName}>{user?.fullName}</Text>
             </View>
             <View style={styles.editButtonContainer}>
                {!creator || userData._id == creator._id ?
                (<IconButton
                    onPress={editButtonHandler}
                    title={"Edit profile"}
                    overrideStyle={{borderWidth:1,right:-5,borderColor:"black",backgroundColor:"transparent"}}
                    textOverrideStyle={{color:"black",fontSize:15}}
                    iconType={"Ant"}
                    IconConfig={{
                        name:"edit",
                        size:20,
                        color:"black"
                    }}
                />) : null}
             </View>
             <View style={styles.userContentContainer}>
                 <PostList
                    postData={posts}
                 />
             </View>
        </View>
    )

}

const styles = StyleSheet.create({
    rootView:{
        flex:1
    },
    userInfoContainer:{
        backgroundColor:"#ede0d4",
        height:250,
        alignItems:"center",
        paddingTop:20,
    },
    userContentContainer:{
        flex:1,
    },
    userImageContainer:{
        width:150,
        height:150,
        borderRadius:"100%",
        overflow:"hidden"
    },
    userImage:{
        width:"100%",
        height:"100%"
    },
    textName:{
        fontSize:25,
        marginTop:20,
        fontWeight:"400"
    },
    editButtonContainer:{
        alignItems:"flex-end",
        marginTop:20,
        paddingHorizontal:15
    }

})