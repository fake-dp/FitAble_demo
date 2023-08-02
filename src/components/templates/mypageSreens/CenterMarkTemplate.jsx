import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
function CenterMarkTemplate(props) {

    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };

    const rightIcon = require('../../../assets/img/rightIcon.png');



    return (
        <Container>
            <GobackBlackGrid onPress={goBackScreens}/>
            <SettingListBtnFirst>
                    <SettingListText>대표 센터</SettingListText>
                    <FirstSettingContainer>
                      <SettingSubText>내 센터 등록하기</SettingSubText>
                    <SettingListRightIcon source={rightIcon}/>
                    </FirstSettingContainer>
                </SettingListBtnFirst>

                <NoListContainer>
                    <NoListText>등록된 센터가 없습니다</NoListText>
                </NoListContainer>
        </Container>
    );
}

export default CenterMarkTemplate;

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${COLORS.white};
`;


const SettingListBtnFirst = styled.TouchableOpacity`
   flex-direction: row;
    justify-content: space-between;
    align-items: center;
   margin-top: 33px;
`

    
const SettingListText = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
`
    
const SettingListRightIcon = styled.Image`
    width: 20px;
    height: 20px;
`

const FirstSettingContainer = styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
`

const SettingSubText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_400};
font-weight: 500;
line-height: 22.40px;
margin-right: 8px;
`

const NoListContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
`

const NoListText = styled.Text`
    font-size: 16px;
    font-weight: 500;
    line-height: 22.40px;
    color: ${COLORS.gray_300};
`