import React, { useState , useEffect} from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import {PERIOD_STATUS, TIMES_STATUS, TICKET_STATUS} from'../../../constants/status';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import SubscribeList from '../../ui/list/SubscribeList';
import UseTicketList from '../../ui/list/UseTicketList';
import { ScrollView } from 'react-native';
import MyBtn from '../../ui/buttonUi/MyBtn';
import { StopCancelModal, SubNTicketCancelModal } from '../../ui/modal/MyPageCancelModal';

import {getTypeTickets, getDetailTicket,useStopTicketList ,getStopTickets} from '../../../api/useTicketsApi';
import { useRecoilState } from 'recoil';
import { subscribeListState, ticketListState } from '../../../store/atom';


function CenterTicketListTemplate(props) {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('SUBSCRIBE');

  const [showModal, setShowModal] = useState(false);
  const [stopShowModal, setStopShowModal] = useState(false);

  const [subscribeList, setSubscribeList] = useRecoilState(subscribeListState);
  const [ticketList, setTicketList] = useRecoilState(ticketListState);

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
      console.log('response',response)
  } catch (error) {
      console.error('Error getting:', error);
  }
};


  // 이용권 목록 (구독권, 이용권)
  useEffect(() => {
    getTypeTicketsListData('SUBSCRIBE');
    getTypeTicketsListData('OTHER');
  }, []);

 
  // 환불
  const openCancelModal = (id) => {
    console.log('난 환불 및 구독 버튼이얌 헤헤 id',id)
    setShowModal(true)
  }

  // 중지
  const openStopModal = (id) => {
    console.log('난 중지 버튼이얌 헤헤 id',id)
    // setStopShowModal(true)
    getStopTicketsListData(id);
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

    const goDetailTicketScreens = (data) => {
        navigation.navigate('TicketDetail',{data});
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
          goDetailTicketScreens={()=>goDetailTicketScreens('SUBSCRIBE')}
          onPress={changeCardInfoScreens}
          openCancelModal={openCancelModal}
          subscribeListData={subscribeList}/>
          {/* subscribeListData={subscribeListData}/> */}
      </ScrollView> : <ScrollView bounces={false} showsVerticalScrollIndicator={false} overScrollMode="never">
          <UseTicketList 
            goDetailTicketScreens={()=>goDetailTicketScreens('OTHER')}
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
         />
        )
      }
    </Container>
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