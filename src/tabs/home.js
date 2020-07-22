import React, { useState, useEffect, useRef } from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const API_KEY = '142a48b2703b4bfb94498e43fd5fe495'

function Home({ navigation }) {
    const [data, setData] = useState([])
    const [savedNews, setSavedNews] = useState([])
    const [fetching, setFetching] = useState(false)
    const [loading, setLoading] = useState(true)
    const myRefs = useRef([]);

    useEffect(() => {
        fetchData();
        AsyncStorage.removeItem('savednews')
    }, [data])

    useEffect(() => {
        AsyncStorage.setItem('savednews', JSON.stringify(savedNews))
    }, [savedNews])

    async function fetchData() {
        (await fetch(`https://newsapi.org/v2/top-headlines?country=tr&apiKey=${API_KEY}`))
            .json()
            .then(res => setData(res))
            .then(setLoading(false))
    }

    function onRefresh() {
        setFetching(true)
        fetchData()
            .then(setFetching(false))
    }

    async function saveNews(item) {
        const id = item.publishedAt
        if (savedNews.filter(e => e.publishedAt === id).length > 0) {
            setSavedNews(savedNews.filter((e) => (e.publishedAt !== id)))
        } else {
            setSavedNews(savedNews => [...savedNews, item])
        }
    }

    function goNewsDetail(item) {
        navigation.navigate('NewsDetail', { item: item })
        setTimeout(() => {
            myRefs.current[item.publishedAt].setNativeProps({
                style: { backgroundColor: '#CCFFCC' }
            })
        }, 500)
    }

    function Item({ item }) {
        return (
            <TouchableOpacity ref={el => myRefs.current[item.publishedAt] = el} style={styles.container} onPress={() => goNewsDetail(item)} >
                <View style={styles.subContainer}  >
                    <View style={{ flex: 3 }} >
                        <Text style={styles.title}>{item.title.split('-')[0]}</Text>
                        <Text style={styles.source}>{item.title.split('-')[1]}</Text>
                    </View>
                    <Image style={styles.image} source={{ uri: item.urlToImage }} />
                </View>
                <TouchableOpacity style={styles.bookmark} onPress={() => saveNews(item)} >
                    <Ionicons name={savedNews.filter(e => e.publishedAt === item.publishedAt).length > 0 ? 'bookmark' : 'bookmark-outline'} size={25} color='blue' />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
    return (
        <>
            {loading ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='large' />
                </View> :
                <FlatList
                    data={data.articles}
                    renderItem={Item}
                    onRefresh={() => onRefresh()}
                    refreshing={fetching}
                    keyExtractor={item => item.title}
                />
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
    bookmark: {
        margin: 10
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
export default Home;