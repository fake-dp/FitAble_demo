import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Modal} from 'react-native';

function WithdrawalModal({closeModal,handleLogout}) {
    return (
        <Modal
        // visible={modalVisible}
        animationType=""
        transparent
        onRequestClose={closeModal}
      >
        <ModalContainer>
            <ModalView>
                <ModalTitle>회원 탈퇴</ModalTitle>
                <ModalSubTitle>탈퇴하시면 구독권/이용권/마일리지가 소멸되고</ModalSubTitle>
                <ModalSubTitle>이용후기는 탈퇴 후에도 삭제되지 않습니다</ModalSubTitle>
                <ModalSubTitle>등록 센터에 개인정보는 1년 간 보관됩니다</ModalSubTitle>
        <ButtonContainer>
            <GoodbyeBtn onPress={handleLogout}>
                    <CloseText>확인</CloseText>
            </GoodbyeBtn>
            <GoodbyeBtn onPress={closeModal}>
                    <CloseText>닫기</CloseText>
            </GoodbyeBtn>
        </ButtonContainer>

            </ModalView>
        </ModalContainer>
            
        </Modal>
    );
}

export default WithdrawalModal;


const ModalContainer = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    align-items: center;
    justify-content: center;
`

const ModalView = styled.View`
    /* align-items: center; */
    /* justify-content: center; */
    padding: 30px 18px;
    height: 227px;
    width: 337px;
    background-color: ${COLORS.sub};
    border-radius: 15px;
`

const ModalTitle = styled.Text`
color: ${COLORS.white};
font-size: 20px;
font-weight: 600;
line-height: 30px;
`



const ModalSubTitle = styled.Text`
font-size: 14px;
margin-top: 4px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_100};
`

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 23px;
    margin-top: 17px;
`

const GoodbyeBtn = styled.TouchableOpacity`
background-color: ${COLORS.box};
height: 48px;
width: 149px;
align-items: center;
justify-content: center;
border-radius: 10px;
margin: 0 4px;
`

const CloseText = styled.Text`
font-size: 16px;
color: ${COLORS.white};
font-weight: 600;
`