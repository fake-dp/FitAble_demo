import React from 'react';
import { View,Text } from "react-native";
import AuthUsePasswordtemplate from '../../components/templates/authSreens/AuthUsePasswordtemplate';
function AuthPassword({navigation}) {
    return (
        <AuthUsePasswordtemplate 
        navigation={navigation}
        />
    );
}

export default AuthPassword;