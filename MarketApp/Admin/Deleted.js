import React from 'react'
import Nav from '../NavigationBar/Nav'
import { useRoute } from '@react-navigation/native'

function Deleted({navigation}) {
    const route=useRoute();
  return (
    <>
    <Nav role='Admin' state='deletes' navigation={navigation} data={route.params.data}/>
    </>
  )
}

export default Deleted