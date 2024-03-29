import { View, ScrollView, TouchableWithoutFeedback, Dimensions, Keyboard,Modal } from 'react-native';
import { COLORS } from '../../../constants/color';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const CustomPicker = ({trainerName, centerId,setShowPicker}) => {
  const screenHeight = Dimensions.get('window').height;
  const itemHeight = screenHeight / 4; 
    
  const navigation = useNavigation();

  const goConsultingScreens = (centerId,trainerId, selectedName) => {
    // console.log('centerId',centerId,'trainerId',trainerId)
    navigation.navigate('Consulting',{ centerId, trainerId, selectedName});
    setShowPicker(false);
};

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Modal
         animationType="slide"
         transparent
         onRequestClose={()=>setShowPicker(false)}
        >
    <PickerContainer>
    <Container>
    <ModalHeaderContainer>
   
            <ModalTitle>P.T 강사 선택</ModalTitle>

          <ModalHdButton onPress={()=>setShowPicker(false)}>
            <ModalIcons source={require('../../../assets/img/close_x.png')} />
           </ModalHdButton>

        </ModalHeaderContainer>
        <ScrollView
  showsVerticalScrollIndicator={false}
  bounces={false}
>
  {trainerName.length > 0 ? (
    trainerName.map((trainer) => (
      <TextContainer key={trainer.id}>
        <PickerBtn onPress={() => goConsultingScreens(centerId, trainer.id, trainer.name)}>
          <PickerText>{trainer.name}</PickerText>
        </PickerBtn>
      </TextContainer>
    ))
  ) : (
    <TextContainer>
      <NoListPickerText>등록된 트레이너가 없습니다</NoListPickerText>
    </TextContainer>
  )}
</ScrollView>
    </Container>
    </PickerContainer>
    </Modal>
    </TouchableWithoutFeedback>
  );
};

export default CustomPicker;

const PickerContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, .8);
`;

const Container = styled.View`
background-color: ${COLORS.gray_200};
/* background-color: #F2F2F7; */
width: 100%;
padding: 20px;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
flex:  0.5;
`;

const TextContainer = styled.View`
justify-content: center;
align-items: center;
/* background-color: #74748014; */
margin-bottom: 20px;
width: 100%;
`

const PickerBtn = styled.TouchableOpacity`
    /* background-color: rgba(116, 116, 128, 0.08); */
    width: 90%;
    height: 50px;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background-color: ${COLORS.sub};
`

const PickerText = styled.Text`
/* color: rgba(60, 60, 67, 0.60); */
color: ${COLORS.main};
font-size: 23px;
font-weight: 400;
line-height: 28px;
`

const NoListPickerText = styled.Text`
/* color: rgba(60, 60, 67, 0.60); */
color: ${COLORS.sub};
font-size: 18px;
font-weight: 400;
line-height: 28px;
margin-top: 38px;
`

const ModalTitle = styled.Text`
font-size: 20px;
font-weight: 600;
line-height: 22px;
letter-spacing: -0.4px;
color:#000;
`;

const ModalHeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top:20px;
    margin-bottom: 44px;
    padding: 0 20px;
`

const ModalIcons = styled(FastImage)`
   width: 20px;
height: 20px;
`

const ModalHdButton = styled.TouchableOpacity`
`;