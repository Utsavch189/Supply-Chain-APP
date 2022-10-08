import React from 'react'
import { View,StyleSheet,TouchableOpacity,Text } from 'react-native'

function HistoryNav({navigation,state,token,additional_data,type}) {

  return (
    <>
   {type==='distributor'?<>
   <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={()=>{
            navigation.navigate('Stock',{token:token,additional_data:additional_data})
        }}>
            <Text style={{color:state==='Stock'&&'blue'}}>Stock</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={()=>{
            navigation.navigate('Receive History',{token:token})
        }}>
            <Text style={{color:state==='Received'&&'blue'}}>Received</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={()=>{
            navigation.navigate('Distribute History',{token:token})
        }}>
            <Text style={{color:state==='Distributed'&&'blue'}}>Distributed</Text>
        </TouchableOpacity>
    </View>
   </>: type==='retailer'?
   <>
   <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={()=>{
            navigation.navigate('Retailer Stock',{token:token,additional_data:additional_data})
        }}>
            <Text style={{color:state==='Stock'&&'blue'}}>Stock</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={()=>{
            navigation.navigate('Retailer Receive History',{token:token})
        }}>
            <Text style={{color:state==='Received'&&'blue'}}>Received</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={()=>{
            navigation.navigate('Retailer Distribute History',{token:token})
        }}>
            <Text style={{color:state==='Distributed'&&'blue'}}>Distributed</Text>
        </TouchableOpacity>
    </View>
    </>
    :<></>}
    </>
  )
}
const styles = StyleSheet.create({
    container: {
        height:'6%',
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        position:'absolute',
        top:0,
        zIndex:100000
      },
    btn:{
        height:33,
        width:81,
        borderRadius:70,
        backgroundColor:'#e7f1fe',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }
    })
export default HistoryNav