import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function Nav({role,state,navigation,data,token}) {
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

        :role==='Manufacturer'?
        <View style={styles.subcontainer}>
            <Icon name='home' color={state==='home'&&'blue'} size={25} onPress={()=>{navigation.navigate('Manufacturer Home',{
                data:data,token:token
            })}}/>  
             <Icon name='plus-circle' color={state==='add_products'&&'blue'} size={25} onPress={()=>{navigation.navigate('AddProduct',{
                data:data,token:token
            })}}/>
               
            <Icon name='share-square-o' color={state==='distribute'&&'blue'} size={25} onPress={()=>{navigation.navigate('Distribution',{
                data:data,token:token
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
      backgroundColor: 'white ',
      height:'8.5%',
      width:'100%',
      position:'absolute',
      bottom:0,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',   
      zIndex:1000  ,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    subcontainer:{
        width:'80%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white',
        height:'100%'
    }
})


export default Nav