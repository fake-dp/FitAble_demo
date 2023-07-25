import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Modal, ScrollView,} from 'react-native';

function PriceModal({closeModal}) {
    return (
        <Modal
        // visible={modalVisible}
        animationType=""
        transparent
        onRequestClose={closeModal}
      >
        <ModalContainer>
            <ModalView
                onPress={closeModal}
            >

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
    background-color: ${COLORS.white};
    border-radius: 15px;
`