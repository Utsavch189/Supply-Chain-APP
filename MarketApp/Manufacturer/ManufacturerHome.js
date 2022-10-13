import React,{useState,useEffect} from 'react'
import Nav from '../NavigationBar/Nav'
import { PieChart } from 'react-native-chart-kit';
import { url } from '../baseUrl';
import { myaxios } from '../authorizedaxios';
import Loader from '../Loader';
import { Dimensions } from 'react-native';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image} from 'react-native';
import UserProfile from '../UserProfile';

const chartConfig = {
    backgroundGradientFrom: "#0b70a8",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#0b70a8",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(92, 49, 245, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(92, 49, 245, ${opacity})`,
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

const screenWidth = Dimensions.get("window").width-35;

function ManufacturerHome({navigation}) {
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
        myaxios(JSON.parse(token)).get(`${url}/manufacturer/get_DayByDayEntry`)
        .then(res=>{setData(res['data'].data)
                    console.log(res['data'].data)
      })
      }
    },[token])
  
    if(user.length===0){
        return(
          <>
          <Nav role='Manufacturer' state='home' navigation={navigation} data={user} token={token}/>
          <Loader/>
          </>
          
        )
      }

  return (
    <>
    <View style={styles.container}>
    <Nav role='Manufacturer' state='home' navigation={navigation} data={user} token={token}/>
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
      <Text style={{fontWeight:'bold',marginTop:11}}>Today's Production</Text>
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
      position:'absolute',
      top:0,
      marginTop:12
    },

})

export default ManufacturerHome