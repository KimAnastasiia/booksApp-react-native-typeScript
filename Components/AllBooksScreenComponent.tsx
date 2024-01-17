import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Pressable } from 'react-native';
import { backendUrl } from '../Global';
import styles from '../Utility/styles';
import Heading from './Heading';
import { Book } from '../entities/book';
import { RootStackParamList } from './AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store"
import { setBooks } from "../redux/booksReducer";

type AllBooksScreenComponentProps=NativeStackScreenProps<RootStackParamList, 'AllBooks'>

const AllBooksScreenComponent: React.FC<AllBooksScreenComponentProps> = (props) => {
  
  // Redux
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books)
  
  useEffect(() => {
    getAllBooks();
  }, [])

  let getAllBooks = async () => {
   
    let response = await fetch(backendUrl + `/books`)
    if (response.ok) {
      let data = await response.json();
      //setBooks(data);
      dispatch(setBooks(data));
    }
  }

  let deleteBook = async (id: string) => {

    let response = await fetch(backendUrl + `/books/${id}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      const updatedBooks = books.filter(book => book.id !== id);
      dispatch(setBooks(updatedBooks));
      return Alert.alert('book deleted successfully');
    } else {
      return Alert.alert('Error occurred when deleting the book');

    }
  }
  const BookList: React.FC<{ book: Book }> = ({ book }) => (
    <TouchableOpacity onPress={() => {
      props.navigation.push('DetailsBook', { id: book.id } )
    }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', width:"84%"}}>
          <View style={{ width: "20%"}}>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/book.png')}
            />
          </View>
          <View style={{ width: "80%"}}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
          </View>
        </View>
        <View style={{ width: "16%"}}>
          <TouchableOpacity style={styles.deleteBookButton} onPress={() => { deleteBook(book.id) }} >
            <Image
              style={styles.binLogo}
              source={require('../assets/bin.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
   
  )

  return (
    <ScrollView style={{backgroundColor:"white"}}>
      {books.length > 0 ? (
        books.map((book) => <BookList key={book.id} book={book} />)
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );

}

export default AllBooksScreenComponent;
