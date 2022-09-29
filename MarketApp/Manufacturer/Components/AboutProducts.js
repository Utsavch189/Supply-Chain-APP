import React,{useState} from 'react'
import Modal from "react-native-modal";
import { View,Text,TouchableOpacity,TextInput,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import QRCode from 'react-native-qrcode-svg';
import { url } from '../../baseUrl';
import { myaxios } from '../../authorizedaxios';

function AboutProducts({is_visible,set,data,token}) {

    const[stock,setStock]=useState('');


    const submit=()=>{
        if(token){
            myaxios(JSON.parse(token)).post(`${url}/manufacturer/entry_production`,{"product_no":stock,"p_id":data?.id})
            .then(res=>{
                console.log(res)
            })
            myaxios(JSON.parse(token)).post(`${url}/manufacturer/DayByDayEntry`,{"product_no":stock,"p_id":data?.id})
            .then(res=>{
                if(res['data'].status==200){set(false)}
            })
            }
    }

    const deletes=()=>{
        if(token){
            myaxios(JSON.parse(token)).post(`${url}/manufacturer/set_delete_update_products`,{"msg":"delete","p_id":data?.id})
            .then(res=>{
                if(res['data'].status==200){set(false)}
            })
            }
    }
    
  return (
    <>
        <View style={{ backgroundColor:'white',position:'absolute',top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:380,width:"90%"}}>
    <Modal isVisible={is_visible}>
        <View style={{ backgroundColor:'white',position:'absolute',top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:380,width:"90%",display:'flex',flexDirection:'column',alignItems:'center',}}>
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
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:"100%",marginTop:28}}>
            <View>
            <TextInput style={styles.input} keyboardType='numeric' onChangeText={(b)=>setStock(b)} placeholder='Enter New Stock Quantity'/>

            <TouchableOpacity onPress={()=>submit()} style={{marginTop:11,marginLeft:10}}>
                <Icon name='upload' size={25} color='green'/>
            </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>deletes()} >
                <Icon name='trash' size={25} color='red'/>
            </TouchableOpacity>
        </View>
        </View>
    </Modal>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    input:{
        height: 40,
        borderWidth: 0.6,
        padding: 10,
        width:'70%',
        marginTop:10,
        borderRadius:8
    },
})

export default AboutProducts