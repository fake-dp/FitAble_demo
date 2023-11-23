import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
import DatePicker from 'react-native-date-picker'
import { useState } from 'react';
import { Button,Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
function MyProductTemplate(props) {

    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [selectedImage, setSelectedImage] = useState(null);

    const openImagePicker = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          console.log(image);
          setSelectedImage(image.path); // 이미지 경로를 상태에 저장
        })
        .catch(error => {
          console.log(error);
        });
    };

    return (
        <Container>
             <Button title="이미지 선택" onPress={openImagePicker} />
      {selectedImage && (
        <SelectedImageContainer>
          <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
        </SelectedImageContainer>
      )}
            <GobackBlackGrid onPress={goBackScreens}>주문상품 확인</GobackBlackGrid>
            <TestGrid>
            <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
            <MyProductText>곧 업데이트 예정입니다.</MyProductText>
            </TestGrid>
        </Container>
    );
}

export default MyProductTemplate;

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${COLORS.white};
`;


const TestGrid = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`


const MyProductText = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
`

const SelectedImageContainer = styled.View`
  margin-top: 20px;
`;