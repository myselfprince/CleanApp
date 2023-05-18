import React,{useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions, Image, ActivityIndicator} from 'react-native'

import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import HomeScreen from './HomeScreen';
import Camera1 from './Camera';
const Stack = createNativeStackNavigator();


const Navigation=()=>{
    return(<NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Home' component={HomeScreen}/>
            {/* <Stack.Screen name='TestScreen' component={TestScreen}/> */}
            <Stack.Screen name='Camera1' component={Camera1}/>

        </Stack.Navigator>


    </NavigationContainer>

    )
};



export default Navigation;
