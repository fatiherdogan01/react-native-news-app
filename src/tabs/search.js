import React, { useState, useRef } from 'react'
import { Text, StyleSheet, TextInput, FlatList, TouchableOpacity, View, Image, ActivityIndicator, Platform } from "react-native"

import Ionicons from 'react-native-vector-icons/Ionicons';

const search = <Ionicons name='search' size={25} color='blue' />
const API_KEY = '142a48b2703b4bfb94498e43fd5fe495'

function Search({ navigation }) {
    const [query, setQuery] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const myRefs = useRef([])

    function fetchData() {
        fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setData(data)
                setLoading(false)
            })


        console.log(data.articles)
    }

    function searchNews() {
        setLoading(true)
        fetchData()
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
            <>
                <TouchableOpacity onPress={() => goNewsDetail(item)} >
                    <View style={styles.container} ref={el => myRefs.current[item.publishedAt] = el} >
                        <View style={{ flex: 3 }}>
                            <Text style={styles.title}>{item.title.split('-')[0]}</Text>
                            <Text style={styles.source}>{item.title.split('-')[1]}</Text>
                        </View>
                        <Image style={styles.image} source={{ uri: item.urlToImage != null ? item.urlToImage : '' }} />
                    </View>
                </TouchableOpacity>
            </>
        );
    }

    return (
        <>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Search News'
                    onChangeText={text => setQuery(text)}
                    value={query}
                />
                <TouchableOpacity style={styles.searchButton} onPress={() => searchNews()} >
                    {search}
                </TouchableOpacity>
            </View>
            {loading
                ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
                : <FlatList
                    data={data.articles}
                    renderItem={Item}
                    keyExtractor={item => item.title}
                />
            }
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
    },
    inputContainer: {
        marginTop: 10,
        flexDirection: 'row',
        borderColor: '#ccc',
        padding: Platform.OS === 'ios' ? 10 : 0,
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 30,
    },
    input: {
        flex: 7
    },
    searchButton: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : 10
    },
    title: {
        flex: 3,
        margin: 10,
    },
    source: {
        color: 'red',
        fontWeight: '500',
        margin: 10,
    },
    image: {
        flex: 1,
        margin: 10,
        width: 100,
        height: 100,
        borderRadius: 20
    }

});
export default Search;
