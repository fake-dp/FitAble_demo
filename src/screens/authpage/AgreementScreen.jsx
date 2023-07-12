

import Agreementtemplate from '../../components/templates/authSreens/Agreementtemplate';

import React, { useState } from 'react';
import { Text, StyleSheet, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

function AgreementScreen({navigation}) {

    // const [isSelected, setSelection] = useState(false);
  
 

    return (
    //     <View>
    //   <View>
    //     <CheckBox
    //       value={isSelected}
    //       onValueChange={setSelection}
         
    //     />
    //     <Text>Do you like React Native?</Text>
    //   </View>
    //   <Text>Is CheckBox selected: {isSelected ? '👍' : '👎'}</Text>
    // </View>
  
        <Agreementtemplate
        navigation={navigation}
        />
    );
}

export default AgreementScreen;

