import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function Nav({role,state,navigation,data}) {
  return (
    <>
    <View style={styles.container}>
        {role==='Admin'?
        <View style={styles.subcontainer}>
            <Icon name='home' color={state==='home'&&'blue'} size={25} onPress={()=>{navigation.navigate('Admin Home',{
                data:data
            })}}/>
            <Icon name='users'color={state==='reqs'&&'blue'} size={25} onPress={()=>{navigation.navigate('Pendings',{
                data:data
            })}}/>
            <Icon name='check'color={state==='approved'&&'blue'} size={25} onPress={()=>{navigation.navigate('Approved Users',{
                data:data
            })}}/>              
            <Icon name='trash'color={state==='deletes'&&'blue'} size={25} onPress={()=>{navigation.navigate('Deleted Users',{
                data:data
            })}}/>   
        </View>

        :<></>
        }
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      height:'8%',
      width:'100%',
      position:'absolute',
      bottom:0,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',   
      zIndex:1000  
    },
    subcontainer:{
        width:'80%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    }
})


export default Nav