import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { backendUrl } from '../Global';
import myStyles from '../Utility/styles';
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
    <View>
      <Text style={myStyles.title}>{book.title}</Text>
      <Text>{book.author}</Text>
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
