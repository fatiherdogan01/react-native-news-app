import React,{useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Tabs from './src/tabs'
import NewsDetail from './src/newsDetail'
function App() {
   useEffect(() => {
     SplashScreen.hide();
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Tabs" component={Tabs}  options={{ headerTitleStyle: { alignSelf: 'center' }, headerTitle: 'News Feed' }}      />
        <Stack.Screen name="NewsDetail" component={NewsDetail} options={{ headerTitle: 'News Detail' }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
