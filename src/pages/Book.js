import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage, Alert } from 'react-native';

import api from '../services/api';

import styles from '../assets/styles/GlobalStyle';

export default function Book({navigation}) {

    const id = navigation.getParam('id');

    const [date, setDate] = useState('');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`/spots/${id}/bookings`,{
            date
        },{
            headers: {user_id}
        });
        Alert.alert('Solicitação de reserva enviada!');
        navigation.navigate('List');
    }

    function left(){
        navigation.navigate('List');
    }

    return (
        <View style={styles.bookContainer}>
            <Text style={styles.label}>
                Data de interesse *
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Qual data você quer reservar?'
                placeholderTextColor='#999'
                autoCapitalize='words'
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>
                    Confirmar Solicitação 
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={left} style={styles.buttonLeft2}>
                <Text style={styles.buttonLeftText2}>
                    Cancelar 
                </Text>
            </TouchableOpacity>
        </View>
    )
}