// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Image, ActivityIndicator, TextInput, Pressable, Text, TouchableOpacity,Alert } from 'react-native';
import { RootStackParamList } from '../App/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from '../FirebaseConfig';
import styles from '../../Utility/styles';
import { useDispatch } from "react-redux";
import { setIdToken } from '../../redux/idTokenReducer';
import { setUserId } from '../../redux/userIdReducer';
import { firebaseErrors } from '../../Global';
type CreateAccountComponentProps = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>

const CreateAccountScreenComponent: React.FC<CreateAccountComponentProps> = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH
  const dispatch = useDispatch();
  const signUp = async () => {

    setLoading(true)
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      dispatch(setIdToken(response._tokenResponse.idToken));
      dispatch(setUserId(response._tokenResponse.localId));
      props.navigation.push('MainNavigator')
    } catch (error: any) {
      Alert.alert(firebaseErrors.get(error.code))
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.containerLogin}>
      <View>
        <Image
          style={styles.imgLogin}
          source={require("../../assets/Worldofbookslogo.png")}
        />
      </View>
      <View style={{width:"100%",alignItems:"center"}}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"#FFFFFF"}
          onChangeText={(text) => setEmail(text)}
          value={email}
          secureTextEntry={false}
          style={styles.loginInput}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={"#FFFFFF"}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
          style={styles.loginInput}
        />

        <Pressable style={styles.loginButton} onPress={signUp}>
          <Text style={styles.textInButton}>Create account</Text>
        </Pressable>
      </View>
      <View>
        <ActivityIndicator animating={loading} size="large" color="#0000ff" />
        <TouchableOpacity onPress={()=>{props.navigation.push("Login")}}>
          <Text style={{ textDecorationLine: 'underline', color: '#004832' }}>ALREADY HAVE AN ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAccountScreenComponent;