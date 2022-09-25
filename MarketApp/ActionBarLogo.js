import React from 'react'
import my_logo from'./Auth/Images/my_logo.jpeg'
import { Image } from 'react-native'

function ActionBarLogo() {
  return (
   <>

        <Image
        source={my_logo}
        style={{width:25,height:25,marginLeft:16}}
        />

   </>
  )
}

export default ActionBarLogo