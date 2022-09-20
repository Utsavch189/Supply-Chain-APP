import React from 'react'
import { StyleSheet,View,Text,TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { url } from '../../baseUrl';
import { myaxios } from '../../authorizedaxios';


function UserShowDetails({navigation}) {
    const route=useRoute();
    const data=route.params.data;
    const token=(route.params.token);
    

    const approve=()=>{
      myaxios(JSON.parse(token)).post(`${url}/admins/approve_a_user`,{"id_no":(data.id)})
      .then(res=>{
        if(res['data'].status===200){
          navigation.navigate('Pendings',{
            msg:'Approved Successfully'
          })
        }
      })
    }

    const remove=()=>{
      myaxios(JSON.parse(token)).post(`${url}/admins/delete_a_user`,{"id_no":(data.id)})
      .then(res=>{
        if(res['data'].status===200){
          navigation.navigate('Pendings',{
            msg:'Removed Successfully'
          })
        }
      })
    }
    
    
  return (
    <>
    <View style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.topcontainer}>
              <Text style={{fontWeight:'bold',marginTop:18}}>
                  Name - {data.name}
              </Text>
              <Text style={{fontWeight:'bold',marginTop:18}}>
                  Email - {data.email}
              </Text>
              <Text style={{fontWeight:'bold',marginTop:18}}>
                  Phone - {data.phone}
              </Text>
              <Text style={{fontWeight:'bold',marginTop:18}}>
                  WhatsApp - {data.whatsapp}
              </Text>
              <Text style={{fontWeight:'bold',marginTop:18}}>
                  Gender - {data.gender}
              </Text>
              <Text style={{fontWeight:'bold',marginTop:18}}>
                  Role - {data.role}
              </Text>
              <Text style={{fontWeight:'bold',marginTop:18}}>
                  ID - {data.id}
              </Text>
          </View>
          <View style={styles.bottomcontainer}>
              <TouchableOpacity onPress={approve}>
                <Icon name='check'size={25} color='green'/>
              </TouchableOpacity >
              <TouchableOpacity onPress={remove}>
                <Icon name='close'size={25} color='red'/>
              </TouchableOpacity>
              
          </View>
        </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height:'100%',
    width:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',   
  },
  subcontainer: {
    backgroundColor: '#F2F3F5',
    height:420,
    width:'86%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',   
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom:80
  },
  bottomcontainer:{
    position:'absolute',
    bottom:0,
    width:'100%',
    height:50,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around', 
  },
  topcontainer:{
    position:'absolute',
    top:0,
    marginTop:20,
    width:'90%',
    height:350,
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'flex-start', 
  }
})

export default UserShowDetails