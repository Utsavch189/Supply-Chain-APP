import { useRoute } from '@react-navigation/native';
import React,{useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,TextInput} from 'react-native';
import { url } from '../../baseUrl';
import axios from 'axios';

function Final({navigation}) {

  const route=useRoute();

  const[err,setErr]=useState('');

  const data={
    fname:route.params.fname,
    lname:route.params.lname,
    number:route.params.number,
    email:route.params.email,
    whatsapp:route.params.whatsapp,
    gender:route.params.gender,
    role:route.params.role,
    password:route.params.password
}

const go=()=>{
  axios.post(`${url}/auth/createuser`,data)
    .then(function (response) {
        if(response['status']===200){
        navigation.navigate('Login',{
          msgs:response['msg']
        })
        }
        else{
          setErr(response['msg'])
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

return (
  <>
      <View style={styles.container}>

<View style={styles.subcontainer}>

<Text style={{fontWeight:'bold',fontSize:20}}>Finish signing up</Text>
<View style={{width:'80%'}}>
  <Text style={{marginTop:8,fontSize:13}}>People who use our service may have uploaded your contact information to App.</Text>
  <Text style={{marginTop:6,fontSize:13}}>By tapping sign up you will redirect to Login.You can login by using your registered email and your created password.</Text>
</View>

<TouchableOpacity style={styles.btn} onPress={()=>go()}>
      <Text style={{color:'white'}}>Sign Up</Text>
  </TouchableOpacity>

</View>
{err&&<Text style={{fontWeight:'bold',color:'red',marginTop:5}}>{err}</Text>}
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

export default Final