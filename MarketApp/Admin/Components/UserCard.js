import React from 'react';
import { StyleSheet,View,Text } from 'react-native'

function UserCard({data}) {

  return (
    <>
        <View style={styles.container}>
            <Text style={{fontWeight:'bold',fontSize:10}}>
                {data.name}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:10}}>
                {data.id}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:10}}>
                {data.role}
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
      shadowOffset: {width: 2, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 3,
      marginTop:15
    },})

export default UserCard