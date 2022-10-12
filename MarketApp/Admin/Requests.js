import React,{useState,useEffect} from 'react'
import Nav from '../NavigationBar/Nav'
import { useRoute } from '@react-navigation/native';
import { StyleSheet,ScrollView,Button, Text, View ,TextInput,TouchableOpacity,Image} from 'react-native';
import {myaxios} from '../authorizedaxios';
import { url } from '../baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserCard from './Components/UserCard';
import Loader from '../Loader';

function Requests({navigation}) {

    const route=useRoute();
    const user_data=route.params.user;
    const[token,setToken]=useState(null);
    const[req,setReq]=useState(null);
    const[searchh,setSearch]=useState([]);

    

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
        myaxios(JSON.parse(token)).get(`${url}/admins/requests`)
        .then(res=>{
          setReq(res['data'])
          
        })
      
      }
    },[token,route.params.signal])

    const Search=(b)=>{
      if(req){
        for(let i=0;i<req.length;i++){
            if(req[i].name===b){
              setSearch(j=>[...j,req[i]])
            }
        }
      }

    }
   

    if(!req){
      return(
        <>
        <Nav state='reqs' role='Admin' data={route.params.user} navigation={navigation} token={route.params.token}/>
        <Loader/>
        </>
      )
    }

    else{
  return (
    <>
    <Nav state='reqs' role='Admin' data={route.params.user} navigation={navigation} token={route.params.token}/>
    <View style={styles.container}>
      <View style={styles.searchbarcontainer}>
        <TextInput placeholder='Search By Name' 
        style={{borderWidth:1,backgroundColor:'white',borderColor:'black',borderRadius:50,width:'100%',height:40}}
        onChangeText={(b)=>Search(b)}
        />
      </View>
    
       
        {req.length>0&&searchh.length===0&&<ScrollView contentContainerStyle={styles.scrollview} showsVerticalScrollIndicator={false}>
        {req.map((i,k)=>
          <TouchableOpacity onPress={()=>navigation.navigate('UserDetails',{'data':i,'token':(token),'type':"request_screen",'msg':"You can remove or approve.","user":user_data,"state":"reqs"})} key={k} >
            <UserCard data={i} token={token}/>
          </TouchableOpacity>
          ) }
        </ScrollView>}
       

       
        {searchh.length>0&&<ScrollView contentContainerStyle={styles.scrollview} showsVerticalScrollIndicator={false}>
        {searchh.map((i,k)=>
          <TouchableOpacity onPress={()=>navigation.navigate('UserDetails',{'data':i,'token':(token),'type':"request_screen",'msg':"You can remove or approve.","user":user_data,"state":"reqs"})} key={k} >
            <UserCard data={i}/>
          </TouchableOpacity>
          )}
        </ScrollView>}
       
       {!searchh.length&&!req.length&&<>
       <View >
          <Text style={{fontWeight:'bold'}}>No Requests!</Text>
       </View>
       </>}

    

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
    height:'9%',
    zIndex:1000
  },
  scrollview:{
    marginTop:80,
    width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    height:'115%'
  }
})

export default Requests