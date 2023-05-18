import React,{useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions, Image, ActivityIndicator} from 'react-native'
import { Button } from '@rneui/themed';

export default function HomeScreen(props){
    return(
        <View style={{flex:1, justifyContent:'center'}}>
            <View style={{paddingVertical:10}}>

            <Text style={{color:'black', fontSize:20, fontWeight:"bold", textAlign:'center', fontSize:35, position:'absolute', top:-100, alignSelf:'center'}}>Inform us about the garbage near you</Text>
            </View>

            <View style={{justifyContent:'center', alignItems:'center', }}>
            <Image 
                    source={require('../../src/test.jpeg')} 
                    style={{width: 250, height: 250, borderColor:'green', borderWidth:2}}
                    resizeMode='cover'
                />
                <Button
              title="Take Photo"
              onPress={()=> props.navigation.navigate('Camera1')}

              iconContainerStyle={{ marginRight: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: 'rgba(90, 154, 230, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 300,
                height:50,
                marginHorizontal: 50,
                marginVertical: 20,
              }}
            />
            </View>
            
        </View>
    )
}