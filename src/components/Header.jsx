import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {colors, parameters} from '../global/styles'
import { Icon } from '@rneui/base'
export default function Header(){
    return(
        <View style={styles.header}>
            {/* <View>
                <Icon 
                    type='material-community'
                    name = "menu"
                    color={'white'}
                    size={28}
                    onPress={()=>{}}
                />
            </View> */}
            <View>

            <Text style={styles.headerText}>EcoCollect</Text>
            </View>
            {/* <View>
                <Icon 
                    type='material-community'
                    name = "account"
                    color={'white'}
                    size={28}
                    onPress={()=>{}}
                />
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor: colors.nav,
        height: parameters.headerHeight,
    },
    headerText:{
        color:'white',
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
    }

})