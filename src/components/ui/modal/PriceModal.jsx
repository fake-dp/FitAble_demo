import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Modal, ScrollView,Text, Button} from 'react-native';

function PriceModal({closeModal,goHomeScreens}) {
    return (
        <Modal
        // visible={modalVisible}
        animationType=""
        transparent
        onRequestClose={closeModal}
      >
        <ModalContainer>
            <ModalView>
                <ModalTitle>결제 완료</ModalTitle>
                <ModalSubTitle>결제되었습니다. 운동을 시작해주세요!</ModalSubTitle>

        <ButtonContainer>
            <CloseBtn onPress={closeModal}>
                    <CloseText>닫기</CloseText>
            </CloseBtn>

            <GohomeBtn onPress={goHomeScreens}>
                    <GoHomeText>홈으로 가기</GoHomeText>
            </GohomeBtn>
        </ButtonContainer>

            </ModalView>
        </ModalContainer>
            
        </Modal>
    );
}

export default PriceModal;


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
    align-items: center;
    justify-content: center;
    height: 208px;
    width: 315px;
    background-color: ${COLORS.box};
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
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 23px;
    margin-top: 31px;
`

const CloseBtn = styled.TouchableOpacity`
background-color: ${COLORS.white};
height: 50px;
width: 95px;

align-items: center;
justify-content: center;
border-radius: 80px;
`

const CloseText = styled.Text`
font-size: 16px;
color: ${COLORS.gray_300};
font-weight: 600;
`

const GohomeBtn = styled.TouchableOpacity`
background-color: ${COLORS.main};
height: 52px;
width: 167px;

align-items: center;
justify-content: center;
border-radius: 80px;
`

const GoHomeText = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 600;
`