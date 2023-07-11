import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Text, TouchableOpacity, View} from 'react-native';
import {useCallback} from 'react';

import styled from 'styled-components/native';

const StyledView = styled.View`
  flex: 1;
  background-color: green;
`

function HomeScreen({navigation}) {
  const onClick = useCallback(() => {
    navigation.navigate('Details');
  }, [navigation]);

  return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={onClick}>
              <Text>Home Screen</Text>
            </TouchableOpacity>
          </View>
  );
}

function DetailsScreen({navigation}) {
  const onClick = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
          <StyledView>
            <TouchableOpacity onPress={onClick}>
              <Text>Details</Text>
            </TouchableOpacity>
          </StyledView>
  );
}

const Stack = createNativeStackNavigator();
function App() {
  return (
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                      name="Home"
                      component={HomeScreen}
                      options={{title: 'Overview'
                    , headerShown: false
                    }}
              />
              <Stack.Screen name="Details">
                {props => <DetailsScreen {...props} />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
  );
}

export default App;