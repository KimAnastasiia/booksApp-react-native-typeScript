/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllBooksScreenComponent from './AllBooksScreenComponent';
import CustomIcon from './CustomIcon';
import { NavigationContainer } from '@react-navigation/native';
import CreateBookScreenComponent from './CreateBookScreenComponent';
import CustomCreateBookIcon from './CustomCreateBookIcon';

const Tap = createBottomTabNavigator();

const MainNavigatorScreenComponent: React.FC = () => (
  
        <NavigationContainer >
            <Tap.Navigator initialRouteName='All books'
        
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                        let rn = route.name;
                        if (rn == "All books") {
                            return <CustomIcon color={focused ? 'black' : 'gray'} />;
                        }
                        if (rn == "Create new book") {
                            return <CustomCreateBookIcon color={focused ? 'black' : 'gray'} />;
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
                
            </Tap.Navigator>
        </NavigationContainer>

);
export default MainNavigatorScreenComponent;

