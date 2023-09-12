import {  ScrollView, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import {useStopTicket}from '../../../api/useTicketsApi';
const CancelPicker = ({setShowStopTicketPicker,stopTicketList,setStopShowModal,ticketStopId}) => {
  const screenHeight = Dimensions.get('window').height;
  const itemHeight = screenHeight / 4; 
  const navigation = useNavigation();

  const getUseTicketBtn = (id) => {
    // console.log('centerId',centerId,'trainerId',trainerId)
    // navigation.navigate('Consulting',{ centerId, trainerId, selectedName});
    console.log('상클릭',id)
    setStopShowModal(true)
    setShowStopTicketPicker(false);
    navigation.setOptions({
        headerStyle: {
            backgroundColor: '#fff', // 원래의 헤더 색상으로 변경
        },
    });
};

const handleOutsideClick = () => {
    setShowStopTicketPicker(false);
    navigation.setOptions({
        headerStyle: {
          backgroundColor: '#fff', // 원래의 헤더 색상으로 변경
        },
      });
  };

  const preventBubble = (e) => {
    e.stopPropagation();
  };



  return (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
    <PickerContainer>
    <Container onPress={preventBubble}>
      <ScrollView
        nestedScrollEnabled={true}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        snapToInterval={itemHeight} 
        snapToAlignment="center" 
        style={{ height: itemHeight }}
        contentContainerStyle={{  justifyContent: 'center', alignItems: 'center' }}
      >
        {
            stopTicketList.map((item, index) => (
                <TextContainer key={index} style={{ height: itemHeight}}>
                <PickerBtn onPress={()=>getUseTicketBtn(ticketStopId)}>
                <PickerText>중지권 {item}일</PickerText>
                </PickerBtn>
                </TextContainer>
            ))
        }
      </ScrollView>
    </Container>
    </PickerContainer>
    </TouchableWithoutFeedback>
  );
};

export default CancelPicker;

const PickerContainer = styled.View`
  position: absolute;
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  /* height: ${props => props.screenHeight + 'px'}; */
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.TouchableOpacity`
    flex: 1;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #F2F2F7;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
`;

const TextContainer = styled.View`
justify-content: center;
align-items: center;
background-color: #74748014;
width: 100%;
`

const PickerBtn = styled.TouchableOpacity`
    background-color: rgba(116, 116, 128, 0.08);
    width: 90%;
    height: 50px;
    align-items: center;
    justify-content: center;
`

const PickerText = styled.Text`
color: rgba(60, 60, 67, 0.60);
font-size: 23px;
font-weight: 400;
line-height: 28px;
`