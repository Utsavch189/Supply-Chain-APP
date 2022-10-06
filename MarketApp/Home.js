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
import ActionBarLogo from './ActionBarLogo';
import ManufacturerHome from './Manufacturer/ManufacturerHome';
import AddProduct from './Manufacturer/AddProduct';
import Distribute from './Manufacturer/Distribute';
import HistoryDistribute from './Manufacturer/HistoryDistribute';
import DistributorHome from './Distributor/DistributorHome';
import ReceiveStockHist from './Distributor/ReceiveStockHist';
import DistributeStockHist from './Distributor/DistributeStockHist';
import Stock from './Distributor/Stock';
import Distributes from './Distributor/Distributes';
import QRcodeD from './Distributor/QR';
import HistoryNav from './NavigationBar/HistoryNav';
import RetailerHome from './Retailer/RetailerHome';
import RetailerStockHist from './Retailer/RetailerStockHist';
import DistributeR from './Retailer/DistributeR';
import QRR from './Retailer/QRR';
import RetailerReceiveHist from './Retailer/RetailerReceiveHist';
import RetailerDisttributeHist from './Retailer/RetailerDisttributeHist';



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
        <Stack.Screen name='Distribution' component={Distribute}/>
        <Stack.Screen name='History' component={HistoryDistribute}/>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    :
    user['role']==='Distributor'?
    <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName='Distributor Home' screenOptions={{headerLeft: () => <ActionBarLogo/>}}>
      <Stack.Screen name='Distributor Home' component={DistributorHome}/>
      <Stack.Screen name='Stock' component={Stock}/>
      <Stack.Screen name='Distribution' component={Distributes}/>
      <Stack.Screen name='QR Code' component={QRcodeD}/>
      <Stack.Screen name='HistoryNav' component={HistoryNav} options={{ headerShown: false }}/>
      <Stack.Screen name='Receive History' component={ReceiveStockHist}/>
      <Stack.Screen name='Distribute History' component={DistributeStockHist}/>
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>
    :
    user['role']==='Retailer'?
    <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName='Retailer Home' screenOptions={{headerLeft: () => <ActionBarLogo/>}}>
      <Stack.Screen name='Retailer Home' component={RetailerHome}/>
      <Stack.Screen name='Retailer Stock' component={RetailerStockHist}/>
      <Stack.Screen name='Retailer Distribution' component={DistributeR}/>
      <Stack.Screen name='Retailer QR Code' component={QRR}/>
      <Stack.Screen name='HistoryNav' component={HistoryNav} options={{ headerShown: false }}/>
      <Stack.Screen name='Retailer Receive History' component={RetailerReceiveHist}/>
      <Stack.Screen name='Retailer Distribute History' component={RetailerDisttributeHist}/>
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