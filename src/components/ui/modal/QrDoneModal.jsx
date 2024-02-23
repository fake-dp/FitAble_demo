import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Modal } from 'react-native';

function QrDoneModal({myTicketInfo}) {

    console.log('myTicketInfo',myTicketInfo)
  
    return (
        <Modal
        animationType="slide"
        transparent
      >
        <ModalContainer>
            <ModalView>
                <ModalTitle>입장 완료</ModalTitle>
                <ModalSubTitle>정상적으로 입장 완료되었습니다</ModalSubTitle>
        
        <QrGridBorderLine/>

        <ListContainer>
        <ListText>{myTicketInfo?.name}</ListText>
        <ContentContainer>
        <ListText>{myTicketInfo?.ticketName}</ListText>
        {/* <ListText>잔여일수 {myTicketInfo?.leftDay}일 / 잔여횟수 {myTicketInfo?.leftTime}회</ListText> */}
        <ListText>
            잔여일수 {myTicketInfo?.leftDay}일
            {myTicketInfo?.leftTime > 0 && ` / 잔여횟수 ${myTicketInfo?.leftTime}회`}
        </ListText>
        </ContentContainer>
        </ListContainer>

            </ModalView>
        </ModalContainer>
        </Modal>
    );
}

export default QrDoneModal;

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
    width: 80%;
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

const QrGridBorderLine = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${COLORS.gray_400};
    margin-top: 16px;
    margin-bottom: 16px;
`

const ListContainer = styled.View`
flex-direction: row;
justify-content: space-between;
width: 100%;
`

const ContentContainer = styled.View``

const ListText = styled.Text`
font-size: 16px;
font-style: normal;
font-weight: 500;
color: ${COLORS.white};
margin-bottom: 13px;
`
