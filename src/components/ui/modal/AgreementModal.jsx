import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Modal, ScrollView,} from 'react-native';

function AgreementModal({modalVisible, selectedItem, closeModal}) {

    return (
        <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}

      >
        <ModalContainer>
          <ModalContent>
           <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
           >
          <ModalCloseButton onPress={closeModal}>
            <ModalCloseBox source={require('../../../assets/img/close.png')} />
           </ModalCloseButton>
            <ModalTitle>{selectedItem?.mainTitle}</ModalTitle>
            <ModalSubTitle>{selectedItem?.subTitle}</ModalSubTitle>
            <ModalDesTitle>{selectedItem?.desTitle}</ModalDesTitle>
            <ModalText>{selectedItem?.desContent}</ModalText>
            <ModalDesTitle>{selectedItem?.desTitle2}</ModalDesTitle>
            <ModalText>{selectedItem?.desContent2}</ModalText>
           </ScrollView>
          </ModalContent>
        </ModalContainer>
      </Modal>
    );
}

export default AgreementModal;



const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
background-color: ${COLORS.white};
width: 100%;
padding: 20px;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
flex: .85;
`;

const ModalTitle = styled.Text`
    margin-top: 100px;
    margin-bottom: 43px;
  font-size: 28px;
font-weight: 500;
line-height: 37.80px;
color: ${COLORS.sub};

`;

const ModalSubTitle = styled.Text`
  font-size: 20px;
font-weight: 600;
line-height: 30px;
color: ${COLORS.sub};
margin-bottom: 8px;
`;

const ModalDesTitle = styled.Text`
font-size: 16px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.sub};
margin-bottom: 8px;
`;

const ModalText = styled.Text`
  font-size: 14px;
font-weight: 400;
line-height: 22.40px;
margin-bottom: 30px;
`;

const ModalCloseButton = styled.TouchableOpacity`
`;

const ModalCloseBox = styled.Image`
    position: absolute;
    right: 15px;
    top: 15px;
`