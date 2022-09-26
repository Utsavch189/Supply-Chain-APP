import React,{useState} from 'react'
import Modal from "react-native-modal";
import { View,Text,TouchableOpacity,TextInput,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { url } from '../../baseUrl';
import { myaxios } from '../../authorizedaxios';


function AddProductModal({is_visible,set,token}) {

    const[name,setName]=useState('');
    const[price,setPrice]=useState('');
    const[desc,setDesc]=useState('');
    const[pid,setPid]=useState('');

    const submit=()=>{
        myaxios(JSON.parse(token)).post(`${url}/manufacturer/set_and_update_products`,{"name":name,"price":price,"desc":desc,"p_id":pid})
        .then(res=>console.log(res))
    }


  return (
    <View style={{ backgroundColor:'white',position:'absolute',top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:480,width:"90%"}}>
    <Modal isVisible={is_visible}>
        <View style={{ backgroundColor:'white',position:'absolute',top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:480,width:"90%",display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <View style={{ width:"90%",display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',position:'absolute',top:0,marginTop:5}}>
                <Text style={{fontSize:10,fontWeight:'bold'}}>Add or Update Your Launched Product</Text>
                <TouchableOpacity onPress={()=>set(false)}>
                    <Icon name='close' size={25} color='red'/>
                </TouchableOpacity>
          </View>
          <TextInput placeholder='Enter Product Name' onChangeText={(b)=>setName(b)} style={styles.input}/>
          <TextInput keyboardType='numeric' placeholder='Enter Product Price' onChangeText={(b)=>setPrice(b)} style={styles.input}/>
          <TextInput placeholder='Enter Product Description' onChangeText={(b)=>setDesc(b)} style={styles.textarea}/>
          <TextInput placeholder='Enter Product ID if want to update' onChangeText={(b)=>setPid(b)} style={styles.input}/>
          <View style={{ width:"90%",display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',position:'absolute',bottom:0,marginBottom:5}}>
                <TouchableOpacity onPress={()=>submit()}>
                    <Icon name='upload' size={25} color='green'/>
                </TouchableOpacity>
          </View>
        </View>
    </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    input:{
        height: 40,
        borderWidth: 0.6,
        padding: 10,
        width:'90%',
        marginTop:10,
        borderRadius:8
    },
    textarea:{
        height: 140,
        borderWidth: 0.6,
        padding: 10,
        width:'90%',
        marginTop:10,
        borderRadius:8
    }
})
export default AddProductModal