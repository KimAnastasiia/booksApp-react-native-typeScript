import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Alert, Pressable } from 'react-native';
import { backendUrl } from '../Global';
import MyInput from './MyInput';
import styles from '../Utility/styles';
import { Book } from '../entities/book';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store"
import { setBooks } from "../redux/booksReducer";
const CreateBookScreenComponent: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState<Book>({
        author: "",
        title: "",
        id: ""
    })
    const dispatch = useDispatch();
    const books = useSelector((state: RootState) => state.books.books)
    
    let postBook = async () => {
        try {
            if (!book.title || !book.author) {
                Alert.alert('Error', 'Please fill in both title and author before creating a book.');
                return;
            }
            setLoading(true);
            let response = await fetch(`${backendUrl}/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            setLoading(false);
            if (response.ok) {
                let data = await response.json();
                dispatch(setBooks([...books,{...book, id:data.id} ]))
                setBook({
                    author: "",
                    title: "",
                    id: ""
                });
            } else {
                console.error('Failed to create book:', response.status);
                Alert.alert('Error', 'Failed to create book. Please try again later.');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        }
    };
    return (
        <View style={styles.containerCreateBook}>
            <View style={styles.containerInputs}>
                <ActivityIndicator animating={loading} size="large" color="#0000ff" />
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
            </View>
            <View style={styles.containerCreateButton}>
                <Pressable style={styles.createButton} onPress={postBook}>
                    <Text style={styles.textInButton}>Create</Text>
                </Pressable>
            </View>
        </View>

    );

}

export default CreateBookScreenComponent;
