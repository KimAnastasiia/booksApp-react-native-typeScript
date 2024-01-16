import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, Pressable } from 'react-native';
import { backendUrl } from '../Global';
import { Book } from '../entities/book';
import styles from '../Utility/styles';
import MyInput from './MyInput';
import { RouteProp } from '@react-navigation/native';


interface ScreenEditBookNavigationProps {
    route: RouteProp<{ params: { id: string } }, 'params'>;
}

const EditBookScreenComponent: React.FC<ScreenEditBookNavigationProps> = ({ route }) => {
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
        let response = await fetch(backendUrl + `/books/`+id)
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
                console.error('Failed to edit book:', response.status);
                Alert.alert('Error', 'Failed to edit book. Please try again later.');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        }
    };
    return (
        <>
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
           <Pressable style={styles.createButton} onPress={editBook}>
               <Text style={styles.textInButton}>Edit</Text>
           </Pressable>
       </View>
   </View>
   </>
    );

}

export default EditBookScreenComponent;
