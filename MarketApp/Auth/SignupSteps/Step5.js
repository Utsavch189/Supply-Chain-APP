import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity,TextInput} from 'react-native';

function Step5({navigation}) {
    const[password,setPassword]=useState('');
    const[err,setErr]=useState(false);
    const route=useRoute();
  
    const press=()=>{
      if(password===''){
        setErr(true)
      }
  
      if(password!=''){
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
            <TextInput style={styles.input2} keyboardType="visible-password" onChangeText={(b)=>{setPassword(b)
            setErr(false)
            }}/>
    </View>
    {err&&<Text style={{fontWeight:'bold',color:'red',marginTop:5}}>must enter password...</Text>}
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
          marginTop:43
        }
    });

export default Step5