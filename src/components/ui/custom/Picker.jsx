import { View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS } from '../../../constants/color';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
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
    <PickerContainer>
    <Container>
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
        {trainerName.map((trainer) => (
          <TextContainer key={trainer.id} style={{ height: itemHeight}}>
            <PickerBtn onPress={()=>goConsultingScreens(centerId, trainer.id,trainer.name)}>
            <PickerText>{trainer.name}</PickerText>
            </PickerBtn>
          </TextContainer>
        ))}
      </ScrollView>
    </Container>
    </PickerContainer>
  );
};

export default CustomPicker;

const PickerContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.View`
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