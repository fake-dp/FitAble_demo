import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Modal } from 'react-native';

function QrCancelModal({failText}) {

   console.log('failText',failText.text)
    return (
        <Modal
        // visible={modalVisible}
        animationType=""
        transparent
      >
        <ModalContainer>
            <ModalView>
                <ModalTitle>{failText?.title}</ModalTitle>
                <ModalSubTitle>{failText?.text}</ModalSubTitle>
            </ModalView>
        </ModalContainer>
            
        </Modal>
    );
}

export default QrCancelModal;

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
    padding: 20px;
    width: 85%;
    background-color: ${COLORS.sub};
    border-radius: 14px;
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