import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Users from '../screens/Users';



const HomeMenu = () => {
    const Tab = createBottomTabNavigator();
    return (

        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Tab.Screen name="Profile" component={Profile} options={{headerShown: false}} />
            <Tab.Screen name="Users" component={Users} options={{headerShown: false}} />
        </Tab.Navigator>

    )
}

export default HomeMenu