import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';
import api from '../services/api';

import styles from '../assets/styles/GlobalStyle';

function SpotList({tech, navigation}){

    const [spots, setSpots] = useState('');

    useEffect(()=>{
        async function loadSpots(){
            const response = await api.get('/spots',{
                params: { tech }
            });
            setSpots(response.data);
        }
        loadSpots();
    },[]);

    function handleNavigate(id){
        navigation.navigate('Book',{id});
    }

    if (spots.length>0){
        return (
            <View style={styles.spotContainer}>
                <Text style={styles.spotTitle}>
                    Empresas que usam <Text style={styles.spotTitleB}>{tech}</Text>
                </Text>
                <FlatList
                    style={styles.list}
                    data={spots}
                    keyExtractor={item => item._id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item })=>(
                        <View style={styles.listItem}>
                            <Image 
                                style={styles.thumbnail} 
                                source={{uri:String(item.thumbnail_url).replace('http://localhost:8080',api.defaults.baseURL)}}
                            />
                            <Text style={styles.company}>
                                {item.company}
                            </Text>
                            <Text style={styles.price}>
                                {item.price? `R$${item.price}/dia`:'GRATUITO'}
                            </Text>
                            <TouchableOpacity onPress={()=>handleNavigate(item._id)} style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Solicitar Reserva
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        );
    }else{
        return <View />
    }
}

export default withNavigation(SpotList);