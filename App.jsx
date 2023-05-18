import React from 'react';
import {SafeAreaView, StyleSheet, Text, View,StatusBar} from 'react-native';
import Header from './src/components/Header';
import HomeScreen from './src/components/HomeScreen'
import Camera from './src/components/Camera'
import Navigation from './src/components/Navigation'
import {colors} from './src/global/styles'

export default function App(){
  return(
  <View style={styles.container}>
    <StatusBar barStyle={'light-content'} backgroundColor={colors.statusBar}/>
    <Header />
    <Navigation />
    {/* <Camera />
    <HomeScreen /> */}

    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1}
})
