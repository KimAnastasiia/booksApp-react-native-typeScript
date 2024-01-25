import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Pressable } from 'react-native';
import { backendUrl, firebaseStorage, tokenFireBaseStorage } from '../../Global';
import styles from '../../Utility/styles';
import { Book } from '../../entities/book';
import { RootStackParamList } from '../App/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store"
import { setBooks } from "../../redux/booksReducer";

type AllBooksScreenComponentProps = NativeStackScreenProps<RootStackParamList, 'AllBooks'>

const AllBooksScreenComponent: React.FC<AllBooksScreenComponentProps> = (props) => {

  // Redux
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books)
  const defaultImageSource = require('../../assets/open-book.png');
  const idToken = useSelector((state: RootState) => state.idToken.idToken)
  useEffect(() => {
    getAllBooks();
  }, [])

  let getAllBooks = async () => {

    const response = await fetch(backendUrl + '/books', {
      method: 'GET',
      headers: {token: idToken}
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

  const getBookImageUrl = (bookId: string) => {
    return `${firebaseStorage}${bookId}.png?alt=media&token=${tokenFireBaseStorage}`;
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
      </View>
    </TouchableOpacity>

  )

  return (
    <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
      {books.length > 0 ? (
        books.map((book) => <BookList key={book.id} book={book} />)
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );

}

export default AllBooksScreenComponent;
