import React, { useState } from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import ToggleBtn from '../../ui/toggle/ToggleBtn';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import WithdrawalModal from '../../ui/modal/WithdrawalModal';

function MyAppSettingTemplate(props) {
 
    const navigation = useNavigation();

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }
    const goBackScreens = () => {
        navigation.goBack();
    };

    const rightIcon = require('../../../assets/img/rightIcon.png');

    

  return (
    <Container>
        <GobackBlackGrid onPress={goBackScreens}>앱 설정</GobackBlackGrid>
        <AppSettingContainer>

                <SettingList>
                    <SettingListText>PUSH 알림</SettingListText>
                    <ToggleBtn />
                </SettingList>
                <SettingList>
                    <SettingListText>마케팅 알림</SettingListText>
                    <ToggleBtn />
                </SettingList>
                <SettingList>
                    <SettingListText>QR 출입증</SettingListText>
                    <ToggleBtn />
                </SettingList>
                <SettingListBtn>
                    <SettingListText>이용약관 및 정책</SettingListText>
                    <SettingListRightIcon source={rightIcon}/>
                </SettingListBtn>
                
                <GoodByeBtn
                onPress={openModal}
                >
                    <GoodByeText>
                        회원 탈퇴
                    </GoodByeText>
                </GoodByeBtn>
                {
                    showModal && (
                        <WithdrawalModal 
                        closeModal={closeModal}
                        />
                    )
                }
        </AppSettingContainer>
    </Container>
  );
}

export default MyAppSettingTemplate;

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${COLORS.white};
`;

const SettingList = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
`

const SettingListBtn = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    border-bottom-width: 1px;
    border-color: ${COLORS.gray_200};
    border-top-width: 1px;
    margin-top: 30px;
    margin-bottom: 21px;
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

const AppSettingContainer = styled.View`
    margin-top: 42px;
`

const GoodByeBtn = styled.TouchableOpacity`
 
`

const GoodByeText = styled.Text`
   font-size: 14px;
font-weight: 400;
text-decoration: underline;
line-height: 22.40px;
color: ${COLORS.gray_400};
`