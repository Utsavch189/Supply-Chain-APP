import React,{useState} from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native';

function Step2({navigation}) {
  const route=useRoute()

  const[number,setNumber]=useState('');
  const[email,setEmail]=useState('');
  const[whatsapp,setWhatsapp]=useState('');
  const[err,setErr]=useState(false);

  const press=()=>{
    if(number==='' || email==='' || whatsapp!=''){
      setErr(true)
    }

    if(number!='' || email!='' || whatsapp!=''){
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
          <TextInput style={styles.input1} keyboardType="number-pad" onChangeText={(b)=>{setNumber(b)
          setErr(false)
          }}/>
      </View>

      <View style={styles.inputbox2}>
          <Text>WhatsApp No.</Text>
          <TextInput style={styles.input2} keyboardType="number-pad" onChangeText={(b)=>{setWhatsapp(b)
          setErr(false)
          }}/>
      </View>

      <View style={styles.inputbox2}>
          <Text>Email</Text>
          <TextInput style={styles.input2} keyboardType="email-address" onChangeText={(b)=>{setEmail(b)
          setErr(false)
          }}/>
      </View>

      {err&&<Text style={{fontWeight:'bold',color:'red',marginTop:5}}>Fill the fields...</Text>}
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
        marginTop:5,
      },
    inputboxcontainer:{
      width:'100%',
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
      width:'100%',
      height:33,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'blue',
      marginTop:128
    }
  });

export default Step2