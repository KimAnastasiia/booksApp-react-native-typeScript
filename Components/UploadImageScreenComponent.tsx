
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, ActivityIndicator, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { backendUrl } from '../Global';
const imgDir = FileSystem.documentDirectory + 'images/';

const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
};
const UploadImageScreenComponent: React.FC = () => {

    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState<any[]>([]);

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


    const uploadImage = async (uri: string) => {
        setUploading(true);
        const formData = new FormData();
        const fileUri = uri;

        // Append the file to the FormData object
        formData.append('file', {
            uri: fileUri,
            type: 'image/jpeg', // Adjust the type based on the file type
            name: 'myImage.jpeg', // Adjust the name as needed
        });
        const response = await fetch(backendUrl + '/books/photo', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });
        setUploading(false);
    };

    // Delete image from file system
    const deleteImage = async (uri: string) => {
        await FileSystem.deleteAsync(uri);
        setImages(images.filter((i) => i !== uri));
    };
    // Render image list item
    const renderItem = ({ item }: { item: any }) => {
        const filename = item.split('/').pop();
        return (
            <View style={{ flexDirection: 'row', margin: 1, alignItems: 'center', gap: 5 }}>
                <Image style={{ width: 80, height: 80 }} source={{ uri: item }} />
                <Text style={{ flex: 1 }}>{filename}</Text>
                <Ionicons.Button name="cloud-upload" onPress={() => uploadImage(item)} />
                <Ionicons.Button name="trash" onPress={() => deleteImage(item)} />
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, gap: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 }}>
                <Button title="Photo Library" onPress={() => selectImage(true)} />
                <Button title="Capture Image" onPress={() => selectImage(false)} />
            </View>

            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500' }}>My Images</Text>
            <FlatList data={images} renderItem={renderItem} />

            {uploading && (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    ]}
                >
                    <ActivityIndicator color="#fff" animating size="large" />
                </View>
            )}
        </SafeAreaView>
    );
}
export default UploadImageScreenComponent