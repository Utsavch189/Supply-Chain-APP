import React,{useState,useEffect} from 'react'
import { View,Text,TouchableOpacity,TextInput,StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Nav from '../NavigationBar/Nav';
import { myaxios } from '../authorizedaxios';
import { url } from '../baseUrl';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

function DistributeR({navigation}) {
  const route=useRoute();
  const[data,setData]=useState([]);
  const [value, setValue] = useState('');
  const[quant,setQuant]=useState('');
  const[msg,setMsg]=useState('');

  useEffect(()=>{
    if(route.params.token){
      myaxios(JSON.parse(route.params.token)).get(`${url}/retailer/get_stock`)
      .then(res=>{
        for(let i=0;i<res['data'].products.length;i++){
        
          let resu={
              "label":res['data'].products[i]['name'],
              "value":res['data'].products[i]['id']
          }
          setData(s=>[...s,resu])
        }
      })
    }
  },[route.params.token])

  const distribute=()=>{
    myaxios(JSON.parse(route.params.token)).post(`${url}/retailer/distribute`,{"p_id":value,"quant":quant})
      .then(res=>{
        console.log(res)
        setMsg(res['data'].msg)
      })
      myaxios(JSON.parse(route.params.token)).post(`${url}/retailer/post_dayBYdayDistribute`,{"p_id":value,"quant":quant})
      .then(res=>{
          
      })
  }

  if(!data){
    return(
      <>
      <Nav role='Retailer' state='distribute' navigation={navigation} data={route.params.user} token={route.params.token}/>
      <Loader/>
      </>
    
    )
  }

  return (
    <>
     <Nav role='Retailer' state='distribute' navigation={navigation} data={route.params.user} token={route.params.token}/>
<View style={{display:'flex',width:'100%',flexDirection:'column',alignItems:'center'}}>
{msg&&<Text style={{fontWeight:'bold',marginTop:10}}>{msg}</Text>}
{ data&&<Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                setValue(item.value);
                setMsg('');
                 }}
                />}
</View>

    <View style={styles.container}>
                 <View style={{width:"80%",display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginBottom:205}}>
                    <TextInput style={styles.input} keyboardType='numeric' onChangeText={(b)=>{
                      setMsg('')
                      setQuant(b)
                    }} placeholder='Enter Quantity'/>
                    <TouchableOpacity onPress={()=>distribute()}>
                      <Icon name='share' size={25} color='green'/>
                    </TouchableOpacity>   
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
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',     
  },  input:{
    height: 40,
    borderWidth: 0.6,
    padding: 10,
    width:'40%',
    marginTop:10,
},
dropdown: {
  margin: 16,
  height: 50,
  borderBottomColor: 'gray',
  borderBottomWidth: 0.5,
  width:"70%",
  marginTop:55
},
icon: {
  marginRight: 5,
},
placeholderStyle: {
  fontSize: 16,
},
selectedTextStyle: {
  fontSize: 16,
},
iconStyle: {
  width: 20,
  height: 20,
},
inputSearchStyle: {
  height: 40,
  fontSize: 16,
},
})

export default DistributeR