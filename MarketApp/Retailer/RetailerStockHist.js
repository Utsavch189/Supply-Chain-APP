import React,{useState,useEffect} from 'react'
import Nav from '../NavigationBar/Nav'
import Loader from '../Loader'
import { useRoute } from '@react-navigation/native'
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,ScrollView} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import HistoryNav from '../NavigationBar/HistoryNav';


function RetailerStockHist({navigation}) {
  const route=useRoute();
  const[head,setHead]=useState(null);
  const[data,setData]=useState(null);

  useEffect(()=>{
      if(route.params.additional_data){
      setData(route.params.additional_data.data);
      setHead(route.params.additional_data.head);}
  },[route.params.token,route.params.additional_data])

  if(!data && !head){
      return(
        <>
        <Nav role='Retailer' state='history' navigation={navigation} data={route.params.user} token={route.params.token}/>
          <HistoryNav navigation={navigation} state='Stock' token={route.params.token} additional_data={route.params.additional_data}/>
        <Loader/>
        </>
      )
    }

return (
 <>
 <View style={styles.container}>
 <Nav role='Retailer' state='history' navigation={navigation} data={route.params.user} token={route.params.token}/>
  <HistoryNav navigation={navigation} state='Stock' token={route.params.token} additional_data={route.params.additional_data} type='retailer'/>
  <View style={{marginTop:60}}>
  <Table borderStyle={{borderWidth: 1}}>
        <Row data={head}  style={styles.head} textStyle={styles.text}/>
        <ScrollView horizontal={true} contentContainerStyle={styles.wrapper}>
        <TableWrapper style={styles.wrapper}>
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

export default RetailerStockHist