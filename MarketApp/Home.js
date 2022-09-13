import React,{useState,useEffect} from 'react';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    {user['name']}
    </>
  )
}

export default Home