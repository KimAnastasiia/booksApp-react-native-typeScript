import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Pressable, Image, ScrollView } from 'react-native';
import { backendUrl, tokenFireBaseStorage } from '../Global';
import { Book } from '../entities/book';
import styles from '../Utility/styles';
import { type StackScreenProps } from '@react-navigation/stack';

export type PreventRemoveParams = {
    DetailsBook: { id: string };
};

const BookDetailsScreenComponent = ({ route, navigation }: StackScreenProps<PreventRemoveParams, 'DetailsBook'>) => {

    const { id } = route.params;
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState<Book>({
        author: "",
        title: "",
        id: ""
    })

    useEffect(() => {
        getBookInfo();
    }, [])

    let getBookInfo = async () => {

        let response = await fetch(backendUrl + `/books/` + id)
        setLoading(true)
        if (response.ok) {
            let data = await response.json();
            setBook(data);
        }
        setLoading(false)
    }

    return (
        <View style={styles.containerDetails}>
            <View style={styles.containerEditButton}>
                <Pressable style={styles.editPressable} onPress={() => navigation.push('EditBook', { id: id })}>
                    <Text style={styles.textInButtonEdit}>edit</Text>
                </Pressable>
            </View>
            <Image
                style={styles.photoBook}
                source={{uri:"https://firebasestorage.googleapis.com/v0/b/books-store-dc964.appspot.com/o/photos%2F"+id+".png?alt=media&token="+tokenFireBaseStorage}}
            />
            <View style={styles.containerDescriptions}>
                <ActivityIndicator animating={loading} size="large" color="#0000ff" />
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>{book.author}</Text>
            </View>
        </View>
    );

}

export default BookDetailsScreenComponent;
