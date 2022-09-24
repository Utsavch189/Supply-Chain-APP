import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import Home from './Home';
import Step1 from './Auth/SignupSteps/Step1';
import Step2 from './Auth/SignupSteps/Step2';
import Step3 from './Auth/SignupSteps/Step3';
import Step4 from './Auth/SignupSteps/Step4';
import Step5 from './Auth/SignupSteps/Step5';
import Final from './Auth/SignupSteps/Final';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import First from './Auth/ForgetPasswordScreens/First';
import Second from './Auth/ForgetPasswordScreens/Second';


const Stack = createNativeStackNavigator();


export default function App() {
  const[token,setToken]=useState(null);
 

  const retrieveData=async()=>{
      try{
          const val=await AsyncStorage.getItem('token');
          if(val){
            if(jwt_decode(val)){
              setToken(val)
              
            }
          }
      }
      catch(err){
          console.log(err)
      }
  } 




  useEffect(()=>{
      retrieveData();
      //AsyncStorage.removeItem('token')
  },[])



  if(token){
      return(
          <>
              <NavigationContainer>
                <Stack.Navigator initialRouteName='Home'>
                  <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
                </Stack.Navigator>
              </NavigationContainer>
          </>
      )
  }

  return (
<>
<NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name="Login"
          component={Login}
          
        />
        <Stack.Screen name="Register" component={Signup} />
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name='Step 1' component={Step1} />
        <Stack.Screen name='Step 2' component={Step2} />
        <Stack.Screen name='Step 3' component={Step3} />
        <Stack.Screen name='Step 4' component={Step4} />
        <Stack.Screen name='Step 5' component={Step5} />
        <Stack.Screen name='Final' component={Final} />
        <Stack.Screen name='First Step' component={First} />
        <Stack.Screen name='Second Step' component={Second} />
      </Stack.Navigator>
    </NavigationContainer>
</>
  );
}
