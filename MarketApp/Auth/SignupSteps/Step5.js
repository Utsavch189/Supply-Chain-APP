import { useRoute } from '@react-navigation/native';
import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View,TouchableOpacity,TextInput} from 'react-native';
import axios from 'axios';
import { url } from '../../baseUrl';


function Step5({navigation}) {
    const[password,setPassword]=useState('');
    const[err,setErr]=useState(false);
    const[lock,setLock]=useState(false);
    const[msg,setMsg]=useState('');
    const[err2,setErr2]=useState('');
    const route=useRoute();


    useEffect(()=>{
      if(route.params.email && route.params.number){axios.post(`${url}/auth/is_block`,{
        'email':route.params.email,
        'phone':route.params.number,
        'type':'not-authenticated'
    })
    .then(res=>{
      if(res['data']['status']===400){
        setLock(true);
        setMsg(`This email and phone number will be allowed to register after ${res['data']['time-left']} mins`);
        console.log(res)
      }
      else{
        setLock(false);
      }
    })
    .catch(function (error) {
        console.log(error);
    });}

    if(password.length!==6){
      setErr2("password have to six characters");
      setLock(true);
    }

    },[password])
  
    const press=()=>{
      if(password===''){
        setErr(true)
      }
  
      if(password!=''&& !lock){
      navigation.navigate('Verify',{
        fname:route.params.fname,
        lname:route.params.lname,
        number:route.params.number,
        email:route.params.email,
        whatsapp:route.params.whatsapp,
        gender:route.params.gender,
        role:route.params.role,
        password:password
      })
    }
    }
  
    return (
      <>
      <View style={styles.container}>
  
  <View style={styles.subcontainer}>
   
    <Text style={{fontWeight:'bold',fontSize:20}}>Create a password</Text>
    <View style={{width:'80%'}}>
      <Text style={{marginTop:8,fontSize:13}}>Create a password with at least of 6 characters.It should be something that others could not guess.</Text>
    </View>
  
    <View style={styles.inputbox1}>
            <Text>New Password</Text>
            <TextInput style={styles.input2}
            secureTextEntry={true} keyboardType="visible-password" onChangeText={(b)=>{setPassword(b)
            setErr(false)
            }}/>
            {msg&&<Text style={{fontWeight:'bold',color:'red',marginTop:7}}>{msg}</Text>}
            {err2&&<Text style={{fontWeight:'bold',color:'red',marginTop:5}}>{err2}</Text>}
    </View>
    {!msg&&err&&<Text style={{fontWeight:'bold',color:'red',marginTop:5}}>must enter password...</Text>}
    
    <TouchableOpacity style={styles.btn} onPress={press}>
          <Text style={{color:'white'}}>Next</Text>
      </TouchableOpacity>
  
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
        alignItems:'center'
      },
      subcontainer:{
        width:'92%',
        height:'80%',
        marginTop:38,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
      }, 
      inputbox1:{
          width:'80%' ,
          marginTop:15
        },
        input2:{
          width:'100%',
          height:40,
          backgroundColor:'white',
          borderWidth:0.5
        },
        btn:{
          width:'80%',
          height:33,
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'blue',
          marginTop:48
        }
    });

export default Step5