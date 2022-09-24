import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native';


function Loader() {
  return (
      <View style={styles.container}>
             <ActivityIndicator size="large"/>
      </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },

  });

export default Loader