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
      backgroundColor: '#F2F3F5',
      height:60,
      width:'80%',
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',   
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },})

export default UserCard