import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, Pressable, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import { backendUrl } from '../Global';
import MyInput from './MyInput';
import styles from '../Utility/styles';
import { Book } from '../entities/book';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store"
import { setBooks } from "../redux/booksReducer";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const imgDir = FileSystem.documentDirectory + 'images/';

const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
};
const CreateBookScreenComponent: React.FC = () => {
    const [book, setBook] = useState<Book>({
        author: "",
        title: "",
        id: ""
    })
    const dispatch = useDispatch();
    const books = useSelector((state: RootState) => state.books.books)
    const idToken = useSelector((state: RootState) => state.idToken.idToken)
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    // Load images on startup
    useEffect(() => {
        loadImages();
    }, []);
    // Save image to file system
    const saveImage = async (uri: string) => {
        await ensureDirExists();
        const filename = new Date().getTime() + '.jpeg';
        const dest = imgDir + filename;
        await FileSystem.copyAsync({ from: uri, to: dest });
        setImages([...images, dest]);
    };
    // Load images from file system
    const loadImages = async () => {
        await ensureDirExists();
        const files = await FileSystem.readDirectoryAsync(imgDir);
        if (files.length > 0) {
            setImages(files.map((f) => imgDir + f));
        }
    };

    const selectImage = async (useLibrary: boolean) => {
        let result;


        const options: ImagePicker.ImagePickerOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.75
        };

        if (useLibrary) {
            result = await ImagePicker.launchImageLibraryAsync(options);
        } else {
            await ImagePicker.requestCameraPermissionsAsync();
            result = await ImagePicker.launchCameraAsync(options);
        }

        // Save image if not cancelled
        if (!result.canceled) {
            saveImage(result.assets[0].uri);
            console.log(result.assets[0].uri);
        }
    };


    const uploadImage = async (uri: string, bookId: string) => {


        const formData = new FormData();
        const fileUri = uri;

        formData.append('file', {
            uri: fileUri,
            type: 'image/jpeg', // Adjust the type based on the file type
            name: 'myImage.jpeg', // Adjust the name as needed
        });

        const response = await fetch(backendUrl + `/books/photo/${bookId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                token: idToken
            },
            body: formData,
        });
        setUploading(false);
        if (response.ok) {
            Alert.alert('The book was successfully published');
            deleteImage(images[0])
            setImages([])
        } else {
            Alert.alert('Error', 'Failed to post photos of book. Please try again later.');
        }
    };

    // Delete image from file system
    const deleteImage = async (uri: string) => {
        await FileSystem.deleteAsync(uri);
        setImages([]);
    };


    let postBook = async () => {
        try {
            if (!book.title || !book.author) {
                Alert.alert('Error', 'Please fill in both title and author before creating a book.');
                return;
            }
            setUploading(true);
            let response = await fetch(`${backendUrl}/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: idToken
                },
                body: JSON.stringify(book)
            });

            if (response.ok) {
                let data = await response.json();
                dispatch(setBooks([...books, { ...book, id: data.id }]))
                setBook({
                    author: "",
                    title: "",
                    id: ""
                });
                if(images[0]){
                    uploadImage(images[0], data.id)
                }
            } else {
                console.error('Failed to create book:', response.status);
                Alert.alert('Error', 'Failed to create book. Please try again later.');
                setUploading(false);
              
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        }
    };
    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <View style={styles.containerCreateBook}>
                <View style={styles.containerInputs}>
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
                    {images.length>0 && 
                    <View style={{alignItems:"center"}}>
                        <Image style={{ width: 300, height: 350 }} source={{ uri: images[0]}} />
                    </View>}
                  
                    <ActivityIndicator animating={uploading} size="large" color="#0000ff" />
                  
                    {images.length==0 && 
                    <>
                        <Button title="Add photo from gallery" onPress={() => selectImage(true)} />
                        <Button title="To make a photo" onPress={() => selectImage(false)} />
                    </>
                    }
                    { images.length>0 && <Button title="delete" onPress={() => deleteImage(images[0])} />}
                 
                    
                </View>
                <View style={styles.containerCreateButton}>
                    <Pressable style={styles.createButton} onPress={postBook}>
                        <Text style={styles.textInButton}>Create</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>

    );

}

export default CreateBookScreenComponent;
