import React from 'react'
import { StyleSheet,View,Text,TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { url } from '../../baseUrl';
import { myaxios } from '../../authorizedaxios';
import Nav from '../../NavigationBar/Nav';


function UserShowDetails({navigation}) {
    const route=useRoute();
    const data=route.params.data;
    const token=(route.params.token);
    const msg=route.params.msg;
    const name=route.params?.data['name'];

    

    const approve=()=>{
      myaxios(JSON.parse(token)).post(`${url}/admins/approve_a_user`,{"id_no":(data.id)})
      .then(res=>{
        if(res['data'].status===200){
          navigation.navigate('Pendings',{
            msg:'Approved Successfully',
            signal:200
          })
        }
      })
    }

    const re_approve=()=>{
      myaxios(JSON.parse(token)).post(`${url}/admins/reapprove_a_user`,{"id_no":(data.id)})
      .then(res=>{
        if(res['data'].status===200){
          navigation.navigate('Deleted Users',{
            msg:'Re_Approved Successfully',
            signal:200
          })
        }
      })
    }

    const remove=()=>{
      myaxios(JSON.parse(token)).post(`${url}/admins/delete_a_user`,{"id_no":(data.id)})
      .then(res=>{
        console.log(res['data'])
        if(res['data'].status===200){
          if(route.params.state==='approved'){
          navigation.navigate('Pendings',{
            msg:'Removed Successfully',
            signal:200
          })
        }
        else if(route.params.state==='deletes'){
          navigation.navigate('Deleted Users',{
            msg:'Removed Successfully',
            signal:200
          })
        }
        }
      })
    }
    
    
  return (
    <>
    <View style={styles.container}>
<Nav role='Admin' state={route.params.state} navigation={navigation} data={route.params.user} token={route.params.token}/>
        <View style={styles.topchart}>
        <View style={styles.one}>
        <View style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',borderColor:'black',borderWidth:1,borderRadius:50,height:50,width:50}}>
            {name&&<Text style={{fontWeight:'bold',fontSize:25}}>{name.charAt(0)}</Text>}
        </View>
        <Text style={{fontSize:25,marginLeft:10}}>{name}</Text>
    </View>
            <Text style={{fontSize:14,fontWeight:'bold'}}>{msg}</Text>
        </View>

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
          {route.params.type==="request_screen"?<View style={styles.bottomcontainer}>
              <TouchableOpacity onPress={approve}>
                <Icon name='check'size={25} color='green'/>
              </TouchableOpacity >
              <TouchableOpacity onPress={remove}>
                <Icon name='close'size={25} color='red'/>
              </TouchableOpacity>
              
          </View>:route.params.type==="approve_screen"?
          <View style={styles.bottomcontainer}>
              <TouchableOpacity onPress={remove}>
                <Icon name='close'size={25} color='red'/>
              </TouchableOpacity>
                        
          </View>:route.params.type==="delete_screen"?
          <View style={styles.bottomcontainer}>
              <TouchableOpacity onPress={re_approve}>
                <Icon name='check'size={25} color='green'/>
              </TouchableOpacity >
                        
          </View>:<></>
        }
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
    
    height:420,
    width:'80%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',   
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop:20
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
  },
  topchart:{
    width:"80%",
    height:160,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#556B2F',
    shadowOffset: {width: -2, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3.6,   
    position:'absolute',
    top:0,
    marginTop:40
  },
  one:{
    width:"76%",
    height:80,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:17
  },
})

export default UserShowDetails