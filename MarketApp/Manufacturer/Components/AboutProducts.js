import React from 'react'
import Modal from "react-native-modal";
import { View,Text,TouchableOpacity,TextInput,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import QRCode from 'react-native-qrcode-svg';

function AboutProducts({is_visible,set,data}) {
    console.log(data)
  return (
    <>
        <View style={{ backgroundColor:'white',position:'absolute',top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:480,width:"90%"}}>
    <Modal isVisible={is_visible}>
        <View style={{ backgroundColor:'white',position:'absolute',top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:430,width:"90%",display:'flex',flexDirection:'column',alignItems:'center',}}>
          <View style={{ width:"90%",display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',position:'absolute',top:0,marginTop:5}}>
                <Text style={{fontSize:10,fontWeight:'bold'}}>Your Product Details</Text>
                <TouchableOpacity onPress={()=>set(false)}>
                    <Icon name='close' size={25} color='red'/>
                </TouchableOpacity>
          </View>
        <View style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',width:"90%",marginTop:48}}>
            <Text style={{fontWeight:'bold',fontSize:18}}>Name - {data?.name}</Text>
            <Text style={{fontWeight:'bold',fontSize:18,marginTop:20}}>ID - {data?.id}</Text>
            <Text style={{fontWeight:'bold',fontSize:18,marginTop:20}}>Price Per Unit - {data?.price}</Text>
            <Text style={{fontWeight:'bold',fontSize:18,marginTop:20}}>Stock Left - {data?.quant}</Text>
        </View>
        <View style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:"50%",marginTop:50}}>
            <QRCode 
            value={data?.desc}
            size={150}
            bgColor='black'
            fgColor='white'/>
        </View>
        </View>
    </Modal>
    </View>
    </>
  )
}

const styles = StyleSheet.create({

})

export default AboutProducts