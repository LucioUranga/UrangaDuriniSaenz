import Comentarios from "../screens/Comentarios";
import Home from "../screens/Home";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Anidado() {
    const Stack = createNativeStackNavigator();
    return (
    
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Comentarios" component={Comentarios} options={{ headerShown: false }} />
        </Stack.Navigator>
  
    );
  }

