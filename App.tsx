import AppNavigator from './Components/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import {  } from '@react-navigation/native';
const App: React.FC<{}> = () => {
  return(
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </Provider>
  )
}
export default App; 
