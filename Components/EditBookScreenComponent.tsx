import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, Pressable } from 'react-native';
import { Book } from '../entities/book';
import styles from '../Utility/styles';
import MyInput from './MyInput';
import { RouteProp } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store"
import { setMyBooks } from '../redux/myBooksReducer';
import { setBooks } from '../redux/booksReducer';
import { backendUrl, firebaseStorage, tokenFireBaseStorage } from '../Global';
interface ScreenEditBookNavigationProps {
    route: RouteProp<{ params: { id: string } }, 'params'>;
}

const EditBookScreenComponent: React.FC<ScreenEditBookNavigationProps> = ({ route }) => {
    const { id } = route.params;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [book, setBook] = useState<Book>({
        author: "",
        title: "",
        id: ""
    })
    const idToken = useSelector((state: RootState) => state.idToken.idToken)
    useEffect(() => {
        getBookInfo();
    }, [])

    let getAllBooks = async () => {

        const response = await fetch(backendUrl + '/books', {
            method: 'GET',
            headers: { token: idToken }
        })

        if (response.ok) {
            let data = await response.json();
            //setBooks(data);
            await Promise.all(
                data.map(async (book: Book) => {

                    try {
                        let response = await fetch(`${firebaseStorage}${book.id}.png?alt=media&token=${tokenFireBaseStorage}`)
                        if (response.ok) {
                            book.hasImg = true
                        } else {
                            book.hasImg = false
                        }
                    } catch (e) {
                        book.hasImg = false
                    }

                }))
            dispatch(setBooks(data));
        }
    }
    let getAllMyBooks = async () => {

        const response = await fetch(backendUrl + '/books/myBooks', {
            method: 'GET',
            headers: { token: idToken }
        })

        if (response.ok) {
            let data = await response.json();
            //setBooks(data);
            await Promise.all(
                data.map(async (book: Book) => {

                    try {
                        let response = await fetch(`${firebaseStorage}${book.id}.png?alt=media&token=${tokenFireBaseStorage}`)
                        if (response.ok) {
                            book.hasImg = true
                        } else {
                            book.hasImg = false
                        }
                    } catch (e) {
                        book.hasImg = false
                    }

                }))
            dispatch(setMyBooks(data));
        }
    }
    let getBookInfo = async () => {
        let response = await fetch(backendUrl + `/books/` + id, {
            method: 'GET',
            headers: { token: idToken }
        })

        if (response.ok) {
            let data = await response.json();
            setBook(data);
        }
    }

    let editBook = async () => {
        try {
            if (!book.title || !book.author) {
                Alert.alert('Error', 'Please fill in both title and author before edit a book.');
                return;
            }
            setLoading(true);
            let response = await fetch(`${backendUrl}/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: idToken
                },
                body: JSON.stringify(book)
            });
            setLoading(false);
            if (response.ok) {
                Alert.alert('Book edited successfully')
                getBookInfo()
                getAllBooks()
                getAllMyBooks()
            } else {
                console.error('Failed to edit book:', response.status);
                Alert.alert('Error', 'Failed to edit book. Please try again later.');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        }
    };
    return (
        <View style={styles.containerEdit}>
            <MyInput
                onChangeText={(text) => { setBook({ ...book, title: text }) }}
                value={book.title}
                placeholder={"title of book"}
                secureTextEntry={false}
                label='Title'
            />
            <MyInput
                onChangeText={(text) => { setBook({ ...book, author: text }) }}
                value={book.author}
                placeholder={"author of book"}
                secureTextEntry={false}
                label='Author'
            />
            <View style={{ alignItems: "center" }}>
                <Pressable style={styles.saveButton} onPress={editBook}>
                    <Text style={styles.textInButton}>Save</Text>
                </Pressable>
            </View>
            <ActivityIndicator style={{ marginTop: 30 }} animating={loading} size="large" color="#0000ff" />
        </View>
    );

}

export default EditBookScreenComponent;
