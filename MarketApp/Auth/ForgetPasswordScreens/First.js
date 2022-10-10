import React,{useState} from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native';

function First({navigation}) {
    const[password,setPassword]=useState('');
    const[email,setEmail]=useState('');
    const[confirmPassword,setconfirmPassword]=useState('');
    const[err,setErr]=useState(false);
    const[err2,setErr2]=useState('');

    const press=()=>{
      if(password==='' || email==='' || confirmPassword!=''){
        setErr(true)
      }
  
      if(password==='' || email==='' || confirmPassword!=''){
        if(password===confirmPassword){
            navigation.navigate('Second Step',{
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
            <TextInput style={styles.input2} secureTextEntry={true} onChangeText={(b)=>{setconfirmPassword(b)
            setErr(false)
            setErr2('')
            }}/>
        </View>
  
        {err&&<Text style={{fontWeight:'bold',color:'red',marginTop:5}}>Fill the fields...</Text>}
        {err2&&<Text style={{fontWeight:'bold',color:'red',marginTop:5}}>{err2}</Text>}
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
        marginTop:128
      }
    });

export default First