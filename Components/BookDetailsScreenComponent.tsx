import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import { backendUrl } from '../Global';
import { Book } from '../entities/book';
import styles from '../Utility/styles';
import MyInput from './MyInput';
import {type StackScreenProps} from '@react-navigation/stack';

export type PreventRemoveParams = {
    DetailsBook: { id: string };
};

const BookDetailsScreenComponent= ({ route, navigation}: StackScreenProps<PreventRemoveParams, 'DetailsBook'>)  => {

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
        <View style={styles.containerCreateBook}>
            <View style={styles.containerInputs}>
                <ActivityIndicator animating={loading} size="large" color="#0000ff" />
                <MyInput
                    value={book.title}
                    secureTextEntry={false}
                    label='Title'
                    editable={false}
                />
                <MyInput
                    value={book.author}
                    secureTextEntry={false}
                    label='Author'
                    editable={false}
                />
            </View>
            <View style={styles.containerCreateButton}>
                <Pressable style={styles.createButton} onPress={() => navigation.push('EditBook', {id:id})}>
                    <Text style={styles.textInButton}>Edit</Text>
                </Pressable>
            </View>
        </View>
    );

}

export default BookDetailsScreenComponent;
