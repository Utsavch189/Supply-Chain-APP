import React,{useState,useEffect} from 'react';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image} from 'react-native';
import Nav from '../NavigationBar/Nav';
import { PieChart } from 'react-native-chart-kit';
import { url } from '../baseUrl';
import { myaxios } from '../authorizedaxios';
import { Dimensions } from 'react-native';
import UserProfile from '../UserProfile';
import Loader from '../Loader';


const chartConfig = {
  backgroundGradientFrom: "#0b70a8",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#0b70a8",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(92, 49, 245, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(92, 49, 245, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const screenWidth = Dimensions.get("window").width-35;


function AdminHome({navigation}) {
    const[user,setUser]=useState([]);
    const[data,setData]=useState(null);
    const[token,setToken]=useState(null);

    const get = async() => {
      try {
          const val = await AsyncStorage.getItem('token')
          const res=jwt_decode(JSON.parse(val))
          setUser(res)
  
  
  
      } catch (err) {
          console.log(err)
      }
  }

  const retrieveData=async()=>{
    try{
        const val=await AsyncStorage.getItem('token');
        if(val){
          setToken(val)
        }
    }
    catch(err){
        console.log(err)
    }
}
  
  useEffect(()=>{
    get();
    retrieveData();
    if(token){
      myaxios(JSON.parse(token)).get(`${url}/admins/numbers_of_users`)
      .then(res=>setData(res['data']))
    }
  },[token])


  if(!user){
    return(
      <Loader/>
    )
  }

  return (
    <>
    
    <View style={styles.container}>
    <Nav role='Admin' state='home' navigation={navigation} data={user} token={token}/>
     <View style={styles.chart}>
       {data&&
        <PieChart
        data={data}
        width={screenWidth}
        height={120}
        chartConfig={chartConfig}
        accessor={"count"}
        backgroundColor={"transparent"}
        center={[5, 5]}
        absolute
      />}
     </View>

      <UserProfile navigation={navigation} name={user['name']} role={user['role']} email={user['uid']} phone={user['phone']} creates={user['account_creates']} id={user['id']}/>

       
    </View>
    </>
  )
 
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      height:'100%',
      width:'100%',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',     
    },
    subcontainer:{
        width:'80%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)'
    },
    chart:{
      width:"90%",
      height:160,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      shadowColor: '#556B2F',
      shadowOffset: {width: -2, height: 5},
      shadowOpacity: 0.2,
      shadowRadius: 3.6,   
      position:'absolute',
      top:0,
      marginTop:40
    },

})


export default AdminHome