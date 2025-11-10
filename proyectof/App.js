import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Register from './src/screens/prueba';
import HomeMenu from './src/components/HomeMenu';
import { NavigationContainer } from '@react-navigation/native';
import { Comentarios } from './src/screens/Comentarios';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="HomeMenu" component={HomeMenu} options={{ headerShown: false }} />
        <Stack.Screen name="Comentarios" component={Comentarios} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
