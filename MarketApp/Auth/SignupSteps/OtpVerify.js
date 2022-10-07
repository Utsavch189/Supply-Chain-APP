import React,{useState,useRef,useEffect} from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native';
import { url } from '../../baseUrl';
import axios from 'axios';

function OtpVerify({navigation}) {
    const[emailfirst,setEmailFirst]=useState(0)
    const[emailsecond,setEmailSecond]=useState(0)
    const[emailthird,setEmailThird]=useState(0)
    const[emailfourth,setEmailFourth]=useState(0)

    const[phonefirst,setPhoneFirst]=useState(0)
    const[phonesecond,setPhoneSecond]=useState(0)
    const[phonethird,setPhoneThird]=useState(0)
    const[phonefourth,setPhoneFourth]=useState(0)

    const[err,setErr]=useState('');
    const route=useRoute();

    useEffect(()=>{
        axios.post(`${url}/auth/sendotp_middlereg`,{
            'email':route.params.email,
            'phone':route.params.number,
            'type':'not-authenticated'
        })
        .catch(function (error) {
            console.log(error);
        });
    },[])

    const press=()=>{
        axios.post(`${url}/auth/verify_middlereg`,{
            'email':route.params.email,
            'phone':route.params.number,
            'ef':emailfirst,
            'es':emailsecond,
            'et':emailthird,
            'efo':emailfourth,

            'pf':phonefirst,
            'ps':phonesecond,
            'pt':phonethird,
            'pfo':phonefourth,
            
        })
        .then(res=>{
            if(res['data']['status']===200){
                navigation.navigate('Final',{
                    fname:route.params.fname,
                    lname:route.params.lname,
                    number:route.params.number,
                    email:route.params.email,
                    whatsapp:route.params.whatsapp,
                    gender:route.params.gender,
                    role:route.params.role,
                    password:route.params.password
                  })
            }
            else{
                setErr(res['data']['msg'])
            }
        })
    }

  return (
    <>
     <View style={styles.container}>
        <View style={{width:'80%'}}>
        <Text style={{fontWeight:'bold',fontSize:20,marginTop:50}}>Enter your OTP that you receive in your email.</Text>
        </View>
      
        <View style={styles.fields}>
            <TextInput keyboardType="number-pad" style={{height:50,width:50,borderColor:'black',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center'}} value={emailfirst} onChangeText={(b)=>setEmailFirst(b)} />
            <TextInput keyboardType="number-pad" style={{height:50,width:50,borderColor:'black',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center'}} value={emailsecond} onChangeText={(b)=>setEmailSecond(b)} />
            <TextInput keyboardType="number-pad" style={{height:50,width:50,borderColor:'black',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center'}} value={emailthird} onChangeText={(b)=>setEmailThird(b)} />
            <TextInput keyboardType="number-pad" style={{height:50,width:50,borderColor:'black',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center'}} value={emailfourth} onChangeText={(b)=>setEmailFourth(b)} />
        </View>

        <View style={{width:'80%',marginTop:30}}>
        <Text style={{fontWeight:'bold',fontSize:20,marginTop:50}}>Enter your OTP that you receive in your phone number.</Text>
        </View>
      
        <View style={styles.fields1}>
            <TextInput keyboardType="number-pad" style={{height:50,width:50,borderColor:'black',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center'}} value={phonefirst} onChangeText={(b)=>setPhoneFirst(b)} />
            <TextInput keyboardType="number-pad" style={{height:50,width:50,borderColor:'black',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center'}} value={phonesecond} onChangeText={(b)=>setPhoneSecond(b)} />
            <TextInput keyboardType="number-pad" style={{height:50,width:50,borderColor:'black',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center'}} value={phonethird} onChangeText={(b)=>setPhoneThird(b)} />
            <TextInput keyboardType="number-pad" style={{height:50,width:50,borderColor:'black',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center'}} value={phonefourth} onChangeText={(b)=>setPhoneFourth(b)} />
        </View>

        {err&&<Text style={{fontWeight:'bold',color:'red',marginTop:15}}>{err}</Text>}
        <TouchableOpacity style={styles.btn} onPress={press}>
          <Text style={{color:'white'}}>Send</Text>
      </TouchableOpacity>
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
    fields:{
        width:'70%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        height:90,
        marginTop:150
    },
    fields1:{
        width:'70%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        height:90,
        marginTop:50
    },
    btn:{
        width:'70%',
        height:33,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'blue',
        marginTop:50
      }
})

export default OtpVerify