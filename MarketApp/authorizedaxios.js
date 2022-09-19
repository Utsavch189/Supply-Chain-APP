import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const myaxios = (token) => axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }

})