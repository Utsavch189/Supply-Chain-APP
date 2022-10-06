import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';
import { View,StyleSheet } from 'react-native';
import Nav from '../NavigationBar/Nav';

function QRR({navigation}) {
  const route=useRoute();

  return (
    <>
        <Nav role='Retailer' state='QR' navigation={navigation} data={route.params.user} token={route.params.token}/>
        <View style={styles.container}>
            <QRCode 
            value={route.params.user?.id}
            size={200}
            bgColor='black'
            fgColor='white'/>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    height:'100%',
    width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  }
})

export default QRR