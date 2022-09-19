import React,{useState,useEffect} from 'react';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHome from './Admin/AdminHome';
import Requests from './Admin/Requests';
import Nav from './NavigationBar/Nav';
import Approved from './Admin/Approved';
import Deleted from './Admin/Deleted';

const Stack = createNativeStackNavigator();

function Home({navigation}) {

  const[user,setUser]=useState([]);

  const get = async() => {
    try {
        const val = await AsyncStorage.getItem('token')
        const res=jwt_decode(JSON.parse(val))
        setUser(res)



    } catch (err) {
        console.log(err)
    }
}

useEffect(()=>{
  get();
},[])


  return (
    <>
    {
      user['role']==='Admin'?
      <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Admin Home'>
        <Stack.Screen name='Admin Home' component={AdminHome}/>
        <Stack.Screen name='Pendings' component={Requests}/>
        <Stack.Screen name='Approved Users' component={Approved}/>
        <Stack.Screen name='Deleted Users' component={Deleted}/>
      </Stack.Navigator>
    </NavigationContainer>

    :<></>
    }
    
    </>
  )
}

export default Home