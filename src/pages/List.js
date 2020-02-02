import React,{ useState,useEffect } from 'react';
import { View, ScrollView, Text, AsyncStorage, Image, TouchableOpacity, Alert } from 'react-native';
import socketio from 'socket.io-client';

import api from '../services/api';
import SpotList from '../components/SpotList';
import styles from '../assets/styles/GlobalStyle';

import logo from '../assets/images/aircnc_logo.png';

export default function List({navigation}) {
    const [techs, setTechs] = useState([]);
    useEffect(()=>{
        AsyncStorage.getItem('user').then(user_id=>{
            const socket = socketio(`${api.defaults.baseURL}`, {
                query: { user_id }
            });
            socket.on('booking_response', booking => {
                Alert.alert(`Reserva ${booking.approved?'Aprovada':'Rejeitada'}`,
                    `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved?'APROVADA':'REJEITADA'}`,
                    [
                        {text: 'Continuar!'},
                    ],
                    {cancelable: false});
            });
        });
    },[]);

    useEffect(()=>{
        AsyncStorage.getItem('techs').then( techsItems =>{
            const techsArray = techsItems.split(',').map(tech=>tech.trim());
            setTechs(techsArray);
        });
    },[]);

    async function logout(){
        AsyncStorage.removeItem('user');
        navigation.navigate('Login');
    }

    return (
        <View style={styles.listContainer}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logoContainer}/>
                <TouchableOpacity style={styles.buttonLeft}>
                    <Text onPress={logout} style={styles.buttonLeftText}>
                        SAIR
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
            </ScrollView>
        </View>
    );
}