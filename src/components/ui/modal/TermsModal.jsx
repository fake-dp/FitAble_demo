import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Modal, ScrollView,} from 'react-native';
import FastImage from 'react-native-fast-image'
import { WebView } from 'react-native-webview';
function TermsModal({modalVisible, termData, hanldeCloseModal}) {

    return (
        <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={hanldeCloseModal}

      >
        <ModalContainer>
          <ModalContent>
          <ModalCloseButton onPress={hanldeCloseModal}>
            <ModalCloseBox source={require('../../../assets/img/close.png')} />
           </ModalCloseButton>
            <ModalTitle>이용권 센터 약관</ModalTitle>
            <WebView 
                           originWhitelist={['*']}
                           javaScriptEnabled={true}
                           style={{ flex: 1 }}
                           source={{
                               html: `
                                 <html>
                                   <head>
                                     <meta name="viewport" content="width=device-width, initial-scale=1">
                                     <style>
                                     p { 
                                       font-size: 16px;
                                       font-weight: 400;
                                       letter-spacing: -0.4px;
                                       color: ${COLORS.gray_400};
                                     }
                                     li {
                                       font-size: 16px;
                                       font-weight: 400;
                                       letter-spacing: -0.4px;
                                       color: ${COLORS.gray_400};
                                     }
                                     ol{
                                       font-size: 16px;
                                       font-weight: 400;
                                       letter-spacing: -0.4px;
                                       color: ${COLORS.gray_400};
                                     }
                                     ul{
                                       font-size: 16px;
                                       font-weight: 400;
                                       letter-spacing: -0.4px;
                                       color: ${COLORS.gray_400};
                                     }
                                     span {
                                       font-size: 16px;
                                       font-weight: 400;
                                       letter-spacing: -0.4px;
                                       color: ${COLORS.gray_400};
                                     }
                                     img { max-width: 100%; height: auto; }
                                   </style>
                                   </head>
                                   <body>
                                     ${termData ? termData : ''}
                                   </body>
                                 </html>
                               `
                             }}
            />
          </ModalContent>
        </ModalContainer>
      </Modal>
    );
}

export default TermsModal;



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


const ModalCloseButton = styled.TouchableOpacity`
width: 60px;
height: 60px;
position: absolute;
top: 0;
right: 0;
`;

const ModalCloseBox = styled(FastImage)`
    position: absolute;
    right: 15px;
    top: 15px;
    width: 28px;
    height: 28px;
`