import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';

function Saved({ navigation }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    navigation.addListener('focus', () => {
        getData()
            .then(setLoading(false))
    });

    async function getData() {
        const data = await AsyncStorage.getItem('savednews')
        let obj = JSON.parse(data) || [];
        setData(obj)
    }

    function goNewsDetail(item) {
        navigation.navigate('NewsDetail', { item: item })
    }

    function Item({ item }) {
        return (
            <TouchableOpacity style={styles.container} onPress={() => goNewsDetail(item)} >
                <View style={styles.subContainer} >
                    <View style={{ flex: 3 }} >
                        <Text style={styles.title}>{item.title.split('-')[0]}</Text>
                        <Text style={styles.source}>{item.title.split('-')[1]}</Text>
                    </View>
                    <Image style={styles.image} source={{ uri: item.urlToImage }} />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <>
            {loading ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='large' />
                </View> :
                (data.length > 0
                    ? <FlatList
                        data={data}
                        renderItem={Item}
                        keyExtractor={item => item.title} /> :
                    <Text style={styles.info}>Not yet saved news</Text>)
            }
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        margin: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
    },
    subContainer: {
        flexDirection: 'row',
    },
    title: {
        margin: 10,
    },
    info: {
        marginTop: 100,
        fontSize: 24,
        fontWeight: '500',
        color: 'grey',
        textAlign: 'center',
    },
    source: {
        color: 'red',
        fontWeight: '500',
        margin: 10,
    },
    image: {
        margin: 10,
        width: 100,
        height: 100,
        borderRadius: 20
    }
});
export default Saved;