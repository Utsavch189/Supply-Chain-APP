import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function Nav({role,state,navigation,data,token,additional_data}) {
  return (
    <>
    <View style={styles.container}>
        {role==='Admin'?
        <View style={styles.subcontainer}>
            <Icon name='home' color={state==='home'&&'blue'} size={29} onPress={()=>{navigation.navigate('Admin Home',{
                user:data,token:token
            })}}/>
            <Icon name='users'color={state==='reqs'&&'blue'} size={28} onPress={()=>{navigation.navigate('Pendings',{
                user:data,token:token
            })}}/>
            <Icon name='check'color={state==='approved'&&'blue'} size={29} onPress={()=>{navigation.navigate('Approved Users',{
                user:data,token:token
            })}}/>              
            <Icon name='trash'color={state==='deletes'&&'blue'} size={29} onPress={()=>{navigation.navigate('Deleted Users',{
                user:data,token:token
            })}}/>   
        </View>

        :role==='Manufacturer'?
        <View style={styles.subcontainer}>
            <Icon name='home' color={state==='home'&&'blue'} size={29} onPress={()=>{navigation.navigate('Manufacturer Home',{
                user:data,token:token
            })}}/>  
             <Icon name='plus-circle' color={state==='add_products'&&'blue'} size={29} onPress={()=>{navigation.navigate('AddProduct',{
                user:data,token:token
            })}}/>
               
            <Icon name='share-square-o' color={state==='distribute'&&'blue'} size={29} onPress={()=>{navigation.navigate('Distribution',{
                user:data,token:token
            })}}/>
            <Icon name='hourglass' color={state==='history'&&'blue'} size={29} onPress={()=>{navigation.navigate('History',{
                user:data,token:token
            })}}/>
        </View>
        :role==='Distributor'?<>
        
        <View style={styles.subcontainer}>
            <Icon name='home' color={state==='home'&&'blue'} size={29} onPress={()=>{navigation.navigate('Distributor Home',{
                user:data,token:token
            })}}/>  
            <Icon name='hourglass' color={state==='history'&&'blue'} size={25} onPress={()=>{navigation.navigate('Stock',{
                user:data,token:token,additional_data:additional_data
            })}}/>
            <Icon name='share-square-o' color={state==='distribute'&&'blue'} size={29} onPress={()=>{navigation.navigate('Distribution',{
                user:data,token:token
            })}}/>
            <Icon name='user' color={state==='QR'&&'blue'} size={29} onPress={()=>{navigation.navigate('QR Code',{
                user:data,token:token
            })}}/>
        </View>
        </>:
        role==='Retailer'?
        
        <View style={styles.subcontainer}>
            <Icon name='home' color={state==='home'&&'blue'} size={29} onPress={()=>{navigation.navigate('Retailer Home',{
                user:data,token:token
            })}}/>  
            <Icon name='hourglass' color={state==='history'&&'blue'} size={25} onPress={()=>{navigation.navigate('Retailer Stock',{
                user:data,token:token,additional_data:additional_data
            })}}/>
            <Icon name='share-square-o' color={state==='distribute'&&'blue'} size={29} onPress={()=>{navigation.navigate('Retailer Distribution',{
                user:data,token:token
            })}}/>
            <Icon name='user' color={state==='QR'&&'blue'} size={29} onPress={()=>{navigation.navigate('Retailer QR Code',{
                user:data,token:token
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
      height:'11.5%',
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
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor:'white',
        height:'100%'
    }
})


export default Nav