import { COLORS } from '../../../constants/color';
import styled from 'styled-components/native';
import { Image ,TouchableOpacity} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import {getUnreadPush} from '../../../api/pushApi';
import FastImage from 'react-native-fast-image'

function HomeHeader({navigation}) {
    
  const [isAlarmRead, setIsAlarmRead] = useState(false);

    // const navigation = useNavigation();
    const goToScanScreen = () => {
      navigation.navigate('Scan');
    };

    const goToBellScreen = () => {
        navigation.navigate('Bell');
    };

    const getUnreadPushData = async () => {
      const response = await getUnreadPush();
      // console.log('response@@@@@@',response.isExistUnread)
      if(response){
        setIsAlarmRead(response.isExistUnread)
      }
    }


    useFocusEffect(
      useCallback(() => {
          getUnreadPushData();
      }, [])
  );

    return (
        <StyledPressable>
              <CustomLogoImage
                source={require('../../../assets/img/headerlogo.png')}
                resizeMode={FastImage.resizeMode.cover}
                />
         
            <IconContainer>                
              <TouchableOpacity
              onPress={goToScanScreen}
              >
              <CustomImage
                source={require('../../../assets/img/scan.png')}
                />
                </TouchableOpacity>

                <TouchableOpacity
                onPress={goToBellScreen}
                >
                  {
                    isAlarmRead ?   <CustomImage
                    source={require('../../../assets/img/bell_active.png')}
                    /> : <CustomImage
                    source={require('../../../assets/img/bell_inactive.png')}
                    />
                  }
            
                </TouchableOpacity>
              </IconContainer>
        </StyledPressable>
    );
}

export default HomeHeader;

const StyledPressable = styled.View`
  width: 100%;
  border-radius: 13px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;


const IconContainer = styled.View`
  flex-direction: row;
  margin-right: 8%;
`;

const CustomLogoImage = styled(FastImage)`
    width: 138px;
    height: 24px;
`;

const CustomImage = styled(FastImage)`
    margin-left: 16px;
    width: 24px;
    height: 24px;
`;