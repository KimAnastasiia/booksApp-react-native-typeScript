// screens/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, TextInput, Pressable, Text, TouchableOpacity } from 'react-native';
import { RootStackParamList } from './AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import MyInput from './MyInput';
import { FIREBASE_AUTH } from './FirebaseConfig';
import styles from '../Utility/styles';

type LoginComponentProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const LoginComponent: React.FC<LoginComponentProps> = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH

  const signIn = async () => {
    setLoading(true)
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      alert(response._tokenResponse.localId)
    } catch (error: any) {
      alert("sign in failed" + error.message)
    } finally {
      setLoading(false)
    }
  }
  const signUp = async () => {

    setLoading(true)
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      alert("Check your email!")
    } catch (error: any) {
      alert("sign up failed" + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.containerLogin}>
      <View>
        <Image
          style={styles.imgLogin}
          source={require("../assets/Worldofbookslogo.png")}
        />
      </View>
      <View style={{width:"100%",alignItems:"center"}}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"white"}
          onChangeText={(text) => setEmail(text)}
          value={email}
          secureTextEntry={false}
          style={styles.loginInput}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={"white"}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
          style={styles.loginInput}
        />

        <Pressable style={styles.loginButton} onPress={signIn}>
          <Text style={styles.textInButton}>Login</Text>
        </Pressable>
      </View>
      <View>
        <ActivityIndicator animating={loading} size="large" color="#0000ff" />
        <TouchableOpacity onPress={signUp} >
          <Text style={{ textDecorationLine: 'underline', color: '#004832' }}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginComponent;