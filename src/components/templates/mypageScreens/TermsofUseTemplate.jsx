import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import ToggleBtn from '../../ui/toggle/ToggleBtn';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';

function TermsofUseTemplate(props) {
    const navigation = useNavigation();

   
    const goBackScreens = () => {
        navigation.goBack();
    };

    const rightIcon = require('../../../assets/img/rightIcon.png');

    return (
        <Container>
             <GobackBlackGrid onPress={goBackScreens}>이용약관 및 정책</GobackBlackGrid>

            <SettingListContainer>

             <SettingListBtn >
                    <SettingListText>이용약관 동의</SettingListText>
                    <SettingListRightIcon source={rightIcon}/>
                </SettingListBtn>

                <SettingListBtn >
                    <SettingListText>구독/P.T 약관</SettingListText>
                    <SettingListRightIcon source={rightIcon}/>
                </SettingListBtn>

                <SettingListBtn >
                    <SettingListText>개인정보수집 및 이용에 대한 안내</SettingListText>
                    <SettingListRightIcon source={rightIcon}/>
                </SettingListBtn>

                <SettingList>
                    <SettingListText>마케팅 정보 수신 동의</SettingListText>
                    <ToggleBtn />
                </SettingList>

                <SettingList>
                    <SettingListText>푸시 알림 수신 동의</SettingListText>
                    <ToggleBtn />
                </SettingList>
            </SettingListContainer>
        </Container>
    );
}

export default TermsofUseTemplate;

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${COLORS.white};
`;

const SettingListContainer = styled.View`
    margin-top: 38px;
`

const SettingListBtn = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-color: ${COLORS.gray_200};
    margin-bottom: 30px;
`
const SettingList = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
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