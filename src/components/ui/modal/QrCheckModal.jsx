import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Modal, ScrollView } from 'react-native';
import {postQrCheckIn} from '../../../api/qrApi';
import { useState } from 'react';
import QrDoneModal from './QrDoneModal';
function QrCheckModal({qrTicketList,qrCenterId,setShowQrModal, showQrDoneModal}) {


    const selectQrTicketBtn = async(id,qrCenterId) => {
        console.log('ticketId',id,'centerId',qrCenterId);
        const data = {
            centerId: qrCenterId,
            ticketId: id
        }
        console.log('data',data)

        try{
            const response = await postQrCheckIn(data);
            console.log('response',response)
            if(response){
                setShowQrModal(false);
                showQrDoneModal(true);
            }
        }catch(error){
            console.error('Error getting:', error.response.data.code);
        }finally{
            // setShowQrModal(false);
        }
    }

    console.log('qrTicketList,qrCenterId',qrTicketList,qrCenterId)
    return (
        <Modal
        // visible={modalVisible}
        animationType=""
        transparent
        >
        <ModalContainer>
            <ModalView>
                <ModalTitle>이용권 선택</ModalTitle>
                <ModalSubTitle>출석할 이용권을 선택해주세요</ModalSubTitle>

                <QrGridBorderLine/>

                <ButtonContainer>
            <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}>
            {qrTicketList.map((ticket) => (
                <QrListBtn key={ticket.id} onPress={()=>selectQrTicketBtn(ticket.id,qrCenterId)}>
                                <QrListBtnText>{ticket.name}</QrListBtnText>
                            </QrListBtn>
                        ))}
            </ScrollView>
                </ButtonContainer>

            </ModalView>
        </ModalContainer>
            
        </Modal>
    );
}

export default QrCheckModal;

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

const ButtonContainer = styled.View`
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 230px;
    /* padding: 0 20px; */
    margin-top: 12px;
`

const QrGridBorderLine = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${COLORS.gray_400};
    margin-top: 12px;
    margin-bottom: 12px;
`

const QrListBtn = styled.TouchableOpacity`
background-color: ${COLORS.box};
height: 48px;
width: 100%;
align-items: center;
justify-content: center;
border-radius: 10px;
margin-bottom: 12px;
padding: 0 50px;
`

const QrListBtnText = styled.Text`
font-size: 16px;
color: ${COLORS.white};
font-weight: 600;
`