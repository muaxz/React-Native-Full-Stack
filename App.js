import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView} from 'react-native';
import {NavigationContainer, useFocusEffect} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import firebase from "./util/firebaseConfig"
import Login from "./screens/login"
import Register from "./screens/register"
import {screens} from "./constants/screenNames"
import Home from "./screens/home"
import Button from "./components/UI/Button"
import {useFonts} from "expo-font"
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import UserInputContext from "./store/user_input_context"
import IconButton from "./components/UI/iconButton"
import PostDetail from "./screens/postDetail"
import PostCreator from './screens/postCreator';
import InputText from "./components/UI/TextInput"
import UserContext from "./store/user_context"
import UserProfile from "./screens/userProfile"
import {setCustomText} from "react-native-global-props"
import UserEdit from "./screens/editProfile"
import {createDrawerNavigator} from "@react-navigation/drawer"
import {Ionicons, AntDesign, FontAwesome} from "@expo/vector-icons"
import SavedContent from "./screens/savedContent"
import CustomDrawerBar from "./components/navigation/customDrawer"


const customTextStyle = {
   style:{}
}

setCustomText(customTextStyle)


//SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator();
const DrawerStack = createDrawerNavigator();

function HomeDrawerScreen(){
  
  const [currentSaveCount,setSaveCount] = useState(0);

  useEffect(()=>{
    setTimeout(() => {
        setSaveCount(10)
    }, 3000);
  },[])

  return (
      <DrawerStack.Navigator drawerContent={(props)=>(<CustomDrawerBar {...props}/>)}>
         <DrawerStack.Screen 
          options={{    
           drawerType:"front",
           drawerLabelStyle:{fontSize:20},
           headerStyle:{height:100},
           headerTitle:()=>(<View style={{top:-15}}></View>),
           drawerIcon:()=>{
             return (<Ionicons name={"home"} size={20} color="black" />)
           },
         }}   
         name={"home"} 
         component={Home}/>
         <DrawerStack.Screen 
          options={{
            title:`Saved (${currentSaveCount})`,
            drawerLabelStyle:{fontSize:20},
            drawerIcon:()=>{
              return (<Ionicons name="bookmark" size={20} color="black" />)
            }
        }} 
         name={screens.SAVED_CONTENT} 
         component={SavedContent}/>
      </DrawerStack.Navigator>
  )
}


export default function App(){

  const [isLoaded] = useFonts({
    "Pattaya":require("./assets/fonts/Pattaya-Regular.ttf")
  }) 
 
  useEffect(()=>{

    if(isLoaded){
      setTimeout(() => {
        //SplashScreen.hideAsync()
      }, 2000);
    }

  },[isLoaded])

  if(!isLoaded){
     return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <UserInputContext>
          <NavigationContainer>
            <UserContext>
                <Stack.Navigator screenOptions={{headerTitleStyle:{fontSize:23}}} initialRouteName="Login">
                  <Stack.Screen options={({navigation})=>({
                    headerRight:()=>(
                      <Button overrideButtonText={{fontSize:17,color:"black"}} overrideButton={{backgroundColor:"transparent"}} onPress={()=>navigation.navigate(screens.REGISTER_SCREEN)} title="Sign Up"/>
                    )
                  })} 
                  name={screens.LOGIN_SCREEN} 
                  component={Login}/>
                  <Stack.Screen options={({navigation})=>({
                    presentation:"modal",
                    headerLeft:()=>{
                      return (<IconButton onPress={()=>navigation.goBack()} title="" overrideStyle={{backgroundColor:"transparent"}} textOverrideStyle={{marginRight:0}} IconConfig={{name:"arrow-back-circle-outline",size:30,color:"black"}} iconType="ionic"/>)
                    }
                    })} name={screens.REGISTER_SCREEN} component={Register} />
                  <Stack.Screen options={{
                      headerShown:false,
                      headerTitle:()=>{
                        return (<View style={{top:-15}}></View>)
                      },
                      headerShadowVisible:false,
                      headerStyle:{backgroundColor:"transparent"},
                      
                  }} 
                    name={screens.HOME_SCREEN}
                    component={HomeDrawerScreen} 
                  />
                  <Stack.Screen options={{title:""}} name={screens.POST_DETAIL} component={PostDetail} />
                  <Stack.Screen options={{presentation:"fullScreenModal",title:"",headerShadowVisible:false}} name={screens.POST_CREATOR} component={PostCreator} />
                  <Stack.Screen options={{title:"Profile"}} name={screens.USER_PROFILE} component={UserProfile}/>
                  <Stack.Screen options={{title:"",presentation:"modal",headerShadowVisible:false}} name={screens.USER_EDIT} component={UserEdit}/>
                </Stack.Navigator>
              </UserContext>
          </NavigationContainer>
      </UserInputContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
