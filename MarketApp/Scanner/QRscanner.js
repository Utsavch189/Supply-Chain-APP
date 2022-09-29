import React,{useState,useEffect} from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, View, StyleSheet, Button } from 'react-native';
import AfterScan from './AfterScan';


function QRscanner({token}) {
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
        console.log('Type: ' + type + '\nData: ' + data)
      };


      if (hasPermission === null) {
        return (
          <View style={styles.container}>
            <Text>Requesting for camera permission</Text>
          </View>)
      }
      if (hasPermission === false) {
        return (
          <View style={styles.container}>
            <Text style={{ margin: 10 }}>No access to camera</Text>
            <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
          </View>)
      }


  return (
    <>
     <View style={styles.container}>
      <View style={styles.barcodebox}>
        {text===''&&<BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />}
      </View>
      {text&&<AfterScan token={token} is_visible={is_visible} set={setIs_visible} userID={text}/>}

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
    }
  });

export default QRscanner