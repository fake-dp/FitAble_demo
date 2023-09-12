import React, { useState , useEffect} from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import {PERIOD_STATUS, TIMES_STATUS, TICKET_STATUS} from'../../../constants/status';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import SubscribeList from '../../ui/list/SubscribeList';
import UseTicketList from '../../ui/list/UseTicketList';
import { ScrollView , Alert} from 'react-native';
import MyBtn from '../../ui/buttonUi/MyBtn';
import { StopCancelModal, SubNTicketCancelModal } from '../../ui/modal/MyPageCancelModal';

import {getTypeTickets, useStopTicket, requestRefundTicket,cancelSubscribeTicket,getDetailTicket ,getStopTickets} from '../../../api/useTicketsApi';
import { useRecoilState } from 'recoil';
import { subscribeListState, ticketListState } from '../../../store/atom';
import CancelPicker from '../../ui/custom/CancelPicker';

function CenterTicketListTemplate(props) {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('SUBSCRIBE');

  const [showModal, setShowModal] = useState(false);
  const [stopShowModal, setStopShowModal] = useState(false);

  const [subscribeList, setSubscribeList] = useRecoilState(subscribeListState);
  const [ticketList, setTicketList] = useRecoilState(ticketListState);
  const [showStopTicketPicker, setShowStopTicketPicker] = useState(false);
  const [stopTicketList, setStopTicketList] = useState([])

  const [ticketStopId, setTicketStopId] = useState(null)
  const [ticketSubNRefundId, setTicketSubNRefundId] = useState(null)
  // 이용권 목록 (구독, 이용)
  const getTypeTicketsListData = async (type) => {
    try {
        const response = await getTypeTickets(type);
        if(type === 'SUBSCRIBE'){
          setSubscribeList(response.content);
        }else if(type === 'OTHER'){
          setTicketList(response.content);
        }
    } catch (error) {
        console.error('Error getting:', error);
    }
};

  // 중지권 목록
  const getStopTicketsListData = async (id) => {
  try {
      const response = await getStopTickets(id);
      console.log('response',response.stopTickets)
      if(response){
        setShowStopTicketPicker(true)
        setStopTicketList(response.stopTickets)
        navigation.setOptions({
          headerStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          },
        });
      }else{
        Alert.alert("알림","중지권 목록을 불러올 수 없습니다.",['확인']);
      }
  } catch (error) {
      console.error('Error getting:', error);
  }
};

  // 중지권 요청
  const postUseStopTicket = async (id) => {
  // console.log('udd,',id)
  try {
      const response = await useStopTicket(id);
      if(response){
          console.log('중지권 사용 확인용 콘솔',response)
          Alert.alert("알림","중지권 사용에 성공하였습니다.",[ 
          { text: '확인', onPress: () =>  setStopShowModal(false)}]);
          // setStopShowModal(false)
      }else{
          Alert.alert("알림","중지권 사용에 실패하였습니다.",['확인']);
      }
  } catch (error) {
      console.error('Error getting:', error);
  }
};

  // 환불 요청
  const postRefundTicket = async (id) => {
  try {
      const response = await requestRefundTicket(id);
      if(response){
          console.log('환불 요청 확인용 콘솔',response)
          Alert.alert("알림","환불 요청에 성공하였습니다.",[
          { text: '확인', onPress: () =>  setShowModal(false)}]);
          // setShowModal(false)
      }else{
          Alert.alert("알림","환불 요청에 실패하였습니다.",['확인']);
      }
  } catch (error) {
      console.error('Error getting:', error);
  }
};

  // 구독 취소 
  const postCancelSubscribeTicket = async (id) => {
  try {
      const response = await cancelSubscribeTicket(id);
      if(response){
          console.log('구독 취소 확인용 콘솔',response)
          Alert.alert("알림","구독 취소에 성공하였습니다.",[
          { text: '확인', onPress: () =>  setShowModal(false)}]);
          // setShowModal(false)
      }else{
          Alert.alert("알림","구독 취소에 실패하였습니다.",['확인']);
      }
  } catch (error) {
      console.error('Error getting:', error);
  }
};


  // 이용권 목록 (구독권, 이용권)
  useEffect(() => {
    getTypeTicketsListData('SUBSCRIBE');
    getTypeTicketsListData('OTHER');
  }, []);

 
  // 환불 및 구독 요청 확인 버튼
  const postSubNRefundBtn = (id,type) => {
    console.log('난 환불 및 구독 버튼이얌 헤헤gpgpgp id',id, type)
    // postRefundTicket(id);
    if(type === 'SUBSCRIBE'){
      postCancelSubscribeTicket(id);
    }else if(type === 'OTHER'){
      postRefundTicket(id);
    }
  }

  // 환불 및 구독 모달 오픈
  const openCancelModal = (id) => {
    console.log('난 환불 및 구독 버튼이얌 헤헤 id',id)
    setShowModal(true)
    setTicketSubNRefundId(id)
  }
  console.log('ticketSubNRefundId',ticketSubNRefundId)

  // 중지
  const openStopModal = (id) => {
    setTicketStopId(id)
    getStopTicketsListData(id);
  }

  const postStopticketBtn = (ticketStopId) => {
    console.log('난 @@중지 버튼이얌 헤헤 id',ticketStopId)
    postUseStopTicket(ticketStopId);
  }


  // 중지권 모달 닫기
  const stopCloseModal = () => {
    setStopShowModal(false)
}

  // 구독권 및 환불 모달 닫기
  const closeModal = () => {
      setShowModal(false)
  }

  const goBackScreens = () => {
    navigation.goBack();
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const addPayTicket = () => {
    console.log('이용권 추가 구매');
    };

    const changeCardInfoScreens = () => {
        navigation.navigate('InfoCard');
    };


const subscribeCancelText = {
    title: '해지 예약',
    content: '정말로 구독을 취소하시겠어요?',
    contentsub: '구독을 취소하면 다음 달 구독권을 사용할 수 없습니다',
    checkText: '확인',
    closeText: '닫기',
}

const refoundText = {
    title: '이용권 환불',
    content: '정말로 이용권을 환불하시겠어요?',
    contentsub: '환불 요청 시, 계약 요건에 따라 환불됩니다',
    checkText: '확인',
    closeText: '닫기',
}

const stopText = {
    title: '중지권 사용',
    content: '정말로 중지권을 사용하시겠어요?',
    contentsub: '센터에서 확인 후 적용됩니다',
    checkText: '확인',
    closeText: '닫기',
}

  return (
    <>
    <Container>
      <GobackBlackGrid onPress={goBackScreens}>이용권 목록</GobackBlackGrid>
      <BtnListContainer>
        <BtnListBox onPress={() => handleTabClick('SUBSCRIBE')} selected={selectedTab === 'SUBSCRIBE'}>
          <BtnListText selected={selectedTab === 'SUBSCRIBE'}>구독권 내역</BtnListText>
        </BtnListBox>

        <BtnListBox onPress={() => handleTabClick('OTHER')} selected={selectedTab === 'OTHER'}>
          <BtnListText selected={selectedTab === 'OTHER'}>이용권 내역</BtnListText>
        </BtnListBox>

      </BtnListContainer>
      {selectedTab === 'SUBSCRIBE' ? 
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} overScrollMode="never">
         <SubscribeList 
        
          onPress={changeCardInfoScreens}
          openCancelModal={openCancelModal}
          subscribeListData={subscribeList}/>
    
      </ScrollView> : <ScrollView bounces={false} showsVerticalScrollIndicator={false} overScrollMode="never">
          <UseTicketList 

            openCancelModal={openCancelModal}
            openStopModal={openStopModal}
            useTicketListData={ticketList}/>
      </ScrollView>}
      {selectedTab === 'OTHER' && (
            <AddBtnContainer>
                <MyBtn
                onPress={addPayTicket}
                >이용권 추가 구매</MyBtn>
            </AddBtnContainer>
      )}
      {
        showModal && (
            <SubNTicketCancelModal 
            postSubNRefundBtn={()=>postSubNRefundBtn(ticketSubNRefundId, selectedTab)}
            closeModal={closeModal}
            text={selectedTab === 'SUBSCRIBE' ? subscribeCancelText: refoundText}
         />
        )
      }
      {
        stopShowModal && (
            <StopCancelModal 
            closeModal={stopCloseModal}
            text={stopText}
            postStopticketBtn={()=>postStopticketBtn(ticketStopId)}
         />
        )
      }
      </Container>
      {
        showStopTicketPicker && (<CancelPicker 
          stopTicketList={stopTicketList}
          setStopShowModal={setStopShowModal}
          ticketStopId={ticketStopId}
          setShowStopTicketPicker={setShowStopTicketPicker}/>)
      }
      </>
  );
}

export default CenterTicketListTemplate;

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${COLORS.white};
`;

const BtnListContainer = styled.View`
  flex-direction: row;
  margin-top: 42px;
    margin-bottom: 28px;
`;

const BtnListBox = styled.TouchableOpacity`
  padding: 10px 14px;
  border-radius: 8px;
  background-color: ${({ selected }) => (selected ? COLORS.sub : COLORS.white)};
`;

const BtnListText = styled.Text`
  font-size: 16px;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  color: ${({ selected }) => (selected ? COLORS.main : COLORS.gray_300)};
`;

const AddBtnContainer = styled.View`

`