import React,{useState,useEffect} from 'react';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHome from './Admin/AdminHome';
import Requests from './Admin/Requests';
import Approved from './Admin/Approved';
import Deleted from './Admin/Deleted';
import UserShowDetails from './Admin/Components/UserShowDetails';
import Login from './Auth/Login';
import UserProfile from './UserProfile';
import ActionBarLogo from './ActionBarLogo';
import ManufacturerHome from './Manufacturer/ManufacturerHome';
import AddProduct from './Manufacturer/AddProduct';

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
      <Stack.Navigator initialRouteName='Admin Home' screenOptions={{headerLeft: () => <ActionBarLogo/>}}>
        <Stack.Screen name='Admin Home' component={AdminHome}/>
        <Stack.Screen name='Pendings' component={Requests}/>
        <Stack.Screen name='Approved Users' component={Approved}/>
        <Stack.Screen name='Deleted Users' component={Deleted}/>
        <Stack.Screen name='UserDetails' component={UserShowDetails} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>

    :
    user['role']==='Manufacturer'?
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Manufacturer Home' screenOptions={{headerLeft: () => <ActionBarLogo/>}}>
        <Stack.Screen name='Manufacturer Home' component={ManufacturerHome}/>
        <Stack.Screen name='AddProduct' component={AddProduct}/>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    :<></>
    }
    
    </>
  )
}

export default Home