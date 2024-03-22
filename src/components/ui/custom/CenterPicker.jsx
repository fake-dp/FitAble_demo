import {  ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const CenterPicker = ({centerName,setShowPicker,setMyInfo,postMainCenterData}) => {
  const screenHeight = Dimensions.get('window').height;
  const itemHeight = screenHeight / 4; 
  const navigation = useNavigation();

  const goConsultingScreens = (id, name) => {
    // console.log('centerId',centerId,'trainerId',trainerId)
    // navigation.navigate('Consulting',{ centerId, trainerId, selectedName});
    // setShowPicker(false);
    console.log('상담하기 구현해야함',name,id)
    postMainCenterData(id, name);
};

const handleOutsideClick = () => {
    setShowPicker(false);
  };

  const preventBubble = (e) => {
    e.stopPropagation();
  };

console.log('centerName',centerName)

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
        {centerName && centerName?.map((center) => (
          <TextContainer key={center.id} style={{ height: itemHeight}}>
            <PickerBtn onPress={()=>goConsultingScreens(center.id, center.name)}>
            <PickerText>{center.name}</PickerText>
            </PickerBtn>
          </TextContainer>
        ))}
      </ScrollView>
    </Container>
    </PickerContainer>
    </TouchableWithoutFeedback>
  );
};

export default CenterPicker;

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