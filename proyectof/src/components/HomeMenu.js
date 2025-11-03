import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';



const HomeMenu = () => {
    const Tab = createBottomTabNavigator();
    return (

        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Tab.Screen name="Profile" component={Profile} options={{headerShown: false}} />
            <Tab.Screen name="NewPost" component={NewPost} options={{headerShown: false}} />
        </Tab.Navigator>

    )
}

export default HomeMenu