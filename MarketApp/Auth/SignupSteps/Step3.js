import React from 'react'
import { StyleSheet, Text, View} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { useRoute } from '@react-navigation/native';

var radio_props = [
  { value: 'Male' },
  { value: 'Female' },
  { value: 'Other' }
];

function Step3({navigation}) {
  const route=useRoute();

  const press=(b)=>{
      navigation.navigate('Step 4',{
        fname:route.params.fname,
        lname:route.params.lname,
        number:route.params.number,
        email:route.params.email,
        whatsapp:route.params.whatsapp,
        gender:b
      })
  }

return (
  <>
  
<View style={styles.container}>

<View style={styles.subcontainer}>

<Text style={{fontWeight:'bold',fontSize:20}}>What is your gender?</Text>
<View style={{width:'80%'}}>
  <Text style={{marginTop:8,fontSize:13}}>Please enter your gender for identification.</Text>
</View>

  <View style={styles.btngrp}>

      <View>
          <Text>Male</Text>
          <Text style={{marginTop:21}}>Female</Text>
          <Text style={{marginTop:18}}>Others</Text>
      </View>

      <View>
          <RadioForm 
          radio_props={radio_props}
          initial={''}  
          onPress={(b)=>press(b)}
          />
      </View>
   
  </View>
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
  btngrp:{
      width:'66%',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      marginTop:55,
      height:120
  }
});


export default Step3