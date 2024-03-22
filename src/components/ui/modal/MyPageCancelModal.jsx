import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Modal } from 'react-native';

export function BookCancelModal({closeModal ,text, postCancelReservation}) {
   
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
                <ModalSubTitle>{text.contentsub}</ModalSubTitle>
        <ButtonContainer>
            <BtnSubBoxContainer onPress={postCancelReservation}>
                    <BtnText>{text.checkText}</BtnText>
            </BtnSubBoxContainer>

            <BtnSubBoxContainer onPress={closeModal}>
                    <BtnText>{text.closeText}</BtnText>
            </BtnSubBoxContainer>
        </ButtonContainer>

            </ModalView>
        </ModalContainer>
            
        </Modal>
    );
}   

export function SubNTicketCancelModal({closeModal,postSubNRefundBtn ,text}) {
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
                <ModalSubTitle>{text.contentsub}</ModalSubTitle>
                <ButtonContainer>
            <BtnSubBoxContainer onPress={postSubNRefundBtn}>
                    <BtnText>{text.checkText}</BtnText>
            </BtnSubBoxContainer>

            <BtnSubBoxContainer onPress={closeModal}>
                    <BtnText>{text.closeText}</BtnText>
            </BtnSubBoxContainer>
        </ButtonContainer>

            </ModalView>
        </ModalContainer>
            
        </Modal>
    );
}

export function StopCancelModal({ text ,closeModal,postStopticketBtn}) {
 
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
                <ModalSubTitle>{text.contentsub}</ModalSubTitle>
                <ButtonContainer>
            <BtnSubBoxContainer onPress={postStopticketBtn}>
                    <BtnText>{text.checkText}</BtnText>
            </BtnSubBoxContainer>

            <BtnSubBoxContainer onPress={closeModal}>
                    <BtnText>{text.closeText}</BtnText>
            </BtnSubBoxContainer>
        </ButtonContainer>

            </ModalView>
        </ModalContainer>
            
        </Modal>
    );
}


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
    height: 209px;
    width: 93%;
    background-color: ${COLORS.white};
    border-radius: 15px;
`

const ModalTitle = styled.Text`
color: ${COLORS.sub};
font-size: 20px;
font-weight: 600;
line-height: 30px;
`



const ModalSubTitle = styled.Text`
font-size: 14px;
margin-top: 4px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_400};
`

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 23px;
    margin-top: 31px;
`

const BtnSubBoxContainer = styled.TouchableOpacity`
background-color: ${COLORS.gray_100};
height: 48px;
width: 48%;

align-items: center;
justify-content: center;
border-radius: 10px;
`

const BtnText = styled.Text`
font-size: 16px;
color: ${COLORS.gray_400};
font-weight: 600;
`

