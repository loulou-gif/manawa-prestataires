import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './routes/BottomTab';
import Home from './pages/Home';
import CreateServices from './pages/forms/CreateServices';
import ModifyStore from './pages/forms/ModifyStore';
import ModifyServices from './pages/forms/ModifyServices';

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown:false}}>
        <Stack.Screen name='BottomTab' component={BottomTab} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='CreateServices' component={CreateServices} />
        <Stack.Screen name='ModifyStore' component={ModifyStore}/>
        <Stack.Screen name='ModifyServices' component={ModifyServices} />
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
