import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, Pressable } from 'react-native';
import { backendUrl } from '../Global';
interface Book {
    author: string;
    title: string;
    id: string;
}
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';

type EditBookScreenComponentProps=NativeStackScreenProps<RootStackParamList, 'EdiitBook'>

const EditBookScreenComponent: React.FC<EditBookScreenComponentProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState<Book>({
        author: "",
        title: "",
        id: ""
    })
    /*
  useEffect(() => {
    getBookInfo();
  }, [])

    let getBookInfo = async () => {
        let response = await fetch(backendUrl + `/books/${bookId}`)
        if (response.ok) {
          let data = await response.json();
          setBook(data);
        }
      }
    */
    let editBook = async () => {
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
       <Text>EditBookScreenComponent</Text>
    );

}

export default EditBookScreenComponent;
