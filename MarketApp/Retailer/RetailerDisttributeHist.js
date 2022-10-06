import React,{useState,useEffect} from 'react'
import Nav from '../NavigationBar/Nav'
import Loader from '../Loader'
import { useRoute } from '@react-navigation/native'
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,ScrollView} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import HistoryNav from '../NavigationBar/HistoryNav';
import { url } from '../baseUrl';
import { myaxios } from '../authorizedaxios';

function RetailerDisttributeHist({navigation}) {
  const route=useRoute();
    const[head,setHead]=useState(null);
    const[data,setData]=useState(null);
    const[tittle,setTittle]=useState(null);

    useEffect(()=>{
      if(route.params.token){myaxios(JSON.parse(route.params.token)).get(`${url}/retailer/get_dayBYdayDistribute`)
      .then(res=>{
        setData(res['data'].data);
        setHead(res['data'].head);
        setTittle(res['data'].title);
      })}
    },[route.params.token])


    if(!data && !head && !tittle){
        return(
          <>
             <Nav role='Retailer' state='history' navigation={navigation} data={route.params.user} token={route.params.token}/>
            <HistoryNav navigation={navigation} state='Distributed' token={route.params.token} type='retailer'/>
            <Loader/>
          </>
        )
      }

  return (
    <>
    <View style={styles.container}>
   <Nav role='Retailer' state='history' navigation={navigation} data={route.params.user} token={route.params.token}/>
    <HistoryNav navigation={navigation} state='Distributed' token={route.params.token} type='retailer'/>
    <View style={{marginTop:60}}>
    <Table borderStyle={{borderWidth: 1}}>
          <Row data={head}  style={styles.head} textStyle={styles.text}/>
          <ScrollView horizontal={true} contentContainerStyle={styles.wrapper}>
          <TableWrapper style={styles.wrapper}>
          <Col data={tittle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
            <Rows data={data} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
          </ScrollView>
        </Table>
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

    
    },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row',width:"100%" },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center',fontSize:10 }
})
export default RetailerDisttributeHist