/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllBooksScreenComponent from './AllBooksScreenComponent';
import CustomIcon from './CustomIcon';
import { NavigationContainer } from '@react-navigation/native';

const Tap = createBottomTabNavigator();

const MainNavigatorScreenComponent: React.FC = () => (
    <NavigationContainer>
        <Tap.Navigator initialRouteName='allBooks'
            
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let rn = route.name;
                    if (rn == "allBooks") {
                        return <CustomIcon color={focused ? 'black' : 'gray'} />;
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
            <Tap.Screen name="allBooks" component={AllBooksScreenComponent} />
        </Tap.Navigator>
    </NavigationContainer>
);
export default MainNavigatorScreenComponent;

