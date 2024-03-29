import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Pressable } from 'react-native';
import { backendUrl, firebaseStorage, tokenFireBaseStorage } from '../../Global';
import styles from '../../Utility/styles';
import { Book } from '../../entities/book';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store"
import { setMyBooks } from '../../redux/myBooksReducer';
import { setBooks, } from '../../redux/booksReducer';

const MyBooksScreenComponent: React.FC = (props) => {

  // Redux
  const dispatch = useDispatch();
  const myBooks = useSelector((state: RootState) => state.myBooks.myBooks )
  const books = useSelector((state: RootState) => state.books.books )
  const defaultImageSource = require('../../assets/open-book.png');
  const idToken = useSelector((state: RootState) => state.idToken.idToken)
  useEffect(() => {
    getAllMyBooks();
  }, [])

  let getAllMyBooks = async () => {

    const response = await fetch(backendUrl + '/books/myBooks', {
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
        dispatch(setMyBooks(data));
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
              method: 'DELETE',
              headers: {token: idToken}
            });
            if (response.ok) {
              const myUpdatedBooks = myBooks.filter(book => book.id !== id);
              const updatedBooks = books.filter(book => book.id !== id);
              dispatch(setMyBooks(myUpdatedBooks));
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
        <View style={{ width: "16%" }}>
          <TouchableOpacity style={styles.deleteBookButton} onPress={() => { deleteBook(book.id) }} >
            <Image
              style={styles.binLogo}
              source={require('../../assets/delete.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>

  )

  return (
    <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
      {myBooks ? (
        myBooks.map((book) => <BookList key={book.id} book={book} />)
      ) : (
        <Text>Loading...</Text>
      )}
      {myBooks.length==0 &&
        <View style={{justifyContent:"center", flex:1, alignItems:"center"}}>
          <Image
              style={{width:"100%"}}
              source={require("../../assets/planet.png")}
          /> 
          <Text style={styles.titleEmpty}>You dont have any books yet :(</Text>
        </View> 
        
      }
    </ScrollView>
  );

}

export default MyBooksScreenComponent;
