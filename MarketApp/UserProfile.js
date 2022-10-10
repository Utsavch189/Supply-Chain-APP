import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image} from 'react-native';


function UserProfile({navigation,name,role,email,phone,creates,id}) {
  return (
    <>
    <View style={styles.account}>
    <View style={styles.one}>
        <View style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',borderColor:'black',borderWidth:1,borderRadius:50,height:50,width:50}}>
            {name&&<Text style={{fontWeight:'bold',fontSize:25}}>{name.charAt(0)}</Text>}
        </View>
        <Text style={{fontSize:25}}>{name}</Text>
    </View>
    <View style={styles.two}>
      <View style={styles.section}>
        <Icon name='user-circle' size={25}/>
        <Text style={{fontSize:25}}>{role}</Text>
      </View>
      
      <View style={styles.section}>
        <Icon name='envelope' size={25}/>
        <Text style={{fontSize:13}}>{email}</Text>
      </View>

      <View style={styles.section}>
        <Icon name='phone' size={25}/>
        <Text style={{fontSize:20}}>{phone}</Text>
      </View>


      <View style={styles.section}>
        <Icon name='vcard' size={25}/>
        <Text style={{fontSize:15}}>{id}</Text>
      </View>

      <TouchableOpacity onPress={()=>{
          AsyncStorage.removeItem('token')
          navigation.navigate('Login')
      }}>
          <View style={styles.section1}>
            <Icon name='sign-out' size={25}/>
            <Text style={{fontSize:20}}>Logout</Text>
          </View>
      </TouchableOpacity>

      
    </View>
    
</View>
</>
  )
}

const styles = StyleSheet.create({

    account:{
      width:"86%",
      height:480,
      shadowColor: '#6B8E23',
      shadowOffset: {width: 2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3.6,   
      position:'absolute',
      marginTop:230,
      overflow:'hidden',

    },
    one:{
      width:"76%",
      height:40,
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      gap:17,
      marginTop:57
    },
    two:{
      width:"50%",
      height:280,
      display:'flex',
      flexDirection:'column',
      alignItems:'flex-start',
      marginTop:28,
      justifyContent:'flex-start'
    },
    section:{
      width:"90%",
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      gap:16,
      marginLeft:13,
      marginTop:22
    },
    section1:{
      width:"90%",
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      gap:13,
      marginLeft:13,
      marginTop:25
    }
})

export default UserProfile