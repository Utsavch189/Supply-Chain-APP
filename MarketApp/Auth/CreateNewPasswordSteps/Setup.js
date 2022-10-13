import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native';
import axios from 'axios';
import { url } from '../../baseUrl';

function Setup({navigation}) {
    const[password,setPassword]=useState('');
    const[email,setEmail]=useState('');
    const[confirmPassword,setconfirmPassword]=useState('');
    const[err,setErr]=useState(false);
    const[err2,setErr2]=useState('');
    const[lock,setLock]=useState(false);
    const[msg,setMsg]=useState('');

    const press=()=>{
      if(password==='' || email==='' || confirmPassword!=''){
        setErr(true)
      }
  
      if(password!=='' && email!=='' && confirmPassword!=='' && !lock){
        if(password===confirmPassword){
            navigation.navigate('Verification',{
                email:email,
                password:password
            });
    }
        else{
            setErr(false)
            setErr2("Passwords didn't match")
        }
    }
    }
    
    useEffect(()=>{
        if(email){axios.post(`${url}/auth/is_block`,{
        'email':email,'phone':''
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
    },[email,password])

    return (
  <>
  
  <View style={styles.container}>
  
    <View style={styles.subcontainer}>
  
      
      <Text style={{fontWeight:'bold',fontSize:15}}>Enter your registered email and setup a new password.</Text>

      
  
      <View style={styles.inputboxcontainer}>
        <View style={styles.inputbox2}>
            <Text>Email</Text>
            <TextInput style={styles.input2} keyboardType="email-address" onChangeText={(b)=>{setEmail(b)
            setErr(false)
            }}/>
        </View>

        <View style={styles.inputbox1}>
            <Text>New Password</Text>
            <TextInput style={styles.input1} secureTextEntry={true}  onChangeText={(b)=>{setPassword(b)
            setErr(false)
            setErr2('')
            }}/>
        </View>
  
        <View style={styles.inputbox2}>
            <Text>Confirm New Password</Text>
            <TextInput style={styles.input2} secureTextEntry={true}  onChangeText={(b)=>{setconfirmPassword(b)
            setErr(false)
            setErr2('')
            }}/>
        </View>
  
        {err&&<Text style={{fontWeight:'bold',color:'red',marginTop:5}}>Fill the fields...</Text>}
        {err2&&<Text style={{fontWeight:'bold',color:'red',marginTop:5}}>{err2}</Text>}
        {lock&&msg&&<Text style={{fontWeight:'bold',color:'red',marginTop:7}}>{msg}</Text>}
    </View>
    
  
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
        width:'80%',
        height:'70%',
        marginTop:38,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
      },
      subcontainer1:{
          width:'80%',
          height:40,
          marginTop:5,
        },
      inputboxcontainer:{
        width:'90%',
        height:100,
        marginTop:25,
  
    
      },
      inputbox1:{
        width:'100%'
    
      },inputbox2:{
        width:'100%',
        marginTop:8
      },
      input1:{
        width:'100%',
        height:40,
        backgroundColor:'white',
        borderWidth:0.5,
      },
      input2:{
        width:'100%',
        height:40,
        backgroundColor:'white',
        borderWidth:0.5
      },
      btn:{
        width:'90%',
        height:33,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'blue',
        marginTop:148
      }
    });

export default Setup