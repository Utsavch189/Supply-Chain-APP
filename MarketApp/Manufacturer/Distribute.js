import React,{useState,useEffect} from 'react'
import { View,Text,TouchableOpacity,TextInput,StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Nav from '../NavigationBar/Nav';
import QRscanner from '../Scanner/QRscanner';




function Distribute({navigation}) {

    const route=useRoute();

 
  return (
   <>
   <View style={styles.container}>
    <Nav role='Manufacturer' state='distribute' navigation={navigation} data={route.params.user} token={route.params.token}/>
    <QRscanner token={route.params.token}/>
   
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
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',     
    },

})

export default Distribute