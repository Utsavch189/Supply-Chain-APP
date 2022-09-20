import React,{useState,useEffect} from 'react'
import Nav from '../NavigationBar/Nav'
import { useRoute } from '@react-navigation/native';
import { StyleSheet,ScrollView, Text, View ,TextInput,TouchableOpacity,Image} from 'react-native';
import {myaxios} from '../authorizedaxios';
import { url } from '../baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserCard from './Components/UserCard';

function Requests({navigation}) {

    const route=useRoute();
    const[token,setToken]=useState(null);
    const[req,setReq]=useState(null)

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
      retrieveData()
      if(token){
        myaxios(JSON.parse(token)).post(`${url}/admins/requests`)
        .then(res=>setReq(res['data']))
      }
      
    },[token])
   

    if(!req){
      return(
        <>
        <Text>Wait</Text>
        </>
      )
    }

    else{
  return (
    <>
    <Nav state='reqs' role='Admin' data={route.params.data} navigation={navigation}/>
    <View style={styles.container}>
      <View style={styles.searchbarcontainer}>
        <TextInput placeholder='Search By Name' 
        style={{borderEndWidth:1,borderColor:'black',borderRadius:50,width:'100%',height:40}}
        />
      </View>

       {req.map((i,k)=>
        <ScrollView style={styles.scrollview} key={k}>
          <TouchableOpacity onPress={()=>navigation.navigate('UserDetails',{'data':i})}>
            <UserCard data={i} />
          </TouchableOpacity>
          
        </ScrollView>
       ) }
    </View>
    </>
  )
    }
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
  searchbarcontainer:{
    position:'absolute',
    top:0,
    width:'80%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:'9%'
  },
  scrollview:{
    marginTop:120,
    width:'100%',
    marginLeft:68
  }
})

export default Requests