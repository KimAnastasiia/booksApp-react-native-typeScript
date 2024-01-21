import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Pressable } from 'react-native';
import { backendUrl, tokenFireBaseStorage } from '../Global';
import styles from '../Utility/styles';
import { Book } from '../entities/book';
import { RootStackParamList } from './AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store"
import { setBooks } from "../redux/booksReducer";

type AllBooksScreenComponentProps = NativeStackScreenProps<RootStackParamList, 'AllBooks'>

const AllBooksScreenComponent: React.FC<AllBooksScreenComponentProps> = (props) => {

  // Redux
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books)
  const defaultImageSource = require('../assets/open-book.png');
  useEffect(() => {
    getAllBooks();
  }, [])

  let getAllBooks = async () => {

    let response = await fetch(backendUrl + `/books`)
    if (response.ok) {
      let data = await response.json();
      //setBooks(data);
      await Promise.all(
        data.map(async (book: Book) => {

          try {
            let response = await fetch(`https://firebasestorage.googleapis.com/v0/b/books-store-dc964.appspot.com/o/photos%2F${book.id}.png?alt=media&token=${tokenFireBaseStorage}`)
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

  let deleteBook = async (id: string) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this book?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            let response = await fetch(backendUrl + `/books/${id}`, {
              method: 'DELETE'
            });
            if (response.ok) {
              const updatedBooks = books.filter(book => book.id !== id);
              dispatch(setBooks(updatedBooks));
              return Alert.alert('Book deleted successfully');
            } else {
              return Alert.alert('Error occurred when deleting the book');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  }

  const getBookImageUrl = (bookId: string) => {
    return `https://firebasestorage.googleapis.com/v0/b/books-store-dc964.appspot.com/o/photos%2F${bookId}.png?alt=media&token=${tokenFireBaseStorage}`;
  };
  const BookList: React.FC<{ book: Book }> = ({ book }) => (
    <TouchableOpacity onPress={() => {
      props.navigation.push('DetailsBook', { id: book.id })
    }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', width: "84%" }}>
          <View style={{ width: "20%" }}>

            {book.hasImg &&
              <Image
                style={styles.tinyLogo}
                source={{ uri: getBookImageUrl(book.id) }}
              />
            }
            {!book.hasImg &&
              <Image
                style={styles.tinyLogo}
                source={defaultImageSource}
              />
            }
          </View>
          <View style={{ width: "80%" }}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
          </View>
        </View>
        <View style={{ width: "16%" }}>
          <TouchableOpacity style={styles.deleteBookButton} onPress={() => { deleteBook(book.id) }} >
            <Image
              style={styles.binLogo}
              source={require('../assets/delete.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>

  )

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {books.length > 0 ? (
        books.map((book) => <BookList key={book.id} book={book} />)
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );

}

export default AllBooksScreenComponent;
