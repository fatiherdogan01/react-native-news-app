import React from 'react'
import { Text, StyleSheet, Image, ScrollView } from "react-native"

function NewsDetail({ route }) {
    const { item } = route.params;
    return (
        <ScrollView style={styles.container}>
            <Image style={styles.image} source={{ uri: item.urlToImage }} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
    },
    title: {
        flex: 1,
        margin: 10,
        fontWeight: '600',
        fontSize: 22
    },
    description: {
        flex: 5,
        margin: 10,
        fontSize: 20
    },
    image: {
        flex: 2,
        margin: 10,

        height: 200,
        borderRadius: 20
    }
});
export default NewsDetail;