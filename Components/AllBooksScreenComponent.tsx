import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { backendUrl } from '../Global';
import styles from '../Utility/styles';
import Heading from './Heading';
interface Book {
  author: string;
  title: string;
  id: string;
}
import { RootStackParamList } from './AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type AllBooksScreenComponentProps=NativeStackScreenProps<RootStackParamList, 'AllBooks'>

const AllBooksScreenComponent: React.FC<AllBooksScreenComponentProps> = (props) => {
  const [books, setBooks] = useState<Book[]>([])
  useEffect(() => {
    getAllBooks();
  }, [])

  let getAllBooks = async () => {
    let response = await fetch(backendUrl + `/books`)
    if (response.ok) {
      let data = await response.json();
      setBooks(data);
    }
  }

  let deleteBook = async (id: string) => {

    let response = await fetch(backendUrl + `/books/${id}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      const updatedBooks = books.filter(book => book.id !== id);
      setBooks(updatedBooks);
      return Alert.alert('book deleted successfully');
    } else {
      return Alert.alert('Error occurred when deleting the book');

    }
  }
  const BookList: React.FC<{ book: Book }> = ({ book }) => (
    <TouchableOpacity onPress={() => {
      props.navigation.push('EditBook', { id: book.id } )
    }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', }}>
          <View>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/book.png')}
            />
          </View>
          <View style={{ width: 90 }}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
          </View>
        </View>
        <View>
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
    <ScrollView>
      <Heading>List of books</Heading>
      {books.length > 0 ? (
        books.map((book) => <BookList key={book.id} book={book} />)
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );

}

export default AllBooksScreenComponent;
