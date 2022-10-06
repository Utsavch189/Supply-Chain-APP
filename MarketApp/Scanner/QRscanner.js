import React,{useState,useEffect} from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, View, StyleSheet, Button,TextInput } from 'react-native';
import AfterScan from './AfterScan';


function QRscanner({token,get_p_endpoint,get_user_endpoint,post_distribute_endpoint,post_dayBydaydistribute_endpoint,state}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('')
    const [is_visible, setIs_visible] = useState(false);

    const askForCameraPermission = () => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })()
      }
      useEffect(() => {
        askForCameraPermission();
      }, []);    

      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data)
        setIs_visible(true)
        setText(data);
        console.log('Type: ' + type + '\nData: ' + data)
      };




  return (
    <>
     <View style={styles.container}>
     <View style={{width:"90%",height:40,display:'flex',flexDirection:'row',gap:5,alignItems:'center',marginTop:25,position:'absolute',top:0}}>
      <TextInput onChangeText={(b)=>setText(b)} style={styles.input}/>
    <Button title={'Search'} onPress={() => {setScanned(false)
      setIs_visible(true)
      }} color='blue' 
      />
      </View>
      <Text style={{marginBottom:50,fontWeight:'bold',fontSize:18}}>OR</Text>
      <View style={styles.barcodebox}>
        {text===''&&<BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />}
      </View>
      {(text && is_visible)&&<AfterScan is_visible={true} set={setIs_visible} token={token} userID={text} get_p_endpoint={get_p_endpoint} get_user_endpoint={get_user_endpoint} post_distribute_endpoint={post_distribute_endpoint} post_dayBydaydistribute_endpoint={post_dayBydaydistribute_endpoint} state={state}/>}

      {scanned&&text==='' && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
      
      
   
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    maintext: {
      fontSize: 16,
      margin: 20,
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: 'tomato'
    },
    input:{
      width:"80%",
      height:30,
      borderWidth:1,
      borderColor:'black'
    }
  });

export default QRscanner