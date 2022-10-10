import React,{useState,useEffect} from 'react'
import Nav from '../NavigationBar/Nav'
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddProductModal from './Components/AddProductModal';
import { url } from '../baseUrl';
import { myaxios } from '../authorizedaxios';
import Loader from '../Loader';
import ProductCard from './Components/ProductCard';
import AboutProducts from './Components/AboutProducts';

function AddProduct({navigation}) {

    const route=useRoute();
    const[visible,setVisible]=useState(false);
    const[data,setData]=useState(null);
    const[searchh,setSearch]=useState([]);

    const[aboutvisible,setAboutvisible]=useState(false);
    const[currentdata,setCurrentdata]=useState(null);
  

    useEffect(()=>{
      console.log(route.params.token)
      if(route.params.token){myaxios(JSON.parse(route.params.token)).get(`${url}/manufacturer/get_products`)
      .then(res=>{setData(res['data'].data)
               
    })}
      setSearch([])
    },[visible,aboutvisible,route.params.token])

    const Search=(b)=>{
      if(data){
        for(let i=0;i<data.length;i++){
            if(data[i].name===b){
              setSearch(j=>[...j,data[i]])
            }
        }
      }

    }
    
    if(!data){
      return(
        <>
        <Loader/>
        </>
      )
    }

  return (
    <>
    <View style={styles.container}>
    <Nav role='Manufacturer' state='add_products' navigation={navigation} data={route.params.user} token={route.params.token}/>
    <View style={styles.searchbarcontainer}>
        <TextInput placeholder='Search By Product Name' 
        style={{borderWidth:1,backgroundColor:'white',borderColor:'black',borderRadius:50,width:'100%',height:40}}
        onChangeText={(b)=>Search(b)}
        />
      </View>
    <AddProductModal is_visible={visible} set={setVisible} token={route.params.token}/>
    <AboutProducts is_visible={aboutvisible} set={setAboutvisible} data={currentdata} token={route.params.token}/>
    <View style={styles.addbtn}>
      <TouchableOpacity onPress={()=>setVisible(true)}>
        <Icon name='plus' size={35} color='#014872'/>
      </TouchableOpacity>  
    </View>
     
    {data.length>0&&searchh.length===0&& <ScrollView contentContainerStyle={styles.scrollview} showsVerticalScrollIndicator={false}>
        {data.map((i,k)=>
          <TouchableOpacity  key={k} onPress={()=>{
            setAboutvisible(true)
            setCurrentdata(i)
            }}>
            <ProductCard data={i}/>
          </TouchableOpacity>
          ) }
        </ScrollView>}
       

       
        {searchh.length>0&&<ScrollView contentContainerStyle={styles.scrollview} showsVerticalScrollIndicator={false}>
        {searchh.map((i,k)=>
          <TouchableOpacity  key={k} onPress={()=>{
            setAboutvisible(true)
            setCurrentdata(i)
            }}>
            <ProductCard data={i}/>
          </TouchableOpacity>
          )}
        </ScrollView>}
       
       {!searchh.length&&!data.length&&<>
       <View>
          <Text style={{fontWeight:'bold'}}>No Products!</Text>
       </View>
       </>}
       
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
    addbtn:{
      borderRadius:50,
      height:70,
      width:70,
      position:'fixed',
      bottom:0,
      right:0,
      zIndex:10000,
      borderColor:'#ACC0FE',
      borderWidth:1.5,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',  
      marginBottom: 110,
      marginRight:50,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      backgroundColor:"#ACC0FE"
    },
    searchbarcontainer:{
      position:'absolute',
      top:0,
      width:'80%',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      height:'9%',
      zIndex:1000
    },
    scrollview:{
      marginTop:80,
      width:'100%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      height:'115%'
    }
  })

export default AddProduct