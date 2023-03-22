import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ bgColor, btnLabel, textColor, Press }) => {

    return (
        <TouchableOpacity
            onPress={Press}
            style={{
                backgroundColor: bgColor,
                borderRadius: 100,
                alignItems: 'center',
                width: '100%',
                paddingVertical: 5,
                marginVertical: 20
            }}>
            <Text style={{
                color: textColor,
                fontSize: 25,
                fontWeight: 'bold'
            }}>
                {btnLabel}
            </Text>
        </TouchableOpacity>
    )
}

export default Button;