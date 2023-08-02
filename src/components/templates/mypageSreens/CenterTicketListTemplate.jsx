import React, { useState } from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import SubscribeList from '../../ui/list/SubscribeList';
import UseTicketList from '../../ui/list/UseTicketList';

function CenterTicketListTemplate(props) {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('subscribe');

  const goBackScreens = () => {
    navigation.goBack();
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
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
      {selectedTab === 'subscribe' ? <SubscribeList subscribeListData={subscribeListData}/> : <UseTicketList useTicketListData={useTicketListData}/>}
      {selectedTab === 'useTicket' && (
            <AddBtnContainer>
                <AddBtnText>ddd</AddBtnText>
            </AddBtnContainer>
      )}
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
    margin-bottom: 17px;
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

const AddBtnText = styled.Text`
    font-size: 16px;
    font-weight: 500;
    line-height: 22.40px;
    color: ${COLORS.sub};
`;