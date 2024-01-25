import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Pressable, Image, ScrollView } from 'react-native';
import { backendUrl, tokenFireBaseStorage, firebaseStorage } from '../../Global';
import styles from '../../Utility/styles';
import { type StackScreenProps } from '@react-navigation/stack';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store"
import { setBook } from '../../redux/bookReducer';


export type PreventRemoveParams = {
    DetailsBook: { id: string };
};

const BookDetailsScreenComponent = ({ route, navigation }: StackScreenProps<PreventRemoveParams, 'DetailsBook'>) => {
    const idToken = useSelector((state: RootState) => state.idToken.idToken)
    const { id } = route.params;
    const [loading, setLoading] = useState(false);
    const userId = useSelector((state: RootState) => state.userId.userId)
    const dispatch = useDispatch();
    const book = useSelector((state: RootState) => state.book.book)
    useEffect(() => {
        getBookInfo();
    }, [])

    let getBookInfo = async () => {

        let response = await fetch(backendUrl + `/books/` + id,{
            method: 'GET',
            headers: {token: idToken}
        })

        setLoading(true)
        if (response.ok) {
            let data = await response.json();
            dispatch(setBook(data));
        }
        setLoading(false)
    }

    return (
        <View style={styles.containerDetails}>
           {userId==book.userId && 
           
           <View style={styles.containerEditButton}>
                <Pressable style={styles.editPressable} onPress={() => navigation.push('EditBook', { id: id })}>
                    <Text style={styles.textInButtonEdit}>edit</Text>
                </Pressable>
            </View>}
            <Image
                style={styles.photoBook}
                source={{uri:`${firebaseStorage}${id}.png?alt=media&token=${tokenFireBaseStorage}`}}
            />
            <View style={styles.containerDescriptions}>
                <ActivityIndicator animating={loading} size="large" color="#0000ff" />
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>{book.author}</Text>
            </View>
        </View>
    );

}

export default BookDetailsScreenComponent;
