/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert } from 'react-native';
import AllBooksScreenComponent from './AllBooksScreenComponent';
import CustomIcon from './CustomIcon';
import CreateBookScreenComponent from './CreateBookScreenComponent';
import { RootStackParamList } from './AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from './FirebaseConfig';
const Tap = createBottomTabNavigator();

const LogoutComponent = () => {
    return null;
}

type MainScreenComponentProps = NativeStackScreenProps<RootStackParamList, 'MainNavigator'>
const MainNavigatorScreenComponent: React.FC<MainScreenComponentProps> = (props) => {

    const auth = FIREBASE_AUTH
  
    const handleSignOut = async () => {
      try {
        await auth.signOut();
        props.navigation.push('Login')
      } catch (error:any) {
        console.error('Error signing out:', error.message);
        Alert.alert('Error', 'An error occurred while signing out.');
      }
    };
  
    const showAlert = () => {
      Alert.alert(
        'Log out',
        'Are you sure you are logging out?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: (handleSignOut),
          },
        ],
        { cancelable: false }
      );
    };
    return (
        <Tap.Navigator initialRouteName='All books'

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let rn = route.name;
                    if (rn == "All books") {
                        return <CustomIcon color={focused ? 'black' : 'gray'} img={require("../assets/books.png")}/>;
                    }
                    if (rn == "Create new book") {
                        return <CustomIcon color={focused ? 'black' : 'gray'} img={require('../assets/add.png')} />;
                    }
                    if (rn == "Log out") {
                        return <CustomIcon onPress={showAlert} nameOfComponent="logOut" color={focused ? 'black' : 'gray'} img={require('../assets/log-out.png')} />;
                    }
                },
                tabBarStyle: {
                    backgroundColor: 'white',
                    // Add other tabBarStyle properties as needed
                },
                tabBarItemStyle: {
                    justifyContent: 'center', // Center the items vertically
                    alignItems: 'center', // Center the items horizontally
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                },
                tabBarInactiveTintColor: 'gray', // Color of inactive tab label
                tabBarActiveTintColor: 'black', // Color of active tab label
                tabBarShowLabel: false,
            })}
        >
            <Tap.Screen name="All books" component={AllBooksScreenComponent} />
            <Tap.Screen name="Create new book" component={CreateBookScreenComponent} />
            <Tap.Screen name="Log out" component={LogoutComponent} />
             
        </Tap.Navigator>


    )
};
export default MainNavigatorScreenComponent;

