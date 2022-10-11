import React,{useState,useEffect} from 'react'
import { View,Text,TouchableOpacity,TextInput,StyleSheet } from 'react-native';
import { url } from './baseUrl';
import { myaxios } from './authorizedaxios';
import Loader from './Loader';
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

function GraphView({end_point,token}) {
    const[data,setData]=useState(null);

    useEffect(()=>{
        if(token){
            myaxios(JSON.parse(token)).get(`${url}/${end_point}`)
            .then(res=>{
                console.log(res)
                setData(res['data'])
            })
        }
    },[token])

    if(!data){
        return(
          <Loader/>
        )
      }

  return (
    <>
    <View style={styles.chart}>
    {data&&<PieChart
        donut
        showText
        textColor="black"
        innerRadius={70}
        showTextBackground
        textBackgroundColor="white"
        textBackgroundRadius={22}
        data={data}
        />}
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    chart:{
      width:"90%",
      height:160,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      shadowColor: '#556B2F',
      shadowOffset: {width: -2, height: 5},
      shadowOpacity: 0.2,
      shadowRadius: 3.6,   
      position:'absolute',
      top:0,
      marginTop:40
    },

})

export default GraphView