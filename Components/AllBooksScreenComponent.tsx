import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image} from 'react-native';
import { backendUrl } from '../Global';
import styles from '../Utility/styles';
import Heading from './Heading';

interface Book {
  author: string;
  title: string;
  id: string;
}

const AllBooksScreenComponent: React.FC<any> = () => {
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

  const BookList: React.FC<{ book: Book }> = ({ book }) => (
    <View style={styles.shellBook}>
      <View>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/book.png')}
        />
      </View>
      <View style={{width:90}}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
      </View>
    </View>
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
