import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Modal, ScrollView } from 'react-native';
import {postQrCheckIn} from '../../../api/qrApi';
import {qrTicketListState,qrFailTextState} from '../../../store/atom';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';

function QrCheckModal({qrTicketList,qrCenterId,setShowQrModal, setShowQrDoneModal,setShowCancelModal}) {

    const [myTicketInfo, setMyTicketInfo] = useRecoilState(qrTicketListState);
    const [failText , setFailText] = useRecoilState(qrFailTextState);
    const navigator = useNavigation();

    const selectQrTicketBtn = async(id,qrCenterId) => {
        // console.log('ticketId',id,'centerId',qrCenterId);
        const data = {
            centerId: qrCenterId,
            ticketId: id
        }
        // console.log('data',data)

        try{
            const response = await postQrCheckIn(data);
            console.log('response',response)
            if(response){
                setMyTicketInfo(response);
                setShowQrModal(false);
                setShowQrDoneModal(true);
                setTimeout(() => {
                    setShowQrDoneModal(false); 
                    navigator.navigate('HomeMain')
                }, 3000);
            }
        }catch(error){   
            console.error('Error getting:', error.response.data.code);
            if(error.response && error.response.data && error.response.data.code === 20906){
                setShowCancelModal(true)
                // 입장불가, 이용 가능한 수업이 없습니다.
                setFailText({
                    title: '입장불가',
                    text: '이용 가능한 수업이 없습니다.'
                })
            }else if(error.response && error.response.data && error.response.data.code === 20907){
                setShowCancelModal(true)
                // 이상태 코드는 다시 확인해볼것!
                setFailText({
                    title: '입장불가',
                    text: '이용 가능한 수업이 없습니다.'
                })
            }else if(error.response && error.response.data && error.response.data.code === 30000){
                setShowCancelModal(true)
                // 입장불가, 입장 횟수를 초과하였습니다. 센터에 문의해주세요
                setFailText({
                    title: '입장불가',
                    text: '입장 횟수를 초과하였습니다. \n센터에 문의해주세요.'
                })
            }else if(error.response && error.response.data && error.response.data.code === 30001){
                setShowCancelModal(true)
                 // 입장불가, 입장 횟수를 초과하였습니다. 센터에 문의해주세요
                    setFailText({
                        title: '입장불가',
                        text: '입장 횟수를 초과하였습니다. \n센터에 문의해주세요.'
                    })
            }else if(error.response && error.response.data && error.response.data.code === 20905){
                setShowCancelModal(true)
                // 입장 불가, 이용 가능한 수업이 없습니다.
                setFailText({
                    title: '입장불가',
                    text: '이용 가능한 수업이 없습니다.'
                })

            }else if(error.response && error.response.data && error.response.data.code === 20604){
                setShowCancelModal(true)
                // 입장불가, 중지 중인 이용권입니다. 센터에 문의해주세요
                setFailText({
                    title: '입장불가',
                    text: '중지 중인 이용권입니다. \n센터에 문의해주세요.'
                })
            }else if(error.response && error.response.data && error.response.data.code === 20607){
                setShowCancelModal(true)
                // 입장불가, 만료된 이용권입니다. 연장해주세요.
                setFailText({
                    title: '입장불가',
                    text: '만료된 이용권입니다. \n연장해주세요.'
                })
            }else if(error.response && error.response.data && error.response.data.code === 10100){
                setShowCancelModal(true)
                //  인식 불가, 이용할 센터의 QR 코드를 찍어주세요
                setFailText({
                    title: '인식불가',
                    text: '이용할 센터의 QR 코드를 찍어주세요.'
                })
            }
            setTimeout(() => {
                setShowCancelModal(false); 
            }, 3000);
        }finally{
            setShowQrModal(false);
        }
    }
    // 예약한 수업이 없을 경우[20906],
    // 이용권이 만료됐을 경우[20607],
    // 일일 이용 횟수를 초과한 경우[30000], 
    // 주간 이용 횟수를 초과한 경우[30001], 
    // 예약한 수업이 없을 경우[20905], 
    // 이용권이 중지권일 경우[20604], 
    // 이용권이 만료됐을 경우[20607], 
    // 올바른 큐알이 아닐 경우[10100]
    // console.log('qrTicketList,qrCenterId',qrTicketList,qrCenterId)
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