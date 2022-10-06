import React,{useState,useEffect} from 'react';
import Modal from "react-native-modal";
import { View,Text,TouchableOpacity,TextInput,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { url } from '../baseUrl';
import { myaxios } from '../authorizedaxios';
import { Dropdown } from 'react-native-element-dropdown';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

import Loader from '../Loader';
const screenWidth = Dimensions.get("window").width-35;

const chartConfig = {
  backgroundGradientFrom: "#0b70a8",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#0b70a8",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(92, 49, 245, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(92, 49, 245, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};


function AfterScan({is_visible,token,set,userID,get_p_endpoint,get_user_endpoint,post_distribute_endpoint,post_dayBydaydistribute_endpoint,state}) {

  const[data,setData]=useState([]);
  const [value, setValue] = useState('');
  const[quant,setQuant]=useState('');
  const[user,setUser]=useState(null);
  const[history,setHistory]=useState(null);
  const[msg,setMsg]=useState('');

  useEffect(()=>{
    myaxios(JSON.parse(token)).get(`${url}/${get_p_endpoint}`)
    .then(res=>{
      if(state==='distributor'||state==='retailer'){
        for(let i=0;i<res['data'].products.length;i++){
        
          let resu={
              "label":res['data'].products[i]['name'],
              "value":res['data'].products[i]['id']
          }
          setData(s=>[...s,resu])
        }
      }
      else{
      for(let i=0;i<res['data'].data.length;i++){
        
        let resu={
            "label":res['data'].data[i]['name'],
            "value":res['data'].data[i]['id']
        }
        setData(s=>[...s,resu])
      }
    }
    })
    myaxios(JSON.parse(token)).post(`${url}/${get_user_endpoint}`,{"u_id":userID})
    .then(res=>{
      setUser(res['data'].user)
                setHistory(res['data'].history)
  })
  },[token,get_p_endpoint,get_user_endpoint])

  const distribute=()=>{
    if(state==='distributor'||state==='retailer'){
      myaxios(JSON.parse(token)).post(`${url}/${post_distribute_endpoint}`,{"p_id":value,"retailer_id":userID,"quant":quant})
      .then(res=>{
        setMsg(res['data'].msg)
      })
      myaxios(JSON.parse(token)).post(`${url}/${post_dayBydaydistribute_endpoint}`,{"p_id":value,"retailer_id":userID,"quant":quant})
      .then(res=>{
          setMsg(res['data'].msg)
      })
    }
    else{
    myaxios(JSON.parse(token)).post(`${url}/${post_distribute_endpoint}`,{"p_id":value,"dist_id":userID,"quant":quant})
    .then(res=>{
        setMsg(res['data'].msg)
    })
    myaxios(JSON.parse(token)).post(`${url}/${post_dayBydaydistribute_endpoint}`,{"p_id":value,"dist_id":userID,"quant":quant})
    .then(res=>{
      setMsg(res['data'].msg)
    })
  }
  }

  if(!data){
    return(<Loader/>)
  }

  return (
    <>
     <View style={{ backgroundColor:'white',position:'absolute',top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:680,width:"90%"}}>
    <Modal isVisible={is_visible} >
        <View style={{ backgroundColor:'white',height:650,width:"90%",display:'flex',flexDirection:'column',alignItems:'center',position:'absolute',top:"50%",left:"50%",transform:"translate(-50%,-50%)",}}>
          {msg&&<Text style={{fontWeight:'bold'}}>{msg}</Text>}
        <View style={{ width:"90%",display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',position:'absolute',top:0,marginTop:5}}>
                <TouchableOpacity onPress={()=>set(false)}>
                    <Icon name='close' size={25} color='red'/>
                </TouchableOpacity>
          </View>

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

                 <View style={{width:"100%",display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                    <TextInput style={styles.input} keyboardType='numeric' onChangeText={(b)=>{
                      setMsg('')
                      setQuant(b)
                    }} placeholder='Enter Quantity'/>
                    <TouchableOpacity onPress={()=>distribute()}>
                      <Icon name='share' size={25} color='green'/>
                    </TouchableOpacity>   
                 </View>

                {user&&<View style={{width:"80%",display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',marginTop:40}}>
                    <Text style={{fontWeight:'bold'}}>Name - {user[0]['name']}</Text>
                    <Text style={{fontWeight:'bold',marginTop:20}}>Email - {user[0]['email']}</Text>
                    <Text style={{fontWeight:'bold',marginTop:10}}>Gender - {user[0]['gender']}</Text>
                    <Text style={{fontWeight:'bold',marginTop:10}}>Phone - {user[0]['phone']}</Text>
                    <Text style={{fontWeight:'bold',marginTop:10}}>WhatsApp - {user[0]['whatsapp']}</Text>
                    <Text style={{fontWeight:'bold',marginTop:10}}>Role - {user[0]['role']}</Text>
                    <Text style={{fontWeight:'bold',marginTop:10}}>ID - {user[0]['id']}</Text>
                </View>}

                 {history&& <View style={styles.chart}>
                 <Text style={{fontWeight:'bold'}}>History of Distribution to {user[0]['name']}</Text>
                  <PieChart
                  data={history}
                  width={screenWidth}
                  height={120}
                  chartConfig={chartConfig}
                  accessor={"quant"}
                  backgroundColor={"transparent"}
                  center={[5, 5]}
                  absolute
                />
              </View>}

        </View>
    </Modal>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
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
  input:{
    height: 40,
    borderWidth: 0.6,
    padding: 10,
    width:'40%',
    marginTop:10,
},
chart:{
  width:"90%",
  height:230,
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'center', 
  position:'absolute',
  bottom:0,


},
});

export default AfterScan