import React,{useState,useEffect} from 'react';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image} from 'react-native';
import Nav from '../NavigationBar/Nav';
import { PieChart } from 'react-native-chart-kit';
import { url } from '../baseUrl';
import { myaxios } from '../authorizedaxios';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


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

  return (
    <>
    
    <View style={styles.container}>
    <Nav role='Admin' state='home' navigation={navigation} data={user}/>
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

     <View style={styles.account}>
          <View style={styles.one}>
              <View style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',borderColor:'black',borderWidth:1,borderRadius:'50%',height:50,width:50}}>
                  {user['name']&&<Text style={{fontWeight:'bold',fontSize:25}}>{user['name'].charAt(0)}</Text>}
              </View>
              <Text style={{fontSize:25}}>{user['name']}</Text>
          </View>
          <View style={styles.two}>
            <View style={styles.section}>
              <Icon name='user-circle' size={25}/>
              <Text style={{fontSize:25}}>{user['role']}</Text>
            </View>
            
            <View style={styles.section}>
              <Icon name='envelope' size={25}/>
              <Text style={{fontSize:13}}>{user['uid']}</Text>
            </View>

            <View style={styles.section}>
              <Icon name='phone' size={25}/>
              <Text style={{fontSize:20}}>{user['phone']}</Text>
            </View>


            <View style={styles.section}>
              <Icon name='info' size={25}/>
              <Text style={{fontSize:20}}>{user['account_creates']}</Text>
            </View>

            <TouchableOpacity onPress={()=>{
                AsyncStorage.removeItem('token')
                navigation.navigate('Login')
            }}>
                <View style={styles.section1}>
                  <Icon name='sign-out' size={25}/>
                  <Text style={{fontSize:20}}>Logout</Text>
                </View>
            </TouchableOpacity>

            
          </View>
          
     </View>

       
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
    account:{
      width:"82%",
      height:460,
      shadowColor: '#6B8E23',
      shadowOffset: {width: 2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3.6,   
      position:'absolute',
      marginTop:130,
      overflow:'hidden'
    },
    one:{
      width:"76%",
      height:80,
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      gap:17
    },
    two:{
      width:"50%",
      height:280,
      display:'flex',
      flexDirection:'column',
      alignItems:'flex-start',
      marginTop:20,
      justifyContent:'flex-start'
    },
    section:{
      width:"90%",
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      gap:16,
      marginLeft:13,
      marginTop:18
    },
    section1:{
      width:"90%",
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      gap:13,
      marginLeft:13,
      marginTop:38
    }
})


export default AdminHome