import { COLORS } from '../../../constants/color';
import styled from 'styled-components/native';
import { Image ,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';


function HomeHeader() {
    
  const [isBell, setIsBell] = useState(true);

    const navigation = useNavigation();

    const goToScanScreen = () => {
        navigation.navigate('Scan');
    };

    const goToBellScreen = () => {
        navigation.navigate('Bell');
    };

    return (
        <StyledPressable>
              <Image
                source={require('../../../assets/img/headerlogo.png')}
                />
         
            <IconContainer>                
              <TouchableOpacity
              onPress={goToScanScreen}
              >
              <Image
                source={require('../../../assets/img/scan.png')}
                />
                </TouchableOpacity>

                <TouchableOpacity
                onPress={goToBellScreen}
                >
                  {
                    isBell ?   <CustomImage
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

const CustomImage = styled(Image)`
    margin-left: 16px;
`;