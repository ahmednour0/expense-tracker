import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const Input = ({label,style,textInputConfig,invalid}) => {
    let inputStyles =[styles.input]
    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiLine)
    }
    if (invalid) {
        inputStyles.push(styles.invalidinput)
    }
    return (
        <View style={[styles.inputcontainer,style]}>
            <Text style={[styles.label,invalid && styles.invalidlabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    );
}

const styles = StyleSheet.create({
    inputcontainer: {
        marginHorizontal:4,
        marginVertical: 16,
 
    },
    label:{
        fontSize: 12,
        color:GlobalStyles.colors.primary100,
        marginBottom:4
    },
    input:{
        backgroundColor:GlobalStyles.colors.primary100,
        padding:6,
        borderRadius:6,
        fontSize:18,
        color:GlobalStyles.colors.primary700
    },
    inputMultiLine:{
        minHeight:100,
        textAlignVertical:'top',
        
    },
    invalidlabel:{
color:GlobalStyles.colors.error500
    },
    invalidinput:{
backgroundColor:GlobalStyles.colors.error50
    }
})

export default Input;
