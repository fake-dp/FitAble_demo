import React, { useState } from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import SubscribeList from '../../ui/list/SubscribeList';
import UseTicketList from '../../ui/list/UseTicketList';
import { ScrollView } from 'react-native';
import MyBtn from '../../ui/buttonUi/MyBtn';
import { StopCancelModal, SubNTicketCancelModal } from '../../ui/modal/MyPageCancelModal';
function CenterTicketListTemplate(props) {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('subscribe');

  const [showModal, setShowModal] = useState(false);
  const [stopShowModal, setStopShowModal] = useState(false);

  const openCancelModal = () => {
      setShowModal(true)
  }

  const openStopModal = () => {
    setStopShowModal(true)
  }

  const stopCloseModal = () => {
    setStopShowModal(false)
}

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

  const subscribeListData = [
    {
        id: 0,
        date: '2023.06.15 10:10',
        title: '에이블짐 Basic 멤버십',
        price: '99,000',
        isCard: true,
        isUsed: true,
    },
    {
        id: 1,
        date: '2023.06.14 10:20',
        title: '에이블짐 Basic 멤버십',
        price: '99,000',
        isCard: false,
        isUsed: false,
    },
    {
        id: 2,
        date: '2023.06.13 08:15',
        title: '에이블짐 Basic 멤버십',
        price: '99,000',
        isCard: false,
        isUsed: false,
    },
    {
        id: 3,
        date: '2023.06.13 10:10',
        title: '에이블짐 Basic 멤버십',
        price: '99,000',
        isCard: false,
        isUsed: false,
    },
    {
        id: 4,
        date: '2023.06.13 08:15',
        title: '에이블짐 Basic 멤버십',
        price: '99,000',
        isCard: false,
        isUsed: false,
    },
    {
        id: 5,
        date: '2023.06.13 10:10',
        title: '에이블짐 Basic 멤버십',
        price: '99,000',
        isCard: false,
        isUsed: false,
    },
]

  const useTicketListData = [
    {
        id: 0,
        date: '2023.06.15 10:10',
        title: '3개월 이용권',
        price: '99,000',
        isCard: true,
        isUsed: true,
    },
    {
        id: 1,
        date: '2023.06.15 10:10',
        title: '3개월 이용권',
        price: '199,000',
        isCard: false,
        isUsed: false,
    },
    {
        id: 2,
        date: '2023.06.15 10:10',
        title: '3개월 이용권',
        price: '199,000',
        isCard: false,
        isUsed: false,
    },
    {
        id: 3,
        date: '2023.06.15 10:10',
        title: '3개월 이용권',
        price: '99,000',
        isCard: false,
        isUsed: false,
    },
]

const subscribeCancelText = {
    title: '구독 취소',
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
        <BtnListBox onPress={() => handleTabClick('subscribe')} selected={selectedTab === 'subscribe'}>
          <BtnListText selected={selectedTab === 'subscribe'}>구독권 내역</BtnListText>
        </BtnListBox>

        <BtnListBox onPress={() => handleTabClick('useTicket')} selected={selectedTab === 'useTicket'}>
          <BtnListText selected={selectedTab === 'useTicket'}>이용권 내역</BtnListText>
        </BtnListBox>
      </BtnListContainer>
      {selectedTab === 'subscribe' ? 
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} overScrollMode="never">
         <SubscribeList 
          goDetailTicketScreens={()=>goDetailTicketScreens('subscribe')}
          onPress={changeCardInfoScreens}
          openCancelModal={openCancelModal}
          subscribeListData={subscribeListData}/>
      </ScrollView> : <ScrollView bounces={false} showsVerticalScrollIndicator={false} overScrollMode="never">
          <UseTicketList 
            goDetailTicketScreens={()=>goDetailTicketScreens('useTicket')}
            openCancelModal={openCancelModal}
            openStopModal={openStopModal}
            useTicketListData={useTicketListData}/>
      </ScrollView>}
      {selectedTab === 'useTicket' && (
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
            text={selectedTab === 'subscribe' ? subscribeCancelText: refoundText}
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