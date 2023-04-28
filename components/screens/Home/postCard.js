import React, { useContext, useEffect, useRef, useState } from 'react';

import {View,StyleSheet,Text,Image, Pressable, Animated} from 'react-native'
import IconButton from "../../UI/iconButton"
import {screens} from "../../../constants/screenNames"
import {useNavigation} from "@react-navigation/native"
import {shortenSentence} from "../../../util/common"
import {UserContext} from "../../../store/user_context"

export default function Card({content,titleImageUrl,postId,creator,deleteHandler,saveHandler,userSavedList}){

    const navigation = useNavigation();
    const {userData} = useContext(UserContext)
    const [isSaved,setIsSaved] = useState(false)

    const saveAnim = useRef(new Animated.Value(22));

    useEffect(()=>{
        userSavedList.forEach(element => {
            if(element === userData._id){
                setIsSaved(true)
            }
        });
    },[])
    
    function viewPressHandler(){
        console.log(postId)
        navigation.navigate(screens.POST_DETAIL,{
            postId:postId
        })
    }       

    const viewButtonStyles = [styles.viewButton]

    if(!titleImageUrl){
        viewButtonStyles.push(styles.viewButtonNoImage)
    }

    function userImagePressHandler(){   
        navigation.navigate(screens.USER_PROFILE,{
            user:creator
        })
    }

    function savePostHandler(){

        saveHandler(userData._id, postId, isSaved)
        setIsSaved(!isSaved)
    }

    return(
        <View style={styles.rootView}>
            <View style={styles.innerView}>
                <View style={{flex:1,alignItems:"center"}}>
                    <Pressable onPress={userImagePressHandler}>
                        <View style={styles.userImageContainer}>
                            <Image style={styles.userImage} source={creator?.profileImage ? {uri:creator.profileImage} : require("../../../assets/signup.jpg")}/>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.rightContainer}> 
                    <View style={styles.infoContainer}>
                        <View style={styles.nameDeleteContainer}>
                            <Text style={styles.nameText}>{creator?.fullName || "User Name"}</Text>
                            <IconButton
                                onPress={()=>deleteHandler(postId)}
                                overrideStyle={{backgroundColor:"transparent",display:creator?._id === userData._id ? "block" : "none",padding:0}}
                                iconType={"Meta"}
                                IconConfig={{
                                    size:30,
                                    color:"#DF2E38",
                                    name:"delete"
                                }}
                            />
                        </View>
                        <View>
                            <Text style={styles.contentText}>{shortenSentence(content,200)}</Text>
                        </View>
                    </View>
                    {titleImageUrl && 
                    (<View style={styles.imageContainer}>
                        <Image  style={styles.image} source={{uri:titleImageUrl}}/>
                    </View>)}
                    <View style={viewButtonStyles}>
                        <IconButton
                            onPress={viewPressHandler}
                            overrideStyle={{backgroundColor:"#FFD966",borderRadius:6,padding:5}}
                            textOverrideStyle={{marginRight:0,color:"black",fontWeight:"600",fontSize:20}}
                            title={"view"}
                            iconType={"ionic"}
                            IconConfig={{
                                name:"chevron-forward",
                                color:"black",
                                size:22
                            }}
                        />
                        <IconButton
                            onPress={savePostHandler}
                            overrideStyle={{backgroundColor:"#FFD966",borderRadius:6,padding:5}}
                            textOverrideStyle={{marginRight:0,color:"black",fontWeight:"600",fontSize:20}}
                            iconType={"ionic"}
                            IconConfig={{
                                name:"bookmark",
                                color:isSaved ? "black" : "white",
                                size:22,
                            }}
                        />
                   </View>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    rootView:{
        marginBottom:40,
        borderBottomColor:"lightgrey",
        shadowColor:"black",
        shadowOffset:{width:0,height:2},
        shadowRadius:3,
        shadowOpacity:0.4,
    },
    innerView:{
        flexDirection:"row"
    },
    infoContainer:{
        padding:10,
    },  
    imageContainer:{
        height:150,
        overflow:"hidden"
    },
    image:{
        width:"100%",
        height:"100%",
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15
    },
    userImageContainer:{
        width:70,
        height:70,
        overflow:"hidden",
        padding:10,
    },
    userImage:{
        width:"100%",
        height:"100%",
        borderRadius:25
    },
    viewButton:{
        position:"absolute",
        bottom:12,
        right:12,
        zIndex:10,
        width:"90%",
        flexDirection:"row-reverse",
        justifyContent:"space-between"
    },
    rightContainer:{
        flex:4,
        backgroundColor:"white",
        borderRadius:15,
    },
    contentText:{
        fontSize:15
    },
    nameText:{
        fontWeight:"800",
        fontSize:17,
        paddingBottom:5,
    },
    viewButtonNoImage:{
        position:"relative",
        paddingRight:20,
        paddingTop:15,
        width:"100%",
        flexDirection:"row-reverse",
        justifyContent:"space-between",
    },
    nameDeleteContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    }
})