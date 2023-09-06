import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Modal } from 'react-native';

function PriceModal({closeModal,goHomeScreens ,text}) {
    // console.log('text',text)
    return (
        <Modal
        // visible={modalVisible}
        animationType=""
        transparent
        onRequestClose={closeModal}
      >
        <ModalContainer>
            <ModalView>
                <ModalTitle>{text.title}</ModalTitle>
                <ModalSubTitle>{text.content}</ModalSubTitle>

        <ButtonContainer>
            <CloseBtn onPress={closeModal}>
                    <CloseText>{text.closeText}</CloseText>
            </CloseBtn>

            <GohomeBtn onPress={goHomeScreens}>
                    <GoHomeText>{text.goHomeText}</GoHomeText>
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
    background-color: rgba(0,0,0,0.50);
    align-items: center;
    justify-content: center;
`

const ModalView = styled.View`
    align-items: center;
    justify-content: center;
    height: 180px;
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
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 23px;
    margin-top: 31px;
`

const CloseBtn = styled.TouchableOpacity`
background-color: ${COLORS.white};
height: 48px;
width: 48%;

align-items: center;
justify-content: center;
border-radius: 10px;
`

const CloseText = styled.Text`
font-size: 16px;
color: ${COLORS.gray_300};
font-weight: 600;
`

const GohomeBtn = styled.TouchableOpacity`
background-color: ${COLORS.main};
height: 48px;
width: 48%;

align-items: center;
justify-content: center;
border-radius: 10px;
`

const GoHomeText = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 600;
`