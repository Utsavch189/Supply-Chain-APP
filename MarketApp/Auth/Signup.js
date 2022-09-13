import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image} from 'react-native';
import signup1 from './Images/signup1.jpg'


function Signup({navigation}) {
  return (
    <>
    <View style={styles.container}>

<View style={styles.subcontainer}>

    <Image style={styles.image}
      source={signup1}
    />

    <Text style={{fontWeight:'bold',fontSize:20,marginTop:30}}>Join Shop Community</Text>
    <Text style={{marginTop:15}}>We will help you create a new account in a few easy steps.</Text>

    <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Step 1')}>
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
  width:'94%',
  height:'70%',
  marginTop:60,
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
 
},
image:{
  height:130,
  width:130
},
btn:{
  width:'100%',
  height:33,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'blue',
  marginTop:35
}

});

export default Signup