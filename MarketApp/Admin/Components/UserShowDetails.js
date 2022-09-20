import React from 'react'
import { StyleSheet,View,Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

function UserShowDetails({navigation}) {
    const route=useRoute();
    console.log(route.params.data)
  return (
    <>
    <View>
        hi
    </View>
    </>
  )
}

export default UserShowDetails