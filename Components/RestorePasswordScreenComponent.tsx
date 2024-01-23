// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Image, ActivityIndicator, TextInput, Pressable, Text, TouchableOpacity, Alert } from 'react-native';
import { RootStackParamList } from './AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from './FirebaseConfig';
import styles from '../Utility/styles';


type RestorePasswordComponentProps = NativeStackScreenProps<RootStackParamList, 'RestorePassword'>

const RestorePasswordScreenComponent: React.FC<RestorePasswordComponentProps> = (props) => {

    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);

    const auth = FIREBASE_AUTH

    const restorePassword = async () => {
        try {
            setLoading(true)
            await sendPasswordResetEmail(auth, email);
            Alert.alert("Successfully", "Check your email to recover your password")
            props.navigation.push('Login')
        } catch (error) {
            Alert.alert("Invalid email", "Check your email")
            console.log(error)
        }
        setLoading(false)
    }
    return (
        <View style={styles.containerLogin}>
            <View style={{ height: "30%" }}>
                <Image
                    style={styles.imgLogin}
                    source={require("../assets/Worldofbookslogo.png")}
                />
            </View>
            <View style={styles.containerInputRestorePassword}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={"white"}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    secureTextEntry={false}
                    style={styles.loginInput}
                />
                <ActivityIndicator animating={loading} size="large" color="#0000ff" />
                <Pressable style={styles.loginButton} onPress={restorePassword}>
                    <Text style={styles.textInButton}>Sent</Text>
                </Pressable>
            </View>
            <View style={{ height: "30%", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => { props.navigation.push("CreateAccount") }} >
                    <Text style={{ textDecorationLine: 'underline', color: '#004832' }}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { props.navigation.push("Login") }} >
                    <Text style={{ textDecorationLine: 'underline', color: '#004832' }}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RestorePasswordScreenComponent;