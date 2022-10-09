import React,{useState} from 'react'
import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native';

function Step1({navigation}) {
  const[fname,setFname]=useState('');
  const[lname,setLname]=useState('');
  const[err,setErr]=useState(false);


  const press=()=>{
    if(fname==='' || lname===''){
      setErr(true)
  
    }
    if(fname!='' || lname!=''){
    navigation.navigate('Step 2',{
      fname:fname,
      lname:lname
    });
  }
  }

  return (
    <>
      <View style={styles.container}>

          <View style={styles.subcontainer}>

              <Text style={{fontWeight:'bold',fontSize:20}}>What's your name ?</Text>
              <Text style={{marginTop:8,fontSize:13}}>Enter the name you use in real life.</Text>

              <View style={styles.inputboxcontainer}>
                <View style={styles.inputbox1}>
                    <Text>Firstname</Text>
                    <TextInput style={styles.input1} onChangeText={(b)=>{setFname(b)
                    setErr(false)
                    }} />
                </View>

                <View style={styles.inputbox2}>
                    <Text>Surname</Text>
                    <TextInput style={styles.input2} onChangeText={(b)=>{setLname(b)
                    setErr(false)
                    }} />
                </View>
                
            </View>

            {err&&<Text style={{fontWeight:'bold',color:'red'}}>Fill the fields...</Text>}
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
  inputboxcontainer:{
    width:'100%',
    height:100,
    marginTop:25,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',

  },
  inputbox1:{
    width:'48%',
    padding:11

  },inputbox2:{
    width:'48%',
    padding:11
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
    marginTop:30
  }
});

export default Step1