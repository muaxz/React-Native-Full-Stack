import React from 'react';

import {View,FlatList,StyleSheet,Text} from 'react-native'
import PostCard from "./postCard"
import {deletePost,saveThePost} from "../../../api/content"
import {useRoute} from "@react-navigation/native"

export default function PostList({postData,setData}){

    const dataThere = postData.length;
    const route = useRoute();

    if(!dataThere){
        return (
        <View style={styles.emptyDataInform}>
            <Text style={styles.emptyDataInformText}>The user did not share any post yet</Text>
        </View>)
    }

    function deleteHandler(postId){
        deletePost(postId)
        const filteredPosts = postData.filter((item)=> item._id !== postId);
        setData(filteredPosts);
    }

    function saveHandler(userId,postId,saveType){
       
        if(saveType && route.name === "SavedContent"){
            const filteredPosts = postData.filter((item)=> item._id !== postId);
            setData(filteredPosts);
        }

        saveThePost(userId,postId,saveType)
    }

    return(
        <View style={styles.rootView}>
            <FlatList
               ListHeaderComponent={(
                <View style={styles.listHeaderComponent}>
                    <Text style={{fontSize:25,fontWeight:"600",paddingLeft:80}}></Text>
                </View>
               )}
               style={styles.flatList} 
               data={postData}
               keyExtractor={(item)=>item._id}
               renderItem={(itemData)=>{
                return (<PostCard 
                      userSavedList={itemData.item.usersSaved || []}
                      saveHandler={saveHandler}
                      titleImageUrl={itemData.item.titleImage}
                      postId={itemData.item._id}  
                      content={itemData.item.text}
                      creator={itemData.item.creator}
                      deleteHandler={deleteHandler}
                    />)
               }}
            />
        </View>
    )

}


const styles = StyleSheet.create({
    rootView:{
        flex:1,
    },
    flatList:{
        paddingRight:15,
    },
    listHeaderComponent:{
        marginBottom:10
    },
    emptyDataInform:{
        marginTop:40
    },
    emptyDataInformText:{
        textAlign:"center"
    }
})