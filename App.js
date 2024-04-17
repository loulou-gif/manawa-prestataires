import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './routes/BottomTab';
import Home from './pages/Home';
import ModifyStore from './pages/forms/ModifyStore';
import Aperçu from './pages/Aperçu';
import Avis from './pages/Avis';

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown:false}}>
        <Stack.Screen name='BottomTab' component={BottomTab} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='ModifyStore' component={ModifyStore}/>
        <Stack.Screen name='Aperçu' component={Aperçu} />
        <Stack.Screen name='Avis' component={Avis} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
