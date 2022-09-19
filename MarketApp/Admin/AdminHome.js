import React,{useState,useEffect} from 'react';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image} from 'react-native';
import Nav from '../NavigationBar/Nav';


function AdminHome({navigation}) {
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
    
    <View style={styles.container}>
    <Nav role='Admin' state='home' navigation={navigation} data={user}/>
        <View style={styles.subcontainer}>
            <Text>Welcome Admin {user['name']}</Text>
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
    }
})


export default AdminHome