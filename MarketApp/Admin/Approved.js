import React from 'react'
import Nav from '../NavigationBar/Nav'
import { useRoute } from '@react-navigation/native'

function Approved({navigation}) {
    const route=useRoute();
  return (
    <>
    <Nav role='Admin' state='approved' navigation={navigation} data={route.params.data} />
    </>
  )
}

export default Approved