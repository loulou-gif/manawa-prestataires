import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './routes/BottomTab';
import Home from './pages/Home';
import ModifyStore from './pages/forms/ModifyStore';
import Aperçu from './pages/Aperçu';
import Avis from './pages/Avis';
import Signup from './pages/Signup';
import Start from './pages/Start';
import Otpcode from './pages/Otpcode';
import Login from './pages/Login';
import UsersDetails from './pages/UsersDetails';
import StoreDetails from './pages/StoreDetails';
import { useState, useEffect } from 'react';
import { auth } from './firebase/configs';
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isLogged, setIsLogged] = useState(null);

  // Utiliser useEffect pour vérifier l'état de la connexion ici
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isLogged === null) {
    // Vous pouvez afficher un écran de chargement ici
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLogged ? 'BottomTab' : 'Start'}>
        <Stack.Screen name='BottomTab' component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={Home} options={{ headerStyle: { backgroundColor: '#DE9F42' } }} />
        <Stack.Screen name='ModifyStore' component={ModifyStore} options={{ headerStyle: { backgroundColor: '#DE9F42' } }} />
        <Stack.Screen name='Aperçu' component={Aperçu} options={{ headerStyle: { backgroundColor: '#DE9F42' } }} />
        <Stack.Screen name='Avis' component={Avis} options={{ headerStyle: { backgroundColor: '#DE9F42' } }} />
        <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false, headerStyle: { backgroundColor: '#DE9F42' } }} />
        <Stack.Screen name='Start' component={Start} options={{ headerShown: false, headerStyle: { backgroundColor: '#DE9F42' } }} />
        <Stack.Screen name='Otpcode' component={Otpcode} options={{ headerShown: false, headerStyle: { backgroundColor: '#DE9F42' } }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false, headerStyle: { backgroundColor: '#DE9F42' } }} />
        <Stack.Screen name='UsersDetails' component={UsersDetails} options={{ headerShown: false, headerStyle: { backgroundColor: '#DE9F42' } }} />
        <Stack.Screen name='StoreDetails' component={StoreDetails} options={{ headerShown: false, headerStyle: { backgroundColor: '#DE9F42' } }} />
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
