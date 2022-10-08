import React from 'react'
import my_logo from'./Auth/Images/my_logo.jpeg'
import { Image } from 'react-native'

function ActionBarLogo() {
  return (
   <>

        <Image
        source={my_logo}
        style={{width:20,height:20,marginLeft:13}}
        />

   </>
  )
}

export default ActionBarLogo