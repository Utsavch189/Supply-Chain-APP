import React, {  useState,useEffect } from 'react'
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image} from 'react-native';
import axios from 'axios';
import { url } from '../baseUrl';
import login_logo from './Images/login_logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

function Login({navigation}) {
    const[userid,setUserid]=useState('');
    const[password,setPassword]=useState('');
    const[err,setErr]=useState(false);
    const[ufocus,setUFocus]=useState(false);
    const[pfocus,setPFocus]=useState(false);
    const[msg,setMsg]=useState('');

    const route=useRoute();

    useEffect(()=>{
        if(!userid && !password){
            setPFocus(false)
            setUFocus(false)
        }
    },[userid,password])

   const login=()=>{
    if(userid!='' && password!=''){
        const data={
            "uid":userid,
            "password":password
        }
        axios.post(`${url}/auth/jwt`,data)
        .then(function (response) {
            if(response){
                if(response.data['status']===200){
                    try{
                         AsyncStorage.setItem('token',JSON.stringify(response.data['token']))
                         navigation.navigate('Home')
                    }
                    catch(err){
                        console.log(err)
                    }
                }
                else if(response.data['status']===253){
                    AsyncStorage.removeItem('token');
                    setMsg(response.data['msg']);
                }
                else{
                    setMsg(response.data['msg']);
                }
            }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else{
        setErr(true);
    }
   }
 
   
  return (
   <>

   <View style={styles.container}>

    <View style={styles.topcontainer}>
        {!pfocus&&!ufocus&&<Image
        source={login_logo}
        style={{width:89,height:89,position:'absolute',zIndex:-1000}}
        />}
    </View>

    <View style={styles.subcontainer}>
        
        <TextInput 
        style={styles.input}
        placeholder='User Id'
        onFocus={()=>setUFocus(true)}
        onChangeText={(b)=>{setUserid(b)
        setErr(false)
        }}
        />

        <TextInput 
        style={styles.input}
        placeholder='Password'
        secureTextEntry={true}
        onFocus={()=>setPFocus(true)}
        onChangeText={(b)=>{setPassword(b)
        setErr(false)
        }}
        />

        <TouchableOpacity style={styles.button1} onPress={()=>login()}>
            <Text style={styles.buttonText1}>Login</Text>
        </TouchableOpacity>

      
        <View style={{marginTop:18,display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:'70%'}}>
        <TouchableOpacity  onPress={()=>{navigation.navigate('First Step')
                            setPFocus(false)
                            setUFocus(false)
        }}>
            
            <Text style={{color:'black',fontWeight:'bold'}}>Forget Password?</Text>
        </TouchableOpacity>
        <Text>|</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate('Setup')
                            setPFocus(false)
                            setUFocus(false)
        }}>     
            <Text style={{color:'black',fontWeight:'bold'}}>Create New Password?</Text>
        </TouchableOpacity>
        </View>
        <View style={{marginTop:17}}>
            <Text>Didn't have any account?</Text>
        </View>
        <TouchableOpacity style={styles.button2} onPress={()=>{navigation.navigate('Register')
                            setPFocus(false)
                            setUFocus(false)
        }}>
            <Text style={styles.buttonText2}>Sign Up</Text>
        </TouchableOpacity>
        {!userid&&!password&&err&&<Text style={{fontWeight:'bold',color:'red',marginTop:10}}>Fill the fields with credentials...</Text>}
        {!userid&&!password&&msg&&<Text style={{fontWeight:'bold',color:'red',marginTop:10}}>{msg}</Text>}
        {!userid&&!password&&route.params?.msgs&&<Text style={{fontWeight:'bold',color:'green',marginTop:10}}>{route.params.msgs}</Text>}
        {!userid&&!password&&route.params?.err&&<Text style={{fontWeight:'bold',color:'red',marginTop:10}}>{route.params.msgs}</Text>}
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
    topcontainer:{
        height:130,
        width:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        top:0,
        marginTop:23
        
    },
    welcome:{
        fontSize:20,
    },
    subcontainer:{
        height:400,
        width:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:90,
        position:'absolute',
        zIndex:1000

    },
    input:{
        height: 40,
        borderWidth: 0.6,
        padding: 10,
        width:'80%',
        marginTop:10,
        borderRadius:8,
        padding:8
    },
    button1:{
        width:'80%',
        height:40,
        backgroundColor:'blue',
        borderRadius:5,
        marginTop:32,
        display:'flex',
        justifyContent:'center',
        borderColor:'white',
        alignItems:'center',
    },
    buttonText1:{
        color:'white'
    },
    button2:{
        width:'80%',
        height:40,
        backgroundColor:'white',
        borderRadius:5,
        marginTop:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'blue',
        borderWidth:0.8
    },
    
    buttonText2:{
        color:'blue'
    },
  });

export default Login