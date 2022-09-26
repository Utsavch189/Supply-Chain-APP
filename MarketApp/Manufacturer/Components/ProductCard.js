import React from 'react'
import { StyleSheet,View,Text } from 'react-native'

function ProductCard({data}) {
    return (
        <>
            <View style={styles.container}>
              <View style={{height:30,width:30,borderColor:'black',borderWidth:1,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              {data.name&&<Text style={{fontWeight:'bold',fontSize:10}}>{(data.name).charAt(0)}</Text>}
              </View>
                <Text style={{fontWeight:'bold',fontSize:10}}>
                    {data.name}
                </Text>
                <Text style={{fontWeight:'bold',fontSize:10}}>
                    {data.quant}
                </Text>
            </View>
        </>
      )
    }
    
    const styles = StyleSheet.create({
        container: {
         
          height:60,
          width:330,
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-around',   
          shadowColor: '#556B2F',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.3,
          shadowRadius: 3,
          marginTop:15
        },})

export default ProductCard