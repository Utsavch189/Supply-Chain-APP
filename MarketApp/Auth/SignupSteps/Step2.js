import React,{useState,useEffect} from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native';
import axios from 'axios';

function Step2({navigation}) {
  const route=useRoute()

  const[number,setNumber]=useState('');
  const[email,setEmail]=useState('');
  const[whatsapp,setWhatsapp]=useState('');
  const[err,setErr]=useState('');
  const[email_err,setEmail_Err]=useState('');
  const[phone_err,setPhone_Err]=useState('');
  const [elock,setELock]=useState(false)
  const [plock,setPLock]=useState(true)
  const[email_success,setEmail_Success]=useState('');
  

  function email_validate(emails) {
    axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=c5c66b0590814f0991853d1d9f3fc183&email=${emails}`)
    .then(res=>{
      if(res['data']['is_valid_format'].value===true){
        if(res['data']['quality_score']!==0.00){
          setELock(false)
          setEmail_Success('Email Validation Passed')
        }
      }
      else{
        setELock(true)
        setEmail_Err('Email Validation Failed')
      }
      
    })
}

//function phone_validation(){
  //axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=f0c05605a996485d9945695d966acbe3&phone=${number}`)
  //.then(res=>{
    //if(res['data'].valid===true){
      //setPLock(false)
      //setPhone_Err('')
      //console.log(res['data'])
    //}
    //else{
      //setPLock(true)
      //setPhone_Err('Invalid Number')
    //}
  //})
//}



useEffect(()=>{
  if((number.length===0&&whatsapp.length===0)||number.length===0||whatsapp.length===0){
    setPLock(true)
    setPhone_Err('')
  }
  else if(number.length<10||whatsapp.length<10||(number.length<10&&whatsapp.length<10)){
    setPLock(true)
    setPhone_Err('Invalid Number')
  }
  else{
    setPLock(false)
    setPhone_Err('')
  }
  if(email){
  email_validate(email)
  }
},[number,whatsapp,email])


  //const validate=()=>{
    //email_validate();
  //}


  const press=()=>{


    if((number==='' || email==='' || whatsapp==='')){
      setErr('Fill the fields...')
    }
   
    if((number!='' && email!='' && whatsapp!='')&&!elock&&!plock){
    navigation.navigate('Step 3',{
      fname:route.params.fname,
      lname:route.params.lname,
      number:number,
      email:email,
      whatsapp:whatsapp
    });
  }
  }
  

  return (
<>

<View style={styles.container}>

  <View style={styles.subcontainer}>

    
    <Text style={{fontWeight:'bold',fontSize:20}}>Enter your mobile number and email.</Text>
    <View style={styles.subcontainer1}>
        <Text style={{marginTop:8,fontSize:13}}>Enter the mobile number and email address at which you can be contacted.</Text>
    </View>
    

    <View style={styles.inputboxcontainer}>
      <View style={styles.inputbox1}>
          <Text>Mobile No.</Text>
          <TextInput style={plock?styles.input1:styles.input11} keyboardType="number-pad" onChangeText={(b)=>{setNumber(b)
          setErr(false)
          }}/>
      </View>

      <View style={styles.inputbox2}>
          <Text>WhatsApp No.</Text>
          <TextInput style={plock?styles.input2:styles.input11} keyboardType="number-pad" onChangeText={(b)=>{setWhatsapp(b)
          setErr(false)
          }}/>
      </View>

      <View style={styles.inputbox2}>
          <Text>Email</Text>
          <TextInput style={elock?styles.input2:styles.input22} keyboardType="email-address" onChangeText={(b)=>{setEmail(b)
          setErr(false)
          }}/>
      </View>

      {err&&<Text style={{fontWeight:'bold',color:'red',marginTop:5}}>{err}</Text>}
      {email_err&&<Text style={{fontWeight:'bold',color:'red',marginTop:5}}>{email_err}</Text>}
      {phone_err&&<Text style={{fontWeight:'bold',color:'red',marginTop:5}}>{phone_err}</Text>}
      {email_success&&<Text style={{fontWeight:'bold',color:'green',marginTop:5}}>{email_success}</Text>}
  </View>
  
    {/*<TouchableOpacity style={styles.btn1} onPress={validate}>
        <Text style={{color:'white'}}>Validate email</Text>
    </TouchableOpacity>
        */}
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
      height:'70%',
      marginTop:38,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
    },
    subcontainer1:{
        width:'82%',
        height:40,
        marginTop:10,
      },
    inputboxcontainer:{
      width:'90%',
      height:100,
      marginTop:30,

  
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
    input11:{
      width:'100%',
      height:40,
      backgroundColor:'white',
      borderWidth:1.3,
      borderColor:'green'
    },
    input2:{
      width:'100%',
      height:40,
      backgroundColor:'white',
      borderWidth:0.5
    },
    input22:{
      width:'100%',
      height:40,
      backgroundColor:'white',
      borderWidth:1.3,
      borderColor:'green'
    },
    btn:{
      width:'90%',
      height:33,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'blue',
      marginTop:165
    },
    btn1:{
      width:'50%',
      height:33,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'green',
      marginTop:135
    }
  });

export default Step2